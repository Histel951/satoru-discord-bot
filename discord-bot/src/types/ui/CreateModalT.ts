import {AnyComponentBuilder, ComponentBuilder} from "discord.js";

export type CreateModalT = {
    customId: string
    title: string
    rows?: AnyComponentBuilder[],
}