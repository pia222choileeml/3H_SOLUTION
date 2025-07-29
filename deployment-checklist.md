# 3H-Solutions AWS 배포 체크리스트

## 배포 전 준비사항

### 1. AWS 계정 준비
- [ ] AWS 계정 생성
- [ ] 결제 정보 등록
- [ ] IAM 사용자 생성 (배포용)

### 2. AWS CLI 설치 및 설정
```bash
# Windows (PowerShell)
winget install Amazon.AWSCLI

# 설정
aws configure
```
필요한 정보:
- Access Key ID
- Secret Access Key  
- Default region: ap-northeast-2
- Default output format: json

### 3. 배포할 파일 확인
현재 프로젝트 구조:
```
3HSOLUTION/
├── index.html (메인 페이지)
├── cablecar.html
├── catturning.html
├── computervisoin.html
├── llm.html
├── motorsports.html
├── samrtfactory.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── components/
│   ├── navbar.html
│   ├── footer.html
│   ├── common-styles.css
│   └── common.js
└── images/
```

## 배포 옵션별 단계

### 옵션 1: AWS S3 + CloudFront (권장)

#### 단계별 진행:
1. **S3 버킷 생성**
   - 버킷명: `3h-solutions-website` (고유해야 함)
   - 리전: `ap-northeast-2` (서울)
   - 퍼블릭 액세스 허용

2. **정적 웹사이트 호스팅 활성화**
   - 인덱스 문서: `index.html`
   - 오류 문서: `index.html`

3. **파일 업로드**
   ```bash
   aws s3 sync . s3://3h-solutions-website --exclude "*.md" --exclude "deploy.*"
   ```

4. **CloudFront 배포 생성**
   - Origin: S3 버킷 웹사이트 엔드포인트
   - SSL 인증서: CloudFront 기본 인증서
   - 캐시 정책: CachingOptimized

5. **도메인 연결 (선택)**
   - Route 53에서 도메인 관리
   - A 레코드로 CloudFront 연결

### 옵션 2: AWS Amplify (Git 연동)

#### 단계별 진행:
1. **Git 저장소 준비**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Amplify 앱 생성**
   - GitHub/GitLab 연결
   - 브랜치: main
   - 빌드 설정: 기본값 사용

3. **자동 배포 설정**
   - Git push시 자동 빌드/배포
   - 브랜치별 환경 분리 가능

## 예상 비용 (월 기준)

### S3 + CloudFront:
- S3 스토리지: $0.1 (1GB 기준)
- S3 요청: $1-3 (트래픽에 따라)
- CloudFront: $1-5 (트래픽에 따라)
- **총합: $2-8/월**

### Amplify:
- 빌드 시간: 무료 (월 1,000분)
- 호스팅: $0.15/GB (스토리지)
- 데이터 전송: $0.15/GB
- **총합: $5-15/월**

## 성능 최적화

### 1. 이미지 최적화
- [ ] WebP 형식 사용
- [ ] 이미지 압축
- [ ] 반응형 이미지

### 2. CSS/JS 최적화
- [ ] CSS 파일 압축
- [ ] JavaScript 압축
- [ ] 불필요한 코드 제거

### 3. 캐시 설정
- [ ] HTML: 짧은 캐시 (1시간)
- [ ] CSS/JS: 긴 캐시 (1년)
- [ ] 이미지: 긴 캐시 (1년)

## 보안 설정

### 1. HTTPS 강제
- [ ] CloudFront에서 HTTP → HTTPS 리다이렉트
- [ ] HSTS 헤더 설정

### 2. 보안 헤더
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 모니터링

### 1. CloudWatch 메트릭
- [ ] 방문자 수 모니터링
- [ ] 오류 로그 확인
- [ ] 성능 메트릭 추적

### 2. Google Analytics (선택)
- [ ] GA4 코드 추가
- [ ] 사용자 행동 분석

## 다음 단계

1. **즉시 시작**: S3 + CloudFront로 배포
2. **점진적 개선**: 성능 최적화 적용
3. **고도화**: CI/CD 파이프라인 구축
