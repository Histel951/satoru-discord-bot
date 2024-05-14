import { DotaApiPortI } from "../../interfaces/dota-api/DotaApiPortI";
import { DotaPlayerApiAdapter } from "../../interfaces/dota-api/DotaPlayerApiAdapter";
import { DotaApiClient } from "../../interfaces/dota-api/DotaApiClient";
import { PlayerInfoT } from "../../types/dota-api/adapter/PlayerInfoT";

export default class DotaApiPort<PlayerInfoResponseT> implements DotaApiPortI {

    private readonly client: DotaApiClient<PlayerInfoResponseT>;

    private readonly adapter: DotaPlayerApiAdapter<PlayerInfoResponseT>;

    constructor(client: DotaApiClient<PlayerInfoResponseT>, adapter: DotaPlayerApiAdapter<PlayerInfoResponseT>) {
        this.client = client;
        this.adapter = adapter;
    }

    async playerInfo(playerId: number): Promise<PlayerInfoT> {
        return this.adapter.playerInfo(
            await this.client.playerInfo(playerId)
        );
    }
}