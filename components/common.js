// 공통 컴포넌트 로드 함수
function loadComponent(elementId, componentPath) {
    fetch(componentPath)
        .then(response => response.text())
        .then(data => {
            const element = document.getElementById(elementId);
            if (!element) {
                console.error(`Element with id '${elementId}' not found`);
                return;
            }
            element.innerHTML = data;
            
            // navbar 로드 후 현재 페이지 활성화 및 이벤트 바인딩
            if (elementId === 'navbar-placeholder') {
                setActiveNavItem();
                initDropdownHover();
                initNavigationHandlers();
                
                // i18n 초기화 대기 후 업데이트 - 더 긴 대기 시간과 재시도 로직
                const updateTranslations = (attempts = 0) => {
                    if (window.i18n && window.i18n.translations && Object.keys(window.i18n.translations).length > 0) {
                        window.i18n.updatePage();
                    } else if (attempts < 10) {
                        setTimeout(() => updateTranslations(attempts + 1), 200);
                    } else {
                        console.warn('Failed to load translations after multiple attempts');
                    }
                };
                updateTranslations();
            }
            
            // footer 로드 후 i18n 업데이트
            if (elementId === 'footer-placeholder') {
                const updateFooterTranslations = (attempts = 0) => {
                    if (window.i18n && window.i18n.translations && Object.keys(window.i18n.translations).length > 0) {
                        window.i18n.updatePage();
                    } else if (attempts < 10) {
                        setTimeout(() => updateFooterTranslations(attempts + 1), 200);
                    }
                };
                updateFooterTranslations();
            }
        })
        .catch(error => console.error('Error loading component:', error));
}

// ===== MEGA MENU INITIALIZATION =====
function initDropdownHover() {
    const megaMenuContainer = document.getElementById('megaMenuContainer');
    const megaMenuTriggers = document.querySelectorAll('.mega-menu-trigger');
    const navbar = document.querySelector('.navbar-custom');
    
    if (!megaMenuContainer || !megaMenuTriggers.length) return;
    
    let currentActiveMenu = null;
    let hoverTimeout = null;
    let isDesktop = window.innerWidth > 992;
    
    // 데스크톱과 모바일 구분
    function updateLayout() {
        isDesktop = window.innerWidth > 992;
        if (isDesktop) {
            // 데스크톱: 호버 이벤트 활성화
            initDesktopMegaMenu();
        } else {
            // 모바일: 클릭 이벤트 활성화
            initMobileMegaMenu();
        }
    }
    
    // 데스크톱 메가 메뉴 초기화
    function initDesktopMegaMenu() {
        megaMenuTriggers.forEach(trigger => {
            const menuType = trigger.dataset.menu;
            const navLink = trigger.querySelector('.nav-link');
            
            // 마우스 진입 시
            trigger.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                showMegaMenu(menuType);
                setActiveLink(navLink);
            });
        });
        
        // 네비게이션 바 전체에서 마우스가 벗어날 때
        navbar.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                hideMegaMenu();
                removeActiveLink();
            }, 100);
        });
        
        // 메가 메뉴 컨테이너에 마우스가 있을 때는 숨기지 않음
        megaMenuContainer.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
        });
        
        megaMenuContainer.addEventListener('mouseleave', () => {
            hideMegaMenu();
            removeActiveLink();
        });
    }
    
    // 모바일 메가 메뉴 초기화
    function initMobileMegaMenu() {
        // 기존 이벤트 리스너 정리
        megaMenuTriggers.forEach(trigger => {
            const navLink = trigger.querySelector('.nav-link');
            // 기존 이벤트 리스너 복제본 생성하여 제거
            const newNavLink = navLink.cloneNode(true);
            navLink.parentNode.replaceChild(newNavLink, navLink);
        });
        
        // 새로운 이벤트 리스너 추가
        const updatedTriggers = document.querySelectorAll('.mega-menu-trigger');
        updatedTriggers.forEach(trigger => {
            const menuType = trigger.dataset.menu;
            const navLink = trigger.querySelector('.nav-link');
            
            // 클릭 이벤트 추가
            navLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // 먼저 네비게이션이 열려있는지 확인
                const navbarCollapse = document.getElementById('navbarNav');
                if (!navbarCollapse.classList.contains('show')) {
                    // 네비게이션이 닫혀있으면 먼저 열기
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) {
                        navbarToggler.click();
                    }
                    // 약간의 지연 후 메가메뉴 열기
                    setTimeout(() => {
                        showMegaMenu(menuType);
                        updatedTriggers.forEach(t => t.classList.remove('active'));
                        trigger.classList.add('active');
                    }, 300);
                    return;
                }
                
                if (currentActiveMenu === menuType && megaMenuContainer.classList.contains('active')) {
                    // 현재 활성화된 메뉴를 다시 클릭하면 닫기
                    hideMegaMenu();
                    trigger.classList.remove('active');
                } else {
                    // 다른 메뉴 열기
                    showMegaMenu(menuType);
                    
                    // 모든 트리거에서 active 클래스 제거
                    updatedTriggers.forEach(t => t.classList.remove('active'));
                    // 현재 트리거에 active 클래스 추가
                    trigger.classList.add('active');
                }
            });
        });
    }
    
    // 메가 메뉴 표시
    function showMegaMenu(menuType) {
        // 모든 메뉴 콘텐츠 숨기기
        const allMenuContents = document.querySelectorAll('.mega-menu-content');
        allMenuContents.forEach(content => content.classList.remove('active'));
        
        // 선택된 메뉴 콘텐츠 표시
        const targetMenu = document.getElementById(`${menuType}-menu`);
        if (targetMenu) {
            targetMenu.classList.add('active');
            megaMenuContainer.classList.add('active');
            currentActiveMenu = menuType;
        }
    }
    
    // 메가 메뉴 숨기기
    function hideMegaMenu() {
        megaMenuContainer.classList.remove('active');
        const allMenuContents = document.querySelectorAll('.mega-menu-content');
        allMenuContents.forEach(content => content.classList.remove('active'));
        currentActiveMenu = null;
    }
    
    // 활성 링크 설정
    function setActiveLink(navLink) {
        // 모든 메가 메뉴 링크에서 active 클래스 제거
        const allMegaLinks = document.querySelectorAll('.mega-menu-link');
        allMegaLinks.forEach(link => link.classList.remove('active'));
        
        // 현재 링크에 active 클래스 추가
        navLink.classList.add('active');
    }
    
    // 활성 링크 제거
    function removeActiveLink() {
        const allMegaLinks = document.querySelectorAll('.mega-menu-link');
        allMegaLinks.forEach(link => link.classList.remove('active'));
        
        // 모바일에서는 트리거 active 상태도 제거
        if (!isDesktop) {
            megaMenuTriggers.forEach(trigger => trigger.classList.remove('active'));
        }
    }
    
    // 화면 크기 변경 감지
    window.addEventListener('resize', updateLayout);
    
    // 초기 설정
    updateLayout();
    
    // 페이지 다른 곳 클릭 시 메뉴 닫기 (모바일)
    document.addEventListener('click', (e) => {
        if (!isDesktop && !navbar.contains(e.target)) {
            hideMegaMenu();
            removeActiveLink();
        }
    });
}

// 표준 Bootstrap 드롭다운 호버 효과
function initStandardDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown-toggle:not(.mega-menu-link)');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary-color)';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });
}

// 네비게이션 핸들러 초기화
function initNavigationHandlers() {
    // About과 Contact 링크 처리
    const aboutLink = document.querySelector('a[data-section="about"]');
    const contactLink = document.querySelector('a[data-section="contact"]');
    
    if (aboutLink) {
        aboutLink.addEventListener('click', function(e) {
            handleSectionNavigation(e, 'about');
        });
    }
    
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            handleSectionNavigation(e, 'contact');
        });
    }
    
    // 모든 내부 링크에 대한 스무스 스크롤 처리 (현재 페이지 내)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // URL 업데이트
                history.replaceState(null, null, `#${targetId}`);
            }
        });
    });
}

// 섹션 네비게이션 처리
function handleSectionNavigation(event, sectionId) {
    const currentPage = window.location.pathname.split('/').pop();
    const isIndexPage = currentPage === 'index.html' || currentPage === '';
    
    if (isIndexPage) {
        // 현재 페이지가 index.html인 경우 스무스 스크롤
        event.preventDefault();
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // URL 업데이트 (history에 추가하지 않음)
            history.replaceState(null, null, `#${sectionId}`);
        }
    } else {
        // 다른 페이지인 경우 index.html로 이동 후 해당 섹션으로 스크롤
        // 브라우저가 자동으로 처리하도록 기본 동작 허용
        // index.html에서 로드 완료 후 해당 섹션으로 스크롤하는 로직은 index.js에서 처리
    }
}

// 현재 페이지에 해당하는 nav item 활성화
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// DOM 로드 완료 후 컴포넌트 로드
document.addEventListener('DOMContentLoaded', function() {
    // DOM이 완전히 로드될 때까지 재시도하는 함수
    function tryLoadComponents(attempts = 0) {
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');
        
        let loaded = false;
        
        if (navbarPlaceholder) {
            loadComponent('navbar-placeholder', 'components/navbar.html');
            loaded = true;
        }
        
        if (footerPlaceholder) {
            loadComponent('footer-placeholder', 'components/footer.html');
            loaded = true;
        }
        
        // 둘 다 찾지 못했고 재시도 횟수가 5번 미만이면 다시 시도
        if (!loaded && attempts < 5) {
            setTimeout(() => tryLoadComponents(attempts + 1), 100);
        } else if (!loaded && attempts >= 5) {
            console.warn('Could not find placeholder elements after multiple attempts');
        }
    }
    
    tryLoadComponents();
    
    // 메가 메뉴 초기화
    setTimeout(() => {
        initDropdownHover();
        initStandardDropdowns();
    }, 500);
    
    // 언어 변경 감지 및 컴포넌트 재번역
    let currentLanguage = localStorage.getItem('language') || 'ko';
    
    // 언어 변경 감지를 위한 MutationObserver
    const languageObserver = new MutationObserver(function(mutations) {
        const newLanguage = localStorage.getItem('language') || 'ko';
        if (newLanguage !== currentLanguage) {
            currentLanguage = newLanguage;
            
            // 언어가 변경되었을 때 모든 컴포넌트 재번역
            setTimeout(() => {
                if (window.i18n && window.i18n.forceUpdateAllTranslations) {
                    window.i18n.forceUpdateAllTranslations();
                }
            }, 100);
        }
    });
    
    // body 클래스 변경 감지 (언어 변경 시 body 클래스가 변경됨)
    languageObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    // 주기적으로 언어 변경 확인 (fallback)
    setInterval(() => {
        const newLanguage = localStorage.getItem('language') || 'ko';
        if (newLanguage !== currentLanguage) {
            currentLanguage = newLanguage;
            if (window.i18n && window.i18n.forceUpdateAllTranslations) {
                window.i18n.forceUpdateAllTranslations();
            }
        }
    }, 1000);
});
