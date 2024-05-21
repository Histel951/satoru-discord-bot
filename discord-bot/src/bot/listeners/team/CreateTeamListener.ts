import AbstractListener from "../AbstractListener";
import getCurrentMember from "../../../utils/members/getCurrentMember";
import { GuildMember, ModalSubmitInteraction } from "discord.js";
import createTeam from "../../../utils/team/createTeam";
import { InteractionT } from "../../../types/InteractionT";

export default class extends AbstractListener<ModalSubmitInteraction> {
    async execute(interaction: ModalSubmitInteraction & InteractionT) {
        const name = interaction.fields.getTextInputValue('input-team-name');
        const imageUrl = interaction.fields.getTextInputValue('input-file-url');
        const color = interaction.fields.getTextInputValue('input-color');

        const member = await getCurrentMember(interaction) as GuildMember;

        const team = await createTeam({
            discordId: interaction.user.id,
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