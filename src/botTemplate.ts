import {io} from 'socket.io-client';
import {INIT, Player, RESULT, ROUND} from './Interfaces';
import {doTurn} from "./maximsBotLogic";


const SECRET = 'c238b5b4-677a-479e-872d-0d00dcf1e1b7';
const socket = io('https://games.uhno.de', {            // Server ist "games.uhno.de"
	transports: ['websocket']                             // wichtig: aktuell werden nur Websockets unterstützt
});

let wins = 0;
let playedGames = 0;

socket.on('connect', () => {
	console.log('connected')
	socket.emit('authenticate', SECRET, (success: boolean) => {    // wenn die Verbindung hergestellt ist, mit dem Secret authentifizieren
		if(success) {
			console.log('authenticated')
		}
	});
});
socket.on('disconnect', () => {
	console.log('disconnected')
});

// Your Logic is callback
socket.on('data', (data, callback) => {
	switch (data.type) {
		case 'INIT':
			init(data);
			return;
		case 'RESULT':
			result(data);
			return;
		case 'ROUND':
			round(data, callback);
	}
});
const init = (data: INIT) => {
	//console.log('INIT')
};
const result = (data: RESULT) => {

	for (const log of data.log) {
		if (log.player === data.self && log.error) {
			console.log('---ERROR---')
			console.log(log.error)
			console.log(log.move)
			console.log('---ERROR---')
		}
	}

	let me: Player|null = null;
	for (const player of data.players) {
		if (player.id == data.self) {
			me = player;
		}
	}
	playedGames++;
	/*console.log('RESULT')
	console.log(data);*/
	if (me) {
		switch (me.score) {
			case 0:
				console.log('Game Id: ' + data.id)
				console.log('LOST')
				break
			case 1:
				wins++;
				console.log('Game Id: ' + data.id)
				console.log('WON')
				break
			default:
				console.log('Game Id: ' + data.id)
				console.log('SOMETHING WENT WRONG!')
		}
	}

	console.log('Total winning rate: ' + parseFloat(((wins / playedGames) * 100).toFixed(2)) + '%')
	console.log('Total played games: ' + playedGames)

};
const round = (data: ROUND, callback: (turn: [cord1: number, cord2: number]) => void) => {
	const turn = doTurn(data);
	callback(turn);
};