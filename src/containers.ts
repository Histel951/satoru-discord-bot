import { CommandContainer } from "./containers/CommandContainer";
import { TeamCommand } from "./commands/teamCommand";
import { HandlersContainer } from "./containers/HandlersContainer";
import {
    addMemberToTeamHandler,
    createTeamHandler,
    submitTeamMembersHandler,
    teamCreateHandler
} from "./handlers/TeamHandlers";
import meInfoHandler from "./handlers/meInfoHandler";

// Регистрирует команды на сервер
const commands = new CommandContainer();

commands.register(TeamCommand);

// Регистрирует обработку события [Название события] => [Обработчик]
const handlers = new HandlersContainer();

handlers.register('team-create-btn', teamCreateHandler);
handlers.register('create-team-modal', createTeamHandler);

handlers.register('add-members-to-team', addMemberToTeamHandler);
handlers.register('submit-members-to-team', submitTeamMembersHandler);

handlers.register('me-info', meInfoHandler)

export {
    commands,
    handlers
};