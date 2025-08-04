import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Clearing commands...');
    await rest.put(
      //Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),   // Only register command for local server
      Routes.applicationCommands(process.env.CLIENT_ID),   // Globally register command
      { body: [] }
    );
    console.log('✅ All guild commands cleared.');
  } catch (error) {
    console.error('❌ Failed to clear commands:', error);
  }
})();
