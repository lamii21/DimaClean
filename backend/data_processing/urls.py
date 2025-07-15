from django.urls import path, include
from . import views

urlpatterns = [
    # API endpoints
    path('', views.api_root, name='api-root'),
    path('upload/', views.upload_file, name='upload-file'),
    path('datasets/<int:dataset_id>/preview/', views.dataset_preview, name='dataset-preview'),
    path('datasets/<int:dataset_id>/clean/', views.clean_dataset, name='clean-dataset'),
]
