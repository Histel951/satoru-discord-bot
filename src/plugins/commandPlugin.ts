import {
    CommandInteraction,
    Interaction,
    InteractionResponse,
    ModalSubmitInteraction
} from "discord.js";
import {commands, handlers} from "../containers";

export default async (interaction: Interaction): Promise<void> => {
    if (interaction.isCommand()) {
        const command = commands.get(interaction.commandName);

        if (!command) {
            return;
        }

        const interactionMiddleware: CommandInteraction | InteractionResponse | undefined = await command.middleware?.(interaction);

        if (interactionMiddleware instanceof CommandInteraction) {
            const message = await command.execute(interactionMiddleware);

            interactionMiddleware.awaitModalSubmit({
                time: 600000,
                filter: i => i.user.id === interaction.user.id
            }).then(async (interaction: ModalSubmitInteraction) => {
                await handlers.execute(interaction);
            });
        }
    }
}