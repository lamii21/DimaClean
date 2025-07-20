from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from io import BytesIO
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import base64

class ReportGenerator:
    def __init__(self, dataset, df):
        self.dataset = dataset
        self.df = df
        self.buffer = BytesIO()
        self.doc = SimpleDocTemplate(self.buffer, pagesize=letter)
        self.styles = getSampleStyleSheet()
        self.elements = []
        
    def add_title(self):
        """Ajoute un titre au rapport"""
        title_style = self.styles['Title']
        self.elements.append(Paragraph(f"Rapport d'Analyse: {self.dataset.original_filename}", title_style))
        self.elements.append(Spacer(1, 0.25*inch))
        return self
        
    def add_summary(self):
        """Ajoute un résumé des statistiques du dataset"""
        self.elements.append(Paragraph("Résumé des Données", self.styles['Heading2']))
        
        # Informations générales
        self.elements.append(Paragraph(f"Nombre de lignes: {len(self.df)}", self.styles['Normal']))
        self.elements.append(Paragraph(f"Nombre de colonnes: {len(self.df.columns)}", self.styles['Normal']))
        self.elements.append(Spacer(1, 0.1*inch))
        
        # Types de données
        self.elements.append(Paragraph("Types de données:", self.styles['Normal']))
        data_types = [[col, str(self.df[col].dtype)] for col in self.df.columns]
        table = Table([["Colonne", "Type"]] + data_types)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        self.elements.append(table)
        self.elements.append(Spacer(1, 0.2*inch))
        
        return self
        
    def add_data_preview(self, rows=5):
        """Ajoute un aperçu des données"""
        self.elements.append(Paragraph("Aperçu des Données", self.styles['Heading2']))
        
        # Convertir les premières lignes en liste pour le tableau
        preview_data = [self.df.columns.tolist()] + self.df.head(rows).values.tolist()
        
        # Créer le tableau
        table = Table(preview_data)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        self.elements.append(table)
        self.elements.append(Spacer(1, 0.2*inch))
        
        return self
        
    def add_chart(self, x_column, y_column, chart_type='bar'):
        """Ajoute un graphique au rapport"""
        self.elements.append(Paragraph(f"Visualisation: {y_column} par {x_column}", self.styles['Heading2']))
        
        # Créer une figure matplotlib
        plt.figure(figsize=(7, 4))
        
        if chart_type == 'bar':
            sns.barplot(x=x_column, y=y_column, data=self.df)
        elif chart_type == 'line':
            sns.lineplot(x=x_column, y=y_column, data=self.df)
        elif chart_type == 'scatter':
            sns.scatterplot(x=x_column, y=y_column, data=self.df)
        
        plt.title(f"{y_column} par {x_column}")
        plt.xticks(rotation=45)
        plt.tight_layout()
        
        # Sauvegarder l'image dans un buffer
        img_buffer = BytesIO()
        plt.savefig(img_buffer, format='png')
        img_buffer.seek(0)
        
        # Ajouter l'image au rapport
        img = Image(img_buffer, width=6*inch, height=3*inch)
        self.elements.append(img)
        self.elements.append(Spacer(1, 0.2*inch))
        
        plt.close()
        return self
        
    def generate(self):
        """Génère le rapport PDF final"""
        self.doc.build(self.elements)
        self.buffer.seek(0)
        return self.buffer