import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';
import { ICommandData } from './commands';
import { readServerData } from '../model/serverData';

export const wts: ICommandData = {
	name: 'wts',

	builder: new SlashCommandBuilder()
		.setName('wts')
		.setDescription('Show interest in selling something to the community')
		.setDefaultPermission(true)
		.addStringOption(option =>
			option
				.setName('item')
				.setDescription('The item you are interested in selling')
				.setRequired(true)
		)
		.addIntegerOption(option =>
			option
				.setName('price')
				.setDescription('The price around which you are interesting in selling the item')
				.setRequired(true)
		)
		.addBooleanOption(option =>
			option
				.setName('obo')
				.setDescription('Whether or not you are selling the item for your price "or best offer"')
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
		const obo = interaction.options.getBoolean('obo');
		const userId = interaction.user.id;

		await interaction.reply({
			content: '<@'
				+ userId
				+ '> is interested in **selling '
				+ item
				+ '** for **$'
				+ (price ?? 'priceMachineBroke').toString()
				+ '**'
				+ (obo ? ' or best offer' : '')
				+ '.',
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
