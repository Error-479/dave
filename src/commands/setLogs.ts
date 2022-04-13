import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { readServerData, writeServerData } from '../model/serverData';
import { ICommandData } from './commands';

export const setLogs: ICommandData = {
	name: 'setlogs',
	builder: new SlashCommandBuilder()
		.setName('setlogs')
		.setDescription('Sets the server logs channel')
		.setDefaultPermission(false),
	callback: async (interaction) => {
		if (interaction instanceof CommandInteraction) {
			const data = readServerData(interaction.guildId);
			data.logsChannel = interaction.channelId;
			writeServerData(interaction.guildId, data);
			interaction.reply('Logs channel set!');
		}
	},
};
