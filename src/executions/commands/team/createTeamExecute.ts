import { CommandInteraction, InteractionResponse } from "discord.js";
import buildTeamModal from "../../../modals/buildTeamModal";

export default async (interaction: CommandInteraction): Promise<InteractionResponse|void> =>
    interaction.showModal(buildTeamModal())