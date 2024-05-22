import { CommandOptionSetCallbackT } from "../../../interfaces/CommandI";
import { CommandInteraction, Guild, RoleManager } from "discord.js";
import getMemberByTag from "../../../utils/members/getMemberByTag";
import removeRoleByName from "../../../utils/roles/removeRoleByName";
import { RolesEnum } from "../../../enums/RolesEnum";
import addRoleByName from "../../../utils/roles/addRoleByName";
import AbstractCommand from "../AbstractCommand";

export default class extends AbstractCommand {

    async execute(interaction: CommandInteraction) {
        const options = interaction.options;
        const userTag = options.get('tag')?.value as string;

        const member = await getMemberByTag(userTag, interaction.guild as Guild);

        if (!member) {
            return interaction.reply({
                content: 'Пользователь не найден.',
                ephemeral: true,
            });
        }

        await removeRoleByName(member, RolesEnum.Verified, interaction.guild?.roles as RoleManager);

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

        await addRoleByName(member, RolesEnum.UnVerified, member.guild.roles)

        return interaction.reply({
            content: `Пользователь больше не зарегистрирован.`,
            ephemeral: true,
        });
    }

    getOptions(): CommandOptionSetCallbackT[] {
        return [
            option =>
                option.setName('tag')
                .setDescription('Tag пользователя.')
                .setRequired(true),
        ];
    }
}