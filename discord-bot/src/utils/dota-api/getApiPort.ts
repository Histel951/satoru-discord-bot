import DotaApiPort from "./DotaApiPort";
import OpenDotaClient from "./open-dota/OpenDotaClient";
import oDAxios from "../../plugins/oDaxios";
import OpenDotaAdapter from "./open-dota/OpenDotaAdapter";

type dotaApiPorts = 'open-dota' | 'startz';

export default (port: dotaApiPorts) => {
    switch (port) {
        case "open-dota":
            return new DotaApiPort(
                new OpenDotaClient(oDAxios),
                new OpenDotaAdapter()
            );
        case "startz":
            return undefined;
        default:
            return undefined;
    }
}