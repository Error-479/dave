import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { readServerData, writeServerData } from '../model/serverData';
import { ICommandData } from './commands';

export const addReactRole: ICommandData = {
	name: 'addreactrole',
	builder: new SlashCommandBuilder()
		.setName('addreactrole')
		.setDescription('Adds a react role listener to a message')
		.setDefaultPermission(true),
	callback: async (interaction) => {
		if (interaction instanceof CommandInteraction) {
			const data = readServerData(interaction.guildId);

			if (data.reactRoles) {
				data.reactRoles.push(['asdf', 'asdf']);
			} else {
				data.reactRoles = [['asdf', 'asdf']];
			}

			writeServerData(interaction.guildId, data);
			interaction.reply('Added react role listener!');
		}
	},
};

export function addAllReactRoleListeners() {
	//
}
