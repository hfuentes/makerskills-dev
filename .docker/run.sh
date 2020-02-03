#!/bin/bash

echo ""

echo "Shutdown server ..."
ssh master.server.im docker stack rm Imagemaker_MakerSkills_Desarrollo_web
echo ""

echo "Deleting previous image ..."
docker image rm -f makerskills
echo ""

echo "Creating new image ..."
docker build --no-cache -t makerskills /Proyectos/Imagemaker/MakerSkills/web
echo ""

echo "Turning on server ..."
ssh master.server.im docker stack deploy -c /Proyectos/Imagemaker/MakerSkills/docker-compose.yml Imagemaker_MakerSkills_Desarrollo_web
echo ""

