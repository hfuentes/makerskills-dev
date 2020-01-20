#!/bin/bash

usage() {
    echo "Usage: $0 ["
    echo "  -t Target: ['firebase', 'docker'] # required"
    echo "  -e Environment: ['dev','prod'] # default: 'dev'"
    echo "  -p Firebase Project: [string] # default: 'makerskills-develop'"
    echo "  -o Firebase Options: [string] # default: 'hosting,firestore:rules'"
    echo "]" 1>&2
}
exit_abnormal() {
    usage
    exit 1
}

TARGET=""
ENV="dev"
PROJECT_NAME="makerskills-develop"
FIRE_OPTS="hosting,firestore:rules"

while getopts t:e:p:o: options; do
   case ${options} in
      t) TARGET=${OPTARG} ;;
      e) ENV=${OPTARG} ;;
      p) PROJECT_NAME=${OPTARG} ;;
      o) FIRE_OPTS=${OPTARG} ;;
   esac
done

echo ""
if [ "$TARGET" = "firebase" ]; then
    
    echo "Deploying to firebase environment ..."
    echo ""

    echo "Deleting dist/ folder: [rm -rf dist/]"
    rm -rf dist/
    echo ""

    if [ "$ENV" = "prod" ]; then
        echo "Building app (production environment): [ng build --prod]"
        ng build --prod
    elif [ "$ENV" = "dev" ]]; then
        echo "Building app (develop environment): [ng build]"
        ng build
    fi
    echo ""

    if [ "$FIRE_OPTS" = "" ]; then
        echo "Deploying to Firebase: [firebase deploy -P $PROJECT_NAME]"
        eval "firebase deploy -P $PROJECT_NAME"
    else
        echo "Deploying to Firebase: [firebase deploy -P $PROJECT_NAME --only $FIRE_OPTS]"
        eval "firebase deploy -P $PROJECT_NAME --only $FIRE_OPTS"
    fi
    
elif [ "$TARGET" = "docker" ]; then
    
    echo "Deploying to docker environment ..."
    echo ""

    echo "Deleting dist/ folder: [rm -rf dist/]"
    rm -rf dist/
    echo ""

    if [ "$ENV" = "prod" ]; then
        echo "Building app (production environment): [ng build --prod]"
        ng build --prod
    elif [ "$ENV" = "dev" ]]; then
        echo "Building app (develop environment): [ng build]"
        ng build
    fi
    echo ""

    echo "Removing dist folder from worker: [sshpass -p *** ssh root@worker1.linux.server.im \"rm -rf /Proyectos/Imagemaker/MakerSkills/web/code/makerskills\"]"
    sshpass -p "kubernetes" ssh root@worker1.linux.server.im "rm -rf /Proyectos/Imagemaker/MakerSkills/web/code/makerskills"
    echo ""

    echo "Copying dist folder to worker: [sshpass -p *** scp -r dist/makerskills root@worker1.linux.server.im:/Proyectos/Imagemaker/MakerSkills/web/code]"
    sshpass -p "kubernetes" scp -r dist/makerskills root@worker1.linux.server.im:/Proyectos/Imagemaker/MakerSkills/web/code
    echo ""

    echo "Copying \"run.sh\" file [sshpass -p *** scp run.sh root@worker1.linux.server.im:/Proyectos/Imagemaker/MakerSkills/web]"
    sshpass -p "kubernetes" scp run.sh root@worker1.linux.server.im:/Proyectos/Imagemaker/MakerSkills/web
    echo ""

    echo "Copying \"docker-compose.yml\" file [sshpass -p *** scp docker-compose.yml root@worker1.linux.server.im:/Proyectos/Imagemaker/MakerSkills/web]"
    sshpass -p "kubernetes" scp docker-compose.yml root@worker1.linux.server.im:/Proyectos/Imagemaker/MakerSkills/web
    echo ""

    echo "Copying \"Dockerfile\" file [sshpass -p *** scp Dockerfile root@worker1.linux.server.im:/Proyectos/Imagemaker/MakerSkills/web]"
    sshpass -p "kubernetes" scp Dockerfile root@worker1.linux.server.im:/Proyectos/Imagemaker/MakerSkills/web
    echo ""

    echo "Setting up Docker [sshpass -p *** ssh root@worker1.linux.server.im \"sh /Proyectos/Imagemaker/MakerSkills/web/run.sh\"]"
    sshpass -p "kubernetes" ssh root@worker1.linux.server.im "sh /Proyectos/Imagemaker/MakerSkills/web/run.sh"
    echo ""

    exit 1

else
    exit_abnormal
fi

#