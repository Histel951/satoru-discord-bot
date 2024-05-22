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
            rank: number,
        },
        leaderboardRanks: [{
            rank: number,
        }],
        lastMatchDate: number,
        steamAccount: {
            profileUri: string,
            id: number,
        },
    }
}