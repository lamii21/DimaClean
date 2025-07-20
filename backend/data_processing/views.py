from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
import json
import os
from .models import UploadedFile, DataQualityReport
from .services import DataProcessingService

@api_view(['GET'])
def api_info(request):
    """Informations sur l'API"""
    return Response({
        'message': 'DimaClean API v1.0',
        'status': 'active',
        'endpoints': {
            'upload': '/api/upload/',
            'files': '/api/files/',
            'dashboard': '/api/dashboard/stats/'
        }
    })

@api_view(['POST'])
def upload_file(request):
    """Upload d'un fichier CSV"""
    try:
        if 'file' not in request.FILES:
            return Response({'error': 'Aucun fichier fourni'}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES['file']
        
        if not file.name.endswith('.csv'):
            return Response({'error': 'Seuls les fichiers CSV sont acceptés'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Sauvegarder le fichier
        uploaded_file = UploadedFile.objects.create(
            name=file.name,
            file=file,
            size=file.size,
            status='uploaded'
        )
        
        return Response({
            'id': uploaded_file.id,
            'name': uploaded_file.name,
            'size': uploaded_file.size,
            'status': uploaded_file.status,
            'message': 'Fichier uploadé avec succès'
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def list_files(request):
    """Liste des fichiers uploadés"""
    files = UploadedFile.objects.all().order_by('-created_at')
    
    files_data = []
    for file in files:
        files_data.append({
            'id': file.id,
            'name': file.name,
            'size': file.size,
            'status': file.status,
            'rows_count': file.rows_count,
            'quality_score': file.quality_score,
            'created_at': file.created_at.isoformat()
        })
    
    return Response({
        'results': files_data,
        'count': len(files_data)
    })

@api_view(['GET'])
def file_detail(request, file_id):
    """Détails d'un fichier"""
    try:
        file = UploadedFile.objects.get(id=file_id)
        return Response({
            'id': file.id,
            'name': file.name,
            'size': file.size,
            'status': file.status,
            'rows_count': file.rows_count,
            'columns_count': file.columns_count,
            'quality_score': file.quality_score,
            'created_at': file.created_at.isoformat(),
            'updated_at': file.updated_at.isoformat()
        })
    except UploadedFile.DoesNotExist:
        return Response({'error': 'Fichier non trouvé'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def preview_data(request, file_id):
    """Prévisualisation des données"""
    try:
        file = UploadedFile.objects.get(id=file_id)
        limit = int(request.GET.get('limit', 100))
        
        file_path = file.file.path
        preview_data = DataProcessingService.get_preview_data(file_path, limit)
        
        return Response(preview_data)
        
    except UploadedFile.DoesNotExist:
        return Response({'error': 'Fichier non trouvé'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def analyze_data(request, file_id):
    """Analyser la qualité des données"""
    try:
        file = UploadedFile.objects.get(id=file_id)
        file.status = 'analyzing'
        file.save()
        
        file_path = file.file.path
        analysis = DataProcessingService.analyze_file(file_path)
        
        # Mettre à jour le fichier avec les résultats
        file.rows_count = analysis['rows_count']
        file.columns_count = analysis['columns_count']
        file.quality_score = analysis['quality_score']
        file.status = 'analyzed'
        file.save()
        
        # Créer ou mettre à jour le rapport de qualité
        report, created = DataQualityReport.objects.get_or_create(
            file=file,
            defaults={
                'missing_values': analysis['missing_values'],
                'duplicates_count': analysis['duplicates_count'],
                'data_types': analysis['data_types'],
                'statistics': analysis
            }
        )
        
        return Response(analysis)
        
    except UploadedFile.DoesNotExist:
        return Response({'error': 'Fichier non trouvé'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        file.status = 'error'
        file.save()
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def clean_data(request, file_id):
    """Nettoyer les données"""
    try:
        file = UploadedFile.objects.get(id=file_id)
        file.status = 'processing'
        file.save()
        
        options = request.data.get('options', {})
        file_path = file.file.path
        
        result = DataProcessingService.clean_data(file_path, options)
        
        file.status = 'processed'
        file.save()
        
        return Response({
            'task_id': f'task_{file_id}',
            'status': 'completed',
            'result': result
        })
        
    except UploadedFile.DoesNotExist:
        return Response({'error': 'Fichier non trouvé'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        file.status = 'error'
        file.save()
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def export_data(request, file_id):
    """Exporter les données nettoyées"""
    try:
        file = UploadedFile.objects.get(id=file_id)
        format_type = request.GET.get('format', 'csv')
        
        if format_type == 'csv':
            cleaned_file_path = file.file.path.replace('.csv', '_cleaned.csv')
            
            if os.path.exists(cleaned_file_path):
                with open(cleaned_file_path, 'rb') as f:
                    response = HttpResponse(f.read(), content_type='text/csv')
                    response['Content-Disposition'] = f'attachment; filename="{file.name}_cleaned.csv"'
                    return response
            else:
                return Response({'error': 'Fichier nettoyé non trouvé'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'error': 'Format non supporté'}, status=status.HTTP_400_BAD_REQUEST)
        
    except UploadedFile.DoesNotExist:
        return Response({'error': 'Fichier non trouvé'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def dashboard_stats(request):
    """Statistiques pour le dashboard"""
    try:
        total_files = UploadedFile.objects.count()
        processed_files = UploadedFile.objects.filter(status='processed').count()
        
        # Calculer les statistiques
        files = UploadedFile.objects.all()
        total_rows = sum(f.rows_count or 0 for f in files)
        avg_quality = sum(f.quality_score or 0 for f in files if f.quality_score) / max(1, len([f for f in files if f.quality_score]))
        
        return Response({
            'total_files': total_files,
            'processed_files': processed_files,
            'total_rows': total_rows,
            'average_quality': round(avg_quality, 1),
            'files_growth': 15,  # Mock data
            'rows_growth': 23,   # Mock data
            'quality_improvement': 8,  # Mock data
            'time_saved': 45,    # Mock data
            'time_saved_growth': 12  # Mock data
        })
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
