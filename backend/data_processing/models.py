from django.db import models
from django.contrib.auth.models import User

class UploadedFile(models.Model):
    STATUS_CHOICES = [
        ('uploaded', 'Uploaded'),
        ('analyzing', 'Analyzing'),
        ('analyzed', 'Analyzed'),
        ('processing', 'Processing'),
        ('processed', 'Processed'),
        ('error', 'Error'),
    ]
    
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='uploads/')
    size = models.BigIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='uploaded')
    rows_count = models.IntegerField(null=True, blank=True)
    columns_count = models.IntegerField(null=True, blank=True)
    quality_score = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class DataQualityReport(models.Model):
    file = models.OneToOneField(UploadedFile, on_delete=models.CASCADE)
    missing_values = models.JSONField(default=dict)
    duplicates_count = models.IntegerField(default=0)
    data_types = models.JSONField(default=dict)
    statistics = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
