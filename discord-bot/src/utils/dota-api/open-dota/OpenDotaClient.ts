import { DotaApiClient } from "../../../interfaces/dota-api/DotaApiClient";
import { AxiosInstance } from "axios";
import { PlayerInfoResponseT } from "../../../types/dota-api/open-dota/responses/PlayerInfoResponseT";

export default class OpenDotaClient implements DotaApiClient<PlayerInfoResponseT> {

    private readonly axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async playerInfo(playerId: number): Promise<PlayerInfoResponseT> {
        const { data } = await this.axios.get<PlayerInfoResponseT>(`/players/${playerId}`);
        return data;
    }
}