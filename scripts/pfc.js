import * as msg from './messageConstants.js';

const displayConsigne = document.getElementById('commentaires');

const imagePierre = document.getElementById('pierre');
const imageFeuille = document.getElementById('feuille');
const imageCiseaux = document.getElementById('ciseaux');
const monScore = document.getElementById("moi");
const scoreJoueur2 = document.getElementById("autreJoueur");
const rejouer = document.getElementById('rejouer');
const manche = document.getElementById('round');
    
// création de la socket
const socket = io();

// Le premier joueur se connecte. Il attend le deuxième. Les boutons de choix sont inactifs.
socket.on(msg.PREMIER, () => {
    disableButtons();
    displayConsigne.innerHTML = "Bienvenue ! En attendant qu'un deuxième joueur rejoigne le jeu..."
});

// Le deuxième joueur se connecte. Les boutons de choix sont actifs pour les deux joueurs.
socket.on(msg.DEUXIEME, () => {
    enableButtons();
    displayConsigne.innerHTML = "Début du jeu, faites un choix."
});

// La tentative de connexion d'un troisième joueur est refusée
socket.on(msg.MAXIMUM_PLAYER, () => { 
    disableButtons();
    displayConsigne.innerHTML = "Jeu complet, revenez plus tard."
});

// attache un gestionnaire d'événement click à chaque bouton/image
imagePierre.addEventListener('click', () => {
    disableButtons();
    const choix = imagePierre.value;
    displayConsigne.innerHTML = displayConsigne.innerHTML + "<br>" + `Votre choix : ${choix}.`;
    socket.emit("choix", choix);
});
imageFeuille.addEventListener('click', () => {
    disableButtons();
    const choix = imageFeuille.value;
    displayConsigne.innerHTML = displayConsigne.innerHTML + "<br>" + `Votre choix : ${choix}.`;
    socket.emit("choix", choix);
});
imageCiseaux.addEventListener('click', () => {
    disableButtons();
    const choix = imageCiseaux.value;
    displayConsigne.innerHTML = displayConsigne.innerHTML + "<br>" + `Votre choix : ${choix}.`;
    socket.emit("choix", choix);
});

// Le jeu proprement dit
socket.on("win", (client1Choice, client2Choice) => {
    displayConsigne.innerHTML = displayConsigne.innerHTML + "<br>" + "Vous avez joué " + client1Choice + " et avez gagné contre " + client2Choice + ".";
});

socket.on("lose", (client1Choice, client2Choice) => {
    displayConsigne.innerHTML = displayConsigne.innerHTML + "<br>" + "Vous avez joué " + client1Choice + " et avez perdu contre " + client2Choice + ".";
});

socket.on("equality", (clientsChoice) => {
    displayConsigne.innerHTML = displayConsigne.innerHTML + "<br>" + "Match nul. Vous avez tous les deux joué " + clientsChoice + ".";
});

// désactivation des boutons
const disableButtons = () => {
    imagePierre.disabled = true;
    imageFeuille.disabled = true;
    imageCiseaux.disabled = true;
}

// activation des boutons
const enableButtons = () => {
    imagePierre.disabled = false;
    imageFeuille.disabled = false;
    imageCiseaux.disabled = false;
}

// Le joueur se connecte
socket.emit("connexion");

// Le joueur se déconnecte
socket.on("déconnexion", () => {
    disableButtons();
    displayConsigne.innerHTML = "L'autre joueur s'est déconnecté. Veuillez patienter...";
});

// Le joueur demande à rejouer une partie
rejouer.addEventListener('click', () => {
    socket.emit("rejouer");
});

socket.on("recommencer jeu", () => {
    enableButtons();
    monScore.textContent = 0;
    scoreJoueur2.textContent = 0;
    displayConsigne.innerHTML = "Début du jeu, faites un choix."
});

// Ajouter des points aux joueurs
socket.on("socket1Gagnant", (score1, score2) => {
    monScore.textContent = score1;
    scoreJoueur2.textContent = score2;
});

socket.on("socket2Gagnant", (score1, score2) => {
    monScore.textContent = score1;
    scoreJoueur2.textContent = score2;
});

/*
socket.on("nouvelle manche", (numRound) => {
    enableButtons();
    manche.textContent = "Manche " + numRound;
});
*/