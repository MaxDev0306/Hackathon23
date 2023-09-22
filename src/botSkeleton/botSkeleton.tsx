import React, {useEffect, useState} from 'react';
// @ts-ignore
import {io} from 'socket.io-client';

const socket = io('https://games.uhno.de', {
	transports: ['websocket']
});

interface BotSkeletonProps {
	secret: string;
	logic: () => void;
}
export default function BotSkeleton(props: BotSkeletonProps) {

	const [botStatus, setBotStatus] = useState<'Authenticated'|'Connected'|'Disconnected'>()
	const [color, setColor] = useState<string>('red');

	function connect() {
		socket.on('connect', () => {
			setBotStatus('Connected');
			socket.emit('authenticate', props.secret, (success: boolean) => {    // wenn die Verbindung hergestellt ist, mit dem Secret authentifizieren
				setBotStatus('Authenticated');
			});
		});
	}
	function disconnect() {
		socket.on('disconnect', () => {
			setBotStatus('Disconnected')
		});
	}

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

	return (
		<div style={{width: 200, height: 200, backgroundColor: color}}>
			<button onClick={connect}>Connect</button>
			<button onClick={disconnect}>Disconnect</button>
			{ botStatus === 'Authenticated' && (
				<button onClick={props.logic}>Start</button>
			)}
		</div>
	)
}