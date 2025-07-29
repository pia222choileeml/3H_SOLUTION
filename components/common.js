// 공통 컴포넌트 로드 함수
function loadComponent(elementId, componentPath) {
    fetch(componentPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            
            // navbar 로드 후 현재 페이지 활성화 및 이벤트 바인딩
            if (elementId === 'navbar-placeholder') {
                setActiveNavItem();
                initDropdownHover();
                initNavigationHandlers();
            }
        })
        .catch(error => console.error('Error loading component:', error));
}

// 메가 메뉴 초기화 (micube.co.kr 스타일)
function initDropdownHover() {
    const dropdownMega = document.querySelector('.dropdown-mega');
    const megaMenuOverlay = document.querySelector('.mega-menu-overlay');
    const dropdownLink = document.querySelector('#solutionsDropdown');
    
    if (dropdownMega && megaMenuOverlay) {
        let hoverTimeout;
        let isActive = false;
        
        // 데스크톱: 마우스 호버 이벤트
        if (window.innerWidth > 992) {
            // 메가 메뉴 진입 시
            dropdownMega.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                dropdownMega.classList.add('active');
                isActive = true;
            });
            
            // 메가 메뉴에서 떠날 시
            dropdownMega.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    dropdownMega.classList.remove('active');
                    isActive = false;
                }, 200); // 약간의 지연으로 사용성 향상
            });
            
            // 메가 메뉴 아이템 호버 효과
            const megaMenuLinks = megaMenuOverlay.querySelectorAll('.mega-menu-link');
            megaMenuLinks.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    // 다른 링크들을 약간 흐리게
                    megaMenuLinks.forEach(otherLink => {
                        if (otherLink !== this) {
                            otherLink.style.opacity = '0.6';
                            otherLink.style.transform = 'scale(0.98)';
                        }
                    });
                });
                
                link.addEventListener('mouseleave', function() {
                    // 모든 링크 원상복구
                    megaMenuLinks.forEach(otherLink => {
                        otherLink.style.opacity = '';
                        otherLink.style.transform = '';
                    });
                });
            });
            
            // 페이지 다른 곳 클릭 시 메뉴 닫기
            document.addEventListener('click', (e) => {
                if (!dropdownMega.contains(e.target) && isActive) {
                    dropdownMega.classList.remove('active');
                    isActive = false;
                }
            });
        } else {
            // 모바일: 클릭 이벤트
            dropdownLink.addEventListener('click', (e) => {
                e.preventDefault();
                isActive = !isActive;
                
                if (isActive) {
                    dropdownMega.classList.add('active');
                } else {
                    dropdownMega.classList.remove('active');
                }
            });
            
            // 바깥 클릭 시 닫기
            document.addEventListener('click', (e) => {
                if (!dropdownMega.contains(e.target) && isActive) {
                    isActive = false;
                    dropdownMega.classList.remove('active');
                }
            });
        }
    }
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
    loadComponent('navbar-placeholder', 'components/navbar.html');
    loadComponent('footer-placeholder', 'components/footer.html');
});
