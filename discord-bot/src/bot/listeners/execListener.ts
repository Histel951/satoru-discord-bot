import { ListenerInteractionT as LInteractionT } from "../../types/ListenerInteractionT";
import {
    ButtonInteraction,
    CollectorFilter,
    ComponentType,
    Interaction,
    MessageComponentInteraction,
    MessageComponentType
} from "discord.js";
import { InteractionT } from "../../types/InteractionT";
import { ListenerExec } from "../../types/ListenerTypes";

const handleMessageComponent = <ListenerInteractionT extends MessageComponentInteraction>(
    componentType: MessageComponentType,
    executable: ListenerExec<ListenerInteractionT>,
    interaction: Interaction,
    collectorFilter: CollectorFilter<[LInteractionT]>
) => {
    interaction.channel?.awaitMessageComponent({
        componentType: componentType,
        time: 600000,
        filter: collectorFilter
    }).then(async (interaction) => {
        await executable(interaction as ListenerInteractionT);
    });
};

export default async (interaction: InteractionT) => {
    const listeners = interaction.client.data?.listeners;

    if (!listeners) {
        return;
    }

    if (interaction.isModalSubmit()) {
        await listeners.modalSubmits.get(interaction.customId)?.execute(interaction);
        return;
    }

    const userFilter: CollectorFilter<[LInteractionT]> = i => i.user.id === interaction.user.id;

    if (interaction.isButton()) {
        const listener = listeners.buttons.get(interaction.customId);

        if (listener) {
            handleMessageComponent<ButtonInteraction>(ComponentType.Button, listener.execute, interaction, userFilter);
        }
    }
}