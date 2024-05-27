import { ButtonStyle } from "discord.js";

export interface CreateBtnI {
    customId: string,
    label: string,
    style: ButtonStyle,
    data?: object | null,
}