import { InteractionResponse } from "discord.js";

export type ListenerResponse = Promise<void|InteractionResponse|any>;

export type ListenerType = {
    getName: () => string,
};