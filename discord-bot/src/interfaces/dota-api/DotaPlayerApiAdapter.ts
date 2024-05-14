import { PlayerInfoT } from "../../types/dota-api/adapter/PlayerInfoT";

export interface DotaPlayerApiAdapter<PlayerInfoResponseT> {
    playerInfo(response: PlayerInfoResponseT): PlayerInfoT;
}