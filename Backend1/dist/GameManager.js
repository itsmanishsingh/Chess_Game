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
        // Stop the game here because the user left 
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    // Start the game , if we already have any pendingUsers
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    // add to the pendingUser
                    this.pendingUser = socket;
                }
            }
            if (message.type === messages_1.MOVE) {
                console.log(`inside move`);
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    console.log(`inside makemove`);
                    game.makeMove(socket, message.move);
                }
            }
        });
    }
}
exports.GameManger = GameManger;
