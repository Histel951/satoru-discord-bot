import { InteractionResponse } from "discord.js";
import { AllowedInteraction } from "./AllowedTypes";

export type HandleResponse = Promise<void|InteractionResponse>;

export type HandleType = (interaction: AllowedInteraction | undefined) => HandleResponse;

export type HandlersMap = Map<string, any>;