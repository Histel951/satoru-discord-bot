import { CommandContainer } from "./containers/CommandContainer";
import {idiNahuiCommand} from "./commands/IdiNahuiCommand";
import { CreateTeamCommand } from "./commands/CreateTeamCommand"; 
import { HandlersContainer } from "./containers/HandlersContainer";
import { ActionRowBuilder, ButtonInteraction, CacheType, InteractionResponse, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js";

const commands = new CommandContainer();

commands.register(idiNahuiCommand);
commands.register(CreateTeamCommand);

const handlers = new HandlersContainer();

handlers.register('team-create-btn', (interaction: ButtonInteraction<CacheType>): Promise<void> => {
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
});

handlers.register('create-team-modal', (interaction: ModalSubmitInteraction) => {
    const teamName = interaction.fields.getTextInputValue('team-name-input');

    return interaction.reply({content: `Команда "${teamName}" создана`, ephemeral: true});
});

export {
    commands,
    handlers
};