import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';
import { ICommandData } from './commands';
import { readServerData } from '../model/serverData';

export const wtb: ICommandData = {
	name: 'wtb',

	builder: new SlashCommandBuilder()
		.setName('wtb')
		.setDescription('Show interest in buying something from the community')
		.setDefaultPermission(true)
		.addStringOption(option =>
			option
				.setName('item')
				.setDescription('The item you are interested in purchasing')
				.setRequired(true)
		)
		.addIntegerOption(option =>
			option
				.setName('price')
				.setDescription('The price around which you are interesting in purchasing the item')
				.setRequired(false)
		),

	callback: async (interaction) => {
		if (!(interaction instanceof CommandInteraction)) return;
		
		const serverData = readServerData(interaction.guildId);
		if (
			!(interaction.channel instanceof TextChannel)
			|| serverData.craigslistChannel !== interaction.channelId
		){
			interaction.reply({
				content: 'This command cannot be used in this channel.',
				ephemeral: true
			});
			return;
		}
		
		const channel = interaction.channel;
		const item = interaction.options.getString('item');
		const price = interaction.options.getInteger('price');
		const userId = interaction.user.id;

		await interaction.reply({
			content: '<@'
				+ userId
				+ '> is interested in **buying '
				+ item
				+ '**'
				+ (price ? ' for about **$' + price.toString() + '**.' : '.'),
			ephemeral: false
		});
		const reply = await interaction.fetchReply();

		await channel.threads.create({
			startMessage: reply.id,
			name: 'Discussion',
			autoArchiveDuration: 'MAX'
		});
	},
};
