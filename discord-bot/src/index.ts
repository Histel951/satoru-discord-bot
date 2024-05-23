import {
    GatewayIntentBits,
    Events,
    GuildMember, Message, CollectorFilter, ButtonInteraction, ModalSubmitInteraction,
} from "discord.js";
import loadCommands from "./bot/commands/loadCommands";
import loadListeners from "./bot/listeners/loadListeners";
import connectToDatabase from "./database/connect";
import execCommand from "./bot/commands/execCommand";
import { InteractionT } from "./types/InteractionT";
import execListener from "./bot/listeners/execListener";
import initClient from "./utils/initClient";
import joinToGuildHandler from "./utils/joinToGuildHandler";
import { CatchErrorT } from "./types/CatchErrorT";
import handleError from "./utils/handleError";
import { ListenerInteractionT as LInteractionT } from "./types/ListenerInteractionT";
import { ListenerType } from "./types/ListenerTypes";

const client = initClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
    ]
});

const listenersExecutes = async (interaction: InteractionT) => {
    if (!interaction.client.data) {
        return;
    }

    if (interaction.isButton()) {
        await execListener<ListenerType<ButtonInteraction>>(interaction, interaction.client.data.listeners.buttons);
    }

    if (interaction.isModalSubmit()) {
        await execListener<ListenerType<ModalSubmitInteraction>>(interaction, interaction.client.data.listeners.modalSubmits);
    }
}

client.on(Events.ClientReady, async () => {
    console.log('Client ready!');

    await connectToDatabase();

    console.log('Database ready!');

    loadCommands(client);
    loadListeners(client);

    console.log('Loaded commands and listeners!')
});

client.on(Events.InteractionCreate, async (interaction: InteractionT) => {
    if (interaction.isCommand()) {
        await execCommand(interaction);
    }

    if (!interaction.client.data?.listeners) {
        return;
    }

    await listenersExecutes(interaction);
});

client.on(Events.MessageCreate, async (message: Message) => {
    const filter: CollectorFilter<[LInteractionT]> = i => i.user.id === message.author.id;

    try {
        await message.awaitMessageComponent({
            time: 120000,
            filter
        }).then(async (interaction) => {
            await listenersExecutes(interaction);
        });
    } catch (e) {}
});

client.on(Events.GuildMemberAdd, async (member: GuildMember) => {
    await joinToGuildHandler(member);
});

client.login(process.env.DISCORD_TOKEN).catch((error: CatchErrorT) => {
    console.error('Client login error: ' + handleError(error));
});
