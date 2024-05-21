import { DotaApiClient } from "../../../interfaces/dota-api/DotaApiClient";
import axios, { AxiosInstance } from "axios";
import { PlayerInfoOpenDotaResponseT } from "../../../types/dota-api/open-dota/responses/PlayerInfoOpenDotaResponseT";

export default class implements DotaApiClient<PlayerInfoOpenDotaResponseT> {

    private readonly axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: process.env.OPEN_DOTA_API_URL,
            timeout: 1000,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Cache-Control': 'max-age=0'
            }
        });
    }

    async playerInfo(playerId: number): Promise<PlayerInfoOpenDotaResponseT> {
        const { data } = await this.axios.get<PlayerInfoOpenDotaResponseT>(`/players/${playerId}`);
        return data;
    }
}