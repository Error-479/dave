import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, User } from 'discord.js';
import { getSocialCredit } from '../model/userData';
import { ICommandData } from './commands';

export const checkSocialCredit: ICommandData = {
	name: 'socialcredit',

	builder: new SlashCommandBuilder()
		.setName('socialcredit')
		.setDescription('Check your social credit score')
		.setDefaultPermission(true)
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('The user you want to view')
				.setRequired(false)
		),

	callback: async (interaction) => {
		if (!(interaction instanceof CommandInteraction)) return;

		const user = interaction.options.getUser('user');

		if (user) {
			interaction.reply({
				content: `${user.username} has ${getSocialCredit(
					interaction.guildId,
					user.id
				)} social credit points.`,
				ephemeral: true,
			});
		} else {
			interaction.reply({
				content: `You have ${getSocialCredit(
					interaction.guildId,
					interaction.member.id
				)} social credit points.`,
				ephemeral: true,
			});
		}
	},
};
