/**
 * Index Page JavaScript
 * 3H-Solutions Homepage functionality
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initScrollAnimations();
    initFormHandling();
    handleHashNavigation();
});

/**
 * Handle navigation from URL hash (for external links to specific sections)
 */
function handleHashNavigation() {
    // URL에 해시가 있으면 해당 섹션으로 스크롤
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 500); // 페이지 로딩 완료를 위한 지연
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize scroll animations for stats cards
 */
function initScrollAnimations() {
    // Add scroll animation to stats when in view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                
                // Animate numbers in stats cards
                const numberElement = entry.target.querySelector('.display-4');
                if (numberElement) {
                    animateNumber(numberElement);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stats-card').forEach(card => {
        observer.observe(card);
    });
}

/**
 * Animate numbers in stats cards
 */
function animateNumber(element) {
    const finalNumber = element.textContent;
    const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
    
    if (!isNaN(numericValue)) {
        let currentNumber = 0;
        const increment = numericValue / 50; // 50 steps
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= numericValue) {
                currentNumber = numericValue;
                clearInterval(timer);
            }
            element.textContent = finalNumber.replace(/\d+/, Math.floor(currentNumber));
        }, 30);
    }
}

/**
 * Initialize contact form handling
 */
function initFormHandling() {
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (validateForm(data)) {
                // Show success message
                showMessage('메시지가 성공적으로 전송되었습니다!', 'success');
                this.reset();
            } else {
                showMessage('모든 필수 필드를 올바르게 입력해주세요.', 'error');
            }
        });
    }
}

/**
 * Validate contact form
 */
function validateForm(data) {
    const requiredFields = ['name', 'email'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check required fields
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }
    
    // Validate email format
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    return true;
}

/**
 * Show message to user
 */
function showMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`;
    messageDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
    messageDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

/**
 * Initialize solution card interactions
 */
function initSolutionCards() {
    document.querySelectorAll('.solution-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize solution cards when DOM is ready
document.addEventListener('DOMContentLoaded', initSolutionCards);
