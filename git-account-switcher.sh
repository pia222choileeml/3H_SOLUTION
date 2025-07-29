#!/bin/bash

# ================================================
# Git Account Switcher for Linux/macOS
# Git 계정을 프로젝트별로 쉽게 변경하는 스크립트
# ================================================

echo ""
echo "=========================================="
echo "    Git Account Switcher"
echo "=========================================="
echo ""

# 현재 Git 설정 표시
echo "[현재 Git 설정]"
current_name=$(git config user.name 2>/dev/null)
current_email=$(git config user.email 2>/dev/null)

if [ -z "$current_name" ]; then
    echo "사용자명: 설정되지 않음"
else
    echo "사용자명: $current_name"
fi

if [ -z "$current_email" ]; then
    echo "이메일: 설정되지 않음"
else
    echo "이메일: $current_email"
fi

echo ""
echo "=========================================="
echo ""

# 미리 정의된 계정 선택
echo "사용할 Git 계정을 선택하세요:"
echo ""
echo "1. pia222choileeml (개인계정)"
echo "   - 이름: pia222choileeml"
echo "   - 이메일: pia222.choi.lee.ml@gmail.com"
echo ""
echo "2. kyuyoungleekookmin (회사계정)"
echo "   - 이름: kyuyoungleekookmin"
echo "   - 이메일: [회사 이메일]"
echo ""
echo "3. 직접 입력"
echo ""
echo "4. GitHub 인증 정보 초기화 (credential 삭제)"
echo ""
read -p "선택 (1-4): " choice

case $choice in
    1)
        echo ""
        echo "[pia222choileeml 계정으로 설정 중...]"
        git config --global user.name "pia222choileeml"
        git config --global user.email "pia222.choi.lee.ml@gmail.com"
        echo "✓ Git 계정이 설정되었습니다."
        ;;
    2)
        echo ""
        echo "[kyuyoungleekookmin 계정으로 설정 중...]"
        git config --global user.name "kyuyoungleekookmin"
        read -p "회사 이메일을 입력하세요: " company_email
        git config --global user.email "$company_email"
        echo "✓ Git 계정이 설정되었습니다."
        ;;
    3)
        echo ""
        echo "[사용자 정의 계정 설정]"
        read -p "Git 사용자명을 입력하세요: " custom_name
        read -p "Git 이메일을 입력하세요: " custom_email
        git config --global user.name "$custom_name"
        git config --global user.email "$custom_email"
        echo "✓ Git 계정이 설정되었습니다."
        ;;
    4)
        echo ""
        echo "[GitHub 인증 정보 초기화 중...]"
        echo ""
        echo "1. Git credential helper 확인 중..."
        git config --list | grep credential
        echo ""
        echo "2. macOS Keychain/Linux credential 삭제 중..."
        
        # macOS의 경우
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS Keychain에서 GitHub 인증 정보 삭제
            security delete-internet-password -s github.com 2>/dev/null
            echo "   ✓ macOS Keychain에서 GitHub 인증 정보가 삭제되었습니다."
        else
            # Linux의 경우 - credential helper 설정 제거
            git config --global --unset credential.helper 2>/dev/null
            echo "   ✓ credential helper 설정이 제거되었습니다."
        fi
        
        echo ""
        echo "✓ 인증 정보 초기화가 완료되었습니다."
        echo "  다음 git push 시 새로운 인증창이 나타납니다."
        exit 0
        ;;
    *)
        echo ""
        echo "❌ 잘못된 선택입니다. 1-4 중에서 선택해주세요."
        exit 1
        ;;
esac

# 결과 표시
echo ""
echo "=========================================="
echo "[변경된 Git 설정]"
echo "사용자명: $(git config user.name)"
echo "이메일: $(git config user.email)"
echo "=========================================="
echo ""
echo "스크립트가 완료되었습니다."
