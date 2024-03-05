import { TextInputBuilder, TextInputStyle } from "discord.js";
import {CreateInputT} from "../../types/ui/CreateInputT";

export default ({customId, label, style, value = ''}: CreateInputT): TextInputBuilder => {
    return new TextInputBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setValue(value)
        .setStyle(style);
}