/**
 * Motorsports Page JavaScript
 * 3H-Solutions Motorsports functionality
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initMediaInteractions();
    initTableAnimations();
    initScrollAnimations();
});

/**
 * Initialize media card interactions
 */
function initMediaInteractions() {
    // Media card hover effects
    document.querySelectorAll('.media-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Video play button interaction
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            // Placeholder for video play functionality
            console.log('Video play functionality would be implemented here');
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
            
            // Reset after 2 seconds (placeholder)
            setTimeout(() => {
                this.innerHTML = '▶';
            }, 2000);
        });
    }
}

/**
 * Initialize table animations
 */
function initTableAnimations() {
    // Add animation to table rows on hover
    document.querySelectorAll('.table tbody tr').forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(12, 127, 242, 0.1)';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.transform = 'scale(1)';
        });
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease-out';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        observer.observe(section);
    });
}

/**
 * Initialize achievement counters
 */
function initAchievementCounters() {
    // Placeholder for achievement counter animations
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
}

// Add CSS animation keyframes programmatically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize achievement counters after DOM is ready
document.addEventListener('DOMContentLoaded', initAchievementCounters);
