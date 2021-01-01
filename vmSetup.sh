#!/bin/bash
#Sets up Know It's Off VM
#Use after you have installed nginx
#This will be run in the main directory

#Get the current directory and append myClient/build for later
yarnBuildDir="${PWD}/myClient/build"

#Runs yarn build in the myClient directory
(cd myClient; yarn build)
sudo rm /etc/nginx/sites-enabled/default
sudo rm /etc/nginx/sites-available/default

#Put code into a temporary file to be copied later
#Takes the location of the the myClient/build directory for root
echo "server {
    listen 80;
    root $yarnBuildDir;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
        add_header Cache-Control "no-cache";
    }

    location /static {
        expires 1y;
        add_header Cache-Control "public";
    }

    location /api {
        include proxy_params;
        proxy_pass http://localhost:5000;
    }
}" >> $$.txt

#Copies flask-app to nginx sites directories
sudo cp $$.txt /etc/nginx/sites-enabled/flask-app
sudo cp $$.txt /etc/nginx/sites-available/flask-app

#Remove the temporary file
rm -f "$$.txt"

#Run nginx
sudo nginx

#Starts the api
(cd myClient; yarn start-api)