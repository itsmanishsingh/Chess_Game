"use strict";
// Original Text
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.moves = [];
        this.startTime = new Date();
        // Inform both the user if the pair is confirmed
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        // Validate the type of move using zod
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            console.log(`early return 1`);
            console.log(this.board.moves().length % 2);
            console.log(socket);
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            console.log(`Early Return 2`);
            console.log(`this.board.moves().length % 2`);
            console.log(`socket`);
            return;
        }
        console.log(`did not early return`);
        // Try to make the move
        try {
            this.board.move(move);
        }
        catch (error) {
            console.log(error);
            return;
        }
        console.log(`move succeeded`);
        // Update the board => Handled by Chess.js Library
        // Check GameOver
        if (this.board.isGameOver()) {
            // Send the game over message to both players
            this.player1.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            this.player2.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        console.log(this.board.moves().length % 2);
        if (this.board.moves().length % 2 === 0) {
            console.log(`sent1`);
            this.player2.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
            console.log(`sent1 last`);
        }
        else {
            console.log(`sent2`);
            this.player1.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
            console.log(`sent2 last`);
        }
        this.moveCount++;
        // Send the updated board to both players:- It is automatically done by WebSocket
    }
}
exports.Game = Game;
