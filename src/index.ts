import { channel } from 'diagnostics_channel';
import {
	Client,
	CommandInteraction,
	DMChannel,
	Intents,
	PartialGroupDMChannel,
	TextChannel,
} from 'discord.js';
import { commands } from './commands/commands';
import { log } from './logging/log';
import { finalizeSetup, setup } from './setup';

export const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

setup();

client.on('ready', () => {
	finalizeSetup();
	console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageDelete', (message) => {
	if (message.guildId && message.channel instanceof TextChannel) {
		log(
			message.guildId,
			`Message deleted in ${message.channel.name}: ${message.content}`
		);
	}
});

client.on('interactionCreate', (interaction) => {
	if (!(interaction instanceof CommandInteraction)) return;
	console.log(`Interaction with ${interaction.commandName}`);
	console.log(commands.get(interaction.commandName));
	console.log(commands);
	commands
		.get(interaction.commandName)
		?.callback(interaction)
		.then(() => console.log('Successfully executed command'));
});

client.login(process.env.DISCORD_TOKEN);
