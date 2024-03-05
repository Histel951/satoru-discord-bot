import { CommandContainer } from "./containers/CommandContainer";
import { HandlersContainer } from "./containers/HandlersContainer";
import { registerCommand } from "./commands/registerCommand";
import sendDotaId from "./handlers/registration/sendDotaId";

// Регистрирует команды на сервер
const commands = new CommandContainer();

commands.register(registerCommand)

// Регистрирует обработку события [Название события] => [Обработчик]
const handlers = new HandlersContainer();

handlers.register('player-registration', sendDotaId)

export {
    commands,
    handlers
};