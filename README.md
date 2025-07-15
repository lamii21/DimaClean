# DimaClean - Application Web de Nettoyage et Visualisation de Données

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/lamii21/DimaCleam)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-5.2.4-green)](https://djangoproject.com/)
[![DRF](https://img.shields.io/badge/DRF-3.16.0-orange)](https://django-rest-framework.org/)
[![Python](https://img.shields.io/badge/Python-3.12-yellow)](https://python.org/)

## 📋 Description
DimaClean est une application web moderne permettant d'importer, nettoyer, visualiser et exporter des fichiers CSV avec une interface intuitive.

**Projet de stage - 1 mois**
**Développeur :** Lamiae El Jabri
**Formation :** 3ème année Génie Informatique - EMSI

## 🏗️ Architecture du Projet
```
DimaClean/
├── frontend/          # Application React.js
├── backend/           # API Python (Django)
├── docs/             # Documentation
├── samples/          # Fichiers CSV d'exemple
└── README.md         # Ce fichier
```

## 🚀 Fonctionnalités Principales
- ✅ Import de fichiers CSV
- ✅ Nettoyage automatique des données
- ✅ Visualisation interactive des données
- ✅ Génération de statistiques
- ✅ Export CSV nettoyé
- ✅ Génération de rapports PDF

## 🛠️ Stack Technique
- **Frontend**: React.js + Create React App + Tailwind CSS
- **Backend**: Python + Django + Django REST Framework
- **Base de données**: SQLite (développement)
- **Traitement**: Pandas + NumPy
- **Visualisation**: Chart.js/Recharts
- **Rapports**: ReportLab/FPDF

## 📦 Installation

### Prérequis
- Node.js (v18+) ✅ v22.13.0 installé
- Python (v3.8+) ✅ v3.12.10 installé
- Git ✅ v2.47.1 installé

### Installation Frontend
```bash
cd frontend
npm install
npm start
```

### Installation Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

## 🌐 URLs de l'application
- **Frontend React :** http://localhost:3000
- **Backend API :** http://localhost:8000
- **Documentation API :** http://localhost:8000/docs

## � API Endpoints

### Endpoints disponibles :
- `GET /` - Informations sur l'API
- `POST /upload` - Upload d'un fichier CSV
- `GET /preview` - Aperçu des données actuelles
- `POST /clean` - Nettoyage automatique des données

### Exemple d'utilisation :
```bash
# Test de l'API
curl http://localhost:8000

# Upload d'un fichier (avec un client HTTP)
curl -X POST -F "file=@samples/exemple_donnees.csv" http://localhost:8000/upload
```

## 📁 Fichier d'exemple
Un fichier CSV d'exemple est disponible dans `samples/exemple_donnees.csv` pour tester l'application.

## �👨‍💻 Développement
- **Stagiaire**: Lamiae El Jabri
- **Formation**: 3ème année Génie Informatique - EMSI
- **Durée**: 1 mois

## 📄 Licence
Ce projet est développé dans le cadre d'un stage académique.
