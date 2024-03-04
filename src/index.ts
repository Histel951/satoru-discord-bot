import {
    Client,
    GatewayIntentBits,
    Events,
    Interaction,
    CommandInteraction,
    ComponentType,
    CollectorFilter,
    ModalSubmitInteraction,
} from "discord.js";
import { commands, handlers } from "./containers";
import "./database/connect";
import {
    AllowedCollectorFilterArgumentT,
    AllowedInteraction,
    AllowedComponentType,
} from "./types/AllowedTypes";
import { Executable } from "./interfaces/Executable";
import handleError from "./utils/handleError";

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.on(Events.ClientReady, (client): void => {
    if (process.env.ENV === 'prod') {
        console.log(`Logged in as ${client.user.tag}!`);
    }
});

const componentTimeout: number = 600000;

const handleMessageComponent = (
    componentType: AllowedComponentType,
    executable: Executable<AllowedInteraction>,
    interaction: Interaction | CommandInteraction,
    collectorFilter: CollectorFilter<AllowedCollectorFilterArgumentT>
) => {
    interaction.channel?.awaitMessageComponent({
        componentType: componentType,
        time: componentTimeout,
        filter: collectorFilter
    }).then(async (interaction: AllowedInteraction) => {
        await executable.execute(interaction);
    });
};

client.on(Events.InteractionCreate, async (interaction: Interaction | CommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    const userFilter: CollectorFilter<AllowedCollectorFilterArgumentT> = i => i.user.id === interaction.user.id;

    handleMessageComponent(ComponentType.Button, handlers, interaction, userFilter);
    handleMessageComponent(ComponentType.UserSelect, handlers, interaction, userFilter);

    interaction.awaitModalSubmit({
        time: componentTimeout,
        filter: userFilter
    }).then(async (interaction: ModalSubmitInteraction) => {
        await handlers.execute(interaction);
    });

    try {
        const command = commands.get(interaction.commandName);
        if (command) await command.execute(interaction);
    } catch (e) {
        console.error(`Error processing "${interaction.commandName}" command: ${handleError(e as Error)}`)

        await interaction.reply({
            content: 'Произошла ошибка при выполнении команды.',
            ephemeral: true
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
