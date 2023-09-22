// @ts-ignore
import {io} from 'socket.io-client';

const socket = io('https://games.uhno.de', {
	transports: ['websocket']
});
export function Connect (secret: string) {
	socket.on('connect', () => {
		console.log('connected')
		socket.emit('authenticate', secret, (success: boolean) => {
			if (success) {
				console.log('authenticated')
			}
		});
	});
}

export function Disconnect() {
	socket.on('disconnect', () => {
		console.log('disconnected')
	});
}