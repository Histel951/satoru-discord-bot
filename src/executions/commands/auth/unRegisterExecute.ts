import { CommandInteraction, Guild, InteractionResponse, RoleManager } from "discord.js";
import getMemberByTag from "../../../utils/members/getMemberByTag";
import removeRoleByName from "../../../utils/roles/removeRoleByName";
import { RolesEnum } from "../../../enums/RolesEnum";
import addRoleByName from "../../../utils/roles/addRoleByName";

export default async (interaction: CommandInteraction): Promise<InteractionResponse|void> => {
    const options = interaction.options;
    const userTag = options.get('tag')?.value as string;

    const member = await getMemberByTag(userTag, interaction.guild as Guild);

    if (!member) {
        return interaction.reply({
            content: 'Пользователь не найден.',
            ephemeral: true,
        });
    }

    await removeRoleByName(member, RolesEnum.Approved, interaction.guild?.roles as RoleManager);

    const ranks = [
        RolesEnum.Uncalibrated,
        RolesEnum.Herald,
        RolesEnum.Guardian,
        RolesEnum.Crusader,
        RolesEnum.Archon,
        RolesEnum.Legend,
        RolesEnum.Ancient,
        RolesEnum.Divine,
        RolesEnum.Immortal
    ];

    ranks.forEach(rankName => {
        removeRoleByName(member, rankName, interaction.guild?.roles as RoleManager)
    });

    await addRoleByName(member, RolesEnum.Unproved, member.guild.roles)

    return interaction.reply({
        content: `Пользователь больше не зарегистрирован.`,
        ephemeral: true,
    });
}