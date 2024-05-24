import AbstractListener from "../AbstractListener";
import { ButtonInteraction, } from "discord.js";
import { InteractionT } from "../../../types/InteractionT";
import showTeamInfoBtnReply from "../../../utils/replies/showTeamInfoBtnReply";

export default class extends AbstractListener<ButtonInteraction> {

    async execute(interaction: ButtonInteraction & InteractionT) {
        return showTeamInfoBtnReply(interaction, true);
    }
}