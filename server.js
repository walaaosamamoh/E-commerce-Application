import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  });
});

server.listen(3000, () => {
  console.log('WebSocket server running on ws://localhost:3000');
});