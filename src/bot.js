import { Client, GatewayIntentBits, Partials, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

// Define intents required by the bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Message,
    Partials.Channel
  ],
});


// Connect
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  client.user.setActivity('Proudly denying your existence.', { type: 4 });   // Custom status
});


client.on('interactionCreate', async interaction => {
  // 🔹 Handle slash command: /no
  if (interaction.commandName === 'no') {
    const mentionedUser = interaction.options.getUser('user');
    const apiUrl = process.env.API_URL || 'https://naas.debugme.dev/no';

    try {
      const res = await fetch(apiUrl);
      const data = await res.ok ? await res.json() : { reason: 'No response from backend.' };

      const embed = new EmbedBuilder()
        .setColor(0xff0000)
        .setAuthor({
          name: interaction.member?.displayName || interaction.user.username,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setDescription(data.reason)
        .setFooter({ text: 'Powered by:  No-as-a-Service (NaaS)' });

      await interaction.reply({
        content: mentionedUser ? `<@${mentionedUser.id}>` : undefined,
        embeds: [embed],
        allowedMentions: mentionedUser ? { users: [mentionedUser.id] } : undefined
      });

    } catch (err) {
      console.error('Slash command error:', err);
      if (!interaction.replied) {
        await interaction.reply({
          content: 'received 500 from backend api',
          ephemeral: true
        });
      }
    }
  }

  // 🔹 Handle context menu: "Reject via NaaS"
  else if (interaction.isMessageContextMenuCommand()) {
    if (interaction.commandName === 'Reject via NaaS') {
      const targetMessage = interaction.targetMessage;
      const targetUser = targetMessage.author;
      const apiUrl = process.env.API_URL || 'https://naas.debugme.dev/no';

      try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
          await interaction.reply({ content: `received ${res.status} from backend api`, ephemeral: true });
          return;
        }

        const data = await res.json();

        const embed = new EmbedBuilder()
          .setColor(0xff0000)
          .setAuthor({
            name: interaction.member?.displayName || interaction.user.username,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
          })
          .setDescription(data.reason)
          .setFooter({ text: 'Powered by:  No-as-a-Service (NaaS)' });

        await targetMessage.reply({
          content: `<@${targetUser.id}>`,
          embeds: [embed],
          allowedMentions: { users: [targetUser.id] }
        });

        await interaction.reply({ content: '✅ Rejection delivered.', ephemeral: true });

      } catch (error) {
        console.error('Context menu error:', error);
        await interaction.reply({ content: 'received 500 from backend api', ephemeral: true });
      }
    }
  }
});


client.login(process.env.DISCORD_TOKEN);
