@echo off
REM Google Cloud Storage 배포 스크립트 (Windows)
REM 사용 전 Google Cloud SDK 설치 및 gcloud 인증 필요

echo Starting Google Cloud Storage deployment...

REM 변수 설정
set BUCKET_NAME=3h-solutions-website
set PROJECT_ID=3h-solutions

REM gcloud CLI 설치 확인
gcloud version >nul 2>&1
if errorlevel 1 (
    echo Google Cloud SDK가 설치되지 않았습니다.
    echo https://cloud.google.com/sdk/docs/install 에서 설치해주세요.
    pause
    exit /b 1
)

REM 인증 확인
gcloud auth list --filter="status:ACTIVE" --format="value(account)" >nul 2>&1
if errorlevel 1 (
    echo Google Cloud 인증이 필요합니다.
    gcloud auth login
)

REM 프로젝트 설정
gcloud config set project %PROJECT_ID%

REM 버킷 생성 (이미 존재하면 무시)
echo 버킷을 생성합니다...
gsutil mb -p %PROJECT_ID% -l asia-northeast3 gs://%BUCKET_NAME% 2>nul

REM 정적 웹사이트 설정
echo 정적 웹사이트를 설정합니다...
gsutil web set -m index.html -e index.html gs://%BUCKET_NAME%

REM 공개 액세스 설정
echo 공개 액세스를 설정합니다...
gsutil iam ch allUsers:objectViewer gs://%BUCKET_NAME%

REM 파일 업로드
echo 파일을 업로드합니다...
gsutil -m rsync -r -d . gs://%BUCKET_NAME% -x "deploy-.*|.*\.md|.*\.bat|.*\.sh"

echo 배포가 완료되었습니다!
echo 웹사이트 URL: https://storage.googleapis.com/%BUCKET_NAME%/index.html
pause
