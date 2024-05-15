import { REST, Routes, SlashCommandBuilder } from "discord.js"
import getCommandsList from "./utils/getCommandsList";

const commands = getCommandsList();

const rest = new REST({
    version: '10'
}).setToken(process.env.DISCORD_TOKEN ?? '');

const deployCommands = commands.map(command => {
    const builder = new SlashCommandBuilder()
        .setName(command.getName())
        .setDescription(command.getDescription());

    if (command.getOptions) {
        const commandOptions = command.getOptions();

        commandOptions.forEach(option => {
            builder.addStringOption(option)
        })
    }

    return builder;
})

rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID ?? ''), {
    body: deployCommands
}).then(() => {
    console.log("\nCommand deployment was successful!\n");
});