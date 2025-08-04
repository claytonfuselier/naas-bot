# NaaS-Bot

A Discord bot that delivers premium-grade rejection-as-a-service via the [No-as-a-Service](https://github.com/claytonfuselier/no-as-a-service) API.

<br>

## 🚀 Overview

NaaS-Bot listens for the command `/naas`, and then:

* Gets a rejection reason from the No-as-a-Service API
* Returns the `reason` as a styled Discord embed
* Tags mentioned users, or replies to referenced messages (if applicable)

It's clean, stateless, containerized, and built for quick denials.

<br>

## 🔧 Configuration

Use environment variables to keep things portable and secure:

```env
DISCORD_TOKEN=your-discord-bot-token
API_URL=https://your.no-as-a-service-instance/api
SERVICE_LINK=https://your.no-as-a-service-instance
```

<br>

## 🛠 Usage Examples

| Scenario           | Behavior                                               |
| ------------------ | ------------------------------------------------------ |
| `/naas`            | Replies with a rejection message                       |
| `/naas @user`      | Tags `@user` with the rejection message                |
| `/naas` (as reply) | Replies directly to the referenced message             |
| API error          | Replies with `received <status code> from backend api` |

<br>

## 🐳 Docker Support

```bash
docker build -t naas-bot .
docker run --rm --env-file .env naas-bot
```

<br>

## 🛠 Development

```bash
npm install
node src/bot.js
```

<br>

## ❓ Why

Because automated rejection should be consistent, stateless, and a little bit stylish.

<br>

© naas-bot. We are not a real company. Don’t invoice us.
