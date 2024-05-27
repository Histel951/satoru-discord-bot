import { ButtonBuilder } from "discord.js";
import { CreateBtnI } from "../../interfaces/ui/CreateBtnI";

export default ({customId, label, style, data = null}: CreateBtnI) => {
    const btn = new ButtonBuilder()
        .setLabel(label)
        .setStyle(style);

    if (data) {
        btn.setCustomId(`${customId}->${JSON.stringify(data)}`);
    } else {
        btn.setCustomId(customId);
    }

    return btn;
}