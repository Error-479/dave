import { TextChannel } from 'discord.js';
import { client } from '..';
import { readServerData } from '../model/serverData';

export async function log(guildId: string, message: string) {
	const serverData = readServerData(guildId);

	if (!serverData.logsChannel) return;

	// Get guild
	client.channels.fetch(serverData.logsChannel).then((channel) => {
		if (channel instanceof TextChannel) {
			channel.send(message);
		}
	});
}
