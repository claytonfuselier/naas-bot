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
    .setName('Reject via NaaS')
    .setType(ApplicationCommandType.Message)
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Registering commands...');
    await rest.put(
      //Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),   // Only register command for local server
      Routes.applicationCommands(process.env.CLIENT_ID),   // Globally register command
      { body: commands }
    );
    console.log('✅ Commands registered successfully.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
})();
