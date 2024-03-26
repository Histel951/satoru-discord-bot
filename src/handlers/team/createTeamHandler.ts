import {Colors, GuildMember, ModalSubmitInteraction} from "discord.js";
import { createTeam } from "../../utils/team";
import addRoleByName from "../../utils/roles/addRoleByName";
import getCurrentMember from "../../utils/members/getCurrentMember";
import getRandomValue from "../../utils/getRandomValue";

export default async (interaction: ModalSubmitInteraction): Promise<void> => {
    const teamName = interaction.fields.getTextInputValue('input-team-name');
    const teamAvatarFileUrl = interaction.fields.getTextInputValue('input-file-url');

    const member = await getCurrentMember(interaction) as GuildMember;

    const team = await createTeam({
        discord_id: interaction.user.id,
        name: teamName,
        avatar_url: teamAvatarFileUrl,
    });

    if (!team) {
        throw new Error(`Team not created.`);
    }

    const teamRole = await interaction.guild?.roles.create({
        name: teamName,
        color: getRandomValue(Colors),
        reason: `Создание команды ${teamName}`
    });
    await addRoleByName(member, teamName, member.guild.roles);

    await interaction.reply({ content: `Команда ${teamName} создана!`, ephemeral: true });
}