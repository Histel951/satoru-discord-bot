import mongoose from "mongoose";

export interface ITeamInvite {
    _id: mongoose.Types.ObjectId
    team_id: {
        type: mongoose.Types.ObjectId
        ref: 'Team'
    }
    role: number,
    player_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Player'
    }
}