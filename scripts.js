// scripts.js - Interactive features for Alex Styles Portfolio

document.addEventListener('DOMContentLoaded', function () {
    // Navigation scroll effect
    const nav = document.querySelector('.main-nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when not at top
        if (scrollTop > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent background scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navToggle && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target) &&
            navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Modal functionality
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn" tabindex="0" aria-label="Close modal">&times;</button>
            <div class="modal-body"></div>
        </div>
    `;
    modal.style.display = 'none';
    document.body.appendChild(modal);

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    modal.querySelector('.close-btn').addEventListener('click', closeModal);
    modal.querySelector('.close-btn').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeModal();
        }
    });
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    // Enhanced portfolio modal functionality
    document.querySelectorAll('.portfolio-item').forEach(function(item, idx) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const projectTitle = item.querySelector('.project-title').textContent;
            const projectImg = item.querySelector('img').src;
            const projectCategory = item.querySelector('.project-category').textContent;
            const projectDescription = item.querySelector('.project-description').textContent;
            
            modal.querySelector('.modal-body').innerHTML = `
                <div class="project-category">${projectCategory}</div>
                <h3>${projectTitle}</h3>
                <img src="${projectImg}" alt="${projectTitle}" style="width:100%;border-radius:12px;margin-bottom:1.5rem;" />
                <p>${projectDescription}</p>
                <p>This project showcases innovative design thinking combined with strategic visual communication. The solution balances aesthetic appeal with functional requirements, resulting in a design that not only looks exceptional but also achieves its intended business objectives.</p>
                <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-light);">
                    <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Project Details</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                        <div>
                            <strong>Duration:</strong><br>
                            <span style="color: var(--text-secondary);">6 weeks</span>
                        </div>
                        <div>
                            <strong>Tools:</strong><br>
                            <span style="color: var(--text-secondary);">Adobe Creative Suite</span>
                        </div>
                        <div>
                            <strong>Deliverables:</strong><br>
                            <span style="color: var(--text-secondary);">Brand Guidelines, Assets</span>
                        </div>
                    </div>
                </div>
            `;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Form enhancement
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const project = formData.get('project');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.skill-item, .stat-item, .contact-method').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for floating cards
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.floating-card');
        const speed = 0.1;

        parallax.forEach((card, index) => {
            const yPos = -(scrolled * speed * (index + 1));
            card.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.01}deg)`;
        });
    });
});
