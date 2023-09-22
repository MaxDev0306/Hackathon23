export interface INIT {
	id: string,
	players: Player[],
	log: [],
	type: string,
	self: string
}

export interface ROUND {
	id: string,
	players: Player[],
	overview: string[],
	forcedSection: null|number,
	board: Array<Array<string>>,
	log: LogEntry[],
	type: string,
	self: string
}
export interface RESULT {
	id: string,
	players: Player[],
	overview: string [],
	board: Array<string | Array<string>>,
	log: LogEntry[],
	type: string,
	self: string
}

export interface Player {
	id: string,
	symbol: string,
	score: number
}
export interface LogEntry{
	player: string,
	move: number[]
}