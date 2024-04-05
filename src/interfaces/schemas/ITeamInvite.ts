import mongoose from "mongoose";
import { IPlayer } from "./IPlayer";
import { ITeam } from "./ITeam";

export interface ITeamInvite {
    _id: mongoose.Types.ObjectId
    team_id: ITeam | {
        type: mongoose.Types.ObjectId
        ref: 'Team'
    }
    role: 1 | 2 | 3 | 4 | 5
    player_id: {
        type: mongoose.Types.ObjectId
        ref: 'Team'
    } | IPlayer
}