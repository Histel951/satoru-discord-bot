import { InteractionT } from "../../types/InteractionT";
import { BaseInteraction, Collection } from "discord.js";
import AbstractListener from "./AbstractListener";

export default async <Interaction extends InteractionT & BaseInteraction>
(interaction: Interaction, listeners: Collection<string, AbstractListener<Interaction>>) => {
    if (!interaction.customId) {
        return;
    }

    const listener = listeners.get(interaction.customId);

    if (listener?.execute) {
        await listener.execute(interaction);
    }
}