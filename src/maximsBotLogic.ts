import {ROUND} from './Interfaces';
//@ts-ignore;
import ticTacToeAiEngine from "tic-tac-toe-ai-engine";
export const doTurn = (data: ROUND) => {
	const turn: [section: number, field: number] = [0,0];

	if (data.forcedSection) {
		turn[0] = data.forcedSection;
	} else {
		turn[0] = chooseTurn(data, data.overview);
	}
	turn[1] = chooseTurn(data, data.board[turn[0]])
	return turn;
}

const chooseTurn = (data: ROUND, gameState: string[]) => {
	const availableFields: number[] = [];
	const board = data.overview

	for (let i = 0; i < board.length; i++) {
		if (data.overview[i] === '') {
			availableFields.push(i);
		}
	}

	const estimatedTurn: {winner: string, depth: number, nextBestGameState: string[]} = ticTacToeAiEngine.computeMove(gameState);
	for (let i = 0; i < 9; i++) {
		if (gameState[i] !== estimatedTurn.nextBestGameState[i]) {
			return i;
		}
	}

	console.log('SOMETHING WENT WRONG')
	return availableFields[0];
}

function gigaChadLogic(board: string[][]) {

}