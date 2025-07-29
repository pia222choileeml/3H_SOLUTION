# 배포 환경별 설정

## 개발 환경 (Development)
- **플랫폼**: Firebase Hosting
- **URL**: https://3h-solutions-dev.web.app
- **브랜치**: develop
- **용도**: 개발 테스트

## 스테이징 환경 (Staging)
- **플랫폼**: Firebase Hosting
- **URL**: https://3h-solutions-staging.web.app
- **브랜치**: staging
- **용도**: 배포 전 최종 테스트

## 프로덕션 환경 (Production)
- **플랫폼**: Firebase Hosting + Cloud CDN
- **URL**: https://3h-solutions.com
- **브랜치**: main
- **용도**: 실제 서비스

---

## 배포 플랫폼별 설정

### 1. Firebase Hosting (추천)
```json
{
  "hosting": {
    "public": ".",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{"source": "**", "destination": "/index.html"}]
  }
}
```

**장점:**
- 무료 SSL 인증서
- 글로벌 CDN
- 간단한 배포
- 커스텀 도메인 지원

**비용:** 무료 (10GB 스토리지, 360MB/일 전송량)

### 2. Google Cloud Storage
```bash
# 버킷 생성
gsutil mb -p 3h-solutions -l asia-northeast3 gs://3h-solutions-website

# 정적 웹사이트 설정
gsutil web set -m index.html -e index.html gs://3h-solutions-website

# 공개 액세스
gsutil iam ch allUsers:objectViewer gs://3h-solutions-website
```

**장점:**
- 매우 저렴
- 높은 안정성
- Cloud CDN 연동 가능

**비용:** $1-3/월

### 3. Google App Engine
```yaml
# app.yaml
runtime: python39
handlers:
  - url: /
    static_files: index.html
    upload: index.html
  - url: /(.*)
    static_files: \1
    upload: (.*)
```

**장점:**
- 완전 관리형
- 자동 스케일링

**단점:**
- 정적 사이트에 과도한 기능
- 비용 높음 ($35+/월)

---

## 성능 최적화

### 1. 이미지 최적화
- WebP 형식 사용
- 이미지 압축 (80-90% 품질)
- 반응형 이미지 제공

### 2. 코드 최적화
- CSS/JS 압축
- 불필요한 코드 제거
- 지연 로딩 적용

### 3. 캐시 설정
```json
{
  "headers": [
    {
      "source": "**/*.@(css|js)",
      "headers": [{"key": "Cache-Control", "value": "max-age=31536000"}]
    },
    {
      "source": "**/*.html",
      "headers": [{"key": "Cache-Control", "value": "max-age=3600"}]
    }
  ]
}
```

---

## 모니터링 및 분석

### 1. Google Analytics 4
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Firebase Performance Monitoring
```html
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-performance.js"></script>
```

### 3. Search Console 설정
- 사이트맵 제출: `https://도메인/sitemap.xml`
- 소유권 확인
- Core Web Vitals 모니터링

---

## 보안 설정

### 1. HTTPS 강제
- Firebase: 자동 제공
- Cloud Storage: Cloud Load Balancer 필요

### 2. 보안 헤더
```json
{
  "headers": [
    {
      "source": "**",
      "headers": [
        {"key": "X-Content-Type-Options", "value": "nosniff"},
        {"key": "X-Frame-Options", "value": "DENY"},
        {"key": "X-XSS-Protection", "value": "1; mode=block"}
      ]
    }
  ]
}
```

### 3. CSP (Content Security Policy)
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com;">
```

---

## 백업 및 복구

### 1. 소스 코드 백업
- GitHub/GitLab 저장소
- 정기적인 커밋
- 태그 기반 릴리스

### 2. 데이터 백업
- Firebase: 자동 백업
- Cloud Storage: 버전 관리 활성화

### 3. 복구 절차
```bash
# Firebase 이전 버전 롤백
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID TARGET_SITE_ID:live

# Cloud Storage 이전 버전 복원
gsutil cp gs://bucket/object#generation gs://bucket/object
```

---

## 비용 최적화

### 1. 무료 티어 활용
- Firebase: 10GB 스토리지, 360MB/일
- Google Cloud: $300 크레딧 (신규 사용자)

### 2. 트래픽 최적화
- 이미지 압축
- CDN 캐시 활용
- 불필요한 리소스 제거

### 3. 비용 모니터링
- Cloud Billing 알림 설정
- 예산 한도 설정
- 정기적인 사용량 검토

---

## 권장 배포 순서

1. **즉시 테스트**: Firebase Hosting (무료, 5분 배포)
2. **프로덕션 준비**: 커스텀 도메인 연결
3. **성능 최적화**: CDN, 압축, 캐시 설정
4. **모니터링 설정**: Analytics, Performance Monitoring
5. **보안 강화**: HTTPS, 보안 헤더, CSP

**결론**: Firebase Hosting으로 시작하여 점진적으로 기능을 확장하는 것이 가장 효율적입니다!
