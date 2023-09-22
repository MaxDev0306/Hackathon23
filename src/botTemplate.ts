import {io} from 'socket.io-client';
import {INIT, RESULT, ROUND} from './Interfaces';


const SECRET = 'baa3ca8b-1c38-4b29-9b04-f354c79c9ee5';
const socket = io('https://games.uhno.de', {            // Server ist "games.uhno.de"
	transports: ['websocket']                             // wichtig: aktuell werden nur Websockets unterstützt
});

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
	// TODO: irgendwas initialisieren?
};
const result = (data: RESULT) => {
	// TODO: irgendwas aufräumen?
};
const round = (data: ROUND, callback: () => {}) => {
	// TODO: die bestmögliche Antwort liefern.
	// Koordinaten [0,0]-[8,8]?
	callback();
};