import { InteractionResponse } from "discord.js";
import { HandleType, HandlersMap } from "../types/HandleTypes";
import { AllowedInteraction } from "../types/AllowedTypes";
import { Executable } from "../interfaces/Executable";
import { Container } from "../interfaces/Container";
import { Registrable } from "../interfaces/Registrable";

export class HandlersContainer implements Container, Executable<AllowedInteraction>, Registrable
{
    private readonly handlers: HandlersMap;

    constructor()
    {
        this.handlers = new Map();
    }

    public register(key: string, handler: HandleType | any): void
    {
        this.handlers.set(key, handler);
    }

    public get(key: string): HandleType | undefined
    {
        return this.handlers.get(key);
    }

    public async execute(interaction: AllowedInteraction): Promise<void|InteractionResponse>
    {
        const handler = this.handlers.get(interaction.customId);

        if (!handler) {
            return undefined;
        }

        return handler(interaction)
    }
}