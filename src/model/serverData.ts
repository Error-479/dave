import * as fs from 'fs';

export interface IServerData {
	id: string;
	adminRoles?: string[];
	logsChannel?: string;
	craigslistChannel?: string;
	marketChannel?: string;
	reactRoles?: [message: string, emoji: string][];
}

export function writeServerData(id: string, serverData: IServerData) {
	fs.writeFileSync(`./data/${id}.json`, JSON.stringify(serverData));
}

export function readServerData(id: string): IServerData {
	try {
		const file = fs.readFileSync(`./data/${id}.json`);
		console.log(file);
		return JSON.parse(file.toString());
	} catch (e) {
		return { id };
	}
}
