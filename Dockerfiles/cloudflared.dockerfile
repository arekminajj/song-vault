FROM cloudflare/cloudflared:latest

USER root
COPY --chown=nonroot:nonroot ./cloudflare_config/ /etc/cloudflared
USER nonroot

CMD ["tunnel", "run"]
