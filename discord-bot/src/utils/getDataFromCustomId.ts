import {BaseInteraction, MessageComponentInteraction} from "discord.js";

export default (interaction: BaseInteraction & MessageComponentInteraction): { name: string, data: object|undefined } => {
    const [name, jsonData] = interaction.customId?.split('->');

    console.log(name, jsonData);

    return {
        name,
        data: jsonData ? JSON.parse(jsonData) : undefined,
    };
};