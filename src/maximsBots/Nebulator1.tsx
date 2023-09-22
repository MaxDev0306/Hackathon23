import React, {useEffect, useState} from 'react';
// @ts-ignore
import {io} from 'socket.io-client';
import {INIT, RESULT, ROUND} from '../interfaces/return-interfaces';

export default function Nebulator1() {

	const secret = 'baa3ca8b-1c38-4b29-9b04-f354c79c9ee5'

	const [botStatus, setBotStatus] = useState<'Authenticated'|'Connected'|'Disconnected'>()
	const [color, setColor] = useState<string>('red');

	const [socket, setSocket] = useState<any>(null);

	useEffect(() => {
		if (socket === null) {
			setSocket(
				io('https://games.uhno.de', {
					transports: ['websocket']
				})
			);
		}
	}, [])

	useEffect(() => {
		if (socket) {
			console.log('Connecting...')
			socket.on('connect', () => {
				setBotStatus('Connected');
				console.log('Connected')
				socket.emit('authenticate', secret, (success: boolean) => {    // wenn die Verbindung hergestellt ist, mit dem Secret authentifizieren
					if(success) {
						console.log('Authenticated')
						setBotStatus('Authenticated');
					}
				});
			});

			socket.on('data', (data: INIT|RESULT|ROUND, callback: () => void) => {
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
		} else {
			setBotStatus('Disconnected')
		}
	}, [socket]);

	useEffect(() => {
		switch (botStatus) {
			case 'Authenticated':
				setColor('green')
				break;
			case 'Connected':
				setColor('blue')
				break;
			case 'Disconnected':
				setColor('red')
				break;
		}
	} ,[botStatus])

	const init = (data: INIT|RESULT|ROUND) => {
		// TODO: irgendwas initialisieren?
	};
	const result = (data: INIT|RESULT|ROUND) => {
		// TODO: irgendwas aufräumen?
	};
	const round = (data: INIT|RESULT|ROUND, callback: () => void) => {
		// TODO: die bestmögliche Antwort liefern.
		// Koordinaten [0,0]-[8,8]?
		callback();
	};

	return (
		<div style={{width: 200, height: 200, backgroundColor: color}}></div>
	)
}