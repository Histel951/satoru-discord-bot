import { ListenerType } from "../../../types/ListenerTypes";
import { ModalSubmitInteraction } from "discord.js";
import { InteractionT } from "../../../types/InteractionT";

export default class implements ListenerType<ModalSubmitInteraction & InteractionT> {

    public name = 'player-registration';

    async execute(interaction: ModalSubmitInteraction) {

    }
}