import {CommandInteraction, InteractionResponse, TextInputBuilder, TextInputStyle} from "discord.js";
import createInput from "../../../utils/ui/createInput";
import createModal from "../../../utils/ui/createModal";

export default async (interaction: CommandInteraction): Promise<InteractionResponse<boolean>|void> => {
    const teamNameInput = createInput({
        customId: 'input-team-name',
        label: 'Название команды',
        style: TextInputStyle.Short,
    });

    const fileUrlInput = createInput({
        customId: 'input-file-url',
        label: 'URL (Imgur) на файл картинки вашей команды',
        style: TextInputStyle.Short,
        required: false,
    });

    const modal = createModal<TextInputBuilder>({
        customId: 'create-team-modal',
        title: 'Создание команды',
        rows: [teamNameInput, fileUrlInput],
    });

    return interaction.showModal(modal);
};