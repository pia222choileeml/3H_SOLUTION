#!/bin/bash
# Firebase 배포 스크립트 (Linux/Mac)
# 사용 전 Node.js 설치 및 Firebase CLI 설치 필요

echo "Starting Firebase deployment..."

# Firebase CLI 설치 확인
if ! command -v firebase &> /dev/null; then
    echo "Firebase CLI가 설치되지 않았습니다."
    echo "npm install -g firebase-tools 를 실행해주세요."
    exit 1
fi

# Firebase 로그인 상태 확인
if ! firebase projects:list &> /dev/null; then
    echo "Firebase 로그인이 필요합니다."
    firebase login
fi

# 프로젝트 초기화 (최초 1회만)
if [ ! -f firebase.json ]; then
    echo "Firebase 프로젝트를 초기화합니다..."
    firebase init hosting
fi

# 배포 실행
echo "배포를 시작합니다..."
firebase deploy

echo "배포가 완료되었습니다!"
echo "웹사이트 URL을 확인하세요."
