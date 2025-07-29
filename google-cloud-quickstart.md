# Google Cloud 간단 시작 가이드

## 🚀 빠른 시작 (Firebase Hosting - 추천)

### 1분 만에 배포하기:

#### 1단계: Node.js 설치
- [Node.js 공식 사이트](https://nodejs.org/) 다운로드
- 또는 PowerShell: `winget install OpenJS.NodeJS`

#### 2단계: Firebase CLI 설치
```bash
npm install -g firebase-tools
```

#### 3단계: Firebase 로그인
```bash
firebase login
```

#### 4단계: 배포 스크립트 실행
```bash
# Windows
deploy-firebase.bat

# Linux/Mac
chmod +x deploy-firebase.sh
./deploy-firebase.sh
```

### 결과:
- 무료 호스팅 제공
- 자동 SSL 인증서
- 글로벌 CDN
- URL: `https://프로젝트명.web.app`

---

## 💰 비용 비교

| 서비스 | 무료 티어 | 월 예상 비용 | 장점 |
|--------|-----------|--------------|------|
| **Firebase Hosting** | 10GB/360MB일 | $0-5 | 가장 간단, SSL 자동 |
| **Cloud Storage** | 5GB | $1-3 | 저렴, 유연함 |
| **App Engine** | 없음 | $35+ | 동적 사이트용 |
| **Cloud Run** | 일부 | $5-15 | 컨테이너 기반 |

---

## 🔧 서비스별 특징

### Firebase Hosting ⭐ (추천)
```
✅ 무료 티어 충분
✅ 설정 매우 간단
✅ SSL 자동 적용
✅ 글로벌 CDN
✅ 커스텀 도메인
❌ Google에 종속
```

### Cloud Storage
```
✅ 매우 저렴
✅ 높은 안정성
✅ Cloud CDN 연동
❌ 설정 복잡
❌ HTTPS 설정 필요
```

### App Engine
```
✅ 완전 관리형
✅ 자동 스케일링
❌ 정적 사이트에 과도
❌ 비용 높음
```

### Cloud Run
```
✅ 컨테이너 기반
✅ 서버리스
✅ 확장성 좋음
❌ 설정 복잡
❌ 정적 사이트에 과도
```

---

## 📋 단계별 체크리스트

### Firebase Hosting 배포:
- [ ] Google 계정 준비
- [ ] Node.js 설치
- [ ] Firebase CLI 설치 (`npm install -g firebase-tools`)
- [ ] Firebase 로그인 (`firebase login`)
- [ ] 프로젝트 생성 (Firebase Console)
- [ ] 프로젝트 초기화 (`firebase init hosting`)
- [ ] 배포 실행 (`firebase deploy`)

### Cloud Storage 배포:
- [ ] Google Cloud 계정 준비
- [ ] 프로젝트 생성
- [ ] 결제 계정 연결
- [ ] Cloud SDK 설치
- [ ] gcloud 인증 (`gcloud auth login`)
- [ ] 버킷 생성
- [ ] 정적 웹사이트 설정
- [ ] 파일 업로드

---

## 🌐 도메인 연결

### Firebase 도메인:
1. Firebase Console → Hosting
2. "도메인 추가" 클릭
3. 도메인 입력 및 소유권 확인
4. DNS 레코드 설정 (A 또는 CNAME)

### Cloud DNS:
1. Cloud DNS에서 DNS 영역 생성
2. 도메인 등록업체에서 네임서버 변경
3. A 레코드로 IP 연결

---

## 🔄 자동 배포 설정

### GitHub Actions + Firebase:
```yaml
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
        projectId: your-project-id
```

---

## 🛠️ 문제 해결

### Firebase 관련:
- **로그인 문제**: `firebase logout` 후 `firebase login` 재시도
- **권한 문제**: 프로젝트 IAM에서 권한 확인
- **배포 실패**: `firebase.json` 설정 확인

### Cloud Storage 관련:
- **버킷 이름 중복**: 글로벌 고유 이름 사용
- **권한 문제**: `gsutil iam` 명령으로 권한 설정
- **CORS 에러**: CORS 정책 설정 필요

---

## 📞 지원 및 문서

- [Firebase 문서](https://firebase.google.com/docs/hosting)
- [Cloud Storage 문서](https://cloud.google.com/storage/docs)
- [Google Cloud 지원](https://cloud.google.com/support)

---

## 🎯 권장 사항

1. **개발/테스트**: Firebase Hosting (무료)
2. **소규모 운영**: Firebase Hosting
3. **대규모 운영**: Cloud Storage + Cloud CDN
4. **Enterprise**: Cloud Load Balancer + Cloud Storage

**결론**: 대부분의 경우 Firebase Hosting이 가장 적합합니다!
