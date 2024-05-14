import { PlayerInfoT } from "../../types/dota-api/adapter/PlayerInfoT";

export interface DotaApiPortI {
    playerInfo(playerId: number): Promise<PlayerInfoT>;
}