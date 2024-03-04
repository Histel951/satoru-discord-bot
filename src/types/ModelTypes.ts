export type CreateTeamType = {
    discordId: string
    name: string
}

export type PlayerT = {
    discord_id: string
    team: TeamT|null
}

export type TeamT = {
    name: string,
    owner: PlayerT,
}