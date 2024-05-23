import { ClientT } from "../../types/ClientT";
import { ListenerType } from "../../types/ListenerTypes";
import { ButtonInteraction, ModalSubmitInteraction } from "discord.js";
import CreateTeamListener from "./team/CreateTeamListener";
import CancelTeamInviteListener from "./team/CancelTeamInviteListener";
import AcceptTeamInviteListener from "./team/AcceptTeamInviteListener";
import RegisterModalListener from "./auth/OpenRegisterModalBtnListener";
import RegisterModalSubmitListener from "./auth/RegisterModalSubmitListener";
import CreateTeamBtnListener from "./team/CreateTeamBtnListener";
import ShowTeamInfoBtnListener from "./team/ShowTeamInfoBtnListener";

const modalSubmitsListeners: ListenerType<ModalSubmitInteraction>[] = [
    new CreateTeamListener('create-team-modal'),
    new RegisterModalSubmitListener('register-modal-submit'),
];

const buttonsListeners: ListenerType<ButtonInteraction>[] = [
    new CancelTeamInviteListener('cancel-team-invite'),
    new AcceptTeamInviteListener('accept-team-invite'),
    new RegisterModalListener('open-register-modal-btn'),
    new CreateTeamBtnListener('create-team-btn'),
    new ShowTeamInfoBtnListener('team-info-btn'),
];

export default (client: ClientT) => {
    modalSubmitsListeners.forEach(listener => {
        client.data?.listeners.modalSubmits.set(listener.getName(), listener);
    });

    buttonsListeners.forEach(listener => {
        client.data?.listeners.buttons.set(listener.getName(), listener);
    });
}