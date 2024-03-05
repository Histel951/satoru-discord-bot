import fetchPlayerInfo from "../../utils/dota/fetchPlayerInfo";
import { ModalSubmitInteraction } from "discord.js";
import { HandleResponse } from "../../types/HandleTypes";

// 876474970
export default async (interaction: ModalSubmitInteraction): HandleResponse => {
    const dotaId = interaction.fields.getTextInputValue('input-dota-profile-id');
    const playerInfo = await fetchPlayerInfo(dotaId);

    console.log(playerInfo);

    return interaction.reply({ content: `Добавление информация об игроке`, ephemeral: true });
}