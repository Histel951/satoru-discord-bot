import { CreateModalI } from "../../interfaces/ui/CreateModalI";
import {
    ActionRowBuilder,
    AnyComponentBuilder,
    ModalBuilder,
} from "discord.js";

export default <ComponentBuilderType extends AnyComponentBuilder>({ customId, title, rows = [] }: CreateModalI): ModalBuilder => {

    const modal = new ModalBuilder()
        .setCustomId(customId)
        .setTitle(title)

    if (rows) {
        const componentRows = [...(rows as ComponentBuilderType[])].map(
            row => new ActionRowBuilder<ComponentBuilderType>().addComponents(row));

        // @ts-ignore
        modal.addComponents(componentRows);
    }

    return modal;
}