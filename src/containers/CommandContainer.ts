import { CommandCollectionType, CommandType } from "../types/CommandTypes";
import {Collection, CommandInteraction} from "discord.js";
import { Registrable } from "../interfaces/Registrable";
import { Container } from "../interfaces/Container";

export class CommandContainer implements Container, Registrable
{
    /**
     * Registered commands
     *
     * @private
     */
    private readonly commands: CommandCollectionType<CommandInteraction>;

    constructor()
    {
        this.commands = new Collection();
    }

    public register(command: CommandType<CommandInteraction>): void
    {
        this.commands.set(command.name, command);
    }

    public get(name: string): CommandType<CommandInteraction> | undefined
    {
        return this.commands.get(name);
    }

    public getAll(): CommandCollectionType<CommandInteraction>
    {
        return this.commands;
    }
}