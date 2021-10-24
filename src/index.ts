import {Client, Collection, Intents} from 'discord.js';
import {setup as chandlerSetup} from './util/commandHandler';
import {changeStatus} from './util/statusChanger';
import {changePresence} from './util/presenceChanger';
import {runEvent, PresenceData} from './types/types'
import {ActivityTypes} from 'discord.js/typings/enums';

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

let commands = new Collection<string[], (event: runEvent) => void>();


const prefix = '!';

chandlerSetup(commands, __dirname);

client.on('ready', () => {

  console.log(`Logged in as ${client.user?.tag}!`);

  // below are examples of how to change status or presence
  // changeStatus(client, ActivityTypes.LISTENING, 'learn.uark.edu');
  // changePresence(client, PresenceData.ONLINE, 'with typescript');
});

client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.content[0] === prefix) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cf = commands.find((r,n) => n.includes(args[0]));
    if(!cf) return;
    else cf({
      message,
      args,
      client
    })
  }
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

client.login(process.env.DISCORD_TOKEN);
