import { Client, ClientOptions, Collection } from "discord.js";
import { ClientT } from "../types/ClientT";
import getApiPort from "./dota-api/getApiPort";

export default (clientOptions: ClientOptions): ClientT => {
    const apiPort = getApiPort('open-dota');

    if (!apiPort) {
        throw new Error('Undefined dota api port.');
    }

    const client = new Client(clientOptions) as ClientT;

    client.data = {
        commands: new Collection(),
        listeners: {
            modalSubmits: new Collection(),
            buttons: new Collection(),
        },
        dotaApi: apiPort,
    }

    return client;
}