import {
    Client,
    GatewayIntentBits,
    Events,
    Interaction,
    ComponentType,
    CollectorFilter,
    GuildMember,
} from "discord.js";
import { handlers } from "./containers";
import "./database/connect";
import {
    AllowedCollectorFilterArgumentT,
    AllowedInteraction,
    AllowedComponentType,
} from "./types/AllowedTypes";
import { Executable } from "./interfaces/Executable";
import handleError from "./utils/handleError";
import { RolesEnum } from "./enums/RolesEnum";
import addRoleByName from "./utils/addRoleByName";
import commandPlugin from "./plugins/commandPlugin";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
    ]
});

client.on(Events.ClientReady, (client): void => {
    if (process.env.ENV === 'prod') {
        console.log(`Logged in as ${client.user.tag}!`);
    }
});

const handleMessageComponent = (
    componentType: AllowedComponentType,
    executable: Executable<AllowedInteraction>,
    interaction: Interaction,
    collectorFilter: CollectorFilter<AllowedCollectorFilterArgumentT>
) => {
    interaction.channel?.awaitMessageComponent({
        componentType: componentType,
        time: 600000,
        filter: collectorFilter
    }).then(async (interaction: AllowedInteraction) => {
        await executable.execute(interaction);
    });
};

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    const userFilter: CollectorFilter<AllowedCollectorFilterArgumentT> = i => i.user.id === interaction.user.id;

    handleMessageComponent(ComponentType.Button, handlers, interaction, userFilter);
    handleMessageComponent(ComponentType.UserSelect, handlers, interaction, userFilter);

    await commandPlugin(interaction);
});



client.on(Events.GuildMemberAdd, async (member: GuildMember) => {
    try {
        // Выдача роли новому пользователю
        await addRoleByName(member, RolesEnum.Unproved, member.guild.roles)
    } catch (e) {
        console.log(`Ошибка при выдаче роли: ${handleError(e as Error)}`)
    }
});

client.login(process.env.DISCORD_TOKEN).catch(e => {
    console.error(e)
});
