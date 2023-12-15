import { ButtonInteraction, InteractionResponse, ModalSubmitInteraction } from "discord.js";
import { Mixed } from "mongoose";

export type HandleInteraction = ButtonInteraction | ModalSubmitInteraction;

export type HandleResponse = Promise<void|InteractionResponse>;

export type HandleType = (interaction: HandleInteraction) => HandleResponse;

export type HandlersMap = Map<string, HandleType>;