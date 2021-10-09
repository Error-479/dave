import {runEvent} from '../types/types';

export const names = ['ping', 'pings', 'alive'];

export function run(event: runEvent): void
{
    event.message.reply('pong');
}