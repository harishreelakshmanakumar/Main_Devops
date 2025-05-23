pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'recipeapp'
        DOCKER_COMPOSE_OPTS = '-T'  // Disable TTY allocation
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/harishreelakshmanakumar/Main_Devops.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    try {
                        echo '🔧 Building Docker images (no cache)...'
                        dir('.') {
                            sh 'docker-compose build --no-cache'
                        }
                    } catch (Exception e) {
                        error "Docker build failed: ${e.getMessage()}"
                    }
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    try {
                        echo '🛑 Stopping old containers...'
                        dir('.') {
                            sh 'docker-compose down --remove-orphans || true'

                            echo '🚀 Starting new containers...'
                            sh 'docker-compose up -d'

                            echo '⏳ Waiting for containers to be ready...'
                            sh '''
                                sleep 15
                                docker-compose ps
                            '''
                        }
                    } catch (Exception e) {
                        error "Container deployment failed: ${e.getMessage()}"
                    }
                }
            }
        }

        // Optional test stage
        /*
        stage('Run Tests') {
            steps {
                script {
                    try {
                        echo '🧪 Running backend tests...'
                        dir('.') {
                            sh '''
                                docker-compose exec -T backend npm test || {
                                    echo "⚠️ Tests failed"
                                    exit 1
                                }
                            '''
                        }
                    } catch (Exception e) {
                        unstable "Tests failed: ${e.getMessage()}"
                    }
                }
            }
        }
        */
    }

    post {
        success {
            echo '✅ Application successfully deployed!'
        }
        unstable {
            echo '⚠️ Build completed with test failures'
        }
        failure {
            echo '❌ Deployment failed'
        }
        always {
            script {
                try {
                    echo '🧹 Cleaning up...'
                    dir('.') {
                        sh 'docker-compose down --remove-orphans'
                    }
                } catch (Exception e) {
                    echo "Cleanup warning: ${e.getMessage()}"
                }
            }
        }
    }
}
