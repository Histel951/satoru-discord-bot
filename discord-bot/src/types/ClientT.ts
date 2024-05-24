import { ButtonInteraction, Client, Collection, CommandInteraction, ModalSubmitInteraction } from "discord.js";
import { CommandI } from "../interfaces/CommandI";
import AbstractListener from "../bot/listeners/AbstractListener";
import AbstractDataListener from "../bot/listeners/AbstractDataListener";

export type ClientT = Client & {
    data?: {
        commands: Collection<string, CommandI<CommandInteraction>>,
        listeners: {
            modalSubmits: Collection<string, AbstractListener<ModalSubmitInteraction>>
            buttons: Collection<string, AbstractListener<ButtonInteraction>>,
            buttonsData: Collection<string, AbstractDataListener<ButtonInteraction, object>>,
        },
    }
}