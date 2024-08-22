if [ "$PUBLIC_ENVIRONMENT" = "production" ]; then
    (crontab -l ; echo "0 0 1 */6 * certbot renew --dry-run") | crontab -
    echo "Certbot renewal cron job added."
else
    echo "Certbot renewal cron job not added. PUBLIC_ENVIRONMENT is not set to 'production'."
fi