import { CommandI } from "../interfaces/CommandI";
import { CommandInteraction } from "discord.js";
import { registerCommand } from "../bot/commands/auth/register/registerCommand";
import { unRegisterCommand } from "../bot/commands/auth/un-register/unRegisterCommand";
import { tournamentCreateCommand } from "../bot/commands/tournament/tournament-create/tournamentCreateCommand";
import { createTeamCommand } from "../bot/commands/team/create-team/createTeamCommand";
import { inviteToTeamCommand } from "../bot/commands/team/invite-to-team/inviteToTeamCommand";
import { acceptInviteCommand } from "../bot/commands/team/accept-invite/acceptInviteCommand";
import { teamKickCommand } from "../bot/commands/team/team-kick/teamKickCommand";
import { teamInfoCommand } from "../bot/commands/team/team-info/teamInfoCommand";
import { inviteListCommand } from "../bot/commands/team/invite-list/inviteListCommand";

export default (): CommandI<CommandInteraction>[] => [
    registerCommand,
    unRegisterCommand,
    createTeamCommand,
    inviteToTeamCommand,
    acceptInviteCommand,
    teamKickCommand,
    teamInfoCommand,
    inviteListCommand,
    tournamentCreateCommand,
];