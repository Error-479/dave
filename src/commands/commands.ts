import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { SlashCommandBuilder } from '@discordjs/builders';
import { setLogs } from './setLogs';
import { Interaction } from 'discord.js';

const rest = new REST({ version: '10' }).setToken(
	process.env.DISCORD_TOKEN || 'failed'
);

export interface ICommandData {
	name: string;
	builder: SlashCommandBuilder;
	callback: (interaction: Interaction) => Promise<void>;
}

export const commands: Map<string, ICommandData> = new Map([
	['setlogs', setLogs],
]);

export async function putSlashCommands(guildId: string) {
	try {
		console.log(`Refreshing commands for guild ${guildId}`);

		await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID || 'missing',
				guildId
			),
			{
				body: Array.from(commands, ([_name, command]) => {
					return command.builder;
				}),
			}
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
}
