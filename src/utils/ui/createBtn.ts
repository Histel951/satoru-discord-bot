import { ButtonBuilder } from "discord.js";
import { CreateBtnT } from "../../types/ui/CreateBtnT";

export default ({customId, label, style}: CreateBtnT) => {
    return new ButtonBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setStyle(style)
}