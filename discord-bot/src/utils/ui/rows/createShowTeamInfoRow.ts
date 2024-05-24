import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import createBtn from "../createBtn";

export default (label: string, interactionReply: 'reply' | 'update') => new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        createBtn({
            label: label,
            customId: `team-info-btn-${interactionReply}`,
            style: ButtonStyle.Primary,
        }),
    );