import { gql } from "urql";

export default gql`
query ($playerId: Long!) {
    player(steamAccountId: $playerId) {
        names(take: 1) {
            name
        }
        performance {
            position {
                roleMatchCount
                roleWinCount
                roleType
            }
            rank
        }
        leaderboardRanks(take: 1) {
            rank
        }
        lastMatchDate
        steamAccount {
            profileUri
            id
        }
    }
}
`;