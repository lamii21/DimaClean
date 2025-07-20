import pandas as pd
import numpy as np
from django.core.files.storage import default_storage
import json
from typing import Dict, Any, List

class DataProcessingService:
    @staticmethod
    def analyze_file(file_path: str) -> Dict[str, Any]:
        """Analyser un fichier CSV et retourner les statistiques"""
        try:
            df = pd.read_csv(file_path)
            
            analysis = {
                'rows_count': len(df),
                'columns_count': len(df.columns),
                'columns': list(df.columns),
                'data_types': df.dtypes.astype(str).to_dict(),
                'missing_values': df.isnull().sum().to_dict(),
                'duplicates_count': df.duplicated().sum(),
                'memory_usage': df.memory_usage(deep=True).sum(),
                'sample_data': df.head(5).to_dict('records')
            }
            
            # Calculer le score de qualité
            total_cells = len(df) * len(df.columns)
            missing_cells = df.isnull().sum().sum()
            duplicate_rows = df.duplicated().sum()
            
            quality_score = max(0, 100 - (
                (missing_cells / total_cells * 50) + 
                (duplicate_rows / len(df) * 30)
            ))
            
            analysis['quality_score'] = round(quality_score, 2)
            
            return analysis
            
        except Exception as e:
            raise Exception(f"Erreur lors de l'analyse: {str(e)}")
    
    @staticmethod
    def clean_data(file_path: str, options: Dict[str, Any] = None) -> Dict[str, Any]:
        """Nettoyer les données selon les options spécifiées"""
        try:
            df = pd.read_csv(file_path)
            original_rows = len(df)
            cleaning_report = []
            
            if not options:
                options = {
                    'remove_duplicates': True,
                    'fill_missing_values': True,
                    'normalize_text': True
                }
            
            # Supprimer les doublons
            if options.get('remove_duplicates', True):
                duplicates_before = df.duplicated().sum()
                df = df.drop_duplicates()
                if duplicates_before > 0:
                    cleaning_report.append(f"Supprimé {duplicates_before} doublons")
            
            # Traiter les valeurs manquantes
            if options.get('fill_missing_values', True):
                for col in df.columns:
                    missing_count = df[col].isnull().sum()
                    if missing_count > 0:
                        if df[col].dtype in ['int64', 'float64']:
                            df[col].fillna(df[col].median(), inplace=True)
                            cleaning_report.append(f"Colonne '{col}': {missing_count} valeurs remplacées par la médiane")
                        else:
                            df[col].fillna('Inconnu', inplace=True)
                            cleaning_report.append(f"Colonne '{col}': {missing_count} valeurs remplacées par 'Inconnu'")
            
            # Normaliser le texte
            if options.get('normalize_text', True):
                for col in df.select_dtypes(include=['object']).columns:
                    df[col] = df[col].astype(str).str.strip()
            
            # Sauvegarder le fichier nettoyé
            cleaned_file_path = file_path.replace('.csv', '_cleaned.csv')
            df.to_csv(cleaned_file_path, index=False)
            
            return {
                'success': True,
                'original_rows': original_rows,
                'cleaned_rows': len(df),
                'rows_removed': original_rows - len(df),
                'cleaning_report': cleaning_report,
                'cleaned_file_path': cleaned_file_path,
                'sample_data': df.head(10).to_dict('records')
            }
            
        except Exception as e:
            raise Exception(f"Erreur lors du nettoyage: {str(e)}")
    
    @staticmethod
    def get_preview_data(file_path: str, limit: int = 100) -> Dict[str, Any]:
        """Obtenir un aperçu des données"""
        try:
            df = pd.read_csv(file_path, nrows=limit)
            
            return {
                'columns': list(df.columns),
                'data': df.to_dict('records'),
                'total_rows_preview': len(df),
                'data_types': df.dtypes.astype(str).to_dict()
            }
            
        except Exception as e:
            raise Exception(f"Erreur lors de la prévisualisation: {str(e)}")
