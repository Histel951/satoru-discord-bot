import { CommandI } from "../interfaces/CommandI";
import { CommandInteraction } from "discord.js";
import RegisterCommand from "../bot/commands/auth/RegisterCommand";
import UnRegisterCommand from "../bot/commands/auth/UnRegisterCommand";
import CreateTeamCommand from "../bot/commands/team/CreateTeamCommand";
import InviteToTeamCommand from "../bot/commands/team/InviteToTeamCommand";
import AcceptInviteCommand from "../bot/commands/team/AcceptInviteCommand";
import TeamKickCommand from "../bot/commands/team/TeamKickCommand";
import TeamInfoCommand from "../bot/commands/team/TeamInfoCommand";
import InviteListCommand from "../bot/commands/team/InviteListCommand";
import TournamentCreateCommand from "../bot/commands/tournament/tournamentCreateCommand";
import SendBotMessageCommand from "../bot/commands/utils/SendBotMessageCommand";
import ClearMessageCommand from "../bot/commands/utils/ClearMessageCommand";

export default (): CommandI<CommandInteraction>[] => [
    new RegisterCommand('register', 'Зарегистрироваться на сервере как игрок'),
    new UnRegisterCommand('un-register', 'Отменяет регистрацию пользователя'),
    new CreateTeamCommand('create-team', 'Создать свою команду.'),
    new InviteToTeamCommand('invite-to-team', 'Пригласить в команду'),
    new AcceptInviteCommand('invite-accept', 'Принять приглашение на вступление в команду.'),
    new TeamKickCommand('team-kick', 'Кикнуть игрока из команды.'),
    new TeamInfoCommand('team-info', 'Информация по команде.'),
    new InviteListCommand('invite-list', 'Получить список всех приглашений в команду.'),
    new TournamentCreateCommand('tournament-create', 'Вызывает панельку для создания турнира'),
    new SendBotMessageCommand('send-message', 'Отправляет сообщение от имени бота.'),
    new ClearMessageCommand('clear', 'Очищает сообщения в чате, по умполчанию последние 10.')
];