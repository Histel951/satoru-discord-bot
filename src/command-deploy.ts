import {REST, Routes} from "discord.js"
import { commands } from "./containers";
import 'dotenv/config';

const rest = new REST({
    version: '10'
}).setToken(process.env.DISCORD_TOKEN);


const deployCommands = commands.getAll().map(command => ({
    name: command.data.name,
    description: command.data.description
}));

rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
    body: deployCommands
});

console.log("\nCommand deployment was successful!\n");