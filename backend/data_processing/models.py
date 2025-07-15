from django.db import models
import json

class DataSet(models.Model):
    """Modèle pour stocker les informations sur un dataset uploadé"""
    filename = models.CharField(max_length=255)
    original_filename = models.CharField(max_length=255)
    upload_date = models.DateTimeField(auto_now_add=True)
    file_size = models.IntegerField()
    rows_count = models.IntegerField()
    columns_count = models.IntegerField()
    column_names = models.JSONField()  # Liste des noms de colonnes
    data_types = models.JSONField()    # Types de données par colonne
    missing_values = models.JSONField() # Valeurs manquantes par colonne
    is_cleaned = models.BooleanField(default=False)
    cleaning_report = models.JSONField(null=True, blank=True)

    class Meta:
        ordering = ['-upload_date']

    def __str__(self):
        return f"{self.original_filename} - {self.upload_date.strftime('%Y-%m-%d %H:%M')}"

class CleaningOperation(models.Model):
    """Modèle pour enregistrer les opérations de nettoyage effectuées"""
    OPERATION_TYPES = [
        ('remove_duplicates', 'Suppression des doublons'),
        ('fill_missing_numeric', 'Remplissage valeurs manquantes numériques'),
        ('fill_missing_text', 'Remplissage valeurs manquantes texte'),
        ('normalize_text', 'Normalisation du texte'),
        ('remove_outliers', 'Suppression des outliers'),
    ]

    dataset = models.ForeignKey(DataSet, on_delete=models.CASCADE, related_name='operations')
    operation_type = models.CharField(max_length=50, choices=OPERATION_TYPES)
    column_name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField()
    affected_rows = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.get_operation_type_display()} - {self.dataset.original_filename}"
