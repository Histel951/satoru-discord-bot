import { ButtonInteraction, InteractionResponse, ModalSubmitInteraction } from "discord.js";
import { Mixed } from "mongoose";

export type HandleInteraction = ButtonInteraction | ModalSubmitInteraction;

export type HandleType = (interaction: HandleInteraction) => Promise<void|InteractionResponse>;

export type HandlersMap = Map<string, HandleType>;