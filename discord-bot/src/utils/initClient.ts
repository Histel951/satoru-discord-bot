import { Client, ClientOptions, Collection } from "discord.js";
import { ClientT } from "../types/ClientT";

export default (clientOptions: ClientOptions): ClientT => {
    const client = new Client(clientOptions) as ClientT;

    client.data = {
        commands: new Collection(),
        listeners: {
            modalSubmits: new Collection(),
            buttons: new Collection(),
        },
    };

    return client;
}