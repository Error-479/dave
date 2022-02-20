import * as fs from 'fs';

export interface IServerData {
	id: string;
	logsChannel?: string;
	marketChannel?: string;
}

export function writeServerData(id: string, serverData: IServerData) {
	fs.writeFileSync(`./data/${id}.json`, JSON.stringify(serverData));
}

export function readServerData(id: string): IServerData {
	try {
		const file = fs.readFileSync(`./data/${id}.json`);
		return JSON.parse(file.toString());
	} catch (e) {
		return { id };
	}
}
