import { InteractionResponse } from "discord.js";

export interface Executable<InteractionType> {
    execute: (interaction: InteractionType) => Promise<void|InteractionResponse>
}