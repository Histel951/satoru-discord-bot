import { HandlersContainer } from "../containers/HandlersContainer";
import dotaIdModal from "../handlers/me/dotaIdModal";
import setDotaId from "../handlers/me/setDotaId";

export default (handlers: HandlersContainer) => {
    handlers.register('me-dota-id-modal', dotaIdModal)
    handlers.register('dota-profile-id-modal', setDotaId)
};