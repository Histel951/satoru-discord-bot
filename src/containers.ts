import { CommandContainer } from "./containers/CommandContainer";
import {idiNahuiCommand} from "./commands/IdiNahuiCommand";
import { TeamCommand } from "./commands/TeamCommand";
import { HandlersContainer } from "./containers/HandlersContainer";
import {
    addMembersToTeamHandler,
    createTeamHandler,
    submitTeamMembersHandler,
    teamCreateHandler
} from "./handlers/TeamHandlers";

const commands = new CommandContainer();

commands.register(idiNahuiCommand);
commands.register(TeamCommand);

const handlers = new HandlersContainer();

handlers.register('team-create-btn', teamCreateHandler);
handlers.register('create-team-modal', createTeamHandler);
handlers.register('add-members-to-team', addMembersToTeamHandler);
handlers.register('submit-members-to-team', submitTeamMembersHandler);

export {
    commands,
    handlers
};