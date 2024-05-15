import { CommandI } from "../../interfaces/CommandI";
import { CommandInteraction } from "discord.js";

export default abstract class AbstractCommand implements CommandI<CommandInteraction> {

    private readonly name: string;

    private readonly description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }
}