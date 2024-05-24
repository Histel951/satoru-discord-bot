import { ClientT } from "../../types/ClientT";
import CreateTeamListener from "./team/CreateTeamListener";
import CancelTeamInviteListener from "./team/CancelTeamInviteListener";
import AcceptTeamInviteListener from "./team/AcceptTeamInviteListener";
import RegisterModalListener from "./auth/OpenRegisterModalBtnListener";
import RegisterModalSubmitListener from "./auth/RegisterModalSubmitListener";
import CreateTeamBtnListener from "./team/CreateTeamBtnListener";
import ShowTeamInfoBtnReplyListener from "./team/ShowTeamInfoBtnReplyListener";
import ShowTeamInfoBtnUpdateListener from "./team/ShowTeamInfoBtnUpdateListener";
import KickPlayerOutTeamBtnListener from "./team/KickPlayerOutTeamBtnListener";
import KickPlayerFromTeamListener from "./team/KickPlayerFromTeamListener";
import AbstractListener from "./AbstractListener";
import {ButtonInteraction, ModalSubmitInteraction} from "discord.js";
import AbstractDataListener from "./AbstractDataListener";

const modalSubmitsListeners: AbstractListener<ModalSubmitInteraction>[] = [
    new CreateTeamListener('create-team-modal'),
    new RegisterModalSubmitListener('register-modal-submit'),
];

const buttonsListeners: AbstractListener<ButtonInteraction>[] = [
    new CancelTeamInviteListener('cancel-team-invite'),
    new AcceptTeamInviteListener('accept-team-invite'),
    new RegisterModalListener('open-register-modal-btn'),
    new CreateTeamBtnListener('create-team-btn'),
    new ShowTeamInfoBtnReplyListener('team-info-btn-reply'),
    new ShowTeamInfoBtnUpdateListener('team-info-btn-update'),
    new KickPlayerOutTeamBtnListener('kick-player-out-team-btn'),
];

const buttonDataListeners: AbstractDataListener<ButtonInteraction, object>[] = [
    new KickPlayerFromTeamListener('kick-player-out-team'),
];

export default (client: ClientT) => {
    modalSubmitsListeners.forEach(listener => {
        client.data?.listeners.modalSubmits.set(listener.getName(), listener);
    });

    buttonsListeners.forEach(listener => {
        client.data?.listeners.buttons.set(listener.getName(), listener);
    });

    buttonDataListeners.forEach(listener => {
        client.data?.listeners.buttonsData.set(listener.getName(), listener);
    });
}