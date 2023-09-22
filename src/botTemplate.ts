import {io} from 'socket.io-client';


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