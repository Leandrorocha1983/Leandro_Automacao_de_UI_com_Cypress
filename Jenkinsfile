pipeline {
    agent any

    stages {
        stage('Clonar o repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/JessicaTeixeiraAraujo/Automacao_de_UI_com_Cypress.git'
            }
        }
    }
    
    stages {
        stage('Instalar dependências') {
            steps {
                sh 'npm install'
            }
        }
    }
    
    stages {
        stage('Iniciar o servidor') {
            steps {
                sh 'npm start'
            }
        }
    }
    
    stages {
        stage('Execução dos testes') {
            steps {
                sh 'NO_COLOR=1 npm run cy:run'
            }
        }
    }
}
