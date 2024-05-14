export interface DotaApiClient<PlayerInfoResponseT> {
    playerInfo(playerId: number): Promise<PlayerInfoResponseT>;
}