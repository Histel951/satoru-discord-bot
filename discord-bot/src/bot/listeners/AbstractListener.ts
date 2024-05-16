import { ListenerType } from "../../types/ListenerTypes";
import { InteractionT } from "../../types/InteractionT";

export default abstract class<InteractionListenerT> implements ListenerType<InteractionListenerT & InteractionT> {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}