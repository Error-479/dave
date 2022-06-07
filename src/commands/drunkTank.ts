import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { ICommandData } from './commands';

export const drunkTank: ICommandData = {
	name: 'drunktank',

	builder: new SlashCommandBuilder()
		.setName('drunktank')
		.setDescription('Put a user in the drunk tank')
		.setDefaultPermission(false)
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('The user you want to timeout')
				.setRequired(true)
		),

	callback: async (interaction) => {
		if (!(interaction instanceof CommandInteraction)) return;

		const user = interaction.options.getUser('user');

		if (user) {
			interaction.reply({
				content: `Timed out ${user.username}`,
				ephemeral: true,
			});
		} else {
			interaction.reply({
				content: 'You must provide a user!',
				ephemeral: true,
			});
		}
	},
};
