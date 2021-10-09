import {Client, Message} from "discord.js";

export interface runEvent {
    message: Message,
    client: Client,
    args: string[]
}