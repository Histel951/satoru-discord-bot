import createInput from "../../../utils/ui/createInput";
import { ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import createModal from "../../../utils/ui/createModal";

export default (): ModalBuilder => createModal<TextInputBuilder>({
    customId: 'create-team-modal',
    title: 'Создание команды',
    rows: [
        createInput({
            customId: 'input-team-name',
            label: 'Название команды',
            style: TextInputStyle.Short,
        }),
        createInput({
            customId: 'input-file-url',
            label: 'URL (Imgur) на файл картинки вашей команды',
            style: TextInputStyle.Short,
            required: false,
        }),
        createInput({
            customId: 'input-color',
            label: 'Цвет команды',
            style: TextInputStyle.Short,
            required: false,
        }),
    ],
});