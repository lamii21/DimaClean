from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FileUploadParser
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import pandas as pd
import numpy as np
import json
import io
import os
from .models import DataSet, CleaningOperation
from .serializers import (
    DataSetSerializer, CleaningOperationSerializer, FileUploadSerializer,
    DataPreviewSerializer, CleaningRequestSerializer, StatisticsSerializer
)

# Variable globale pour stocker les données en mémoire (en production, utiliser Redis ou une base de données)
datasets_cache = {}

@api_view(['GET'])
def api_root(request):
    """Point d'entrée de l'API Django"""
    return Response({
        'message': 'Bienvenue sur DimaClean API Django',
        'version': '2.0.0',
        'framework': 'Django REST Framework',
        'endpoints': {
            'upload': '/api/upload/',
            'datasets': '/api/datasets/',
            'preview': '/api/datasets/{id}/preview/',
            'clean': '/api/datasets/{id}/clean/',
            'statistics': '/api/datasets/{id}/statistics/',
            'export': '/api/datasets/{id}/export/',
        }
    })

@api_view(['POST'])
def upload_file(request):
    """Upload et analyse d'un fichier CSV"""
    serializer = FileUploadSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    try:
        uploaded_file = serializer.validated_data['file']

        # Lire le contenu du fichier
        content = uploaded_file.read().decode('utf-8')
        df = pd.read_csv(io.StringIO(content))

        # Créer l'objet DataSet
        dataset = DataSet.objects.create(
            filename=f"dataset_{DataSet.objects.count() + 1}.csv",
            original_filename=uploaded_file.name,
            file_size=uploaded_file.size,
            rows_count=len(df),
            columns_count=len(df.columns),
            column_names=df.columns.tolist(),
            data_types={col: str(df[col].dtype) for col in df.columns},
            missing_values={col: int(df[col].isnull().sum()) for col in df.columns}
        )

        # Stocker les données en cache
        datasets_cache[dataset.id] = {
            'original': df.copy(),
            'current': df.copy()
        }

        # Préparer la réponse
        response_data = {
            'status': 'success',
            'message': 'Fichier uploadé avec succès',
            'dataset': DataSetSerializer(dataset).data,
            'preview': df.head(10).to_dict('records')
        }

        return Response(response_data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({
            'status': 'error',
            'message': f'Erreur lors du traitement du fichier: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def dataset_preview(request, dataset_id):
    """Aperçu des données d'un dataset"""
    try:
        dataset = DataSet.objects.get(id=dataset_id)

        if dataset_id not in datasets_cache:
            return Response({
                'status': 'error',
                'message': 'Données non trouvées en cache'
            }, status=status.HTTP_404_NOT_FOUND)

        df = datasets_cache[dataset_id]['current']

        response_data = {
            'status': 'success',
            'data': {
                'rows': len(df),
                'columns': len(df.columns),
                'preview': df.head(20).to_dict('records'),
                'column_info': {
                    col: {
                        'type': str(df[col].dtype),
                        'missing': int(df[col].isnull().sum()),
                        'unique': int(df[col].nunique())
                    }
                    for col in df.columns
                }
            }
        }

        return Response(response_data)

    except DataSet.DoesNotExist:
        return Response({
            'status': 'error',
            'message': 'Dataset non trouvé'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'status': 'error',
            'message': f'Erreur lors de l\'aperçu: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def clean_dataset(request, dataset_id):
    """Nettoyage automatique des données d'un dataset"""
    try:
        dataset = DataSet.objects.get(id=dataset_id)

        if dataset_id not in datasets_cache:
            return Response({
                'status': 'error',
                'message': 'Données non trouvées en cache'
            }, status=status.HTTP_404_NOT_FOUND)

        df = datasets_cache[dataset_id]['current'].copy()
        cleaning_report = []
        operations_performed = []

        # 1. Supprimer les doublons
        duplicates_before = df.duplicated().sum()
        if duplicates_before > 0:
            df = df.drop_duplicates()
            operation_desc = f"Suppression de {duplicates_before} lignes dupliquées"
            cleaning_report.append(operation_desc)

            # Enregistrer l'opération
            CleaningOperation.objects.create(
                dataset=dataset,
                operation_type='remove_duplicates',
                description=operation_desc,
                affected_rows=duplicates_before
            )

        # 2. Traiter les valeurs manquantes
        for col in df.columns:
            missing_count = df[col].isnull().sum()
            if missing_count > 0:
                if df[col].dtype in ['int64', 'float64']:
                    # Pour les colonnes numériques, remplacer par la médiane
                    median_value = df[col].median()
                    df[col].fillna(median_value, inplace=True)
                    operation_desc = f"Colonne '{col}': {missing_count} valeurs manquantes remplacées par la médiane ({median_value})"
                    cleaning_report.append(operation_desc)

                    CleaningOperation.objects.create(
                        dataset=dataset,
                        operation_type='fill_missing_numeric',
                        column_name=col,
                        description=operation_desc,
                        affected_rows=missing_count
                    )
                else:
                    # Pour les colonnes texte, remplacer par le mode ou "Inconnu"
                    mode_value = df[col].mode()
                    if len(mode_value) > 0:
                        df[col].fillna(mode_value[0], inplace=True)
                        operation_desc = f"Colonne '{col}': {missing_count} valeurs manquantes remplacées par le mode ('{mode_value[0]}')"
                    else:
                        df[col].fillna("Inconnu", inplace=True)
                        operation_desc = f"Colonne '{col}': {missing_count} valeurs manquantes remplacées par 'Inconnu'"

                    cleaning_report.append(operation_desc)

                    CleaningOperation.objects.create(
                        dataset=dataset,
                        operation_type='fill_missing_text',
                        column_name=col,
                        description=operation_desc,
                        affected_rows=missing_count
                    )

        # 3. Normaliser les colonnes texte
        text_columns_normalized = 0
        for col in df.select_dtypes(include=['object']).columns:
            df[col] = df[col].astype(str).str.strip()
            text_columns_normalized += 1

        if text_columns_normalized > 0:
            operation_desc = f"Normalisation de {text_columns_normalized} colonnes texte (suppression des espaces)"
            cleaning_report.append(operation_desc)

            CleaningOperation.objects.create(
                dataset=dataset,
                operation_type='normalize_text',
                description=operation_desc,
                affected_rows=0
            )

        # Mettre à jour les données en cache
        datasets_cache[dataset_id]['current'] = df

        # Mettre à jour le dataset
        dataset.is_cleaned = True
        dataset.cleaning_report = cleaning_report
        dataset.rows_count = len(df)
        dataset.missing_values = {col: int(df[col].isnull().sum()) for col in df.columns}
        dataset.save()

        response_data = {
            'status': 'success',
            'message': 'Données nettoyées avec succès',
            'cleaning_report': cleaning_report,
            'data': {
                'rows': len(df),
                'columns': len(df.columns),
                'preview': df.head(10).to_dict('records')
            }
        }

        return Response(response_data)

    except DataSet.DoesNotExist:
        return Response({
            'status': 'error',
            'message': 'Dataset non trouvé'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'status': 'error',
            'message': f'Erreur lors du nettoyage: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
