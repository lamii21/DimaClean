from rest_framework import serializers
from .models import DataSet, CleaningOperation

class DataSetSerializer(serializers.ModelSerializer):
    """Serializer pour le modèle DataSet"""
    
    class Meta:
        model = DataSet
        fields = [
            'id', 'filename', 'original_filename', 'upload_date',
            'file_size', 'rows_count', 'columns_count', 'column_names',
            'data_types', 'missing_values', 'is_cleaned', 'cleaning_report'
        ]
        read_only_fields = ['id', 'upload_date']

class CleaningOperationSerializer(serializers.ModelSerializer):
    """Serializer pour le modèle CleaningOperation"""
    
    class Meta:
        model = CleaningOperation
        fields = [
            'id', 'operation_type', 'column_name', 'description',
            'affected_rows', 'timestamp'
        ]
        read_only_fields = ['id', 'timestamp']

class FileUploadSerializer(serializers.Serializer):
    """Serializer pour l'upload de fichiers CSV"""
    file = serializers.FileField()
    
    def validate_file(self, value):
        """Validation du fichier uploadé"""
        if not value.name.endswith('.csv'):
            raise serializers.ValidationError("Seuls les fichiers CSV sont acceptés.")
        
        # Vérifier la taille du fichier (max 10MB)
        if value.size > 10 * 1024 * 1024:
            raise serializers.ValidationError("Le fichier ne peut pas dépasser 10MB.")
        
        return value

class DataPreviewSerializer(serializers.Serializer):
    """Serializer pour l'aperçu des données"""
    rows = serializers.IntegerField()
    columns = serializers.IntegerField()
    preview = serializers.ListField()
    column_info = serializers.DictField()

class CleaningRequestSerializer(serializers.Serializer):
    """Serializer pour les requêtes de nettoyage"""
    dataset_id = serializers.IntegerField()
    operations = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        default=['remove_duplicates', 'fill_missing_values', 'normalize_text']
    )

class StatisticsSerializer(serializers.Serializer):
    """Serializer pour les statistiques des données"""
    dataset_id = serializers.IntegerField()
    basic_stats = serializers.DictField()
    column_stats = serializers.DictField()
    missing_data_report = serializers.DictField()
    data_quality_score = serializers.FloatField()
