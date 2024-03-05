import { CreateModalT } from "../../types/ui/CreateModalT";
import {
    ActionRowBuilder,
    AnyComponentBuilder,
    ModalBuilder,
} from "discord.js";

export default <ComponentBuilderType extends AnyComponentBuilder>({ customId, title, rows = [] }: CreateModalT): ModalBuilder => {

    const modal = new ModalBuilder()
        .setCustomId(customId)
        .setTitle(title)

    if (rows) {
        const actionRow = new ActionRowBuilder<ComponentBuilderType>()
            .addComponents(...(rows as ComponentBuilderType[]));

        // @ts-ignore
        modal.addComponents(actionRow);
    }

    return modal;
}