import { Client, Intents } from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('message', m => {
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