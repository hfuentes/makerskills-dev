#!/bin/bash
echo "Bajando el servidor..."
ssh master.server.im docker stack rm Imagemaker_MakerSkills_Desarrollo_web

echo "Eliminando imagen anterior..."
docker image rm -f makerskills

echo "Creando nueva imagen..."
docker build --no-cache -t makerskills /Proyectos/Imagemaker/MakerSkills/web

echo "Subiendo servidor..."
ssh master.server.im docker stack deploy -c /Proyectos/Imagemaker/MakerSkills/docker-compose.yml Imagemaker_MakerSkills_Desarrollo_web
echo "Listo!."

