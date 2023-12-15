import { ButtonInteraction, CacheType, InteractionResponse } from "discord.js";
import { HandleType, HandlersMap, HandleInteraction } from "./types";

export class HandlersContainer
{
    private readonly handlers: HandlersMap;

    constructor()
    {
        this.handlers = new Map();
    }

    public register(key: string, handler: HandleType): void
    {
        this.handlers.set(key, handler);
    }

    public get(key: string): HandleType
    {
        return this.handlers.get(key);
    }

    public execute(key: string, interaction: HandleInteraction): Promise<void|InteractionResponse>
    {
        return this.handlers.get(key)(interaction);
    }
}