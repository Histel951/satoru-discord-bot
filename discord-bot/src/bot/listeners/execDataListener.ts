import { InteractionT } from "../../types/InteractionT";
import { BaseInteraction, Collection } from "discord.js";
import AbstractDataListener from "./AbstractDataListener";

export default async <InteractionType extends InteractionT & BaseInteraction>
(
    interaction: InteractionType,
    listeners: Collection<string, AbstractDataListener<InteractionType, object>>,
    listenerName: string,
    data: object
) => {
    const listener = listeners.get(listenerName);

    if (listener?.execute) {
        listener.setData(data);
        await listener.execute(interaction);
    }
}