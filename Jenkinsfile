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
                        sh 'docker-compose build --no-cache'
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
                        sh 'docker-compose down --remove-orphans || true'

                        echo '🚀 Starting new containers...'
                        sh 'docker-compose up -d'
                        
                        // Wait for containers to be healthy
                        sh '''
                            echo "⏳ Waiting for containers to be ready..."
                            sleep 15
                            docker-compose ps
                        '''
                    } catch (Exception e) {
                        error "Container deployment failed: ${e.getMessage()}"
                    }
                }
            }
        }

        // Commented out the Run Tests stage
        /*
        stage('Run Tests') {
            steps {
                script {
                    try {
                        echo '🧪 Running backend tests...'
                        sh '''
                            docker-compose exec -T backend npm test || {
                                echo "⚠️ Tests failed"
                                exit 1
                            }
                        '''
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
                    sh 'docker-compose down --remove-orphans'
                } catch (Exception e) {
                    echo "Cleanup warning: ${e.getMessage()}"
                }
            }
        }
    }
}
