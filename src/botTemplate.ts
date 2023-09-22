import {INIT, RESULT, ROUND} from './Interfaces';
import {io} from "socket.io-client";
import {logic, whoAmI} from "./logic";

const SECRET = 'a841b604-5ad5-4d6c-9178-68750c7a8ee1';
const socket = io('https://games.uhno.de', {            // Server ist "games.uhno.de"
    transports: ['websocket']                             // wichtig: aktuell werden nur Websockets unterstützt
});
let symbol: string = "";

socket.on('connect', () => {
    console.log('connected')
    socket.emit('authenticate', SECRET, (success: boolean) => {    // wenn die Verbindung hergestellt ist, mit dem Secret authentifizieren
        if (success) {
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
    symbol = whoAmI(data);
};
const result = (data: RESULT) => {
    console.log(data);
    // TODO: irgendwas aufräumen?
};
const round = (data: ROUND, callback: (turn: [cord1: number, cord2: number]) => void) => {
    symbol = whoAmI(data);
    const enemySymbol = symbol === "X" ? "O" : "X";
    if (data.forcedSection === null) {
        callback([4, 4]);
    } else {
        if (data.overview[data.forcedSection] !== '') {
            const emptyIndices: number[] = data.overview.reduce((indices: number[], value: string, index: number) => {
                if (value === '') {
                    indices.push(index);
                }
                return indices;
            }, []);
            callback([emptyIndices[0], logic(data)]);
        }
        callback([data.forcedSection, logic(data)]);
    }
};