import AbstractListener from "../AbstractListener";
import { ModalSubmitInteraction } from "discord.js";
import registerMember from "../../../utils/auth/registerMember";

export default class extends AbstractListener<ModalSubmitInteraction> {

    async execute(interaction: ModalSubmitInteraction) {
        const dotaId = interaction.fields.getTextInputValue('input-dota-profile-id');

        try {
            // await registerMember(interaction, dotaId);
        } catch (error) {
            console.error("An error occurred:", error);

            return await interaction.reply({ content: "An error occurred while processing your request.", ephemeral: true });
        }

        return interaction.reply({
            ephemeral: true,
            content: 'Вы успешно зарегистрировались!'
        });
    }
}
