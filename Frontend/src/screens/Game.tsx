import { useEffect } from "react";
import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = ()=>{
    const socket = useSocket();

    useEffect(()=>{
        if(!socket)return;

        socket.onmessage = (event)=>{
            const message = JSON.parse(event.data);
            console.log(message);
            switch(message.type){
                case INIT_GAME:
                    console.log(`Game initialized`);
                    break;
                case MOVE:
                    console.log(`Move made`);
                    break;
                case GAME_OVER:
                    console.log("Game Over")    ;
                    break;
            }
        }
    }, [socket]);

    if(!socket)return <div>Connecting...</div>

    return <div className="jsutify-center flex">
        <div className="pt-8 max-w-screen-lg w-full">
            <div className="grid grid-cols-6 gap-4 w-full bg-red-400">
                <div className="col-span-4 bg-red-200 w-full">
                    <ChessBoard />
                </div>
                <div className="cols-span-2 bg-green-200 w-full">
                    <Button onClick={()=>{
                            socket.send(JSON.stringify({
                                type : INIT_GAME;
                            }))
                        }}>
                            Play Online
                    </Button>
                </div>
            </div>
        </div>
        
    </div>
}