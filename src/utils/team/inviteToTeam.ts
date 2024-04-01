import { ITeam } from "../../interfaces/schemas/ITeam";
import { ITeamInvite } from "../../interfaces/schemas/ITeamInvite";
import { TeamInvite } from "../../database/models";
import { IPlayer } from "../../interfaces/schemas/IPlayer";

export default async (team: ITeam & Document, player: IPlayer & Document): Promise<ITeamInvite & Document> => {

    const invite = new TeamInvite({
        player_id: player,
        team_id: team,
    });

    await invite.save();

    return invite;
}