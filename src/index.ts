import { Client, Collection, Intents } from 'discord.js';

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

const prefix = '!';

client.on('ready', () => {
	console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', message => {
	if (message.author.bot) return;
	if (message.content === 'yo dave') {
		message.react('👋');
	}
});

client.on('messageDelete', message => {
	if (message.guild?.id)
		console.log(`Message deleted in ${message.channel.toString()}`);
})

client.login(process.env.DISCORD_TOKEN);
