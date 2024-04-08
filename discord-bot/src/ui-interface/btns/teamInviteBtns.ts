import createBtn from "../../utils/ui/createBtn";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default () => new ActionRowBuilder<ButtonBuilder>().addComponents(
    createBtn({
        customId: 'cancel-team-invite',
        label: 'отклонить',
        style: ButtonStyle.Danger,
    }),
    createBtn({
        customId: 'accept-team-invite',
        label: 'принять',
        style: ButtonStyle.Primary,
    })
);