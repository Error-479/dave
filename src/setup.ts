import * as fs from 'fs';
import { client } from '.';
import { putSlashCommands } from './commands/commands';

export function setup() {
	checkFs();
}

export function finalizeSetup() {
	client.guilds.fetch().then((guilds) => {
		guilds.forEach((guild) => {
			putSlashCommands(guild.id);
		});
	});
	setStatus();
}

function checkFs() {
	// Check if ./data exists
	if (!fs.existsSync('./data')) {
		console.log('Creating ./data directory');
		fs.mkdirSync('./data');
	} else {
		console.log('Found ./data directory');
	}
}

function setStatus() {
	client.user?.setPresence({
		activities: [{ name: 'being developed' }],
		status: 'online',
	});
}
