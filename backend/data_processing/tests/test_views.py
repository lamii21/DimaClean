from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from data_processing.models import DataSet
import os
import pandas as pd
import tempfile

class DataProcessingViewsTest(TestCase):
    def setUp(self):
        # Créer un utilisateur de test
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword123'
        )
        
        # Créer un client API
        self.client = APIClient()
        
        # Créer un fichier CSV temporaire pour les tests
        self.temp_csv = tempfile.NamedTemporaryFile(suffix='.csv', delete=False)
        self.temp_csv_path = self.temp_csv.name
        
        # Créer un DataFrame simple
        df = pd.DataFrame({
            'id': [1, 2, 3, 4, 5],
            'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
            'age': [25, 30, 35, 40, 45],
            'city': ['Paris', 'Lyon', 'Marseille', 'Lille', 'Bordeaux']
        })
        
        # Sauvegarder le DataFrame dans le fichier temporaire
        df.to_csv(self.temp_csv_path, index=False)
        self.temp_csv.close()
        
        # Créer un dataset de test
        self.dataset = DataSet.objects.create(
            user=self.user,
            filename='test_dataset.csv',
            original_filename='test_dataset.csv',
            file=self.temp_csv_path,
            file_size=os.path.getsize(self.temp_csv_path),
            rows_count=5,
            columns_count=4
        )
    
    def tearDown(self):
        # Supprimer le fichier temporaire
        if os.path.exists(self.temp_csv_path):
            os.unlink(self.temp_csv_path)
    
    def test_upload_csv(self):
        """Test d'upload d'un fichier CSV"""
        # Authentifier l'utilisateur
        self.client.force_authenticate(user=self.user)
        
        # Ouvrir le fichier pour l'upload
        with open(self.temp_csv_path, 'rb') as file:
            response = self.client.post(
                reverse('upload_csv'),
                {'file': file},
                format='multipart'
            )
        
        # Vérifier la réponse
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('dataset_id', response.data)
        
        # Vérifier que le dataset a été créé
        dataset_id = response.data['dataset_id']
        self.assertTrue(DataSet.objects.filter(id=dataset_id).exists())
    
    def test_preview_data(self):
        """Test de prévisualisation des données"""
        # Authentifier l'utilisateur
        self.client.force_authenticate(user=self.user)
        
        # Faire la requête
        response = self.client.get(
            reverse('preview_data', args=[self.dataset.id])
        )
        
        # Vérifier la réponse
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('preview', response.data)
        self.assertEqual(len(response.data['preview']), 5)  # 5 lignes
        self.assertEqual(len(response.data['preview'][0]), 4)  # 4 colonnes
    
    def test_clean_data(self):
        """Test de nettoyage des données"""
        # Authentifier l'utilisateur
        self.client.force_authenticate(user=self.user)
        
        # Faire la requête
        response = self.client.post(
            reverse('clean_data'),
            {
                'dataset_id': self.dataset.id,
                'strategies': {
                    'remove_duplicates': True,
                    'missing_values': 'drop'
                }
            },
            format='json'
        )
        
        # Vérifier la réponse
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('cleaning_report', response.data)
        self.assertIn('preview', response.data)