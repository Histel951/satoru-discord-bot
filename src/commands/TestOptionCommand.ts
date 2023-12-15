// import {SlashCommandBuilder, EmbedBuilder} from "discord.js";
// import {CommandType} from "./types";
//
// export class TestOptionCommand implements CommandType
// {
//     data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
//
//     constructor() {
//         this.data = new SlashCommandBuilder()
//             .setName('name')
//             .setDescription('desc')
//             .addStringOption(option =>
//                 option.setName('option_one')
//                     .setDescription('option one')
//                     .setRequired(true)
//                     .addChoices(
//                         {name: 'Foo', value: 'Foo'},
//                         {name: 'Bar', value: 'Bar'}
//                     )
//             )
//             .addStringOption(option =>
//                 option.setName('number')
//                     .setDescription('option_two')
//                     .setRequired(true)
//                     .addChoices(
//                         {name: 'One', value: '1'},
//                         {name: 'Two', value: '2'},
//                         {name: 'Three', value: '3'},
//                         {name: 'Four', value: '4'}
//                     )
//             );
//     }
//
//     async execute(interaction) {
//         const exampleEmbed = new EmbedBuilder()
//             .setColor(0x0099FF)
//             .setTitle(`${interaction.user.username} wants ${interaction.options.getString('option_one')}`)
//             .setAuthor({ name: 'djs', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
//             .setTimestamp()
//             .setFooter({ text: `${interaction.options.getString('option_two')}`, iconURL: 'https://i.imgur.com/AfFp7pu.png' });
//         await interaction.reply({ embeds: [exampleEmbed] });
//     }
// }