import { InteractionT } from "../../types/InteractionT";
import {BaseInteraction, Collection, MessageComponentInteraction} from "discord.js";
import {ListenerType} from "../../types/ListenerTypes";

export default async <ListenerT extends ListenerType<any>>
(interaction: InteractionT, listeners: Collection<string, ListenerT>) => {
    if (!interaction.customId) {
        return;
    }

    const listener = listeners.get(interaction.customId);

    if (listener?.execute) {
        await listener.execute(interaction);
    }
}