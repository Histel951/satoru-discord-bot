export type PlayerInfoOpenDotaResponseT = {
    profile: {
        account_id: number,
        personaname: string,
        name: string|null,
        plus: boolean,
        cheese: number,
        steamid: string,
        avatar: string,
        avatarmedium: string,
        avatarfull: string,
        profileurl: string,
        last_login: string,
        loccountrycode: string,
        status: string|null,
        fh_unavailable: boolean,
        is_contributor: boolean,
        is_subscriber: boolean,
    }
    rank_tier: number,
    leaderboard_rank: number|null
}