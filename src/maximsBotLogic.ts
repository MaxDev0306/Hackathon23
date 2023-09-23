import {Player, RESULT, ROUND} from './Interfaces';
//@ts-ignore;
import ticTacToeAiEngine from "tic-tac-toe-ai-engine";

export const doTurn = (data: ROUND) => {

	const gameID = data.id;

	const playerSymbol = getPlayerSymbol(data.players, data.self)

	const emptySections: number[] = []
	const emptyFields: number[] = [];

	for (let i = 0; i < data.overview.length; i++) {
		if (data.overview[i] === '') {
			emptySections.push(i)
		}
	}

	const randomSection = Math.floor(Math.random()* emptyFields.length)

	for (let i = 0; i < data.board[emptySections[randomSection]].length; i++) {
		if (data.board[emptySections[randomSection]][i] === '') {
			emptyFields.push(i)
		}
	}

	const randomField = Math.floor(Math.random()* emptyFields.length)
	const turn: [section: number, field: number] = [0,0];


	if(playerSymbol) {
		if (data.forcedSection !== null) {
			turn[0] = data.forcedSection
		} else {
			turn[0] = chooseSection(data, playerSymbol)!;
		}
		turn[1] = chooseTurn(data.board[turn[0]], playerSymbol, emptyFields[randomField], gameID)
		return turn;
	}

	console.log('DIDNT FIND PLAYER')

	if (data.forcedSection) {
		turn[0] = data.forcedSection!;
		turn[1] = emptyFields[randomField];
	} else {
		turn[0] = emptySections[randomSection];
		turn[1] = emptyFields[randomField];
	}

	return turn
}

const findWinningMove = (emptyFields: number[], takenFields: number[], gameID?: string) => {
	const winningCombinations = [
		[1, 2, 3],[4, 5, 6],[7, 8, 9],
		[1, 4, 7],[2, 5, 8],[3, 6, 9],
		[1, 5, 9],[3, 5, 7]
	];

	for (const winningCombination of winningCombinations) {
		let score = 0;
		for (const takenField of takenFields) {
			if (winningCombination.includes(takenField)) {
				score++;
			}
		}

		for (const emptyField of emptyFields) {
			if (score == 2 && winningCombination.includes(emptyField)) {
				console.log('FOUND WINNING MOVE')
				console.log(winningCombination)
				console.log(emptyField)
				console.log(gameID)
				return emptyField
			}
		}
	}

	return false;
}

const chooseSection = (data: ROUND, playerSymbol: string) => {
	let section = data.forcedSection;
	const freeSections: number[] = [];

	if (section === null) {

		for (let i = 0; i < data.overview.length; i++) {
			if (data.overview[i] === '') {
				freeSections.push(i);
			}
		}

		for (const freeSection of freeSections) {
			const emptyFields: number[] = [];
			const takenFields: number[] = [];
			const opponentsFields: number[] = [];

			for (let i = 0; i < data.board[freeSection].length; i++) {
				if (data.board[freeSection][i] === '') {
					emptyFields.push(i);
					continue
				}

				if (data.board[freeSection][i] === playerSymbol) {
					emptyFields.push(i);
					continue
				}

				opponentsFields.push(i);
			}
			const winningTurn = findWinningMove(emptyFields, takenFields, data.id)

			if (winningTurn) {
				section = freeSection;
			} else {
				const opponentWinningTurn = findWinningMove(emptyFields, opponentsFields);

				if (opponentWinningTurn) {
					section = freeSection
				} else {
					if (freeSection === 4) {
						section = freeSection
					}

					switch (freeSection) {
						case 4:
							section = freeSection
							break;
						case 0:
						case 2:
						case 6:
						case 8:
							section = freeSection
							break;
						default:
							section = freeSection
							break;
					}
				}
			}
		}
	} else {
		section = data.forcedSection;
	}

	return section as number;
}
const chooseTurn = (gameState: string[], playerSymbol: string, randomMove: number, gameID: string) => {
	const emptyFields: number[] = [];
	const myFields: number[] = [];
	const opponentsFields: number[] = [];

	for (let i = 0; i < gameState.length; i++) {
		if (gameState[i] === '') {
			emptyFields.push(i);
			continue;
		}

		switch (gameState[i]) {
			case '':
				emptyFields.push(i)
				break;
			default:
				if (gameState[i] === playerSymbol) {
					myFields.push(i)
				} else {
					opponentsFields.push(i);
				}
		}
	}

	let winningTurn = findWinningMove(emptyFields, myFields, gameID);

	if (!winningTurn) {
		let opponentWinningTurn = findWinningMove(emptyFields, opponentsFields)

		if (opponentWinningTurn) {
			return opponentWinningTurn
		}

		const estimatedTurn: {winner: string, depth: number, nextBestGameState: string[]} = ticTacToeAiEngine.computeMove(gameState);
		for (let i = 0; i < 9; i++) {
			if (gameState[i] !== estimatedTurn.nextBestGameState[i]) {
				return i;
			}
		}
	} else {
		return winningTurn;
	}

	console.log('SOMETHING WENT WRONG, RANDOM MOVE!!!')
	return emptyFields[randomMove];
}

function getPlayerSymbol(players: Player[], playerId: string) {

	for (const player of players) {
		if (player.id === playerId) {
			return player.symbol
		}
	}

	return false;
}