import {INIT, Player, ROUND} from "./Interfaces";

export function logic(data: ROUND) {
    const currentBoard = data.board[data.forcedSection];
    const emptyIndices: number[] = currentBoard.reduce((indices: number[], value: string, index: number) => {
        if (value === '') {
            indices.push(index);
        }
        return indices;
    }, []);
    return emptyIndices[0];
}

export function whoAmI(data: INIT | ROUND) {
    let symbol: string = "";
    data.players.map((player: Player) => {
        if (player.id === data.self) {
            symbol = player.symbol;
        }
    })
    return symbol;
}