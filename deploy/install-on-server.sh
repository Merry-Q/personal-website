#!/bin/sh
set -eu

WWW=/opt/1panel/apps/openresty/openresty/www/personal-website
CONF_DIR=/opt/1panel/apps/openresty/openresty/conf/conf.d
LE=/opt/1panel/apps/openresty/openresty/conf/conf.d/secure/letsencrypt
WEBROOT=/opt/1panel/apps/openresty/openresty/root
HOST=home.47.237.109.221.sslip.io

mkdir -p "$WWW"
find "$WWW" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
tar -xzf /tmp/personal-website-dist.tgz -C "$WWW"
cp /tmp/home-acme.nginx.conf "$CONF_DIR/home.conf"
docker exec 1Panel-openresty-kN0y nginx -t
docker exec 1Panel-openresty-kN0y nginx -s reload

docker run --rm --network host \
  -v "$WEBROOT:/webroot" \
  -v "$LE:/etc/letsencrypt" \
  certbot/certbot:latest certonly --webroot -w /webroot \
  -d "$HOST" --agree-tos --non-interactive --keep-until-expiring \
  --register-unsafely-without-email

cp /tmp/home.nginx.conf "$CONF_DIR/home.conf"
docker exec 1Panel-openresty-kN0y nginx -t
docker exec 1Panel-openresty-kN0y nginx -s reload

echo "deployed files:" $(find "$WWW" | wc -l)
curl -fsSI "http://127.0.0.1/" -H "Host: $HOST" | head -n 20
curl -kfsSI "https://127.0.0.1/" -H "Host: $HOST" | head -n 20
