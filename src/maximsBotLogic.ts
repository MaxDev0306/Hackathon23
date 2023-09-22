import {ROUND} from './Interfaces';

export const doTurn = (data: ROUND) => {
	const turn: [section: number, field: number] = [0,0];

	if (data.forcedSection) {
		turn[0] = data.forcedSection;
	} else {
		turn[0] = chooseSection(data);
	}

	const availableFields: number[] = [];

	for (let i = 0; i < data.board[turn[0]].length; i++) {
		if (data.overview[i] === '') {
			availableFields.push(i);
		}
	}

	turn[1] = chooseField(availableFields);

	return turn;
}
const chooseSection = (data: ROUND) => {
	const availableSections: number[] = [];

	for (let i = 0; i < data.overview.length; i++) {
		if (data.overview[i] === '') {
			availableSections.push(i);
		}
	}

	return chooseField(availableSections);
}

const chooseField = (availableFields: number[]) => {
	const randomFieldIndex = Math.floor(Math.random() * availableFields.length);

	return availableFields[randomFieldIndex];
}