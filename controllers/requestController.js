import * as fs from 'fs/promises';

import { getContentTypeFrom }  from '../scripts/contentTypeUtil.js';

const BASE = 'http://localhost/';

/**
*  définit un contrôleur pour récupérer les ressources statiques
*/
export default class RequestController {

  #request;
  #response;
  #url;

  constructor(request, response) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(this.request.url, BASE).pathname;
  }

  get response() {
    return this.#response;
  }

  get request() {
    return this.#request;
  }
  
  get url() {
    return this.#url;
  }

  /**
   * traite la requête HTTP
   */
  async handleRequest() {
    this.response.setHeader("Content-Type" , getContentTypeFrom(this.url) );
    await this.buildResponse();
    this.response.end();
  }

  /**
  * envoie la ressource demandée telle quelle, si elle existe, sinon répond avec un 404
  */
  async buildResponse()  {
    if (this.url === "/") {
      try {
        // lire le contenu de la ressource demandée
        const data = await fs.readFile(`./public/index.html`);
        // envoyer le contenu des ressources
        this.response.statusCode = 200;
        this.response.write(data);
      }
      catch (err) { // la ressource n'est pas disponible
        this.response.statusCode = 404;
        const dataError = await fs.readFile(`./public/error.html`);
        this.response.write(dataError);
      }
    }

    else if (this.url === "/pfc") {
      try {
        const data = await fs.readFile(`./public/pfc.html`);
        this.response.statusCode = 200;
        this.response.write(data);
      }
      catch (err) {
        this.response.statusCode = 404;
        const dataError = await fs.readFile(`./public/error.html`);
        this.response.write(dataError);
      }
    }

    else {
      try {
        console.log(this.url);
        const data = await fs.readFile(`./public/${this.url}`);
        this.response.statusCode = 200;
        this.response.write(data);
      }
      catch (err) {
        const data1 = await fs.readFile('./public/error.html');
        this.response.statusCode = 404;
        this.response.write(data1);
      }
    }

  }

}
