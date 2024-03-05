import { ModalSubmitInteraction } from "discord.js";
import { Player } from "../../database/models";
import showPlayerInfo from "../../utils/me/showPlayerInfo";
import updatePlayerInfo from "../../utils/dota/updatePlayerInfo";
import { createUser } from "../../utils/user";
import { User } from "../../database/models";

export default async (interaction: ModalSubmitInteraction) => {
    try {
        const dotaId = interaction.fields.getTextInputValue('input-dota-profile-id');
        const [playerInfo, player] = await updatePlayerInfo(dotaId);

        let user = await User.findOne({ discord_id: interaction.user.id });

        if (!user) {
            await createUser({
                discord_id: interaction.user.id,
                player_id: player._id,
            });
        } else {
            await Player.deleteOne({ _id: player._id });
            await User.updateOne({ discord_id: interaction.user.id }, { player_id: player._id });
        }

        await interaction.reply({ content: showPlayerInfo(playerInfo), ephemeral: true });
    } catch (error) {
        console.error("An error occurred:", error);
        await interaction.reply({ content: "An error occurred while processing your request.", ephemeral: true });
    }
};
