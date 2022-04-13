import { Client, CommandInteraction, Intents, TextChannel } from 'discord.js';
import { commands } from './commands/commands';
import { log } from './logging/log';
import { updateSocialCredit } from './model/userData';
import { setup } from './setup';
import {
	calculateSocialCredit,
	doSocialCreditActions,
} from './socialCredit/socialCredit';

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
	console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', async (msg) => {
	if (msg.author.bot) return;
	if (msg.guildId && msg.member) {
		const credit = calculateSocialCredit(msg.content);
		doSocialCreditActions(msg.member, credit);
		updateSocialCredit(msg.guildId, msg.author.id, credit);
	}
});

client.on('messageDelete', async (msg) => {
	if (msg.guildId && msg.channel instanceof TextChannel) {
		log(msg.guildId, `Message deleted in <#${msg.channel.id}>`);
	}
});

client.on('guildMemberAdd', async (member) => {
	console.log(member);
	log(
		member.guild.id,
		`${member.user.tag} (${member.user.id}) joined the server`
	);
});

client.on('guildMemberRemove', async (member) => {
	console.log(member);
	log(
		member.guild.id,
		`${member.user.tag} (${member.user.id}) left the server`
	);
});

client.on('interactionCreate', async (interaction) => {
	if (!(interaction instanceof CommandInteraction)) return;
	commands.get(interaction.commandName)?.callback(interaction);
});

client.login(process.env.DISCORD_TOKEN);
