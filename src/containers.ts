import { CommandContainer } from "./containers/CommandContainer";
import { TeamCommand } from "./commands/TeamCommand";
import { HandlersContainer } from "./containers/HandlersContainer";
import {
    addMemberToTeamHandler,
    createTeamHandler,
    submitTeamMembersHandler,
    teamCreateHandler
} from "./handlers/TeamHandlers";

const commands = new CommandContainer();

commands.register(TeamCommand);

const handlers = new HandlersContainer();

handlers.register('team-create-btn', teamCreateHandler);
handlers.register('create-team-modal', createTeamHandler);

handlers.register('add-members-to-team', addMemberToTeamHandler);
handlers.register('submit-members-to-team', submitTeamMembersHandler);

export {
    commands,
    handlers
};