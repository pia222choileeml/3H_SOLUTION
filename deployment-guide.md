# AWS 배포 가이드

## 옵션 1: S3 + CloudFront (추천)

### 1단계: S3 버킷 생성
1. AWS 콘솔에서 S3 서비스로 이동
2. "버킷 만들기" 클릭
3. 버킷 이름 입력 (예: 3h-solutions-website)
4. 리전 선택 (ap-northeast-2 서울 추천)
5. "퍼블릭 액세스 차단" 설정 해제
6. 버킷 생성

### 2단계: 정적 웹사이트 호스팅 설정
1. 생성된 버킷 선택
2. "속성" 탭으로 이동
3. "정적 웹 사이트 호스팅" 편집
4. "정적 웹 사이트 호스팅 활성화" 선택
5. 인덱스 문서: `index.html`
6. 오류 문서: `index.html` (SPA 라우팅용)

### 3단계: 버킷 정책 설정
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::3h-solutions-website/*"
        }
    ]
}
```

### 4단계: 파일 업로드
- 모든 프로젝트 파일을 S3 버킷에 업로드
- 폴더 구조 유지 (assets/, components/, images/ 등)

### 5단계: CloudFront 배포 설정
1. CloudFront 서비스로 이동
2. "배포 생성" 클릭
3. Origin Domain: S3 버킷 웹사이트 엔드포인트
4. Viewer Protocol Policy: "Redirect HTTP to HTTPS"
5. Allowed HTTP Methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
6. Cache Behavior 설정:
   - Path Pattern: `*.html`
   - TTL: 0 (즉시 업데이트)

## 옵션 2: AWS Amplify (간단함)

### 장점:
- Git 연동 자동 배포
- 도메인 관리 간편
- CI/CD 자동화
- 브랜치별 배포 가능

### 배포 단계:
1. GitHub/GitLab에 코드 업로드
2. AWS Amplify 콘솔에서 "앱 만들기"
3. Git 저장소 연결
4. 빌드 설정 (정적 사이트이므로 기본값 사용)
5. 배포 시작

## 옵션 3: AWS EC2 (과도한 방법)

정적 사이트에는 권장하지 않음 (비용이 많이 듦)

## 도메인 연결 (선택사항)

### Route 53 사용:
1. Route 53에서 도메인 구매 또는 기존 도메인 이전
2. Hosted Zone 생성
3. A 레코드로 CloudFront 배포 연결

## 비용 예상:
- S3: 월 $1-5 (트래픽에 따라)
- CloudFront: 월 $1-10 (트래픽에 따라)
- Route 53: 월 $0.5 + 도메인 비용

## 권장 사항:
1. **S3 + CloudFront** 조합 사용
2. 개발/프로덕션 환경 분리
3. Git을 통한 버전 관리
4. 자동 배포 스크립트 작성
