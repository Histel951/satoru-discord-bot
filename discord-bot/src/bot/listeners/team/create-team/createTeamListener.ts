import { GuildMember, ModalSubmitInteraction } from "discord.js";
import createTeam from "../../../../utils/team/createTeam";
import getCurrentMember from "../../../../utils/members/getCurrentMember";
import { ListenerType } from "../../../../types/ListenerTypes";

const listener: ListenerType<ModalSubmitInteraction> = {
    name: 'create-team-modal',
    execute: async interaction => {
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
}

export default listener;