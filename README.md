# NaaS-Bot

A Discord bot that delivers premium-grade rejection-as-a-service via the [No-as-a-Service](https://github.com/claytonfuselier/no-as-a-service) API.

NaaS-Bot listens for the command `/naas`, and then:

* Gets a rejection reason from the [No-as-a-Service](https://github.com/claytonfuselier/no-as-a-service) API
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

## 🚀 Deploy It Yourself

### 🐳📥 Docker Pull
Pull and run the container from GitHub Container Registry:
```
docker pull ghcr.io/claytonfuselier/naas-bot:latest
docker run ghcr.io/claytonfuselier/naas-bot:latest
```

### 🐳🧩 Docker Compose
Use this sample `docker-compose.yml` to pull a pre-built image from ghcr.io:
```
services:
  no-as-a-service:
    image: ghcr.io/claytonfuselier/no-as-a-service:latest
    container_name: no-as-a-service
    ports:
      - "8080:3000"
    restart: unless-stopped
```
Then access the API at: `http://localhost:8080/no`

### 📦🖥️ Run Locally as NPM Package
Run the service without Docker, using NPM
```
git clone https://github.com/claytonfuselier/no-as-a-service.git
cd no-as-a-service/app
npm install
npm start
```
By default it listens on port 3000, or override with `PORT=8080 npm start`.

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
