import {CommandInteraction, InteractionResponse, TextInputBuilder, TextInputStyle} from "discord.js";
import createInput from "../../../../utils/ui/createInput";
import createModal from "../../../../utils/ui/createModal";

export default async (interaction: CommandInteraction): Promise<InteractionResponse<boolean>|void> => {
    const dotaIdInput = createInput({
        customId: 'input-dota-profile-id',
        label: 'Укажите ID профиля Dota 2:',
        style: TextInputStyle.Short,
    });

    const modal = createModal<TextInputBuilder>({
        customId: 'player-registration',
        title: 'Регистрация игрока',
        rows: [dotaIdInput],
    });

    return interaction.showModal(modal);
}