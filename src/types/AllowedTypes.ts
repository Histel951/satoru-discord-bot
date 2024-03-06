import {
    ButtonInteraction,
    CacheType,
    ChannelSelectMenuInteraction,
    ComponentType,
    InteractionResponse,
    MentionableSelectMenuInteraction,
    ModalSubmitInteraction,
    RoleSelectMenuInteraction,
    StringSelectMenuInteraction,
    UserSelectMenuInteraction
} from "discord.js";

export type AllowedCollectorFilterArgumentT = [
        ButtonInteraction<CacheType> |
        StringSelectMenuInteraction<CacheType> |
        UserSelectMenuInteraction<CacheType> |
        RoleSelectMenuInteraction<CacheType> |
        MentionableSelectMenuInteraction<CacheType> |
        ChannelSelectMenuInteraction<CacheType> |
        ModalSubmitInteraction<CacheType>
];

export type AllowedComponentType =
    ComponentType.Button |
    ComponentType.StringSelect |
    ComponentType.UserSelect |
    ComponentType.RoleSelect |
    ComponentType.MentionableSelect |
    ComponentType.ChannelSelect;

export type AllowedInteraction =
    StringSelectMenuInteraction |
    UserSelectMenuInteraction |
    RoleSelectMenuInteraction |
    MentionableSelectMenuInteraction |
    ChannelSelectMenuInteraction |
    ButtonInteraction |
    ModalSubmitInteraction;