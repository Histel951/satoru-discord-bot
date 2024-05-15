import { ClientT } from "../../types/ClientT";
import getCommandsList from "../../utils/getCommandsList";

export default (client: ClientT) => {
    const commands = getCommandsList();

    commands.forEach(command => {
        client.data?.commands?.set(command.getName(), command);
    });
}

