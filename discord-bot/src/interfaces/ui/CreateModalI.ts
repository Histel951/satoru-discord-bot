import { AnyComponentBuilder } from "discord.js";

export interface CreateModalI {
    customId: string
    title: string
    rows?: AnyComponentBuilder[],
}