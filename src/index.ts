import {
    Client,
    GatewayIntentBits,
    Events,
    Interaction,
    CommandInteraction,
    Integration,
    ComponentType,
    ModalSubmitInteraction,
    ButtonInteraction,
    CacheType,
    InteractionResponse,
    ActivityType
} from "discord.js";
import { commands, handlers } from "./containers";
import 'dotenv/config';

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.on(Events.ClientReady, (client): void => {
    if (process.env.ENV === 'prod') {
        console.log(`Logged in as ${client.user.tag}!`);
    }
});

client.on(Events.InteractionCreate, async (interaction: Interaction|CommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    const collectorFilter = i => {
        return i.user.id === interaction.user.id;
    };

    interaction.channel.awaitMessageComponent({
        componentType: ComponentType.Button,
        time: 600000,
        filter: collectorFilter
    }).then(async (interaction: ButtonInteraction<CacheType>) => {
        return await handlers.execute(interaction.customId, interaction);
    });

    interaction.awaitModalSubmit({
        time: 600000,
        filter: collectorFilter
    }).then(async (interaction: ModalSubmitInteraction) => {
        return await handlers.execute(interaction.customId, interaction);
    });

    await commands.get(interaction.commandName).execute(interaction);
});

client.login(process.env.DISCORD_TOKEN);