import { InteractionResponse } from "discord.js";

export type ListenerResponse = Promise<void|InteractionResponse>;

export type ListenerExec<InteractionT> = (interaction: InteractionT) => ListenerResponse

export type ListenerType<InteractionT> = {
    name: string,
    execute: ListenerExec<InteractionT>,
};