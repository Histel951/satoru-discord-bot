import {
    GatewayIntentBits,
    Events,
    GuildMember,
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

const client = initClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
    ]
});

client.on(Events.ClientReady, async () => {
    console.log('Client ready!');

    await connectToDatabase();

    console.log('Database ready!');

    loadCommands(client);
    loadListeners(client);

    console.log('Loaded commands and listeners!')
});

client.on(Events.InteractionCreate, async (interaction: InteractionT) => {
    await execCommand(interaction);
    await execListener(interaction);
});

client.on(Events.GuildMemberAdd, async (member: GuildMember) => {
    await joinToGuildHandler(member);
});

client.login(process.env.DISCORD_TOKEN).catch((error: CatchErrorT) => {
    console.error('Client login error: ' + handleError(error));
});
