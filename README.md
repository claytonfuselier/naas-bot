# NaaS-Bot (Discord)
[![Version](https://img.shields.io/github/package-json/v/claytonfuselier/naas-bot?filename=%2Fsrc%2Fpackage.json)](#)
[![License](https://img.shields.io/github/license/claytonfuselier/naas-bot)](#)  
[![NaaS Response](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fnaas.debugme.dev%2Fno&query=%24.reason&label=NaaS%20Response&color=orange)](https://naas.debugme.dev)

A Discord bot that delivers rejection-as-a-service via the [No-as-a-Service](https://github.com/claytonfuselier/no-as-a-service) API.

NaaS-Bot listens for the command `/naas` and then:

* Gets a rejection reason from the [No-as-a-Service](https://github.com/claytonfuselier/no-as-a-service) API
* Returns the `reason` as a styled Discord embed
* Tags mentioned users, or replies to referenced messages (if applicable)

It's clean, stateless, containerized, and built for quick denials.

<br>

## 🛠 Usage Examples

| Scenario           | Behavior                                               |
| ------------------ | ------------------------------------------------------ |
| `/naas`            | Replies with a rejection message                       |
| `/naas @user`      | Tags `@user` with the rejection message                |
| `/naas` (as reply) | Replies directly to the referenced message             |
| API error          | Replies with `received <status code> from backend api` |

<br>

## 🚀 Deploy

### 🐳📥 Docker Pull
Pull and run the container from GitHub Container Registry:
```
docker pull ghcr.io/claytonfuselier/naas-bot:latest
docker run -e DISCORD_TOKEN=your-discord-bot-token ghcr.io/claytonfuselier/naas-bot:latest
```

### 🐳🧩 Docker Compose
Use this sample `docker-compose.yml` to pull a pre-built image from ghcr.io:
```
services:
  naas-bot:
    image: ghcr.io/claytonfuselier/naas-bot:latest
    container_name: naas-bot
    environment:
      TZ: "UTC"
      DISCORD_TOKEN: "your-discord-bot-token"
      # Optional - Environment Variables
      #API_URL: "https://naas.debugme.dev/no"
      #SERVICE_LINK: "https://github.com/claytonfuselier/no-as-a-service/"
    restart: unless-stopped
```

### 📦🖥️ Run Locally as NPM Package
Run the service without Docker, using NPM
```
git clone https://github.com/claytonfuselier/naas-bot.git
cd naas-bot/src
npm install
DISCORD_TOKEN=your-discord-bot-token npm start
```

<br>

## 🧰 Customize Environment
You can configure NaaS-Bot by passing environment variables to the container.

| Variable      | Default Value                                         | Required | Description                                                   |
|---------------|-------------------------------------------------------|----------|---------------------------------------------------------------|
| DISCORD_TOKEN |                                                       | Yes      | The bot token used to authenticate with the Discord API.      |
| API_URL       | `https://naas.debugme.dev/no`                         | No       | The full URL to your No-as-a-Service API endpoint.            |
| SERVICE_LINK  | `https://github.com/claytonfuselier/no-as-a-service/` | No       | Link displayed in embed footer; branding for No-as-a-Service. |
| TZ            | `UTC`                                                 | No       | Timezone for all time-based operations and logs.              |

<br>

## 👤 Authors
Written while ignoring real responsibilities, by [claytonfuselier](https://github.com/claytonfuselier)

<br>

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

<br>

© NaaS-Bot. Just kidding, we are not a real company. Don’t sue us.
