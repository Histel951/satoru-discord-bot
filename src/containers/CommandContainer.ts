import { CommandCollectionType, CommandType } from "../types/CommandTypes";
import { Collection } from "discord.js";
import { Registrable } from "../interfaces/Registrable";
import { ContainerI } from "../interfaces/ContainerI";

export class CommandContainer implements ContainerI, Registrable
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
        this.commands.set(command.name, command);
    }

    public get(name: string): CommandType | undefined
    {
        return this.commands.get(name);
    }

    public getAll(): CommandCollectionType
    {
        return this.commands;
    }
}