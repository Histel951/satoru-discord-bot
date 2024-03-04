import { TextInputBuilder, TextInputStyle } from "discord.js";

export default (
    customId: string,
    label: string,
    inputStyle: TextInputStyle,
    value: string = ''
): TextInputBuilder => {
    return new TextInputBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setValue(value)
        .setStyle(inputStyle);
}