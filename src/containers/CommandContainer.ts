import {CommandCollectionType, CommandType} from "../commands/types";
import {Collection} from "discord.js";

export class CommandContainer
{
    /**
     * Registered commands
     *
     * @private
     */
    private readonly commands: CommandCollectionType;

    constructor()
    {
        this.commands = new Collection();
    }

    public register(command: CommandType): void
    {
        this.commands.set(command.data.name, command);
    }

    public get(name: string): CommandType
    {
        return this.commands.get(name);
    }

    public getAll(): CommandCollectionType
    {
        return this.commands;
    }
}