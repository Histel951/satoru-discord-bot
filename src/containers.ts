import { CommandContainer } from "./containers/CommandContainer";
import { HandlersContainer } from "./containers/HandlersContainer";
import { registerCommand } from "./commands/auth/registerCommand";
import sendDotaId from "./handlers/auth/sendDotaId";
import { unRegisterCommand } from "./commands/auth/unRegisterCommand";
import { createTeamCommand } from "./commands/team/createTeamCommand";
import createTeamHandler from "./handlers/team/createTeamHandler";
import { inviteToTeamCommand } from "./commands/team/inviteToTeamCommand";
import { acceptInviteCommand } from "./commands/team/acceptInviteCommand";
import { teamKickCommand } from "./commands/team/teamKickCommand";
import { teamInfoCommand } from "./commands/team/teamInfoCommand";
import { inviteListCommand } from "./commands/team/inviteListCommand";
import { cancelTeamInvite } from "./handlers/team/teamInviteHandler";

// Регистрирует команды на сервер
const commands = new CommandContainer();

commands.register(registerCommand)
commands.register(unRegisterCommand)
commands.register(createTeamCommand)
commands.register(inviteToTeamCommand)
commands.register(acceptInviteCommand)
commands.register(teamKickCommand)
commands.register(teamInfoCommand)
commands.register(inviteListCommand)

// Регистрирует обработку события [Название события] => [Обработчик]
const handlers = new HandlersContainer();

handlers.register('player-registration', sendDotaId)
handlers.register('create-team-modal', createTeamHandler)
handlers.register('cancel-team-invite', cancelTeamInvite)

export {
    commands,
    handlers
};