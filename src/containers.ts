import { CommandContainer } from "./containers/CommandContainer";
import { HandlersContainer } from "./containers/HandlersContainer";
import { registerCommand } from "./commands/auth/registerCommand";
import sendDotaId from "./handlers/auth/sendDotaId";
import {unRegisterCommand} from "./commands/auth/unRegisterCommand";
import {createTeamCommand} from "./commands/team/createTeamCommand";
import createTeamHandler from "./handlers/team/createTeamHandler";
import {inviteToTeamCommand} from "./commands/team/inviteToTeamCommand";

// Регистрирует команды на сервер
const commands = new CommandContainer();

commands.register(registerCommand)
commands.register(unRegisterCommand)
commands.register(createTeamCommand)
commands.register(inviteToTeamCommand)

// Регистрирует обработку события [Название события] => [Обработчик]
const handlers = new HandlersContainer();

handlers.register('player-registration', sendDotaId)
handlers.register('create-team-modal', createTeamHandler)

export {
    commands,
    handlers
};