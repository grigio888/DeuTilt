FROM nginx:1.25.3-alpine

ENV production false

# Copying NGINX files
COPY nginx.conf /etc/nginx/nginx.conf
COPY sites-enabled /etc/nginx/sites-enabled
COPY includes /etc/nginx/includes
COPY templates /etc/nginx/templates
COPY entrypoint.sh /entrypoint.sh
# COPY static /vol/static

# Copying Certbot files
# This block must be setup when having access to the server, because
# the certificate homologation is doned via WEB with LetsEncrypt.
# RUN apk add certbot --no-cache

# COPY certbot/ /etc/letsencrypt/
# RUN chmod +x /entrypoint.sh
# RUN /entrypoint.sh

CMD ["nginx", "-g", "daemon off;"]