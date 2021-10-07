import { Client, Intents } from 'discord.js';
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

const prefix = '!';

client.once('ready', () => {
	console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageReactionAdd', async (reaction, user) => {
	// Cache message
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Failed to fetch: ', error);
			return;
		}
	}

	// Process reactions
	if (reaction.message.content != null && reaction.message.content.includes(prefix + 'reacttest')) {
		if (reaction.emoji.name === '🍎') {
			console.log('Someone reacted with an apple emoji in a message that contained the text !reacttest.');
			try {
				await reaction.remove();
			} catch (error) {
				console.log('Failed to remove reaction: ', error);
				return;
			}
		}
	}
});

client.on('messageCreate', (m) => {
	if (m.author.bot) return;
	if (m.content[0] === prefix) {
		const args = m.content.slice(prefix.length).split(/(\s+)/);
		console.log(args);
		if (args[0] === 'help') {
			m.reply('no');
		}
	}
});

client.login(process.env.DISCORD_TOKEN);
