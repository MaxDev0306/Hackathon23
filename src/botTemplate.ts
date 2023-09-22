import {io} from 'socket.io-client';
import {INIT, Player, RESULT, ROUND} from './Interfaces';
import {doTurn} from "./maximsBotLogic";


const SECRET = 'baa3ca8b-1c38-4b29-9b04-f354c79c9ee5';
const socket = io('https://games.uhno.de', {            // Server ist "games.uhno.de"
	transports: ['websocket']                             // wichtig: aktuell werden nur Websockets unterstützt
});

let ratio = 0;
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
				ratio--;
				console.log('LOST')
				break
			case 1:
				ratio++;
				console.log('WON')
				break
			default:
				console.log('SOMETHING WENT WRONG!')
		}
	}

	console.log(ratio)
	console.log(playedGames)
};
const round = (data: ROUND, callback: (turn: [cord1: number, cord2: number]) => void) => {
	const turn = doTurn(data);
	callback(turn);
};