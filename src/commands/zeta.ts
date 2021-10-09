import {runEvent} from '../types/types';

export function run(event: runEvent): void
{
    event.message.reply('Tech Deck');
    event.message.channel.send('🛹');
    event.message.react('🛹');
}

export const names = ['zeta', 'loser', 'techdeck'];