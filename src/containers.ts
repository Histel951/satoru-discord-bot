import { CommandContainer } from "./containers/CommandContainer";
import {idiNahuiCommand} from "./commands/IdiNahuiCommand";
import { CreateTeamCommand } from "./commands/CreateTeamCommand"; 
import { HandlersContainer } from "./containers/HandlersContainer";
import { createTeamHandler, teamCreateHandler } from "./handlers/TeamHandlers";

const commands = new CommandContainer();

commands.register(idiNahuiCommand);
commands.register(CreateTeamCommand);

const handlers = new HandlersContainer();

handlers.register('team-create-btn', teamCreateHandler);
handlers.register('create-team-modal', createTeamHandler);

export {
    commands,
    handlers
};