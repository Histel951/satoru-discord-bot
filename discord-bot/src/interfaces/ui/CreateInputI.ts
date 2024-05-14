import { TextInputStyle } from "discord.js";

export interface CreateInputI {
    customId: string
    label: string
    style: TextInputStyle
    value?: string | ''
    required?: boolean
    minLength?: number | null
    maxLength?: number | null
}