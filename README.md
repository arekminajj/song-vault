# Song-Vault
Music explore and review app.

## Development setup

Follow these steps to run the project with Docker and Cloudflare Tunnel.

1. create `.env` file in the project root with secrets:

```
AUTH_SPOTIFY_ID=<your-spotify-app-id>
AUTH_SPOTIFY_SECRET=<your-spotify-app-secret>
AUTH_URL=<your-cloudflare-domain>
AUTH_TRUST_HOST=true
NEXTAUTH_SECRET=<auth-secret>
```

- AUTH_SPOTIFY_ID and AUTH_SPOTIFY_SECRET can be obtained from [Spotify developer page](https://developer.spotify.com/)

- AUTH_URL is the URL of tunneled app

- `NEXTAUTH_SECRET` is used for securing JWT tokens in authentication. You can generate a random secret using:

    ```bash
    openssl rand -base64 32
    ```

3. Setup Cloudflare tunnel

Create config directory

```bash
mkdir cloudflare_config
```

add your `<UUID>.json` that can be obtained from [Cloudflare dashboard](https://dash.cloudflare.com) or with:
```bash
cloudflared tunnel create <domain-name>
```
and `config.yml` file:

```
tunnel: <tunnel-uuid>
credentials-file: /etc/cloudflared/<tunnel-uuid>.json

ingress:
  - hostname: <domain-name>
    service: http://next:3000
  - service: http_status:404
```

4. Run docker compose

```
docker compose up  --build
```