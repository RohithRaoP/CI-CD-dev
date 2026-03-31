pipeline {
    agent any

    environment {
        DEV_SERVER = "your-dev-server-ip"   // change this
        REMOTE_DIR = "/tmp/myapp"           // change this
        APP_NAME = "dev"                    // your docker name
    }

    stages {
        stage('Install') {
            steps {
                sh "npm install"
            }
        }

        stage('Build & Test') {
            steps {
                sh "npm run build"
                sh "npm test"
            }
        }

        stage('Build & Deploy to Dev') {
            steps {
                sh """
                scp -r . user@${DEV_SERVER}:${REMOTE_DIR}

                ssh user@${DEV_SERVER} '
                    cd ${REMOTE_DIR}
                    docker build -t ${APP_NAME}:dev .
                    docker stop ${APP_NAME} || true
                    docker rm ${APP_NAME} || true
                    docker run -d --name ${APP_NAME} -p 3000:3000 ${APP_NAME}:dev
                '
                """
            }
        }
    }
}
