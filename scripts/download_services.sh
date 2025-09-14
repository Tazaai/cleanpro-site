#!/bin/bash
mkdir -p ~/cleanpro-site/frontend/public/services
cd ~/cleanpro-site/frontend/public/services

curl -L "https://images.unsplash.com/photo-1616627459232-1cf4c2aaca5f?auto=format&fit=crop&w=800&q=80" -o standard.jpg
curl -L "https://images.unsplash.com/photo-1598514982417-90c7fcd4e76d?auto=format&fit=crop&w=800&q=80" -o deep.jpg
curl -L "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" -o move.jpg
curl -L "https://images.unsplash.com/photo-1581091215367-59ab6d02e1a9?auto=format&fit=crop&w=800&q=80" -o office.jpg
curl -L "https://images.unsplash.com/photo-1600607687920-4e9e1e5d5cf4?auto=format&fit=crop&w=800&q=80" -o home.jpg
