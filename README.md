# Projet de Chat avec Ionic React (TChatClient)

Ce projet est une application de chat développée avec Ionic React. Elle permet aux utilisateurs de discuter en temps réel avec le service client.

## Prérequis

Avant de pouvoir exécuter cette application, vous devez vous assurer que votre environnement est configuré avec les éléments suivants :

* Node.js et NPM (Node Package Manager)
* Ionic CLI : npm install -g @ionic/cli

## Installation

* Clonez le dépôt Git sur votre machine locale.
* Clonez le projet service client sur `https://github.com/Avotra22/TChatServiceClient` (installation dans son README).
* Ouvrez un terminal dans le dossier `TChatClient/server`.
* Exécutez la comande node server.cjs.
* Ouvrez un terminal dans le dossier du projet `TChatClient`.
* Exécutez la commande `npm install socket.io-client` pour installer les dépendances socket.io.
* Exécutez la commande npm install `@types/socket.io-client` pour installer les fichier de declaration des dépendances socket.io-client.
* Exécutez la commande ionic serve pour lancer l'application en mode développement.

## Fonctionnalités

* Chat en temps réel avec le service client.
* Creation ticket pour l'utilisateur.

## Technologies utilisées

* Ionic React : Framework pour le développement d'applications mobiles hybrides
* Socket.io : Permet d'avoir des discussions et des notification en temps réel
* TypeScript : Langage de programmation orienté fonction