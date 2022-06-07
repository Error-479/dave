import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { readServerData, writeServerData } from '../model/serverData';
import { ICommandData } from './commands';

export const setCraigslist: ICommandData = {
	name: 'setcraigslist',
	builder: new SlashCommandBuilder()
		.setName('setcraigslist')
		.setDescription('Sets the craigslist channel')
		.setDefaultPermission(false),
	callback: async (interaction) => {
		if (interaction instanceof CommandInteraction) {
			const data = readServerData(interaction.guildId);
			data.craigslistChannel = interaction.channelId;
			writeServerData(interaction.guildId, data);
			interaction.reply({
				content: 'Craigslist channel set!',
				ephemeral: true
			});
		}
	},
};
