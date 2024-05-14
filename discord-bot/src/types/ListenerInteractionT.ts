import {
    ButtonInteraction,
    ChannelSelectMenuInteraction,
    MentionableSelectMenuInteraction,
    ModalSubmitInteraction,
    RoleSelectMenuInteraction,
    StringSelectMenuInteraction,
    UserSelectMenuInteraction
} from "discord.js";

export type ListenerInteractionT =
        ButtonInteraction |
        StringSelectMenuInteraction |
        UserSelectMenuInteraction |
        RoleSelectMenuInteraction |
        MentionableSelectMenuInteraction |
        ChannelSelectMenuInteraction |
        ModalSubmitInteraction;