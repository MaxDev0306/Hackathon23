import React, {useEffect, useState} from 'react';

export default function BotSkeleton() {

	const [botStatus, setBotStatus] = useState<'Authenticated'|'Connected'|'Disconnected'>('Disconnected');
	const [color, setColor] = useState<string>('red');

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
			Bot
		</div>
	)
}