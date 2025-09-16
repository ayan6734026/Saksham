// Toggle mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navRight = document.querySelector('.nav-right');
    
    hamburger.addEventListener('click', function() {
        navRight.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-right') && !event.target.closest('.hamburger')) {
            navRight.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Header animation
    const animatedTitle = document.querySelector('.animated-title');
    if (animatedTitle) {
        // Add a small delay for the animation to be more noticeable
        setTimeout(() => {
            animatedTitle.style.opacity = '1';
            animatedTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Alert updates simulation
    simulateLiveAlerts();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('.nav-right a');
    
    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        }
    });
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
    
    // Feature cards animation on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    function checkScroll() {
        featureCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.classList.add('appear');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
});

// Initialize on load and on resize
window.addEventListener('load', handleAlertResponsiveness);
window.addEventListener('resize', handleAlertResponsiveness);