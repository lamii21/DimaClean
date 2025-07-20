# 🎨 DIAGRAMMES UML SIMPLIFIÉS - DIMACLEAN

## 📋 VERSION SIMPLIFIÉE POUR RAPPORT DE STAGE

Ces diagrammes sont épurés et se concentrent sur l'essentiel pour une meilleure compréhension.

---

## 1. 📊 DIAGRAMME DE CAS D'USAGE SIMPLIFIÉ

```plantuml
@startuml CasUsage_DimaClean_Simple
!theme aws-orange

skinparam usecase {
  BackgroundColor #FFF3E0
  BorderColor #F57C00
  FontSize 12
}

actor "Utilisateur" as User
actor "Administrateur" as Admin

rectangle "DimaClean" {
  
  usecase "Importer CSV" as UC1
  usecase "Nettoyer Données" as UC2
  usecase "Visualiser Données" as UC3
  usecase "Exporter Résultats" as UC4
  usecase "Gérer Utilisateurs" as UC5
  
}

User --> UC1
User --> UC2
User --> UC3
User --> UC4

Admin --> UC5
Admin --> UC1
Admin --> UC2
Admin --> UC3
Admin --> UC4

UC1 ..> UC2 : <<inclut>>
UC3 ..> UC4 : <<étend>>

note right of UC2
  Nettoyage automatique :
  - Suppression doublons
  - Valeurs manquantes
  - Normalisation
end note

@enduml
```

---

## 2. 🏗️ DIAGRAMME DE CLASSES SIMPLIFIÉ

```plantuml
@startuml Classes_DimaClean_Simple
!theme aws-orange

skinparam class {
  BackgroundColor #FFF8E1
  BorderColor #F57C00
  FontSize 12
  FontStyle bold
}

' Classes principales
class Utilisateur {
  +identifiant: UUID
  +email: Chaîne
  +nom_complet: Chaîne
  +role: RoleUtilisateur
  --
  +authentifier(): Booléen
  +obtenir_jeux_donnees(): Liste
}

class JeuDonnees {
  +identifiant: UUID
  +nom_fichier: Chaîne
  +taille_fichier: Entier
  +nombre_lignes: Entier
  +statut: StatutJeu
  +date_creation: DateHeure
  --
  +importer_csv(): Booléen
  +nettoyer_donnees(): Booléen
  +exporter_csv(): Chaîne
}

class TacheNettoyage {
  +identifiant: UUID
  +type_operations: Liste
  +progression: Réel
  +statut: StatutTache
  --
  +executer(): Booléen
  +obtenir_rapport(): Rapport
}

class Visualisation {
  +identifiant: UUID
  +titre: Chaîne
  +type_graphique: TypeGraphique
  --
  +generer_graphique(): Image
  +exporter_pdf(): Fichier
}

' Services
class ServiceNettoyage {
  +nettoyer_doublons(): Booléen
  +traiter_valeurs_manquantes(): Booléen
  +normaliser_texte(): Booléen
}

class ServiceVisualisation {
  +creer_graphique(): Visualisation
  +generer_rapport_pdf(): Fichier
}

' Relations
Utilisateur ||--o{ JeuDonnees : possède
JeuDonnees ||--o{ TacheNettoyage : nettoie_avec
JeuDonnees ||--o{ Visualisation : visualise_par
TacheNettoyage --> ServiceNettoyage : utilise
Visualisation --> ServiceVisualisation : utilise

@enduml
```

---

## 3. 🔄 DIAGRAMME DE SÉQUENCE SIMPLIFIÉ

```plantuml
@startuml Sequence_DimaClean_Simple
!theme aws-orange

actor Utilisateur
participant "Interface Web" as Interface
participant "API Backend" as API
participant "Service Données" as Service

== Import et Nettoyage ==

Utilisateur -> Interface: Upload fichier CSV
Interface -> API: POST /upload
API -> Service: traiter_fichier()
Service -> Service: analyser_donnees()
Service --> API: résultat_analyse
API --> Interface: aperçu + statistiques
Interface --> Utilisateur: afficher_aperçu()

Utilisateur -> Interface: configurer_nettoyage()
Interface -> API: POST /nettoyer
API -> Service: nettoyer_donnees()
Service -> Service: appliquer_algorithmes()
Service --> API: données_nettoyées
API --> Interface: résultats_nettoyage
Interface --> Utilisateur: afficher_résultats()

== Export ==

Utilisateur -> Interface: demander_export()
Interface -> API: GET /export
API -> Service: generer_fichier()
Service --> API: fichier_csv
API --> Interface: lien_telechargement
Interface --> Utilisateur: telecharger_fichier()

@enduml
```

---

## 4. ⚡ DIAGRAMME D'ACTIVITÉ SIMPLIFIÉ

```plantuml
@startuml Activite_DimaClean_Simple
!theme aws-orange

start

:Upload fichier CSV;

if (Fichier valide ?) then (oui)
  :Analyser données;
  :Afficher aperçu;
  :Configurer nettoyage;
  
  fork
    :Supprimer doublons;
  fork again
    :Traiter valeurs manquantes;
  fork again
    :Normaliser texte;
  end fork
  
  :Générer rapport;
  :Afficher résultats;
  
  if (Satisfait ?) then (oui)
    :Exporter données;
    stop
  else (non)
    backward :Reconfigurer;
  endif
  
else (non)
  :Afficher erreur;
  stop
endif

@enduml
```

---

## 5. 🏢 DIAGRAMME DE DÉPLOIEMENT SIMPLIFIÉ

```plantuml
@startuml Deploiement_DimaClean_Simple
!theme aws-orange

node "Navigateur" {
  component "React App" as React
}

node "Serveur Web" {
  component "Django API" as Django
  component "Pandas Engine" as Pandas
}

node "Base de Données" {
  database "PostgreSQL" as DB
}

node "Cache" {
  database "Redis" as Cache
}

React --> Django : HTTPS
Django --> Pandas : Traitement
Django --> DB : Données
Django --> Cache : Session

@enduml
```

---

## 6. 🔄 DIAGRAMME D'ÉTAT SIMPLIFIÉ

```plantuml
@startuml Etat_DimaClean_Simple
!theme aws-orange

[*] --> Nouveau

Nouveau --> Analyse : upload_fichier()
Analyse --> Pret : analyse_terminee()
Pret --> Nettoyage : lancer_nettoyage()
Nettoyage --> Nettoye : nettoyage_termine()
Nettoye --> Export : demander_export()
Export --> [*] : fichier_exporte()

Analyse --> [*] : erreur_fichier()
Nettoyage --> Pret : erreur_nettoyage()

@enduml
```

---

## 📋 AVANTAGES DE LA VERSION SIMPLIFIÉE

### ✅ **Plus Lisible**
- Moins d'attributs et méthodes
- Focus sur l'essentiel
- Diagrammes plus clairs

### ✅ **Mieux pour Présentation**
- Compréhension rapide
- Explications facilitées
- Moins de surcharge visuelle

### ✅ **Adapté au Rapport de Stage**
- Niveau de détail approprié
- Concepts principaux mis en avant
- Facilite la compréhension du jury

### 🎯 **Utilisation Recommandée**
- **Présentation orale** : Version simplifiée
- **Rapport technique** : Version détaillée en annexe
- **Documentation utilisateur** : Version simplifiée
- **Documentation développeur** : Version détaillée

---

## 🚀 COMMENT UTILISER

1. **Copiez le code PlantUML** de votre choix
2. **Générez l'image** avec PlantUML Online
3. **Intégrez dans votre rapport** de stage
4. **Utilisez pour expliquer** à votre encadrant

Ces diagrammes simplifiés sont parfaits pour votre soutenance et votre rapport de stage ! 🎯
