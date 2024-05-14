import { ClientT } from "../../types/ClientT";
import { ListenerType } from "../../types/ListenerTypes";
import sendDotaIdListener from "./auth/send-dota-id/sendDotaIdListener";
import createTeamListener from "./team/create-team/createTeamListener";
import { ButtonInteraction, ModalSubmitInteraction } from "discord.js";
import cancelTeamInviteListener from "./team/cancel-team-invite/cancelTeamInviteListener";
import acceptTeamInviteListener from "./team/accept-team-invite/acceptTeamInviteListener";

const modalSubmitsListeners: ListenerType<ModalSubmitInteraction>[] = [
    sendDotaIdListener,
    createTeamListener,
];

const buttonsListeners: ListenerType<ButtonInteraction>[] = [
    cancelTeamInviteListener,
    acceptTeamInviteListener,
];

export default (client: ClientT) => {
    modalSubmitsListeners.forEach(listener => {
        client.data?.listeners.modalSubmits.set(listener.name, listener);
    });

    buttonsListeners.forEach(listener => {
        client.data?.listeners.buttons.set(listener.name, listener);
    })
}