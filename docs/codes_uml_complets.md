# 🎨 CODES UML COMPLETS EN FRANÇAIS - DIMACLEAN

## 📋 GUIDE D'UTILISATION

### **Outils Recommandés :**
- **PlantUML Online** : http://www.plantuml.com/plantuml/uml/
- **VS Code Extension** : PlantUML (jebbs.plantuml)
- **Draw.io** : https://app.diagrams.net/ (import PlantUML)

### **Instructions :**
1. Copiez le code PlantUML souhaité
2. Collez-le dans votre outil PlantUML
3. Générez le diagramme (PNG, SVG, PDF)
4. Intégrez dans votre rapport de stage

---

## 1. 📊 DIAGRAMME DE CAS D'USAGE

```plantuml
@startuml DiagrammeCasUsage_DimaClean
!theme aws-orange
!define RECTANGLE_COLOR #E3F2FD
!define ACTOR_COLOR #1976D2

skinparam actor {
  BackgroundColor ACTOR_COLOR
  BorderColor #0D47A1
  FontColor white
  FontStyle bold
}

skinparam usecase {
  BackgroundColor #FFF3E0
  BorderColor #F57C00
  FontSize 11
}

skinparam package {
  BackgroundColor RECTANGLE_COLOR
  BorderColor #1976D2
  FontStyle bold
}

left to right direction

actor "Utilisateur\nStandard" as UtilisateurStandard
actor "Administrateur\nSystème" as AdminSysteme

rectangle "Système DimaClean" {
  
  package "Gestion des Fichiers" {
    usecase "Importer Fichier\nCSV" as UC01
    usecase "Prévisualiser\nDonnées" as UC02
    usecase "Gérer Liste\nFichiers" as UC03
    usecase "Supprimer\nFichier" as UC04
  }
  
  package "Traitement des Données" {
    usecase "Nettoyer\nDonnées" as UC05
    usecase "Transformer\nDonnées" as UC06
    usecase "Calculer\nStatistiques" as UC07
    usecase "Détecter\nDoublons" as UC08
    usecase "Gérer Valeurs\nManquantes" as UC09
  }
  
  package "Visualisation" {
    usecase "Créer\nGraphiques" as UC10
    usecase "Personnaliser\nTableau de Bord" as UC11
    usecase "Exporter\nVisualisations" as UC12
    usecase "Configurer\nAffichage" as UC13
  }
  
  package "Export et Rapports" {
    usecase "Exporter CSV\nNettoyé" as UC14
    usecase "Générer Rapport\nPDF" as UC15
    usecase "Télécharger\nRésultats" as UC16
  }
  
  package "Administration" {
    usecase "Gérer Comptes\nUtilisateurs" as UC17
    usecase "Superviser\nActivité Système" as UC18
    usecase "Consulter Journaux\nAudit" as UC19
    usecase "Configurer\nParamètres" as UC20
  }
  
  package "Authentification" {
    usecase "Se Connecter\nau Système" as UC21
    usecase "Gérer Profil\nUtilisateur" as UC22
    usecase "Changer Mot\nde Passe" as UC23
  }
}

' Relations Utilisateur Standard
UtilisateurStandard --> UC01
UtilisateurStandard --> UC02
UtilisateurStandard --> UC03
UtilisateurStandard --> UC04
UtilisateurStandard --> UC05
UtilisateurStandard --> UC06
UtilisateurStandard --> UC07
UtilisateurStandard --> UC08
UtilisateurStandard --> UC09
UtilisateurStandard --> UC10
UtilisateurStandard --> UC11
UtilisateurStandard --> UC12
UtilisateurStandard --> UC13
UtilisateurStandard --> UC14
UtilisateurStandard --> UC15
UtilisateurStandard --> UC16
UtilisateurStandard --> UC21
UtilisateurStandard --> UC22
UtilisateurStandard --> UC23

' Relations Administrateur
AdminSysteme --> UC17
AdminSysteme --> UC18
AdminSysteme --> UC19
AdminSysteme --> UC20
AdminSysteme --> UC21
AdminSysteme --> UC22
AdminSysteme --> UC23

' Extensions et Inclusions
UC01 ..> UC02 : <<inclut>>
UC05 ..> UC08 : <<inclut>>
UC05 ..> UC09 : <<inclut>>
UC05 ..> UC07 : <<inclut>>
UC10 ..> UC11 : <<étend>>
UC15 ..> UC07 : <<inclut>>
UC22 ..> UC23 : <<étend>>

' Notes explicatives
note right of UC05
  Nettoyage automatique inclut :
  - Suppression des doublons
  - Traitement valeurs manquantes
  - Normalisation des formats
  - Détection des aberrations
end note

note right of UC10
  Types de graphiques supportés :
  - Histogrammes
  - Graphiques en courbes
  - Diagrammes circulaires
  - Boîtes à moustaches
  - Nuages de points
end note

note bottom of UC17
  Gestion utilisateurs :
  - Création de comptes
  - Modification des droits
  - Désactivation/Suppression
  - Réinitialisation mots de passe
end note

@enduml
```

---

## 2. 🏗️ DIAGRAMME DE CLASSES (PARTIE 1/2)

```plantuml
@startuml DiagrammeClasses_DimaClean_Partie1
!theme aws-orange

skinparam class {
  BackgroundColor #FFF8E1
  BorderColor #F57C00
  FontSize 10
  AttributeFontSize 9
  FontStyle bold
}

skinparam enum {
  BackgroundColor #E8F5E8
  BorderColor #4CAF50
  FontSize 9
}

package "Modèles de Données Principaux" {
  
  class Utilisateur {
    +identifiant: UUID
    +adresse_email: Chaîne
    +mot_de_passe_hache: Chaîne
    +prenom: Chaîne
    +nom: Chaîne
    +role: RoleUtilisateur
    +date_creation: DateHeure
    +est_actif: Booléen
    --
    +authentifier(mot_de_passe): Booléen
    +changer_mot_de_passe(nouveau_mdp): Booléen
    +obtenir_jeux_donnees(): Liste<JeuDonnees>
    +obtenir_tableaux_bord(): Liste<TableauBord>
  }
  
  enum RoleUtilisateur {
    ADMINISTRATEUR
    UTILISATEUR_STANDARD
    OBSERVATEUR
  }
  
  class JeuDonnees {
    +identifiant: UUID
    +identifiant_utilisateur: UUID
    +nom_fichier: Chaîne
    +nom_fichier_original: Chaîne
    +chemin_fichier: Chaîne
    +empreinte_fichier: Chaîne
    +taille_fichier: Entier
    +nombre_lignes: Entier
    +nombre_colonnes: Entier
    +schema_donnees: JSON
    +metadonnees: JSON
    +statut: StatutJeuDonnees
    +date_creation: DateHeure
    +date_modification: DateHeure
    --
    +valider_fichier(): Booléen
    +analyser_qualite(): RapportQualite
    +obtenir_apercu(limite): TableauDonnees
    +exporter_csv(): Chaîne
    +calculer_statistiques(): StatistiquesDonnees
  }
  
  enum StatutJeuDonnees {
    TELECHARGE
    EN_ANALYSE
    PRET
    EN_NETTOYAGE
    NETTOYE
    ERREUR
  }
  
  class TacheNettoyage {
    +identifiant: UUID
    +identifiant_jeu_donnees: UUID
    +configuration: JSON
    +statut: StatutTache
    +progression: Réel
    +date_debut: DateHeure
    +date_fin: DateHeure
    +message_erreur: Chaîne
    --
    +executer(): ResultatNettoyage
    +obtenir_progression(): Réel
    +annuler(): Booléen
    +reprendre(): Booléen
  }
  
  enum StatutTache {
    EN_ATTENTE
    EN_COURS
    TERMINEE
    ECHOUEE
    ANNULEE
  }
}

' Relations de base
Utilisateur ||--o{ JeuDonnees : possède
JeuDonnees ||--o{ TacheNettoyage : traite

@enduml
```

---

## 3. 🏗️ DIAGRAMME DE CLASSES (PARTIE 2/2)

```plantuml
@startuml DiagrammeClasses_DimaClean_Partie2
!theme aws-orange

skinparam class {
  BackgroundColor #FFF8E1
  BorderColor #F57C00
  FontSize 10
  AttributeFontSize 9
  FontStyle bold
}

package "Modèles Complémentaires" {
  
  class OperationNettoyage {
    +identifiant: UUID
    +identifiant_tache: UUID
    +type_operation: TypeOperation
    +nom_colonne: Chaîne
    +parametres: JSON
    +resultats: JSON
    +lignes_affectees: Entier
    +temps_execution: Réel
    +date_execution: DateHeure
    --
    +executer(tableau_donnees): TableauDonnees
    +valider_parametres(): Booléen
    +obtenir_resume(): Chaîne
    +annuler_operation(): Booléen
  }
  
  enum TypeOperation {
    SUPPRIMER_DOUBLONS
    TRAITER_VALEURS_MANQUANTES
    NORMALISER_TEXTE
    DETECTER_ABERRATIONS
    TRANSFORMER_COLONNE
    FILTRER_LIGNES
    CONVERTIR_TYPES
  }
  
  class Visualisation {
    +identifiant: UUID
    +identifiant_jeu_donnees: UUID
    +identifiant_utilisateur: UUID
    +titre: Chaîne
    +type_graphique: TypeGraphique
    +configuration: JSON
    +date_creation: DateHeure
    +date_modification: DateHeure
    --
    +generer_rendu(): DonneesGraphique
    +exporter_image(format): TableauOctets
    +cloner(): Visualisation
    +mettre_a_jour_config(config): Booléen
  }
  
  enum TypeGraphique {
    HISTOGRAMME
    GRAPHIQUE_COURBES
    DIAGRAMME_CIRCULAIRE
    NUAGE_POINTS
    BOITE_MOUSTACHES
    CARTE_CHALEUR
    GRAPHIQUE_BARRES
  }
  
  class TableauBord {
    +identifiant: UUID
    +identifiant_utilisateur: UUID
    +nom: Chaîne
    +disposition: JSON
    +est_public: Booléen
    +date_creation: DateHeure
    +date_modification: DateHeure
    --
    +ajouter_visualisation(viz): Booléen
    +supprimer_visualisation(id_viz): Booléen
    +exporter_pdf(): TableauOctets
    +partager_avec_utilisateur(id_user): Booléen
  }
  
  class JournalAudit {
    +identifiant: UUID
    +identifiant_utilisateur: UUID
    +action: Chaîne
    +type_ressource: Chaîne
    +identifiant_ressource: UUID
    +modifications: JSON
    +adresse_ip: Chaîne
    +agent_utilisateur: Chaîne
    +horodatage: DateHeure
    --
    +enregistrer_action(action, ressource): Booléen
    +obtenir_historique(utilisateur): Liste<JournalAudit>
  }
}

@enduml
```

---

## 4. 🔄 DIAGRAMME DE SÉQUENCE - TÉLÉCHARGEMENT ET NETTOYAGE

```plantuml
@startuml DiagrammeSequence_TelechargerNettoyer
!theme aws-orange

skinparam participant {
  BackgroundColor #E3F2FD
  BorderColor #1976D2
  FontStyle bold
}

skinparam actor {
  BackgroundColor #FFF3E0
  BorderColor #F57C00
}

actor "Utilisateur" as Utilisateur
participant "Interface\nReact" as InterfaceReact
participant "API\nDjango" as APIDjango
participant "Service Traitement\nDonnées" as ServiceTraitement
participant "Moteur\nNettoyage" as MoteurNettoyage
participant "Base de\nDonnées" as BaseDonnees
participant "Cache\nRedis" as CacheRedis

== Phase 1: Téléchargement du fichier ==

Utilisateur -> InterfaceReact: Sélectionne fichier CSV
activate InterfaceReact

InterfaceReact -> InterfaceReact: Validation côté client\n(taille, format, extension)
note right: Vérifications :\n- Taille < 100MB\n- Extension .csv\n- Type MIME correct

InterfaceReact -> APIDjango: POST /api/telecharger-fichier/\n(multipart/form-data)
activate APIDjango

APIDjango -> ServiceTraitement: traiter_fichier_telecharge(fichier)
activate ServiceTraitement

ServiceTraitement -> ServiceTraitement: valider_fichier(fichier)
note right: Validations sécurité :\n- Signature fichier\n- Contenu malveillant\n- Encodage supporté

ServiceTraitement -> ServiceTraitement: analyser_fichier_csv(fichier)
note right: Analyse automatique :\n- Détection délimiteur\n- Types de colonnes\n- Encodage caractères

ServiceTraitement -> ServiceTraitement: analyser_qualite_donnees(donnees)
note right: Métriques qualité :\n- Valeurs manquantes\n- Doublons potentiels\n- Cohérence types

ServiceTraitement -> BaseDonnees: creer_enregistrement_jeu_donnees()
activate BaseDonnees
BaseDonnees --> ServiceTraitement: identifiant_jeu_donnees
deactivate BaseDonnees

ServiceTraitement -> CacheRedis: mettre_en_cache_donnees(id_jeu, donnees)
activate CacheRedis
CacheRedis --> ServiceTraitement: succès
deactivate CacheRedis

ServiceTraitement --> APIDjango: ResultatService(jeu_donnees, analyse, apercu)
deactivate ServiceTraitement

APIDjango --> InterfaceReact: Réponse JSON\n(infos jeu + aperçu + statistiques)
deactivate APIDjango

InterfaceReact --> Utilisateur: Affiche aperçu données\net métriques de qualité
deactivate InterfaceReact

== Phase 2: Configuration et lancement du nettoyage ==

Utilisateur -> InterfaceReact: Configure options\nde nettoyage
activate InterfaceReact
note right: Options disponibles :\n- Supprimer doublons\n- Traiter valeurs manquantes\n- Normaliser texte\n- Détecter aberrations

InterfaceReact -> InterfaceReact: Valider configuration\nutilisateur

InterfaceReact -> APIDjango: POST /api/jeux-donnees/{id}/nettoyer/\n(configuration_nettoyage)
activate APIDjango

APIDjango -> ServiceTraitement: nettoyer_jeu_donnees(id_jeu, configuration)
activate ServiceTraitement

ServiceTraitement -> BaseDonnees: obtenir_jeu_donnees(id_jeu)
activate BaseDonnees
BaseDonnees --> ServiceTraitement: jeu_donnees
deactivate BaseDonnees

ServiceTraitement -> CacheRedis: obtenir_donnees_mises_en_cache(id_jeu)
activate CacheRedis
CacheRedis --> ServiceTraitement: tableau_donnees
deactivate CacheRedis

ServiceTraitement -> MoteurNettoyage: nettoyer_donnees(tableau_donnees, configuration)
activate MoteurNettoyage

loop Pour chaque opération de nettoyage configurée
    MoteurNettoyage -> MoteurNettoyage: executer_strategie(operation)
    note right: Stratégies appliquées :\n- Suppression doublons\n- Remplacement valeurs manquantes\n- Normalisation texte\n- Limitation aberrations

    MoteurNettoyage -> BaseDonnees: enregistrer_operation_nettoyage()
    activate BaseDonnees
    BaseDonnees --> MoteurNettoyage: succès
    deactivate BaseDonnees
end

MoteurNettoyage --> ServiceTraitement: ResultatNettoyage\n(donnees_nettoyees, journal_operations)
deactivate MoteurNettoyage

ServiceTraitement -> BaseDonnees: mettre_a_jour_statut_jeu(NETTOYE)
activate BaseDonnees
BaseDonnees --> ServiceTraitement: succès
deactivate BaseDonnees

ServiceTraitement -> CacheRedis: mettre_en_cache_donnees(id_jeu, donnees_nettoyees, "_nettoye")
activate CacheRedis
CacheRedis --> ServiceTraitement: succès
deactivate CacheRedis

ServiceTraitement --> APIDjango: ResultatService(donnees_nettoyees, resume_operations)
deactivate ServiceTraitement

APIDjango --> InterfaceReact: Réponse JSON\n(résultats nettoyage + rapport)
deactivate APIDjango

InterfaceReact --> Utilisateur: Affiche données nettoyées\net rapport détaillé des opérations
deactivate InterfaceReact

@enduml
```
