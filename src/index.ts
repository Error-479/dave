import { Client, Intents } from 'discord.js';
const client = new Client({ 
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
 });

const prefix = '!';

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.message.id === '895372392845688874') {
    if (reaction.emoji.name === '🍎'){
      console.log('Apple emoji detected for specific message!');
      /* TODO: Check if the bot has the manage_messages permission before
         trying to remove a reaction to avoid potential errors */
      reaction.remove();
    }
  }
});

client.on('messageCreate', m => {
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
