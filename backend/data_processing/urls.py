from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_info, name='api_info'),
    path('upload/', views.upload_file, name='upload_file'),
    path('files/', views.list_files, name='list_files'),
    path('files/<int:file_id>/', views.file_detail, name='file_detail'),
    path('files/<int:file_id>/preview/', views.preview_data, name='preview_data'),
    path('files/<int:file_id>/analyze/', views.analyze_data, name='analyze_data'),
    path('files/<int:file_id>/clean/', views.clean_data, name='clean_data'),
    path('files/<int:file_id>/export/', views.export_data, name='export_data'),
    path('dashboard/stats/', views.dashboard_stats, name='dashboard_stats'),
]

