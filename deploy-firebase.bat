@echo off
REM Firebase 배포 스크립트 (Windows)
REM 사용 전 Node.js 설치 및 Firebase CLI 설치 필요

echo Starting Firebase deployment...

REM Firebase CLI 설치 확인
firebase --version >nul 2>&1
if errorlevel 1 (
    echo Firebase CLI가 설치되지 않았습니다.
    echo npm install -g firebase-tools 를 실행해주세요.
    pause
    exit /b 1
)

REM Firebase 로그인 상태 확인
firebase projects:list >nul 2>&1
if errorlevel 1 (
    echo Firebase 로그인이 필요합니다.
    firebase login
)

REM 프로젝트 초기화 (최초 1회만)
if not exist firebase.json (
    echo Firebase 프로젝트를 초기화합니다...
    firebase init hosting
)

REM 배포 실행
echo 배포를 시작합니다...
firebase deploy

echo 배포가 완료되었습니다!
echo 웹사이트 URL을 확인하세요.
pause
