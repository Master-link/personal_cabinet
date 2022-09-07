#!/bin/sh

ip=$(dig +short website)
echo "http://$ip:3011" > .env
echo "ws://$ip:3011" >> .env
echo "PORT=3010" >> .env