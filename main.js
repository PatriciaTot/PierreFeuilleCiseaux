import http from 'http';
import RequestController from './controllers/requestController.js';
import { Server as IOServer } from 'socket.io';
import IOController from './controllers/IOController.js';

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

// mise en place du serveur de socket.io
const io = new IOServer(server);

// gère les connexions entre serveur et client
const ioController = new IOController(io);

io.on('connection', socket => {ioController.registerSocket(socket)});

server.listen(8080);
