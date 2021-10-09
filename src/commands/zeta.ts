import {runEvent} from '../types/types';

export const names = ['zeta', 'loser', 'techdeck'];

export function run(event: runEvent): void
{
    event.message.reply('Tech Deck');
    event.message.channel.send('🛹');
    event.message.react('🛹');
}