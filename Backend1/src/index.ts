import { WebSocketServer } from 'ws';
import { GameManger } from './GameManager';


const wss = new WebSocketServer({ port: 8080 });
const gameManger = new GameManger();

wss.on('connection', function connection(ws) {
    gameManger.addUser(ws);
    ws.on('error',console.error);
    ws.on('message',function(ws){
        console.log(`received:%s`,ws);
    });

    ws.on("disconnect",()=> gameManger.removeUser(ws));
});

/*

import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws) {
    ws.on('error',console.error);
    ws.on('message',function(ws){
        console.log(`received:%s`,data);
    });
    ws.send('something');
});

*/