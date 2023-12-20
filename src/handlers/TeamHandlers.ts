import {
    ActionRowBuilder,
    ButtonInteraction,
    CacheType,
    ModalBuilder,
    ModalSubmitInteraction,
    TextInputBuilder,
    TextInputStyle,
    UserSelectMenuBuilder,
    UserSelectMenuInteraction,
} from "discord.js"
import { HandleResponse } from "../containers/types"
import { createTeam } from "../utils/team";
import { createPlayer, findByDiscordId } from "../utils/player";

export const teamCreateHandler = async (interaction: ButtonInteraction<CacheType>): HandleResponse => {
    const player = await findByDiscordId(interaction.user.id)

    if (!player) {
        await createPlayer({
            discord_id: interaction.user.id,
            team: null,
            fantasy_points: 0
        })
    }

    const commandNameInput = new TextInputBuilder()
        .setCustomId('team-name-input')
        .setLabel('Как будет называться команда?')
        .setValue('TestTeam')
        .setStyle(TextInputStyle.Short)

        const row = new ActionRowBuilder<TextInputBuilder>().addComponents(commandNameInput)

        const modal = new ModalBuilder()
            .setCustomId('create-team-modal')
            .setTitle('Создать команду')

        modal.addComponents(row)

    return interaction.showModal(modal)
}

export const createTeamHandler = async (interaction: ModalSubmitInteraction): HandleResponse => {
    const teamName = interaction.fields.getTextInputValue('team-name-input')

    await createTeam({
        discordId: interaction.user.id,
        name: teamName
    });

    return interaction.reply({content: `Команда "${teamName}" создана`, ephemeral: true})
}

export const addMembersToTeamHandler = (interaction: ButtonInteraction) => {
    const userSelect = new UserSelectMenuBuilder()
        .setCustomId('submit-members-to-team')
        .setPlaceholder('Выбор участников')
        .setMinValues(0)
        .addDefaultUsers(interaction.user.id)
        .setMaxValues(4);

    const row = new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(userSelect)

    return interaction.reply({
        content: 'Выберите участников вашей команды:',
        components: [row],
        ephemeral: true
    })
}

export const submitTeamMembersHandler = (interaction: UserSelectMenuInteraction): HandleResponse => {
    return interaction.reply({
        content: 'Игрокам отправлен запрос на вступление в команду.',
        ephemeral: true
    })
}