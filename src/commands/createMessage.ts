import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, InteractionReplyOptions } from 'discord.js';
import { ICommandData } from './commands';

export const createMessage: ICommandData = {
	name: 'createmessage',

	builder: new SlashCommandBuilder()
		.setName('createmessage')
		.setDescription('Sends a message from the bot to the channel')
		.setDefaultPermission(false)
		.addStringOption((option) =>
			option
				.setName('text')
				.setDescription('The message text')
				.setRequired(true)
		),

	callback: async (interaction) => {
		if (!(interaction instanceof CommandInteraction)) return;

		const text = interaction.options.getString('text');

		if (text) {
			interaction.channel?.send(text);
			interaction.reply({
				content: 'Message sent!',
				ephemeral: true,
			});
		} else {
			interaction.reply({
				content: 'You must provide a message!',
				ephemeral: true,
			});
		}
	},
};
