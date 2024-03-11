import { CommandType } from "../types/CommandTypes";
import { RolesEnum } from "../enums/RolesEnum";
import getCurrentMember from "../utils/members/getCurrentMember";
import removeRoleByName from "../utils/roles/removeRoleByName";
import {Guild, RoleManager} from "discord.js";
import getMember from "../utils/members/getMember";
import addRoleByName from "../utils/roles/addRoleByName";
import checkPermissions from "../utils/checkers/checkPermissions";

export const unRegisterCommand: CommandType = {
    name: 'unregister',
    description: 'Отменяет регистрацию пользователя',
    options: [
        option =>
        option.setName('tag')
            .setDescription('Тэг пользователя из имя#тэг.')
            .setRequired(true),
    ],
    middleware: async interaction => {
        const member = await getCurrentMember(interaction);

        if (!await checkPermissions(member, interaction, RolesEnum.admin)) {

            return interaction.reply({
                content: `У вас нет прав для использования этой команды.`,
                ephemeral: true,
            });
        }

        return interaction;
    },
    execute: async interaction => {
        const options = interaction.options;
        const userTag = options.get('tag')?.value as string;

        const member = getMember(userTag, interaction.guild as Guild);

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
};