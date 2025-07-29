# Git Account Switcher

프로젝트별로 Git 계정을 쉽게 변경할 수 있는 스크립트입니다.

## 파일 설명

- **git-account-switcher.bat** - Windows용 스크립트
- **git-account-switcher.sh** - Linux/macOS용 스크립트

## 기능

1. **현재 Git 설정 확인** - 현재 설정된 사용자명과 이메일 표시
2. **미리 정의된 계정 선택** - 자주 사용하는 계정을 빠르게 선택
3. **사용자 정의 계정** - 새로운 계정 정보 직접 입력
4. **GitHub 인증 정보 초기화** - 저장된 GitHub 인증 정보 삭제

## 사용 방법

### Windows
```bash
# 프로젝트 폴더에서 실행
.\git-account-switcher.bat
```

### Linux/macOS
```bash
# 실행 권한 부여
chmod +x git-account-switcher.sh

# 스크립트 실행
./git-account-switcher.sh
```

## 미리 정의된 계정

### 1. pia222choileeml (개인계정)
- 사용자명: `pia222choileeml`
- 이메일: `pia222.choi.lee.ml@gmail.com`

### 2. kyuyoungleekookmin (회사계정)
- 사용자명: `kyuyoungleekookmin`
- 이메일: 실행 시 입력

## 주요 시나리오

### 새 프로젝트 시작 시
1. 스크립트 실행
2. 해당 프로젝트에 맞는 계정 선택
3. 자동으로 Git 설정 변경

### GitHub 인증 문제 발생 시
1. 스크립트 실행
2. "4. GitHub 인증 정보 초기화" 선택
3. 다음 git push 시 새로운 인증창 표시

### 계정 변경 후 확인
```bash
git config user.name
git config user.email
```

## 추가 팁

- 각 프로젝트 폴더에 스크립트를 복사해서 사용하면 편리합니다
- VS Code 터미널에서도 실행 가능합니다
- Private 저장소 작업 시 인증 초기화가 유용합니다

## 문제 해결

### Windows에서 실행 정책 오류 시
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 권한 관련 문제 시
- Windows: 관리자 권한으로 실행
- Linux/macOS: `sudo`로 실행하거나 권한 확인
