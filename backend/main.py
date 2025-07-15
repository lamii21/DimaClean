from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pandas as pd
import numpy as np
import io
import json
from typing import Dict, Any, List
import uvicorn

# Créer l'instance FastAPI
app = FastAPI(
    title="DimaClean API",
    description="API pour le nettoyage et la visualisation de données CSV",
    version="1.0.0"
)

# Configuration CORS pour permettre les requêtes depuis le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL du frontend React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Variable globale pour stocker les données (en production, utiliser une base de données)
current_data = None
original_data = None

@app.get("/")
async def root():
    """Point d'entrée de l'API"""
    return {
        "message": "Bienvenue sur DimaClean API",
        "version": "1.0.0",
        "endpoints": {
            "upload": "/upload",
            "preview": "/preview",
            "clean": "/clean",
            "statistics": "/statistics",
            "export": "/export"
        }
    }

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload et analyse d'un fichier CSV"""
    global current_data, original_data
    
    try:
        # Vérifier le type de fichier
        if not file.filename.endswith('.csv'):
            raise HTTPException(status_code=400, detail="Seuls les fichiers CSV sont acceptés")
        
        # Lire le contenu du fichier
        content = await file.read()
        
        # Convertir en DataFrame pandas
        df = pd.read_csv(io.StringIO(content.decode('utf-8')))
        
        # Stocker les données
        current_data = df.copy()
        original_data = df.copy()
        
        # Informations sur le dataset
        info = {
            "filename": file.filename,
            "rows": len(df),
            "columns": len(df.columns),
            "column_names": df.columns.tolist(),
            "data_types": df.dtypes.astype(str).to_dict(),
            "missing_values": df.isnull().sum().to_dict(),
            "preview": df.head(10).to_dict('records')
        }
        
        return JSONResponse(content={
            "status": "success",
            "message": "Fichier uploadé avec succès",
            "data": info
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors du traitement du fichier: {str(e)}")

@app.get("/preview")
async def preview_data():
    """Aperçu des données actuelles"""
    global current_data
    
    if current_data is None:
        raise HTTPException(status_code=404, detail="Aucun fichier n'a été uploadé")
    
    try:
        return JSONResponse(content={
            "status": "success",
            "data": {
                "rows": len(current_data),
                "columns": len(current_data.columns),
                "preview": current_data.head(20).to_dict('records'),
                "column_info": {
                    col: {
                        "type": str(current_data[col].dtype),
                        "missing": int(current_data[col].isnull().sum()),
                        "unique": int(current_data[col].nunique())
                    }
                    for col in current_data.columns
                }
            }
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'aperçu: {str(e)}")

@app.post("/clean")
async def clean_data():
    """Nettoyage automatique des données"""
    global current_data
    
    if current_data is None:
        raise HTTPException(status_code=404, detail="Aucun fichier n'a été uploadé")
    
    try:
        df = current_data.copy()
        cleaning_report = []
        
        # 1. Supprimer les doublons
        duplicates_before = df.duplicated().sum()
        df = df.drop_duplicates()
        if duplicates_before > 0:
            cleaning_report.append(f"Suppression de {duplicates_before} lignes dupliquées")
        
        # 2. Traiter les valeurs manquantes
        for col in df.columns:
            missing_count = df[col].isnull().sum()
            if missing_count > 0:
                if df[col].dtype in ['int64', 'float64']:
                    # Pour les colonnes numériques, remplacer par la médiane
                    df[col].fillna(df[col].median(), inplace=True)
                    cleaning_report.append(f"Colonne '{col}': {missing_count} valeurs manquantes remplacées par la médiane")
                else:
                    # Pour les colonnes texte, remplacer par le mode ou "Inconnu"
                    mode_value = df[col].mode()
                    if len(mode_value) > 0:
                        df[col].fillna(mode_value[0], inplace=True)
                        cleaning_report.append(f"Colonne '{col}': {missing_count} valeurs manquantes remplacées par le mode")
                    else:
                        df[col].fillna("Inconnu", inplace=True)
                        cleaning_report.append(f"Colonne '{col}': {missing_count} valeurs manquantes remplacées par 'Inconnu'")
        
        # 3. Normaliser les colonnes texte (supprimer espaces en début/fin)
        for col in df.select_dtypes(include=['object']).columns:
            df[col] = df[col].astype(str).str.strip()
        
        # Mettre à jour les données actuelles
        current_data = df
        
        return JSONResponse(content={
            "status": "success",
            "message": "Données nettoyées avec succès",
            "cleaning_report": cleaning_report,
            "data": {
                "rows": len(df),
                "columns": len(df.columns),
                "preview": df.head(10).to_dict('records')
            }
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors du nettoyage: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
