pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        APP_IMAGE = 'nodejs-jenkins-app'
        APP_CONTAINER = 'nodejs-jenkins-app'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                sh '''
                    docker run --rm \
                      --volume "$WORKSPACE:/app" \
                      --workdir /app \
                      node:24-alpine \
                      sh -c 'npm ci && npm test'
                '''
            }
        }

        stage('Build') {
            steps {
                sh 'docker build --tag "$APP_IMAGE:$BUILD_NUMBER" .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f "$APP_CONTAINER" 2>/dev/null || true

                    docker run --detach \
                      --name "$APP_CONTAINER" \
                      --publish 3001:3000 \
                      "$APP_IMAGE:$BUILD_NUMBER"

                    sleep 3
                    curl --fail http://docker:3001/health
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished. Review the stage results above.'
        }
        success {
            echo 'Build, tests, and deployment succeeded.'
        }
    }
}
