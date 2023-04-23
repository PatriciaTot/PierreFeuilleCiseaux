/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/messageConstants.js":
/*!*************************************!*\
  !*** ./scripts/messageConstants.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DEUXIEME\": () => (/* binding */ DEUXIEME),\n/* harmony export */   \"MAXIMUM_PLAYER\": () => (/* binding */ MAXIMUM_PLAYER),\n/* harmony export */   \"PREMIER\": () => (/* binding */ PREMIER)\n/* harmony export */ });\n\nconst PREMIER = \"Premier joueur\";\nconst DEUXIEME = \"Deuxième joueur\";\nconst MAXIMUM_PLAYER = \"Maximum de joueurs atteint\";\n\n//# sourceURL=webpack://chartio/./scripts/messageConstants.js?");

/***/ }),

/***/ "./scripts/pfc.js":
/*!************************!*\
  !*** ./scripts/pfc.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _messageConstants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messageConstants.js */ \"./scripts/messageConstants.js\");\n\n\nconst displayConsigne = document.getElementById('commentaires');\n\nconst imagePierre = document.getElementById('pierre');\nconst imageFeuille = document.getElementById('feuille');\nconst imageCiseaux = document.getElementById('ciseaux');\nconst monScore = document.getElementById(\"moi\");\nconst scoreJoueur2 = document.getElementById(\"autreJoueur\");\nconst rejouer = document.getElementById('rejouer');\nconst manche = document.getElementById('round');\n    \n// création de la socket\nconst socket = io();\n\n// Le premier joueur se connecte. Il attend le deuxième. Les boutons de choix sont inactifs.\nsocket.on(_messageConstants_js__WEBPACK_IMPORTED_MODULE_0__.PREMIER, () => {\n    disableButtons();\n    displayConsigne.innerHTML = \"Bienvenue ! En attendant qu'un deuxième joueur rejoigne le jeu...\"\n});\n\n// Le deuxième joueur se connecte. Les boutons de choix sont actifs pour les deux joueurs.\nsocket.on(_messageConstants_js__WEBPACK_IMPORTED_MODULE_0__.DEUXIEME, () => {\n    enableButtons();\n    displayConsigne.innerHTML = \"Début du jeu, faites un choix.\"\n});\n\n// La tentative de connexion d'un troisième joueur est refusée\nsocket.on(_messageConstants_js__WEBPACK_IMPORTED_MODULE_0__.MAXIMUM_PLAYER, () => { \n    disableButtons();\n    displayConsigne.innerHTML = \"Jeu complet, revenez plus tard.\"\n});\n\n// attache un gestionnaire d'événement click à chaque bouton/image\nimagePierre.addEventListener('click', () => {\n    disableButtons();\n    const choix = imagePierre.value;\n    displayConsigne.innerHTML = displayConsigne.innerHTML + \"<br>\" + `Votre choix : ${choix}.`;\n    socket.emit(\"choix\", choix);\n});\nimageFeuille.addEventListener('click', () => {\n    disableButtons();\n    const choix = imageFeuille.value;\n    displayConsigne.innerHTML = displayConsigne.innerHTML + \"<br>\" + `Votre choix : ${choix}.`;\n    socket.emit(\"choix\", choix);\n});\nimageCiseaux.addEventListener('click', () => {\n    disableButtons();\n    const choix = imageCiseaux.value;\n    displayConsigne.innerHTML = displayConsigne.innerHTML + \"<br>\" + `Votre choix : ${choix}.`;\n    socket.emit(\"choix\", choix);\n});\n\n// Le jeu proprement dit\nsocket.on(\"win\", (client1Choice, client2Choice) => {\n    displayConsigne.innerHTML = displayConsigne.innerHTML + \"<br>\" + \"Vous avez joué \" + client1Choice + \" et avez gagné contre \" + client2Choice + \".\";\n});\n\nsocket.on(\"lose\", (client1Choice, client2Choice) => {\n    displayConsigne.innerHTML = displayConsigne.innerHTML + \"<br>\" + \"Vous avez joué \" + client1Choice + \" et avez perdu contre \" + client2Choice + \".\";\n});\n\nsocket.on(\"equality\", (clientsChoice) => {\n    displayConsigne.innerHTML = displayConsigne.innerHTML + \"<br>\" + \"Match nul. Vous avez tous les deux joué \" + clientsChoice + \".\";\n});\n\n// désactivation des boutons\nconst disableButtons = () => {\n    imagePierre.disabled = true;\n    imageFeuille.disabled = true;\n    imageCiseaux.disabled = true;\n}\n\n// activation des boutons\nconst enableButtons = () => {\n    imagePierre.disabled = false;\n    imageFeuille.disabled = false;\n    imageCiseaux.disabled = false;\n}\n\n// Le joueur se connecte\nsocket.emit(\"connexion\");\n\n// Le joueur se déconnecte\nsocket.on(\"déconnexion\", () => {\n    disableButtons();\n    displayConsigne.innerHTML = \"L'autre joueur s'est déconnecté. Veuillez patienter...\";\n});\n\n// Le joueur demande à rejouer une partie\nrejouer.addEventListener('click', () => {\n    socket.emit(\"rejouer\");\n});\n\nsocket.on(\"recommencer jeu\", () => {\n    enableButtons();\n    monScore.textContent = 0;\n    scoreJoueur2.textContent = 0;\n    displayConsigne.innerHTML = \"Début du jeu, faites un choix.\"\n});\n\n// Ajouter des points aux joueurs\nsocket.on(\"socket1Gagnant\", (score1, score2) => {\n    monScore.textContent = score1;\n    scoreJoueur2.textContent = score2;\n});\n\nsocket.on(\"socket2Gagnant\", (score1, score2) => {\n    monScore.textContent = score1;\n    scoreJoueur2.textContent = score2;\n});\n\n/*\nsocket.on(\"nouvelle manche\", (numRound) => {\n    enableButtons();\n    manche.textContent = \"Manche \" + numRound;\n});\n*/\n\n//# sourceURL=webpack://chartio/./scripts/pfc.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/pfc.js");
/******/ 	
/******/ })()
;