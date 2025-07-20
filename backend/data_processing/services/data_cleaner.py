import pandas as pd
import numpy as np

class DataCleaner:
    def __init__(self, df):
        self.df = df
        self.cleaning_report = []
        
    def remove_duplicates(self):
        """Détecte et supprime les lignes dupliquées"""
        initial_rows = len(self.df)
        self.df = self.df.drop_duplicates()
        removed = initial_rows - len(self.df)
        if removed > 0:
            self.cleaning_report.append(f"Suppression de {removed} lignes dupliquées")
        return self
        
    def handle_missing_values(self, strategy='drop'):
        """Gère les valeurs manquantes selon différentes stratégies"""
        if strategy == 'drop':
            initial_rows = len(self.df)
            self.df = self.df.dropna()
            removed = initial_rows - len(self.df)
            if removed > 0:
                self.cleaning_report.append(f"Suppression de {removed} lignes avec valeurs manquantes")
        elif strategy == 'fill_mean':
            for col in self.df.select_dtypes(include=[np.number]).columns:
                missing = self.df[col].isna().sum()
                if missing > 0:
                    self.df[col] = self.df[col].fillna(self.df[col].mean())
                    self.cleaning_report.append(f"Colonne '{col}': {missing} valeurs manquantes remplacées par la moyenne")
        return self