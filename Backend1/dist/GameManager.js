"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManger = void 0;
const Game_1 = require("./Game");
const messages_1 = require("./messages");
class GameManger {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
        // Stop the game here because the user left/dropped 
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            // const message = JSON.parse(message1);
            if (message.type === messages_1.INIT_GAME) {
                // Start the game , if we already have any pendingUser
                if (this.pendingUser) {
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    // add to the pendingUser list
                    this.pendingUser = socket;
                }
            }
            if (message.type === messages_1.MOVE) {
                console.log(`inside move`);
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    console.log(`inside makemove`);
                    // console.log(message.payload());
                    game.makeMove(socket, message.payload.move);
                }
            }
        });
    }
}
exports.GameManger = GameManger;
