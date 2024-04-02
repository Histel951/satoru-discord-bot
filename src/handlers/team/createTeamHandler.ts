import {Colors, GuildMember, ModalSubmitInteraction} from "discord.js";
import createTeam from "../../utils/team/createTeam";
import addRoleByName from "../../utils/roles/addRoleByName";
import getCurrentMember from "../../utils/members/getCurrentMember";
import getRandomValue from "../../utils/getRandomValue";

export default async (interaction: ModalSubmitInteraction): Promise<void> => {
    const name = interaction.fields.getTextInputValue('input-team-name');
    const imageUrl = interaction.fields.getTextInputValue('input-file-url');
    const color = interaction.fields.getTextInputValue('input-color');

    const member = await getCurrentMember(interaction) as GuildMember;

    const team = await createTeam({
        discord_id: interaction.user.id,
        name,
        image_url: imageUrl,
        color,
    });

    if (!team) {
        throw new Error(`Team not created.`);
    }

    await interaction.reply({ content: `Команда ${name} создана!`, ephemeral: true });
}