import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';
import { checkSocialCredit } from './checkSocialCredit';
import { drunkTank } from './drunkTank';

const rest = new REST({ version: '10' }).setToken(
	process.env.DISCORD_TOKEN || ''
);

export interface ICommandData {
	name: string;
	builder:
		| SlashCommandBuilder
		| Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
	callback: (interaction: Interaction) => Promise<void>;
}

export const commands: Map<string, ICommandData> = new Map([
	// ['setlogs', setLogs],
	// ['addreactrole', addReactRole],
	['socialcredit', checkSocialCredit],
	['drunktank', drunkTank],
]);

export async function putSlashCommands(guildId: string) {
	try {
		console.log(`Refreshing commands for guild ${guildId}`);

		if (process.env.CLIENT_ID)
			await rest.put(
				Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
				{
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					body: Array.from(commands, ([_name, command]) => {
						return command.builder.toJSON();
					}),
				}
			);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
}
