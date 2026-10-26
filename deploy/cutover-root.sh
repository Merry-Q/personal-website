#!/bin/sh
set -eu

CONF_DIR=/opt/1panel/apps/openresty/openresty/conf/conf.d
LE=/opt/1panel/apps/openresty/openresty/conf/conf.d/secure/letsencrypt
WEBROOT=/opt/1panel/apps/openresty/openresty/root
OFFEROS_HOST=offeros.47.237.109.221.sslip.io

cp /tmp/offeros-acme.nginx.conf "$CONF_DIR/offeros-acme.conf"
docker exec 1Panel-openresty-kN0y nginx -t
docker exec 1Panel-openresty-kN0y nginx -s reload

docker run --rm --network host \
  -v "$WEBROOT:/webroot" \
  -v "$LE:/etc/letsencrypt" \
  certbot/certbot:latest certonly --webroot -w /webroot \
  -d "$OFFEROS_HOST" --agree-tos --non-interactive --keep-until-expiring \
  --register-unsafely-without-email

rm -f "$CONF_DIR/offeros-acme.conf"
cp /tmp/offeros.nginx.conf "$CONF_DIR/offeros.conf"
cp /tmp/home.nginx.conf "$CONF_DIR/home.conf"
cp /tmp/offeros.nginx.conf /opt/offeros/deploy/offeros.nginx.conf
docker exec 1Panel-openresty-kN0y nginx -t
docker exec 1Panel-openresty-kN0y nginx -s reload

python3 - <<'PY'
from pathlib import Path
path = Path("/opt/offeros/.env.production")
lines = []
for line in path.read_text(encoding="utf-8").splitlines(True):
    if line.startswith("CORS_ORIGINS="):
        lines.append("CORS_ORIGINS=https://offeros.47.237.109.221.sslip.io\n")
    else:
        lines.append(line)
path.write_text("".join(lines), encoding="utf-8")
PY

cd /opt/offeros
docker compose -p offeros -f deploy/compose.aliyun.yaml up -d --force-recreate --no-build

echo "--- homepage ---"
curl -sS -o /dev/null -w "%{http_code} %{url_effective}\n" http://47.237.109.221/
echo "--- offeros ---"
curl -sS -o /dev/null -w "%{http_code} %{url_effective}\n" https://offeros.47.237.109.221.sslip.io/
echo "--- healthz ---"
curl -sS -o /dev/null -w "%{http_code} %{url_effective}\n" https://offeros.47.237.109.221.sslip.io/api/healthz
echo "--- old home alias ---"
curl -sS -o /dev/null -w "%{http_code} %{url_effective}\n" https://home.47.237.109.221.sslip.io/
echo "--- old admin redirect ---"
curl -sS -o /dev/null -w "%{http_code} %{url_effective}\n" http://47.237.109.221/admin/login
