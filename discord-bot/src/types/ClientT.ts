import { ButtonInteraction, Client, Collection, CommandInteraction, ModalSubmitInteraction } from "discord.js";
import { CommandI } from "../interfaces/CommandI";
import { ListenerType } from "./ListenerTypes";

export type ClientT = Client & {
    data?: {
        commands: Collection<string, CommandI<CommandInteraction>>,
        listeners: {
            modalSubmits: Collection<string, ListenerType<ModalSubmitInteraction>>
            buttons: Collection<string, ListenerType<ButtonInteraction>>,
        },
    }
}