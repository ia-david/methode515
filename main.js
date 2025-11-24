document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Fade In Animation on Scroll (Intersection Observer) ---
    const fadeElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it comes fully into view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Play animation only once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));


    // --- 2. FAQ Accordion Logic ---
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Close all other accordions (optional - remove if you want multiple open)
            accordions.forEach(otherAcc => {
                if (otherAcc !== this) {
                    otherAcc.setAttribute('aria-expanded', 'false');
                    otherAcc.nextElementSibling.style.height = '0px';
                }
            });

            // Toggle current
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                // Open: Set height to scrollHeight
                content.style.height = content.scrollHeight + 'px';
            } else {
                // Close
                content.style.height = '0px';
            }
        });
    });

    // Handle window resize to reset accordion heights if open
    window.addEventListener('resize', () => {
        accordions.forEach(acc => {
            if(acc.getAttribute('aria-expanded') === 'true') {
                acc.nextElementSibling.style.height = acc.nextElementSibling.scrollHeight + 'px';
            }
        });
    });


    // --- 3. Parallax Effect for Background Blobs ---
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const blobs = document.querySelectorAll('.blob');
        
        // Move blobs slowly based on scroll position
        if(blobs.length > 0) {
            blobs[0].style.transform = `translateY(${scrolled * 0.2}px)`; // Faster
            if(blobs[1]) blobs[1].style.transform = `translateY(${scrolled * 0.1}px)`; // Slower
        }
    });


    // --- 4. Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Account for sticky header height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
    // --- 5. Back to Top Button Logic (New) ---
    const backToTopButton = document.getElementById('back-to-top');
    const scrollThreshold = 300; // Pixels to scroll before the button appears

    const toggleBackToTopButton = () => {
        if (window.scrollY > scrollThreshold) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };

    // Initial check and subsequent checks on scroll
    toggleBackToTopButton();
    window.addEventListener('scroll', toggleBackToTopButton);

    // Smooth scroll functionality for the button
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});