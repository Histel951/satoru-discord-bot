import { CommandContainer } from "./containers/CommandContainer";
import IdiNahuiCommand from "./commands/executables/IdiNahuiCommand";

const commands = new CommandContainer();

commands.register(new IdiNahuiCommand);

export {
    commands
};