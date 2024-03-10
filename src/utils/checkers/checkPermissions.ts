import {CommandInteraction, GuildMember} from "discord.js";
import {RolesEnum} from "../../enums/RolesEnum";

export default async (
    member: GuildMember | undefined,
    interaction: CommandInteraction,
    roleFromEnum: RolesEnum
): Promise<boolean> => {
    const owner = await interaction.guild?.fetchOwner() as GuildMember;

    if (owner.id === member?.id) {
        return true;
    }

    return member !== undefined && member.roles.cache.some(role => role.name === roleFromEnum);
}
