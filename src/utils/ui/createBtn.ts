import {ButtonBuilder, ButtonStyle} from "discord.js";

export default (customId: string, label: string, style: ButtonStyle) => {
    return new ButtonBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setStyle(style)
}