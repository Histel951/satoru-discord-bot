import {
    Interaction,
} from "discord.js";
import { ClientT } from "./ClientT";

export type InteractionT = Interaction & {
    client: ClientT,
}