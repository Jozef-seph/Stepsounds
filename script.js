/**
 * Main application initialization
 * Handles mobile menu, forms, navigation, and animations
 */
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Contact form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const formMessage = document.getElementById('formMessage');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Get the name from the form before it's cleared
            const nameInput = document.getElementById('name');
            const userName = nameInput ? nameInput.value.trim() : '';
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Wait for form to submit, then clear and show success
            setTimeout(function() {
                // Clear all form fields
                contactForm.reset();
                
                // Create personalized thank you message
                let thankYouMessage = 'Thank you for contacting stepsounds';
                if (userName) {
                    thankYouMessage = `Thank you ${userName} for contacting stepsounds`;
                }
                thankYouMessage += '. We will get back to you soon!';
                
                // Show success message
                formMessage.textContent = thankYouMessage;
                formMessage.className = 'form-message success';
                
                // Reset button and hide message after delay
                setTimeout(function() {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    formMessage.className = 'form-message';
                    formMessage.textContent = '';
                }, 5000);
            }, 500);
            
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // Booking form submission handler
    const bookingForm = document.getElementById('bookingForm');
    const dateInput = document.getElementById('bookingDate');
    
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            const formMessage = document.getElementById('bookingFormMessage');
            const submitButton = bookingForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Get the name from the form before it's cleared
            const bookingNameInput = document.getElementById('bookingName');
            const userName = bookingNameInput ? bookingNameInput.value.trim() : '';
            
            submitButton.disabled = true;
            submitButton.textContent = 'Booking...';
            
            // Wait for form to submit, then clear and show success
            setTimeout(function() {
                // Clear all form fields
                bookingForm.reset();
                
                // Reset min date for booking form
                if (dateInput) {
                    const today = new Date().toISOString().split('T')[0];
                    dateInput.setAttribute('min', today);
                }
                
                // Create personalized thank you message
                let thankYouMessage = 'Thank you for contacting stepsounds';
                if (userName) {
                    thankYouMessage = `Thank you ${userName} for contacting stepsounds`;
                }
                thankYouMessage += '. We will get back to you soon to confirm your appointment!';
                
                // Show success message
                formMessage.textContent = thankYouMessage;
                formMessage.className = 'form-message success';
                
                // Reset button and hide message after delay
                setTimeout(function() {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    formMessage.className = 'form-message';
                    formMessage.textContent = '';
                }, 8000);
            }, 500);
            
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active nav link
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');

                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const mobileToggle = document.querySelector('.mobile-menu-toggle');
                    if (mobileToggle) mobileToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Smooth scroll on page load (if hash in URL)
    if (window.location.hash) {
        setTimeout(function() {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    // Highlight active section in navigation on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});


// AI Chat Widget
document.addEventListener('DOMContentLoaded', function() {
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    if (!chatToggle || !chatContainer) return;

    // Add message to chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Toggle chat
    chatToggle.addEventListener('click', function() {
        chatContainer.classList.toggle('active');
        if (chatContainer.classList.contains('active')) {
            chatInput.focus();
        }
    });

    // Close chat
    if (chatClose) {
        chatClose.addEventListener('click', function() {
            chatContainer.classList.remove('active');
        });
    }


    /**
     * Generates AI response based on user message
     * @param {string} userMessage - The user's input message
     * @returns {string} - AI response text
     */
    function getAIResponse(userMessage) {
        const message = userMessage.toLowerCase().trim();
        
        // Simple rule-based responses (can be upgraded to OpenAI API)
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hi there! I'm Joseph 🤖 I'm here to help you learn more about our music lessons. What would you like to know?";
        }
        
        if (message.includes('price') || message.includes('cost') || message.includes('fee') || message.includes('how much')) {
            return "For current pricing information, please send a message through the contact form and I'll get back to you with details about lesson packages and rates.";
        }
        
        if (message.includes('piano')) {
            return "We offer beginner-friendly piano lessons! Our piano lessons cover everything from reading notes to playing your favorite songs. All lessons are tailored to your pace and learning style. Would you like to know more about what we cover?";
        }
        
        if (message.includes('guitar') || message.includes('acoustic')) {
            return "Our acoustic guitar lessons are perfect for beginners! You'll learn chords, strumming patterns, and fingerpicking techniques while playing songs you love. Ready to start your musical journey?";
        }
        
        if (message.includes('bass')) {
            return "Bass guitar lessons are available for all skill levels! Learn fundamental techniques, rhythm, timing, and how to play along with your favorite songs. The bass is the foundation of great music!";
        }
        
        if (message.includes('beginner') || message.includes('start') || message.includes('new')) {
            return "Perfect! Our lessons are specifically designed for beginners. No prior experience needed - we'll start from the basics and go at your pace. What instrument interests you most?";
        }
        
        if (message.includes('age') || message.includes('child') || message.includes('kid') || message.includes('adult')) {
            return "We welcome students of all ages! Whether you're a child, teenager, adult, or senior, our teaching style adapts to your age and learning preferences. Music is for everyone!";
        }
        
        if (message.includes('schedule') || message.includes('time') || message.includes('when') || message.includes('available')) {
            return "To check availability and schedule a lesson, please use the contact form on this page. I'll respond with available time slots that work for both of us.";
        }
        
        if (message.includes('location') || message.includes('where') || message.includes('online') || message.includes('in-person')) {
            return "For information about lesson locations (in-person or online), please send a message through the contact form and I'll provide all the details about our teaching arrangements.";
        }
        
        if (message.includes('thank') || message.includes('thanks')) {
            return "You're welcome! Feel free to ask me anything else about music lessons, or use the contact form to get in touch directly.";
        }
        
        if (message.includes('bye') || message.includes('goodbye')) {
            return "Goodbye! Feel free to come back anytime if you have more questions. Looking forward to helping you start your musical journey!";
        }
        
        // Default response
        return "That's a great question! For detailed information, I recommend sending a message through the contact form, and I'll get back to you with a personalized response. In the meantime, feel free to ask about our piano, guitar, or bass lessons, teaching methods, or anything else about learning music!";
    }

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, true);
        chatInput.value = '';

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.innerHTML = '<p>Typing...</p>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Get AI response after a short delay
        setTimeout(function() {
            typingDiv.remove();
            const response = getAIResponse(message);
            addMessage(response, false);
        }, 800);
    }

    // Send button click
    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }

    // Enter key to send
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Scroll-triggered animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale');
    animatedElements.forEach(el => observer.observe(el));

    // Navbar shadow on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Navbar shadow on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrolled > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
            }
        }
        
        lastScroll = scrolled;
    });

    // Smooth reveal animation for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, 100);
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    images.forEach(img => {
        if (!img.closest('.hero-video-background')) {
            imageObserver.observe(img);
        }
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);



});

