import { TextInputBuilder } from "discord.js";
import { CreateInputT } from "../../types/ui/CreateInputT";

export default ({
        customId,
        label,
        style,
        value = '',
        required = true,
        minLength = null,
        maxLength = null
    }: CreateInputT
): TextInputBuilder => {
    const builder =  new TextInputBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setValue(value)
        .setStyle(style)
        .setRequired(required);

    if (minLength) {
        builder.setMinLength(minLength);
    }

    if (maxLength) {
        builder.setMaxLength(maxLength);
    }

    return builder;
}