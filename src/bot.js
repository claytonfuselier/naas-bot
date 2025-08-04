import { Client, GatewayIntentBits, Partials, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Message, Partials.Channel],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith('/naas')) return;

  const mentionedUser = message.mentions.users.first();
  const apiUrl = process.env.API_URL;
  const serviceLink = process.env.SERVICE_LINK;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      await message.reply(`received ${res.status} from backend api`);
      return;
    }

    const data = await res.json();
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setDescription(data.reason)
      .setFooter({ text: 'Powered by ', iconURL: '', url: serviceLink })
      .setTimestamp();

    let replyContent = '';
    if (mentionedUser) {
      replyContent = `${mentionedUser}`;
    }

    if (message.reference) {
      const referencedMessage = await message.channel.messages.fetch(message.reference.messageId);
      referencedMessage.reply({ content: replyContent, embeds: [embed] });
    } else {
      message.reply({ content: replyContent, embeds: [embed] });
    }

  } catch (error) {
    console.error('Error:', error);
    message.reply(`received 500 from backend api`);
  }
});

client.login(process.env.DISCORD_TOKEN);
