# NaaS-Bot (Discord)
[![Version](https://img.shields.io/github/package-json/v/claytonfuselier/naas-bot?filename=%2Fsrc%2Fpackage.json)](#)
[![License](https://img.shields.io/github/license/claytonfuselier/naas-bot)](#)  
[![NaaS Response](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fnaas.debugme.dev%2Fno&query=%24.reason&label=NaaS%20Response&color=orange)](https://naas.debugme.dev)

A Discord bot that delivers rejection-as-a-service via the [No-as-a-Service](https://github.com/claytonfuselier/no-as-a-service) API.

NaaS-Bot listens for the command `/no` or `/nohello` and then:  
* Gets a rejection "reason" or "greeting" from the [No-as-a-Service](https://github.com/claytonfuselier/no-as-a-service) API  
* Returns the `reason` or `greeting` as a styled Discord embed  
* Tags mentioned users, or replies to referenced messages (if applicable)  

It's clean, stateless, containerized, and built for quick denials.

*Note: The bot ignores any role mentions or replies to its messages.*

<br>

## 🛠 Usage Examples

| Scenario              | Behavior                                               |
| --------------------- | ------------------------------------------------------ |
| `/no`                 | Replies with a rejection message                       |
| `/no @user`           | Tags `@user` with the rejection message                |
| `/no` (as reply)      | Replies directly to the referenced message             |
| `/nohello`            | Replies with a greeting response                       |
| `/nohello @user`      | Tags `@user` with the greeting response                |
| `/nohello` (as reply) | Replies directly to the referenced message             |
| API error             | Replies with `received <status code> from backend api` |

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
      DISCORD_TOKEN: "your-discord-bot-token"
      # Optional - Environment Variables
      TZ: "UTC"
      #API_ENDPOINT_NO: "https://naas.debugme.dev/no"
      #API_ENDPOINT_NOHELLO: "https://naas.debugme.dev/nohello"
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

| Variable             | Default Value                                         | Required | Description                                                     |
|----------------------|-------------------------------------------------------|----------|-----------------------------------------------------------------|
| DISCORD_TOKEN        |                                                       | Yes      | The bot token used to authenticate with the Discord API.        |
| API_ENDPOINT_NO      | `https://naas.debugme.dev/no`                         | No       | The full URL to your No-as-a-Service API endpoint for `/no`.    |
| API_ENDPOINT_NOHELLO | `https://naas.debugme.dev/nohello`                    | No       | The full URL to your No-as-a-Service API endpoint for /nohello. |
| TZ                   | `UTC`                                                 | No       | Timezone for all time-based operations and logs.                |

<br>

## 👤 Authors
Written while ignoring real responsibilities, by [claytonfuselier](https://github.com/claytonfuselier)

<br>

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

<br>

© NaaS-Bot. Just kidding, we are not a real company. Don’t sue us.
