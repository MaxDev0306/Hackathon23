import {INIT, Player, ROUND} from "./Interfaces";

export function logic(board:any, forcedSection: number, enemySymbol: string, ourSymbol: string) {
    const currentBoard = board[forcedSection];
    const emptyFields: number[] = currentBoard.reduce((fields: number[], value: string, index: number) => {
        if (value === '') {
            fields.push(index);
        }
        return fields;
    }, []);

    const ourFields: number[] = currentBoard.reduce((fields: number[], value: string, index: number) => {
        if (value === ourSymbol) {
            fields.push(index);
        }
        return fields;
    }, []);

    const enemyFields: number[] = currentBoard.reduce((fields: number[], value: string, index: number) => {
        if (value === enemySymbol) {
            fields.push(index);
        }
        return fields;
    }, []);

    const checkWin = check(ourFields, emptyFields);
    const checkBlock = check(enemyFields, emptyFields);

    if (checkWin) {
        return checkWin;
    } else if (checkBlock) {
        return checkBlock
    }
    if (emptyFields.includes(4)) {
        return 4;
    }
    return emptyFields[0];
}

export function whoAmI(data: INIT | ROUND) {
    let symbol: string = "";
    data.players.map((player: Player) => {
        if (player.id === data.self) {
            symbol = player.symbol;
        }
    })
    return symbol;
}

function check(field: number[], emptyFields: number[]) {
    if (field.includes(0) && field.includes(1) && emptyFields.includes(2)) {
        return 2;
    }

    if (field.includes(1) && field.includes(2) && emptyFields.includes(0)) {
        return 0;
    }

    if (field.includes(0) && field.includes(2) && emptyFields.includes(1)) {
        return 1;
    }

    if (field.includes(0) && field.includes(1) && emptyFields.includes(2)) {
        return 2;
    }

    if (field.includes(3) && field.includes(4) && emptyFields.includes(5)) {
        return 5;
    }

    if (field.includes(4) && field.includes(5) && emptyFields.includes(3)) {
        return 3;
    }

    if (field.includes(6) && field.includes(7) && emptyFields.includes(8)) {
        return 8;
    }

    if (field.includes(7) && field.includes(8) && emptyFields.includes(6)) {
        return 6;
    }

    if (field.includes(6) && field.includes(8) && emptyFields.includes(7)) {
        return 7;
    }

    if (field.includes(0) && field.includes(3) && emptyFields.includes(6)) {
        return 6;
    }

    if (field.includes(3) && field.includes(6) && emptyFields.includes(0)) {
        return 0;
    }

    if (field.includes(0) && field.includes(6) && emptyFields.includes(3)) {
        return 1;
    }

    if (field.includes(1) && field.includes(4) && emptyFields.includes(7)) {
        return 7;
    }

    if (field.includes(4) && field.includes(7) && emptyFields.includes(1)) {
        return 1;
    }

    if (field.includes(0) && field.includes(7) && emptyFields.includes(4)) {
        return 4;
    }

    if (field.includes(2) && field.includes(5) && emptyFields.includes(8)) {
        return 8;
    }

    if (field.includes(5) && field.includes(8) && emptyFields.includes(2)) {
        return 2;
    }

    if (field.includes(2) && field.includes(8) && emptyFields.includes(5)) {
        return 5;
    }

    if (field.includes(0) && field.includes(4) && emptyFields.includes(8)) {
        return 8;
    }

    if (field.includes(4) && field.includes(8) && emptyFields.includes(0)) {
        return 0;
    }

    if (field.includes(0) && field.includes(8) && emptyFields.includes(4)) {
        return 4;
    }

    if (field.includes(2) && field.includes(4) && emptyFields.includes(6)) {
        return 6;
    }

    if (field.includes(4) && field.includes(6) && emptyFields.includes(2)) {
        return 2;
    }

    if (field.includes(2) && field.includes(6) && emptyFields.includes(4)) {
        return 4;
    }
    return null;
}

function getRandomIndex<T>(array: T[]): number {
    if (array.length === 0) {
        throw new Error('Array is empty.');
    }

    return Math.floor(Math.random() * array.length);
}