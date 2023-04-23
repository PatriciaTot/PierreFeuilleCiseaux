import * as msg from '../scripts/messageConstants.js';

export default class IOController {
    
    #io;
    #clients;
    #scores;
    #numRound;

    static NB_PLAYERS_MAX = 2;
    static NB_ROUNDS = 5;
  
    constructor(io) {
      this.#io = io;
      this.#clients = new Map();
      this.#scores = new Map();
      this.#numRound = 1;
    }

    getClients() {
      return this.#clients;
    }

    getScores() {
      return this.#scores;
    }

    /**
     * appelée lorsque qu'un nouveau socket est connecté.
     * @param socket 
     */
    registerSocket(socket) {
      socket.on("connexion", () => this.connect(socket));
      socket.on("disconnect", () => this.leave(socket));
      socket.on("choix", value => this.registerClientChoice(socket, value));
      socket.on("rejouer", () => this.rejouer());
    }

    connect(socket) {
      console.log(`Nouvelle connexion avec id ${socket.id}`);

      // Si on a ateint le nombre maximum de joueurs possible
      if(this.#clients.size == IOController.NB_PLAYERS_MAX){
        this.#io.to(socket.id).emit(msg.MAXIMUM_PLAYER);
      }

      else {
        // Connexion du premier joueur
        if (this.#clients.size == 0) {
            this.#io.to(socket.id).emit(msg.PREMIER);
            this.#clients.set(socket.id, null);
            this.#scores.set(socket.id, 0);
        }
        // Connexion du deuxième joueur
        else if(this.#clients.size == 1) {
          this.#io.emit(msg.DEUXIEME);
          this.#clients.set(socket.id, null);
          this.#scores.set(socket.id, 0);
        }
      }
    }

    registerClientChoice(socket, value) {
      this.#clients.set(socket.id, value);
     this.playOneRound();
    }  

    playOneRound() {
      let tableau = Array.from(this.#clients);
      const socket1 = tableau[0][0];
      const socket2 = tableau[1][0];

      const client1Choice = tableau[0][1];
      const client2Choice = tableau[1][1];

      let socket1Score;
      let socket2Score;

      // On compare les choix et retourne le résultat
      if ( (client1Choice === "pierre" && client2Choice === "ciseaux") || (client1Choice === "feuille" && client2Choice === "pierre") || (client1Choice === "ciseaux" && client2Choice === "feuille") ) {
        this.#io.to(socket1).emit("win", client1Choice, client2Choice);
        this.#io.to(socket2).emit("lose", client2Choice, client1Choice);
        this.addScore(socket1);
        socket1Score = this.#scores.get(socket1);
        socket2Score = this.#scores.get(socket2);
        this.#io.to(socket1).emit("socket1Gagnant", socket1Score, socket2Score);
        this.#io.to(socket2).emit("socket1Gagnant", socket2Score, socket1Score);
      }

      else if ( (client2Choice === "pierre" && client1Choice === "ciseaux") || (client2Choice === "feuille" && client1Choice === "pierre") || (client2Choice === "ciseaux" && client1Choice === "feuille") ) {
        this.#io.to(socket1).emit("lose", client1Choice, client2Choice);
        this.#io.to(socket2).emit("win", client2Choice, client1Choice);
        this.addScore(socket2);
        socket1Score = this.#scores.get(socket1);
        socket2Score = this.#scores.get(socket2);
        this.#io.to(socket1).emit("socket2Gagnant", socket1Score, socket2Score);
        this.#io.to(socket2).emit("socket2Gagnant", socket2Score, socket1Score);
      }
        
      else if (client1Choice === client2Choice) {
        this.#io.emit("equality", client1Choice);
      }
    }

    /**
     * Ajoute un point à un joueur qui gagne une manche
     */
    addScore(socket) {
      this.#scores.set(socket, this.#scores.get(socket) + 1);
    }

    /**
     * Reinitialise les choix des joueurs à null
     * Reinitialise les scores des joueurs à 0
     */
    rejouer() {
      for (let key of this.#clients.keys()) {
        this.#clients.set(key, null);
      }

      for (let key of this.#scores.keys()) {
        this.#scores.set(key, 0);
      }

      this.#io.emit("recommencer jeu");
    }
  
    /**
     * supprime le joueur de la table #clients
     * @param socket le joueur à supprimer
     */
    leave(socket) {
      this.#clients.delete(socket.id);
      if (this.#clients.size == 1) {
        this.#io.emit("déconnexion");
      }
    }

}