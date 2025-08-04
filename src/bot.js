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

// Listen for messages
client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith('/naas')) return;   // Ignore bot messages and messages starting without "/naas" 

  const mentionedUser = message.mentions.users.first();   // Get (first) mentioned user
  const apiUrl = process.env.API_URL || 'https://naas.debugme.dev/no';   // Fallback to naas.debugme.dev
  
  try {
    // Call NaaS API
    const res = await fetch(apiUrl);
    if (!res.ok) {
      await message.reply(`received ${res.status} from backend api`);   // Reply to text-channel if API fails
      return;
    }

    // Parse API response
    const data = await res.json();

    
    // Generate embed message
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      //.setAuthor({
        //name: 'No as a Service (NaaS)'
      //})
      .setTitle(data.reason)
      //.setDescription(data.reason)
      .setFooter({
        text: 'Rejection by:  No-as-a-Service (NaaS)',
      });

    // Format mention line above the embed
    let replyContent = '';
    if (mentionedUser) {
      replyContent = `<@${mentionedUser.id}>`;  // ensures consistent formatting
    }

    const messageOptions = {
      content: replyContent || undefined, // Discord requires content to be undefined if empty
      embeds: [embed],
    };
    
    /*
    // Build plain text message
    let replyContent = '';

    if (mentionedUser) {
      replyContent += `${mentionedUser}\n`;
    }

    replyContent += data.reason;

    // Prepare message options as plain text
    const messageOptions = {
      content: replyContent,
    };
    */

    // Reply to same message command replied to
    if (message.reference) {
      const referencedMessage = await message.channel.messages.fetch(message.reference.messageId);
      await referencedMessage.reply(messageOptions);
    } else {
      await message.channel.send(messageOptions);
    }

  } catch (error) {
    console.error('Error:', error);
    await message.channel.send('received 500 from backend api');
  }
});

client.login(process.env.DISCORD_TOKEN);
