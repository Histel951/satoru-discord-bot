import { DotaApiClient } from "../../../interfaces/dota-api/DotaApiClient";
import { PlayerInfoStratzResponseT } from "../../../types/dota-api/open-dota/responses/PlayerInfoStratzResponseT";
import { createClient, Client, debugExchange, cacheExchange, fetchExchange } from "urql";
import playerInfoQuery from "../../../graphql/stratz/playerInfoQuery";

export default class implements DotaApiClient<PlayerInfoStratzResponseT> {

    private readonly client: Client;

    constructor() {
        this.client = createClient({
            url: process.env.STRATZ_API_URL as string,
            exchanges: [debugExchange, cacheExchange, fetchExchange],
            fetchOptions: () => {
                const token = process.env.STRATZ_DOTA_API_TOKEN;

                return {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Cache-Control': 'max-age=0',
                        'Authorization': `bearer ${token}`,
                    }
                };
            }
        });
    }

    async playerInfo(playerId: number): Promise<PlayerInfoStratzResponseT|any> {
        const response = this.client.query(playerInfoQuery, { playerId }).toPromise();
        const { data } = await response;

        return data;
    }
}