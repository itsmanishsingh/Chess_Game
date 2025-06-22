"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManger = new GameManager_1.GameManger();
wss.on('connection', function connection(ws) {
    gameManger.addUser(ws);
    ws.on('error', console.error);
    ws.on('message', function (ws) {
        console.log(`received:%s`, ws);
    });
    ws.on("disconnect", () => gameManger.removeUser(ws));
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
