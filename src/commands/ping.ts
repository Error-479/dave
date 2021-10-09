import {runEvent} from '../types/types';

export function run(event: runEvent): void
{
    event.message.reply('pong');
}
export const names = ['ping', 'pings', 'alive'];