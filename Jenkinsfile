pipeline {
    agent 'any'

    options {
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        PROJECT_NAME = 'makerskills'
        PROJECT_PATH = 'makerskills'
    }

    tools {
        'org.jenkinsci.plugins.docker.commons.tools.DockerTool' '18.09'
        nodejs '13'
    }
    stages {
        stage('Build App') {
            steps {
                script {
                  VERSION = sh(returnStdout: true, script: 'date +%Y%m%d%H%M').trim()
                }
                sh 'npm install -g @angular/cli'
                sh 'npm install'
                script {
                    if (BRANCH_NAME == "master"){
                      sh 'ng build --prod'
                    }
                    else {
                      sh 'ng build'
                    }
                }
                // Realizar paquete y archivar
                sh "tar -cvzf ${PROJECT_NAME}-${BRANCH_NAME}-${VERSION}.tgz -C dist/ makerskills"
                archiveArtifacts "${PROJECT_NAME}-${BRANCH_NAME}-${VERSION}.tgz"
            }
        }

        stage('Publish Artifactory') {
            environment {
              ARTIFACTORY = credentials('artifactory')
            }
            steps {
              sh "curl -u${ARTIFACTORY} -T ${PROJECT_NAME}-${BRANCH_NAME}-${VERSION}.tgz http://worker1.linux.server.im:8081/artifactory/Desarrollo/${PROJECT_PATH}/${BRANCH_NAME}-${VERSION}/${PROJECT_NAME}-${BRANCH_NAME}-${VERSION}.tgz"
            }
        }

        stage('Construir Docker Image') {
            steps {
              script {
                BRANCHNAME_LOW = BRANCH_NAME.toLowerCase()
                PROJECTNAME_LOW = PROJECT_NAME.toLowerCase()
              }
              sh """
                mkdir docker
                cp -r dist/makerskills docker
                cp -r nginx.conf docker
                """
              sh """cat << EOF > docker/Dockerfile
FROM nginx

# copy build to nginx
COPY  nginx.conf /etc/nginx/nginx.conf
COPY  makerskills/ /usr/share/nginx/html

# run server
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF
"""
            sh "docker build -t ${PROJECTNAME_LOW}-${BRANCHNAME_LOW}:${VERSION} docker"
            }
        }

        stage('Desplegar imagen creada') {
            steps {
                script {
                  PROJECT_PATH_SERVER="/Proyectos/Imagemaker/MakerSkills/"
                  STACK_NAME="Imagemaker_MakerSkills_web"
                  PORT = 0
                  switch(BRANCH_NAME){
                      case ~/master/:
                          println "Branch es master"
                          PORT_FRONT = 9998
                          break
                      case ~/develop/:
                          println "Branch es develop"
                          PORT_FRONT = 9997
                          break
                      default:
                          println "branch no mapeado"
                          currentBuild.result = 'ABORTED'
                          error('No mapeada la configuracion para este branch... Solicitar su revision y asignacion de puerto')
                  }
                }
                println "Delete deploy stack from olimpo.web"
                sh "ssh root@10.10.100.11 'docker stack rm ${STACK_NAME}_${BRANCH_NAME}'"
                println "Create compose-${BRANCH_NAME}.yml"
                sh """cat << EOF > compose-${BRANCH_NAME}.yml
version: '3.5'
services:
  app:
    image: "${PROJECTNAME_LOW}-${BRANCHNAME_LOW}:${VERSION}"
    deploy:
      placement:
        constraints: [node.role == worker]
    dns:
      - 10.10.1.2
    ports:
      - ${PORT_FRONT}:80
EOF
"""
                println "Copy file to master"
                sh "scp compose-${BRANCH_NAME}.yml root@10.10.100.11:${PROJECT_PATH_SERVER}"
                println "Create deploy stack for new image of ${PROJECT_NAME}"
                sh "ssh root@10.10.100.11 'docker stack deploy -c ${PROJECT_PATH_SERVER}compose-${BRANCH_NAME}.yml ${STACK_NAME}_${BRANCH_NAME}'"
                sh 'sleep 25'
                println "Chequear que servicio inicio correctamente"
                sh "curl http://10.10.100.12:${PORT_FRONT}"
            }
        }
    }
    post {
      always {
        cleanWs()
      }
    }
}
