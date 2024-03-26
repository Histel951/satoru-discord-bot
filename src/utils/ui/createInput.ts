import { TextInputBuilder } from "discord.js";
import { CreateInputT } from "../../types/ui/CreateInputT";

export default ({customId, label, style, value = '', required = true}: CreateInputT): TextInputBuilder => {
    return new TextInputBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setValue(value)
        .setStyle(style)
        .setRequired(required);
}