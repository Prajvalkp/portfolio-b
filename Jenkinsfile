pipeline {
agent any

stages {

    stage('Deploy Website') {
        steps {
            sh '''
            sudo rm -rf /var/www/html/*
            sudo cp -r * /var/www/html/
            '''
        }
    }
}
}
