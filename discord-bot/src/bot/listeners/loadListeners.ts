import { ClientT } from "../../types/ClientT";
import { ListenerType } from "../../types/ListenerTypes";
import { ButtonInteraction, ModalSubmitInteraction } from "discord.js";
import SendDotaIdListener from "./auth/SendDotaIdListener";
import CreateTeamListener from "./team/CreateTeamListener";
import CancelTeamInviteListener from "./team/CancelTeamInviteListener";
import AcceptTeamInviteListener from "./team/AcceptTeamInviteListener";

const modalSubmitsListeners: ListenerType<ModalSubmitInteraction>[] = [
    new SendDotaIdListener('player-registration'),
    new CreateTeamListener('create-team-modal'),
];

const buttonsListeners: ListenerType<ButtonInteraction>[] = [
    new CancelTeamInviteListener('cancel-team-invite'),
    new AcceptTeamInviteListener('accept-team-invite'),
];

export default (client: ClientT) => {
    modalSubmitsListeners.forEach(listener => {
        client.data?.listeners.modalSubmits.set(listener.getName(), listener);
    });

    buttonsListeners.forEach(listener => {
        client.data?.listeners.buttons.set(listener.getName(), listener);
    });
}