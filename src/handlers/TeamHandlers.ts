import { ActionRowBuilder, ButtonInteraction, CacheType, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
import { HandleResponse } from "../containers/types";

export const teamCreateHandler = (interaction: ButtonInteraction<CacheType>): HandleResponse => {
    const commandNameInput = new TextInputBuilder()
        .setCustomId('team-name-input')
        .setLabel('Как будет называться команда?')
        .setValue('TestTeam')
        .setStyle(TextInputStyle.Short)

        const row = new ActionRowBuilder<TextInputBuilder>().addComponents(commandNameInput);

        const modal = new ModalBuilder()
            .setCustomId('create-team-modal')
            .setTitle('Создать команду')

        modal.addComponents(row);

    return interaction.showModal(modal);
}

export const createTeamHandler = (interaction: ModalSubmitInteraction): HandleResponse => {
    const teamName = interaction.fields.getTextInputValue('team-name-input');

    return interaction.reply({content: `Команда "${teamName}" создана`, ephemeral: true});
}