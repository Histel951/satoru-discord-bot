import { CommandType } from "../types/CommandTypes";
import { RolesEnum } from "../enums/RolesEnum";
import getCurrentMember from "../utils/members/getCurrentMember";
import removeRoleByName from "../utils/roles/removeRoleByName";
import { RoleManager } from "discord.js";
import getMember from "../utils/members/getMember";
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

        if (member && member.roles.cache.some(role => role.name === RolesEnum.Unproved)) {

            return interaction.reply({
                content: `Вы не зарегистрированны.`,
                ephemeral: true,
            });
        }

        return interaction;
    },
    execute: async interaction => {
        // const member = await getCurrentMember(interaction);
        const options = interaction.options;
        console.log(options.data)

        return ;

        // const member = await getMember(interaction.options, interaction.guild);
        //
        // if (!member) {
        //     return interaction.reply({
        //         content: 'Пользователь не найден.',
        //         ephemeral: true,
        //     });
        // }
        //
        // await removeRoleByName(member, RolesEnum.Approved, interaction.guild?.roles as RoleManager);
        //
        // const ranks = [
        //     RolesEnum.Uncalibrated,
        //     RolesEnum.Herald,
        //     RolesEnum.Guardian,
        //     RolesEnum.Crusader,
        //     RolesEnum.Archon,
        //     RolesEnum.Legend,
        //     RolesEnum.Ancient,
        //     RolesEnum.Divine,
        //     RolesEnum.Immortal
        // ];
        //
        // ranks.forEach(rankName => {
        //     removeRoleByName(member, rankName, interaction.guild?.roles as RoleManager)
        // });
        //
        // return interaction.reply({
        //     content: `Пользователь больше не зарегистрирован.`,
        //     ephemeral: true,
        // })
    }
}