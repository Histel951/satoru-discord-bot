export type PlayerInfoStratzResponseT = {
    player: {
        names: [{
            name: string
        }],
        performance: {
            position: [{
                roleMatchCount: number
                roleWinCount: number
                roleType: string
            }],
        },
        leaderboardRanks: [{
            rank: number
        }],
        lastMatchDate: number
        steamAccount: {
            profileUri: string
            id: number
        },
        ranks: [{
            rank: number
            seasonRankId: number
        }],
    }
}
