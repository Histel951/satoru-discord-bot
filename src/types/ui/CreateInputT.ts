import { TextInputStyle } from "discord.js";

export type CreateInputT = {
    customId: string
    label: string
    style: TextInputStyle
    value?: string | ''
    required?: boolean
}