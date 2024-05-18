import WebSocket from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
    public player1: WebSocket
    public player2: WebSocket
    private board : Chess;
    private moves: string[];
    private startTime : Date;

    constructor(player1 : WebSocket , player2 : WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();
        
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }
        }));

        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload :{
                color: "black"
            }
        }));
    }

    makeMove(socket : WebSocket , move:{
        from: string;
        to :  string;
    }){
        // Validate the type of move using zod
        if(this.board.moves.length % 2 === 0 && socket !== this.player1){
            return;
        }
        
        if(this.board.moves.length % 2 === 1 && socket !== this.player2){
            return;
        }

        console.log(`did not early return`);

        try{
            this.board.move(move);
        }catch(e){
            console.log(e);
            return;
        }

        console.log(`move succeeded`);


        // Check GameOver
        if(this.board.isGameOver()){
            // Send the game over message to both players
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload :{
                    winner:this.board.turn() === "w" ? "black" : "white"
                }
            }))
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload :{
                    winner:this.board.turn() === "w" ? "black" : "white"
                }
            }))
            return;
        }

        console.log(this.board.moves.length % 2)
        if(this.board.moves.length % 2 === 0){
            console.log(`sent1`)
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload:move
            }))
        }else{
            console.log(`sent2`)
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload:move
            }))
        }

        // Send the updated board to both players:- It is automatically done by WebSocket
    }
}