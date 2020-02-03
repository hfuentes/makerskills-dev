#!/bin/bash

usage() {
    echo "Usage: $0 ["
    echo "  -t Target: ['firebase', 'docker'] # required"
    echo "  -e Environment: ['dev','prod'] # default: 'dev'"
    echo "  -s Secret (Server Password): [string] # default: 'dev'"
    echo "  -p Firebase Project: [string] # default: 'makerskills-develop'"
    echo "  -o Firebase Options: [string] # default: 'hosting,firestore:rules'"
    echo "]"
    echo ""
}
exit_abnormal() {
    usage
    exit 1
}

TARGET=""
ENV="dev"
PROJECT_NAME="makerskills-develop"
FIRE_OPTS="hosting,firestore:rules"
PASSWORD=""

while getopts t:e:p:o:s: options; do
   case ${options} in
      t) TARGET=${OPTARG} ;;
      e) ENV=${OPTARG} ;;
      p) PROJECT_NAME=${OPTARG} ;;
      o) FIRE_OPTS=${OPTARG} ;;
      s) PASSWORD=${OPTARG} ;;
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

    echo "Removing workdir data from worker ..."

    eval "sshpass -p $PASSWORD ssh root@worker1.linux.server.im rm -rf /Proyectos/Imagemaker/MakerSkills/web/code"
    eval "sshpass -p $PASSWORD ssh root@worker1.linux.server.im mkdir -p /Proyectos/Imagemaker/MakerSkills/web/code"
    echo ""

    echo "Creating local build folder ..."
    rm -rf build && mkdir build && cp -r src build && cp angular.json firestore.indexes.json karma.conf.js tsconfig.json tslint.json browserslist firebase.json firestore.rules package.json README.md tsconfig.app.json tsconfig.spec.json build
    echo ""

    echo "Copying build folder to worker ..."
    eval "sshpass -p $PASSWORD scp -r build/* root@worker1.linux.server.im:/Proyectos/Imagemaker/MakerSkills/web/code"
    echo ""

    echo "Removing build folder ..."
    rm -rf build
    echo ""

    echo "Copying \"run.sh\" and \"Dockerfile\" files to worker ..."
    eval "sshpass -p $PASSWORD scp .docker/run.sh .docker/Dockerfile root@worker1.linux.server.im:/Proyectos/Imagemaker/MakerSkills/web"
    echo ""

    echo "Copying \"docker-compose.yml\" file to master ..."
    eval "sshpass -p $PASSWORD scp .docker/docker-compose.yml root@master.server.im:/Proyectos/Imagemaker/MakerSkills/web"
    echo ""

    echo "Setting up Docker ..."
    eval "sshpass -p $PASSWORD ssh root@worker1.linux.server.im sh /Proyectos/Imagemaker/MakerSkills/web/run.sh"
    echo ""

    echo ""
    echo ":)"
    echo ""

    exit 0

else
    exit_abnormal
fi

# end
