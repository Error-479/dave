import {readdir} from 'fs';
import {Collection} from 'discord.js';
import {runEvent} from '../types/types';

export function setup(commands: Collection<string[], (event: runEvent) => any>, path: string): void {
    readdir(path + '/commands/', (err, allFiles) => {
        if(err) console.log(err);
        let files = allFiles.filter(f => f.split('.').pop() === ('js'));
        if (files.length <= 0) console.log('No commands found!');
        else for(let file of files) {
            const command = require(path + `/commands/${file}`) as {names: string[], run: (event: runEvent) => any};
            commands.set(command.names, command.run);
            console.log(`Added command(s) ${command.names}`);
        }
    });
}