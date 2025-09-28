import {
  REST,
  Routes,
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType
} from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName('no')
    .setDescription('Say "no" in a random and fun way!')
    .addUserOption(option =>
      option
        .setName('user')  // must match what's used in your bot handler
        .setDescription('User to reject')
        .setRequired(false)
    )
    .toJSON(),

  new ContextMenuCommandBuilder()
    .setName('No')
    .setType(ApplicationCommandType.Message)
    .toJSON(),

  new SlashCommandBuilder()
    .setName('nohello')
    .setDescription('No hello: reply with guidance')
    .addUserOption(opt => opt.setName('user').setDescription('User to nudge').setRequired(false))
    .toJSON(),

  new ContextMenuCommandBuilder()
    .setName('No Hello')               // must match interaction.commandName
    .setType(ApplicationCommandType.Message)
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Registering commands...');
    await rest.put(
      // Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),   // Only register command for local server
      Routes.applicationCommands(process.env.CLIENT_ID),   // Globally register command
      { body: commands }
    );

    // 🔹 Fetch and print what Discord has on record
    const existing = await rest.get(Routes.applicationCommands(process.env.CLIENT_ID));
    console.log('Currently registered commands:');
    existing.forEach(c => {
      console.log(`- ${c.name} (type ${c.type})`);
    });

    console.log('✅ Commands registered successfully.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
})();
