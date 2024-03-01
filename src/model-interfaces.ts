import {Types} from "mongoose";

export interface PlayerInterface {
    discord_id: string,
    team: TeamInterface|null,
}

export interface TeamInterface {
    name: string,
    owner: PlayerInterface,
}