@echo off
REM AWS S3 배포 스크립트
REM 사용 전 AWS CLI 설치 및 configure 필요

echo Starting deployment to AWS S3...

REM 변수 설정
set BUCKET_NAME=3h-solutions-website
set CLOUDFRONT_DISTRIBUTION_ID=YOUR_DISTRIBUTION_ID

REM S3에 파일 업로드 (기존 파일 삭제 후 새로 업로드)
echo Uploading files to S3...
aws s3 sync . s3://%BUCKET_NAME% --delete --exclude "deployment-guide.md" --exclude "deploy.bat" --exclude ".git/*" --exclude "*.md"

REM CloudFront 캐시 무효화
echo Invalidating CloudFront cache...
aws cloudfront create-invalidation --distribution-id %CLOUDFRONT_DISTRIBUTION_ID% --paths "/*"

echo Deployment completed!
echo Website URL: https://%CLOUDFRONT_DISTRIBUTION_ID%.cloudfront.net
pause
