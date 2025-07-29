# 3H-Solutions Website

3H-Solutions AI 솔루션 회사의 공식 웹사이트입니다.

## 🌐 Live Demo
- **Firebase Hosting**: https://h-solutions-website.web.app
- **GitHub Pages**: https://pia222choileeml.github.io/3H_SOLUTION (설정 후)

## 🛠️ 기술 스택
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5.3.0
- **Hosting**: Firebase Hosting
- **Font**: Google Fonts (Inter)
- **Icons**: Custom SVG Icons

## 📂 프로젝트 구조
```
3H_SOLUTION/
├── index.html              # 메인 페이지
├── cablecar.html           # 케이블카 시스템 페이지
├── catturning.html         # 자동차 튜닝 페이지
├── computervisoin.html     # 컴퓨터 비전 페이지
├── llm.html               # LLM 솔루션 페이지
├── motorsports.html       # 모터스포츠 페이지
├── samrtfactory.html      # 스마트 팩토리 페이지
├── assets/
│   ├── css/              # 페이지별 CSS 파일
│   ├── js/               # 페이지별 JavaScript 파일
│   └── images/           # 이미지 리소스
├── components/
│   ├── navbar.html       # 네비게이션 컴포넌트
│   ├── footer.html       # 푸터 컴포넌트
│   ├── common-styles.css # 공통 스타일
│   └── common.js         # 공통 JavaScript
├── images/               # 메인 이미지들
├── firebase.json         # Firebase 설정
└── README.md            # 프로젝트 문서
```

## 🚀 배포 방법

### Firebase Hosting
```bash
# Firebase CLI 설치
npm install -g firebase-tools

# 로그인
firebase login

# 배포
firebase deploy
```

### GitHub Pages (선택사항)
1. GitHub 저장소 Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / root
4. Save

## 🔧 개발 환경 설정

### 로컬 개발 서버 실행
```bash
# Python 사용
python -m http.server 8000

# Node.js 사용
npx serve .

# Live Server (VS Code Extension) 사용
```

## 📱 반응형 디자인
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 576px - 767px
- **Small Mobile**: 575px 이하

## 🎨 주요 기능
- ✅ 반응형 웹 디자인
- ✅ 부드러운 스크롤 애니메이션
- ✅ 인터랙티브 네비게이션
- ✅ 메가 메뉴 (Solutions 드롭다운)
- ✅ 모바일 친화적 UI
- ✅ SEO 최적화
- ✅ 빠른 로딩 속도

## 📊 성능 최적화
- CSS/JS 압축 및 최소화
- 이미지 최적화
- CDN 활용 (Bootstrap, Google Fonts)
- 캐시 설정 (Firebase)

## 🔍 SEO 설정
- 시맨틱 HTML 구조
- 메타 태그 최적화
- Open Graph 태그
- 구조화된 데이터

## 📞 문의 정보
- **이메일**: jet21n@naver.com
- **전화**: +82-10-7211-7807
- **주소**: #416, Buildings C, Cwangmyeong TradeCenter, 72 iljik-ro, Cwangmyeong-si Cyenggi-do, Republic of Korea

## 📝 라이선스
© 2025 3H-Solutions. All rights reserved.

## 🤝 기여 방법
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📈 업데이트 로그
- **v1.0.0** (2025-07-29): 초기 웹사이트 런칭
  - 메인 페이지 및 6개 솔루션 페이지 완성
  - Firebase Hosting 배포
  - 반응형 디자인 구현
  - 메가 메뉴 네비게이션 구현
