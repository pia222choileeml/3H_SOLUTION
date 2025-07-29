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

// 호버 드롭다운 초기화 (micube.co.kr 스타일)
function initDropdownHover() {
    const dropdownHover = document.querySelector('.dropdown-hover');
    const dropdownMenu = document.querySelector('.dropdown-menu-hover');
    const dropdownLink = document.querySelector('#solutionsDropdown');
    
    if (dropdownHover && dropdownMenu) {
        let hoverTimeout;
        let isOpen = false;
        
        // 데스크톱: 마우스 호버 이벤트
        if (window.innerWidth > 992) {
            // 마우스 진입 시 - 지연 없이 즉시 표시
            dropdownHover.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                dropdownMenu.style.display = 'block';
                
                // 부드러운 애니메이션을 위한 약간의 지연
                requestAnimationFrame(() => {
                    dropdownMenu.classList.add('show');
                });
                
                // nav-link에 active 상태 추가
                dropdownLink.style.color = '#2563eb';
            });
            
            // 드롭다운 부모에서 마우스 떠날 시
            dropdownHover.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    dropdownMenu.classList.remove('show');
                    dropdownLink.style.color = '';
                    
                    setTimeout(() => {
                        dropdownMenu.style.display = 'none';
                    }, 400); // CSS transition과 맞춤
                }, 150); // 사용자 경험을 위한 약간의 지연
            });
            
            // 드롭다운 메뉴에 마우스 진입 시
            dropdownMenu.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
            });
            
            // 드롭다운 메뉴에서 마우스 떠날 시
            dropdownMenu.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    dropdownMenu.classList.remove('show');
                    dropdownLink.style.color = '';
                    
                    setTimeout(() => {
                        dropdownMenu.style.display = 'none';
                    }, 400);
                }, 150);
            });
            
            // 드롭다운 아이템 호버 효과
            const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item-hover');
            dropdownItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    // 다른 아이템들을 약간 흐리게
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== this) {
                            otherItem.style.transform = 'scale(0.98)';
                            otherItem.style.opacity = '0.7';
                        }
                    });
                });
                
                item.addEventListener('mouseleave', function() {
                    // 모든 아이템 원상복구
                    dropdownItems.forEach(otherItem => {
                        otherItem.style.transform = '';
                        otherItem.style.opacity = '';
                    });
                });
            });
        } else {
            // 모바일: 클릭 이벤트
            dropdownLink.addEventListener('click', (e) => {
                e.preventDefault();
                isOpen = !isOpen;
                
                if (isOpen) {
                    dropdownMenu.style.display = 'block';
                    setTimeout(() => {
                        dropdownMenu.classList.add('show');
                    }, 10);
                } else {
                    dropdownMenu.classList.remove('show');
                    setTimeout(() => {
                        dropdownMenu.style.display = 'none';
                    }, 300);
                }
            });
            
            // 바깥 클릭 시 닫기
            document.addEventListener('click', (e) => {
                if (!dropdownHover.contains(e.target) && isOpen) {
                    isOpen = false;
                    dropdownMenu.classList.remove('show');
                    setTimeout(() => {
                        dropdownMenu.style.display = 'none';
                    }, 300);
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
