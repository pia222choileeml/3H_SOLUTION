# Google Cloud 배포 가이드

## 옵션 1: Firebase Hosting (가장 추천)

### 장점:
- 무료 티어 제공 (월 10GB 스토리지, 360MB/일 전송)
- 자동 SSL 인증서
- 글로벌 CDN
- 커스텀 도메인 지원
- Git 연동 가능
- 매우 빠른 배포

### 필요 조건:
- Google 계정
- Node.js 설치 (Firebase CLI용)

### 배포 단계:

#### 1단계: Firebase CLI 설치
```bash
# Node.js 설치 후
npm install -g firebase-tools

# 로그인
firebase login
```

#### 2단계: Firebase 프로젝트 생성
1. [Firebase Console](https://console.firebase.google.com/) 방문
2. "프로젝트 추가" 클릭
3. 프로젝트 이름: `3h-solutions`
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성

#### 3단계: 프로젝트 초기화
```bash
# 프로젝트 폴더에서 실행
firebase init hosting

# 설정 옵션:
# - Use an existing project: 3h-solutions
# - Public directory: . (현재 폴더)
# - Single-page app: Yes
# - GitHub auto-deploy: Yes (선택사항)
```

#### 4단계: 배포
```bash
firebase deploy
```

### 결과:
- URL: `https://3h-solutions.web.app`
- 커스텀 도메인: `https://3h-solutions.firebaseapp.com`

---

## 옵션 2: Google Cloud Storage (정적 웹사이트)

### 장점:
- 저렴한 비용
- 높은 가용성
- Cloud CDN 연동 가능
- 세밀한 제어 가능

### 배포 단계:

#### 1단계: Google Cloud Console 설정
1. [Google Cloud Console](https://console.cloud.google.com/) 방문
2. 새 프로젝트 생성: `3h-solutions`
3. 결제 계정 연결

#### 2단계: Cloud Storage 버킷 생성
1. Cloud Storage로 이동
2. "버킷 만들기" 클릭
3. 버킷 이름: `3h-solutions-website` (글로벌 고유)
4. 위치: asia-northeast3 (서울)
5. 스토리지 클래스: Standard
6. 액세스 제어: 세분화

#### 3단계: 정적 웹사이트 설정
```bash
# Google Cloud SDK 설치 후
gsutil web set -m index.html -e index.html gs://3h-solutions-website
```

#### 4단계: 공개 액세스 설정
```bash
gsutil iam ch allUsers:objectViewer gs://3h-solutions-website
```

#### 5단계: 파일 업로드
```bash
gsutil -m cp -r . gs://3h-solutions-website
```

### 결과:
- URL: `https://storage.googleapis.com/3h-solutions-website/index.html`

---

## 옵션 3: Google App Engine (과도한 방법)

### 배포 단계:

#### 1. app.yaml 생성
```yaml
runtime: python39
env: standard

handlers:
- url: /
  static_files: index.html
  upload: index.html

- url: /(.*)
  static_files: \1
  upload: (.*)

- url: /.*
  static_files: index.html
  upload: index.html
```

#### 2. 배포
```bash
gcloud app deploy
```

---

## 옵션 4: Cloud Run (컨테이너 기반)

### Dockerfile 생성:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

### 배포:
```bash
# 컨테이너 빌드
gcloud builds submit --tag gcr.io/3h-solutions/website

# Cloud Run 배포
gcloud run deploy website --image gcr.io/3h-solutions/website --platform managed --region asia-northeast3 --allow-unauthenticated
```

---

## 비용 비교 (월 기준)

### Firebase Hosting:
- **무료 티어**: 10GB 스토리지, 360MB/일 전송
- **유료**: 스토리지 $0.026/GB, 전송 $0.15/GB
- **예상**: $0-5/월

### Cloud Storage:
- **스토리지**: $0.020/GB
- **네트워크**: $0.12/GB (아시아 내)
- **운영**: $0.005/1,000 requests
- **예상**: $1-3/월

### App Engine:
- **인스턴스**: $0.05/시간
- **예상**: $35+/월 (비추천)

### Cloud Run:
- **요청당**: $0.0000004
- **CPU**: $0.00002400/vCPU-초
- **메모리**: $0.00000250/GB-초
- **예상**: $5-15/월

---

## 자동 배포 설정

### GitHub Actions + Firebase
```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: '${{ secrets.GITHUB_TOKEN }}'
        firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
        projectId: 3h-solutions
```

### GitHub Actions + Cloud Storage
```yaml
name: Deploy to GCS
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: google-github-actions/setup-gcloud@master
      with:
        service_account_key: ${{ secrets.GCP_SERVICE_ACCOUNT_KEY }}
        project_id: 3h-solutions
    - run: gsutil -m rsync -r -d . gs://3h-solutions-website
```

---

## 도메인 연결

### Cloud DNS 사용:
1. Cloud DNS에서 DNS 영역 생성
2. 네임서버를 도메인 등록업체에 설정
3. A 레코드로 로드 밸런서 IP 연결

### Firebase 도메인:
1. Firebase Console → Hosting → 도메인 추가
2. 도메인 소유권 확인
3. DNS 레코드 설정

---

## 성능 최적화

### Cloud CDN 설정:
```bash
# 로드 밸런서 생성
gcloud compute backend-buckets create 3h-solutions-backend --gcs-bucket-name=3h-solutions-website

# CDN 활성화
gcloud compute backend-buckets update 3h-solutions-backend --enable-cdn
```

### 캐시 정책:
- HTML: 1시간
- CSS/JS: 1년
- 이미지: 1년

---

## 모니터링

### Cloud Monitoring:
- 웹사이트 업타임 체크
- 성능 메트릭
- 알림 설정

### Google Analytics:
- 사용자 행동 분석
- 트래픽 소스 추적

---

## 권장 순서:

1. **즉시 시작**: Firebase Hosting (무료, 간단)
2. **비용 최적화**: Cloud Storage + Cloud CDN
3. **고급 설정**: Cloud Run (확장성 필요시)

Firebase Hosting이 가장 간단하고 효율적입니다!
