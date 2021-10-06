import {Message} from 'discord.js'

module.exports = {
    name: 'help',
    execute(m: Message, args: string[]){
        m.channel.send("this is help")
    },
}