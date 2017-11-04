# Memoriz_hybrid
Groupe 9 / Tang Jean-Luc / Assisté au cours: Oui

Description du projet: 

- Version hybride du projet EIP - Memoriz
- Memoriz est un réseau social disponible sur mobile et web.  
Cette plateforme permet de partager des contenus vidéo/photo affiliés à des tendances/évènements, ou catégories d’évènement.  
Ces contenus sont visibles en exploration selon des critères d’intérêt et de géolocalisation. 
Le système de matching reste l’outil principal de recherche de l’application et fonctionne sur le modèle Tinder.

Contraintes technique rencontrées:
- L'ajout d'une description pour le contenu à été retiré, lorsqu'on cliquait dessus les listes qui étaient affiché sur la page précédente n'affichait plus rien.
- L'affichage des évènements en récupérant les limites de la carte (getBounds) a été également retiré, la classe Circle qui permet de récupérer les limites renvoyait tout le temps une erreur de provider et quand il était ajouté il renvoyait une autre erreur qui n'a pu être résolue.
- Pas de bouton pour annuler l'upload de fichier, on peut seulement annuler l'upload en appuyant n'importe où sur l'écran ou appuyer sur le button "back" du smartphone.


Listes des fonctionnalités présente sur la version hybride:
- Connexion (Récupération d'un token qui sera utiliser pour chaque requête qui auront lieu après la connexion)
- Inscription
- Implémentation des sliding tabs ainsi que de la bottom navigation
- Récupération de tous les contenus ainsi que les contenus personnels
- Implémentation du pull-to-refresh, infinite scroll (La récupération des contenus marchant sur un système de pagination on récupère la page suivante a chaque fois que l'utilisateur arrive en bout de liste)
- Ajout de contenu personnel (image)
- Google maps: Affiche les évènements sur la carte (Récupération de la position actuelle afin de zoomer dessus)

Backend:

API déjà existante hébergé sur Heroku, la 1ère requête risque donc d'être un peu longue le temps que le serveur "se réveille" (Serveur mis "en veille" après 30 minutes d'inactivité).
