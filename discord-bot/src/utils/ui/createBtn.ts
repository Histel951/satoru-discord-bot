import { ButtonBuilder } from "discord.js";
import { CreateBtnI } from "../../interfaces/ui/CreateBtnI";

export default ({customId, label, style}: CreateBtnI) => {
    return new ButtonBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setStyle(style)
}