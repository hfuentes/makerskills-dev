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
    
    echo "Docker deploy not implemented :("
    exit 1

else
    exit_abnormal
fi

#