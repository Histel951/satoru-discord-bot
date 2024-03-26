// Оставил как пример
import { ButtonInteraction, ModalSubmitInteraction, UserSelectMenuInteraction } from "discord.js";
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, UserSelectMenuBuilder } from "discord.js";
import { HandleResponse } from "../types/HandleTypes";
import { createTeam } from "../utils/team";
import { createUser } from "../utils/user";
import createInput from "../utils/ui/createInput";
import {User} from "../database/models";

export const teamCreateHandler = async (interaction: ButtonInteraction): HandleResponse => {
    const user = await User.findOne({
        discord_id: interaction.user.id
    }).exec();

    if (!user) {
        await createUser({
            discord_id: interaction.user.id,
            player_id: null,
        });
    }

    const teamNameInput = createInput({
        customId: 'team-name-input',
        label: 'Как будет называться команда?',
        style: TextInputStyle.Short,
    });

    const row = new ActionRowBuilder<TextInputBuilder>().addComponents(teamNameInput);

    const modal = new ModalBuilder()
        .setCustomId('create-team-modal')
        .setTitle('Создать команду')
        .addComponents(row);

    return interaction.showModal(modal);
};

export const createTeamHandler = async (interaction: ModalSubmitInteraction): HandleResponse => {
    const teamName = interaction.fields.getTextInputValue('team-name-input');

    await createTeam({
        discord_id: interaction.user.id,
        name: teamName
    });

    return interaction.reply({ content: `Команда "${teamName}" создана`, ephemeral: true });
};

export const addMemberToTeamHandler = (interaction: ButtonInteraction): HandleResponse => {
    const userSelect = new UserSelectMenuBuilder()
        .setCustomId('submit-members-to-team');

    const row = new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(userSelect);

    return interaction.reply({
        content: 'Выберите пользователя:',
        components: [row],
        ephemeral: true
    });
};

export const submitTeamMembersHandler = (interaction: UserSelectMenuInteraction): HandleResponse => {
    return interaction.reply({
        content: 'Игрокам отправлен запрос на вступление в команду.',
        ephemeral: true
    });
};