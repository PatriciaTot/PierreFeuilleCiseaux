# Projet | Pierre Feuille Ciseaux

---
# Auteur

- [Patricia ]

---
# Sujet

### [Le sujet](https://www.fil.univ-lille.fr/~routier/enseignement/licence/jsfs/tdtp/pfc.html)

# Sommaire
Journal de bord : [1](#Pages) [2](#Scripts)

## Présentation du projet

Le but de ce projet est de réaliser une version du jeu "Pierre-Feuille-Ciseaux" dans laquelle s'affrontent deux joueurs connectés dans deux clients différents.

---
# Rubrique HowTo

**Veuillez exécuter les commandes suivantes dans un terminal à partir du dossier racine du projet1 :**

### Installation des modules
- `npm install`

### Construction d'un premier *bundle*
- `npm run build`

### Lancement du serveur de développement 
- `nodemon`

### Comment jouer ?
Veuillez sasir l'URL `http://localhost:8080/" dans deux onglets de votre navigateur. Vous pouvez ainsi explorer l'application et jouer.

---

# Journal de bord

## Pages
- [x] **public/index.html** : Page HTML d'accueil pour l'application.
- [x] **public/info.html** : Page HTML d'information comprenant l'auteur et la version de l'application.
- [x] **public/error.html** : Page HTML d'erreur.
- [x] **public/pfc.html** : Page HTML du jeu proprement dit.
- [x] **public/style/style.css** : Styles CSS pour l'ensemble de l'application.

## Scripts
- [x] **script/pfc.js** : Fichier JavaScript côté client pour gérer les événements.
- [x] **controllers/requestController.js** : Fichier JavaScript côté serveur pour se charger du routage en fonction de l'url de la requête ainsi que de la construction des réponses adaptées.
- [x] **main.js** : Fichier JavaScript côté serveur pour configurer le serveur.
---
