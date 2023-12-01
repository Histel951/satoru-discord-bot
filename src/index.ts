import {
    Client,
    GatewayIntentBits,
    Events,
    Interaction,
    CommandInteraction
} from "discord.js";
import { commands } from "./containers";
import 'dotenv/config';


const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.on(Events.ClientReady, (client): void => {
    if (process.env.ENV === 'prod') {
        console.log(`Logged in as ${client.user.tag}!`);
    }
});

client.on('interactionCreate', async (interaction: Interaction|CommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    await commands.get(interaction.commandName).execute(interaction);
});

client.login(process.env.DISCORD_TOKEN);