import {
    CommandInteraction,
    Interaction,
    InteractionResponse,
} from "discord.js";
import {commands} from "../containers";

export default async (interaction: Interaction): Promise<void> => {
    if (interaction.isCommand()) {
        const command = commands.get(interaction.commandName);

        if (!command) {
            return;
        }

        const interactionMiddleware: CommandInteraction | InteractionResponse | undefined = await command.middleware?.(interaction);

        if (interactionMiddleware instanceof CommandInteraction) {
            await command.execute(interactionMiddleware);
        }
    }
}