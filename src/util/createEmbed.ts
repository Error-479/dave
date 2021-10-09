import {ColorResolvable, MessageEmbed} from "discord.js";

export function CreateEmbed(color: ColorResolvable, title: string, url:string, authorName: string, authorImage: string, description: string,
                            thumbnail: string, image: string, footerText: string, footerUrl: string): MessageEmbed
{
    return new MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setURL(url)
        .setAuthor(authorName, authorImage)
        .setDescription(description)
        .setThumbnail(thumbnail)
        .setImage(image)
        .setTimestamp()
        .setFooter(footerText, footerUrl);
}