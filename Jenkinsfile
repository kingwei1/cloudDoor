#!/usr/bin/env groovy
node {
    stage('checkout') {
        checkout scm
    }
    stage('check npm') {
        sh "npm -version"
        sh "node -v"
    }
    stage('install dependencies'){
        sh "npm install"
    }
    stage('build project') {
        sh "npm run build"
    }
}
