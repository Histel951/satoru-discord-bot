import { HandleResponse } from "../../types/HandleTypes";
import {ButtonInteraction, TextInputBuilder, TextInputStyle} from "discord.js";
import createInput from "../../utils/ui/createInput";
import createModal from "../../utils/ui/createModal";

export default async (interaction: ButtonInteraction): HandleResponse => {

    const dotaIdInput = createInput({
        customId: 'input-dota-profile-id',
        label: 'Укажите id профиля доты 2:',
        style: TextInputStyle.Short,
    });

    const modal = createModal<TextInputBuilder>({
        customId: 'dota-profile-id-modal',
        title: 'ID Dota',
        rows: [dotaIdInput],
    });

    return interaction.showModal(modal);
}