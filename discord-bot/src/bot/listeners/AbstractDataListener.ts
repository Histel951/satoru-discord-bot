import AbstractListener from "./AbstractListener";
import { ListenerResponse } from "../../types/ListenerTypes";
import { InteractionT } from "../../types/InteractionT";
import { BaseInteraction } from "discord.js";

export default abstract class<InteractionListenerT extends InteractionT & BaseInteraction, DataT extends {}> extends AbstractListener<InteractionListenerT> {

    private data: DataT;

    constructor(name: string) {
        const splitNameData = name.split(':');

        super(splitNameData[0]);
        this.data = {} as DataT;
    }

    setData(data: DataT) {
        this.data = data;
    }

    getData(): DataT {
        return this.data;
    }

    abstract execute(interaction: InteractionListenerT): ListenerResponse;
}