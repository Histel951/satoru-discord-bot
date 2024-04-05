import { CommandContainer } from "./containers/CommandContainer";
import { HandlersContainer } from "./containers/HandlersContainer";
import sendDotaId from "./handlers/auth/sendDotaId";
import createTeamHandler from "./handlers/team/createTeamHandler";
import { acceptTeamInvite, cancelTeamInvite } from "./handlers/team/teamInviteHandler";
import { registerCommand } from "./commands/auth/registerCommand";
import { tournamentCreateCommand } from "./commands/tournament/tournamentCreateCommand";
import { unRegisterCommand } from "./commands/auth/unRegisterCommand";
import { createTeamCommand } from "./commands/team/createTeamCommand";
import { inviteToTeamCommand } from "./commands/team/inviteToTeamCommand";
import { acceptInviteCommand } from "./commands/team/acceptInviteCommand";
import { teamKickCommand } from "./commands/team/teamKickCommand";
import { teamInfoCommand } from "./commands/team/teamInfoCommand";
import { inviteListCommand } from "./commands/team/inviteListCommand";

/* ------------------------------------------------ Команды -------------------------------------------------------- */
const commands = new CommandContainer();

// Регистрация
commands.register(registerCommand);
commands.register(unRegisterCommand);

// Команды игроков
commands.register(createTeamCommand);
commands.register(inviteToTeamCommand);
commands.register(acceptInviteCommand);
commands.register(teamKickCommand);
commands.register(teamInfoCommand);
commands.register(inviteListCommand);

// Турниры
commands.register(tournamentCreateCommand)

/* --------------------------------- Обработчики пользовательских событий ------------------------------------------ */
// Регистрирует обработку события [Название события] => [Обработчик]
const handlers = new HandlersContainer();

// Регистрация
handlers.register('player-registration', sendDotaId);

// Команды игроков
handlers.register('create-team-modal', createTeamHandler);
handlers.register('cancel-team-invite', cancelTeamInvite);
handlers.register('accept-team-invite', acceptTeamInvite);

export {
    commands,
    handlers
};