import { InteractionResponse } from "discord.js";

export type ListenerResponse = Promise<void|InteractionResponse>;

export type ListenerExec<InteractionT> = (interaction: InteractionT) => ListenerResponse

export type ListenerType<InteractionT> = {
    getName: () => string,
    execute?: ListenerExec<InteractionT>,
};