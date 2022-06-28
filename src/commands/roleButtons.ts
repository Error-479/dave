import { SlashCommandBuilder } from '@discordjs/builders';
import {
	BaseGuildTextChannel,
	CommandInteraction,
	MessageActionRow,
	MessageButton,
} from 'discord.js';
import { client } from '..';
import { ICommandData } from './commands';

export const addRoleButton: ICommandData = {
	name: 'addrolebutton',

	builder: new SlashCommandBuilder()
		.setName('addrolebutton')
		.setDescription('Adds a react role listener to a message')
		.setDefaultPermission(false)
		.addRoleOption((option) =>
			option
				.setName('role')
				.setDescription('The role you want to create a button for')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('link')
				.setDescription('A link to the message you want the button added to')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('emoji')
				.setDescription('The emoji to use for the button')
				.setRequired(false)
		),

	callback: async (interaction) => {
		if (!(interaction instanceof CommandInteraction)) return;

		const role = interaction.options.getRole('role')!;
		const link = interaction.options.getString('message link')!;
		const emoji = interaction.options.getString('emoji');

		const linkReg =
			/https?:(?:www\.)?//discord(?:app)?\.com/channels/(\d{18})/(\d{18})/(\d{18})/g;

		// const [, _guildId, channelId, messageId] = linkReg.exec(link);
		console.log(linkReg.exec(link));

		// (
		// 	interaction.guild.channels.cache.get(channelId) as BaseGuildTextChannel
		// ).messages
		// 	.fetch(messageId)
		// 	.then((message) => {
		// 		if (message) {
		// 			// if message belongs to the bot
		// 			if (message.author.id === client.user?.id) {
		// 				message.edit({
		// 					components: [
		// 						new MessageActionRow().addComponents(
		// 							new MessageButton()
		// 								.setCustomId('asdf')
		// 								.setLabel('Label')
		// 								.setStyle('PRIMARY')
		// 						),
		// 					],
		// 				});
		// 			}
		// 		}
		// 	});
	},
};
