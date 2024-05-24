import { ListenerResponse, ListenerType } from "../../types/ListenerTypes";
import { InteractionT } from "../../types/InteractionT";
import { BaseInteraction } from "discord.js";

export default abstract class<InteractionListenerT extends InteractionT & BaseInteraction> implements ListenerType {

    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    abstract execute(interaction: InteractionListenerT): ListenerResponse;
}