class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'ko';
        this.translations = {};
        this.fallbackLang = 'en';
    }

    async init() {
        await this.loadTranslations(this.currentLang);
        if (this.currentLang !== this.fallbackLang) {
            await this.loadTranslations(this.fallbackLang);
        }
        this.updatePage();
        this.bindLanguageSwitch();
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (response.ok) {
                this.translations[lang] = await response.json();
            } else {
                console.warn(`Failed to load translations for ${lang}`);
            }
        } catch (error) {
            console.error(`Error loading translations for ${lang}:`, error);
        }
    }

    t(key, lang = this.currentLang) {
        const keys = key.split('.');
        let translation = this.translations[lang];
        
        for (const k of keys) {
            if (translation && typeof translation === 'object' && k in translation) {
                translation = translation[k];
            } else {
                // Fallback to other language if key not found
                if (lang !== this.fallbackLang && this.translations[this.fallbackLang]) {
                    return this.t(key, this.fallbackLang);
                }
                // Only warn once for missing keys to reduce console noise
                if (!this.warnedKeys) this.warnedKeys = new Set();
                if (!this.warnedKeys.has(key)) {
                    console.warn(`Translation key not found: ${key}`);
                    this.warnedKeys.add(key);
                }
                return key;
            }
        }
        
        return translation || key;
    }

    async setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // 새로운 언어의 번역을 다시 로드
        await this.loadTranslations(lang);
        
        // body 클래스 갱신
        document.body.classList.remove('lang-ko', 'lang-en');
        document.body.classList.add('lang-' + this.currentLang);
        
        // 강제로 모든 번역 업데이트
        this.forceUpdateAllTranslations();
        
        // 컴포넌트들도 다시 번역 적용
        setTimeout(() => {
            this.updatePage();
        }, 100);
        
        // 추가로 한 번 더 업데이트 (동적 컨텐츠 대응)
        setTimeout(() => {
            this.forceUpdateAllTranslations();
        }, 300);
    }

    forceUpdateAllTranslations() {
        // 모든 data-i18n 요소를 강제로 업데이트
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else if (element.hasAttribute('data-i18n-html') || translation.includes('<br>') || translation.includes('<')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // 언어 선택기 업데이트
        this.updateLanguageSelector();
        
        // 페이지 제목 업데이트
        const titleKey = document.documentElement.getAttribute('data-i18n-title');
        if (titleKey) {
            document.title = this.t(titleKey);
        }
    }

    updatePage() {
        // body 클래스 갱신
        document.body.classList.remove('lang-ko', 'lang-en');
        document.body.classList.add('lang-' + this.currentLang);
        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else if (element.hasAttribute('data-i18n-html') || translation.includes('<br>') || translation.includes('<')) {
                // Use innerHTML for HTML content or when HTML tags are detected
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update page title
        const titleKey = document.documentElement.getAttribute('data-i18n-title');
        if (titleKey) {
            document.title = this.t(titleKey);
        }

        // Update language selector
        this.updateLanguageSelector();
    }

    updateLanguageSelector() {
        const langButtons = document.querySelectorAll('[data-lang]');
        langButtons.forEach(button => {
            const lang = button.getAttribute('data-lang');
            button.classList.toggle('active', lang === this.currentLang);
        });
    }

    bindLanguageSwitch() {
        document.addEventListener('click', async (e) => {
            const langButton = e.target.closest('[data-lang]');
            if (langButton) {
                e.preventDefault();
                
                // 로딩 표시 (선택사항)
                const originalText = langButton.textContent;
                langButton.textContent = '...';
                langButton.style.pointerEvents = 'none';
                
                const lang = langButton.getAttribute('data-lang');
                await this.setLanguage(lang);
                
                // 로딩 표시 복원
                langButton.textContent = originalText;
                langButton.style.pointerEvents = 'auto';
            }
        });
    }

    // Helper method for dynamic content
    translate(key) {
        return this.t(key);
    }
}

// Note: Global instance will be created in HTML files
