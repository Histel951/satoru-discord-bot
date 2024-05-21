import DotaApiPort from "./DotaApiPort";
import OpenDotaClient from "./open-dota/OpenDotaClient";
import OpenDotaAdapter from "./open-dota/OpenDotaAdapter";
import { DotaApiPortI } from "../../interfaces/dota-api/DotaApiPortI";
import StratzDotaAdapter from "./stratz/StratzDotaAdapter";
import StratzDotaClient from "./stratz/StratzDotaClient";

export default class {

    static createOpenDotaPort(): DotaApiPortI {
        return new DotaApiPort(
            new OpenDotaClient(),
            new OpenDotaAdapter()
        );
    }

    static createStratzDotaPort(): DotaApiPortI {
        return new DotaApiPort(
            new StratzDotaClient(),
            new StratzDotaAdapter()
        );
    }
}