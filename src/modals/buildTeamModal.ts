import createInput from "../utils/ui/createInput";
import { ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import createModal from "../utils/ui/createModal";

export default (): ModalBuilder => {
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

    return createModal<TextInputBuilder>({
        customId: 'create-team-modal',
        title: 'Создание команды',
        rows: [teamNameInput, fileUrlInput],
    });
}