export type CreateTeamType = {
    discordId: string
    name: string
}

export type CreateUserT = {
    discord_id: string
    player_id: number | null
}

export type CreateTeamT = {
    name: string,
    owner_id: number | null,
}