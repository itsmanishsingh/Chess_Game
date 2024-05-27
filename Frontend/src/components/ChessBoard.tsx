import { Color, PieceSymbol, Square } from "chess.js";

export const ChessBoard = ({ board , socket}:{
    board: ({
        square: Square;
        type : PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
})=>{
    const [from , serFrom] = useState<null | Square>(null);
    const [to , serTo] = useState<null | Square>(null);

    return <div className="text-white-200">
                {board.map((row,i)=>{
                    return <div key={i} className="flex">
                        {row.map((square, j) => {
                            return <div onClick={()=>{
                                if(!from){
                                    setFrom(square?.square ?? null);
                                }else{
                                    setTo(square?.square ?? null);
                                    socket.send(JSON.stringify({
                                        type:"MOVE",
                                        payload:{
                                            from ,
                                            to
                                        }
                                    }))

                                    console.log({
                                        from,
                                        to
                                    })

                                }
                            }} key={j} className={`w-16 h-16 ${(i+j)%2===0 ? 'bg-green-500':'bg-white-300'}`}>
                                <div className="w-full justify-center flex h-full">
                                    <div className="h-full justify-center flex flex-col">
                                        {square ? square.type : ""}
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                })}
            </div>
}

// ChessBoard image URL
// https://ideogram.ai/g/PDjHsv_8S82e9IdhH73jWQ/1  
