import { PresenceStatusData } from 'discord.js';
import * as fs from 'fs';
import { client } from '.';
import { putSlashCommands } from './commands/commands';

export function setup() {
	checkfs();
	setStatus('doin stuff', 'online');
	client.guilds.fetch().then((guilds) => {
		guilds.forEach((guild) => {
			putSlashCommands(guild.id);
		});
	});
}

function checkfs() {
	// Check if ./data exists
	if (!fs.existsSync('./data')) {
		console.log('Creating ./data directory');
		fs.mkdirSync('./data');
	} else {
		console.log('Found ./data directory');
	}
}

function setStatus(activity: string, status: PresenceStatusData) {
	client.user?.setPresence({
		activities: [{ name: activity }],
		status: status,
	});
}
