// Header scroll effect
const header = document.getElementById('header');
const galleryView = document.getElementById('gallery-view');
const donateViewTop = document.getElementById('donate-view');

function updateHeader() {
    if (window.scrollY > 50 || 
        (galleryView && galleryView.style.display === 'block') ||
        (donateViewTop && donateViewTop.style.display === 'block')) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateHeader);

// Reveal elements on scroll
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach((el) => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger on load

// Hero Background Slider (PPT Style)
const heroSlides = document.querySelectorAll('.hero-slide');
let currentHeroSlide = 0;

if (heroSlides.length > 0) {
    setInterval(() => {
        // Mark current as previous so it stays visible behind the new one
        heroSlides.forEach(slide => slide.classList.remove('previous'));
        heroSlides[currentHeroSlide].classList.add('previous');
        heroSlides[currentHeroSlide].classList.remove('active');
        
        // Fade in the new one
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        heroSlides[currentHeroSlide].classList.add('active');
    }, 2000); // Change slide every 2 seconds
}


// Positive Vibes Slider with 30 Quotes
const quotes = [
    { text: "A strong woman builds a stronger society.", author: "Udaan Philosophy" },
    { text: "Believe in yourself and anything is possible.", author: "Daily Motivation" },
    { text: "Educate a woman, empower a generation.", author: "Core Value" },
    { text: "There is no limit to what we, as women, can accomplish.", author: "Michelle Obama" },
    { text: "A woman with a voice is, by definition, a strong woman.", author: "Melinda Gates" },
    { text: "Feminism isn't about making women stronger. Women are already strong.", author: "G.D. Anderson" },
    { text: "The most effective way to do it, is to do it.", author: "Amelia Earhart" },
    { text: "I raise up my voice—not so I can shout, but so that those without a voice can be heard.", author: "Malala Yousafzai" },
    { text: "Well-behaved women seldom make history.", author: "Laurel Thatcher Ulrich" },
    { text: "We need women who are so strong they can be gentle, so educated they can be humble.", author: "Kavita Ramdas" },
    { text: "She remembered who she was and the game changed.", author: "Lalah Delia" },
    { text: "Women hold up half the sky.", author: "Proverb" },
    { text: "Each time a woman stands up for herself, she stands up for all women.", author: "Maya Angelou" },
    { text: "I am a woman with thoughts and questions and shit to say.", author: "Amy Schumer" },
    { text: "You can be the lead in your own life.", author: "Kerry Washington" },
    { text: "I can and I will. Watch me.", author: "Carrie Green" },
    { text: "She believed she could, so she did.", author: "R.S. Grey" },
    { text: "A woman is the full circle. Within her is the power to create, nurture and transform.", author: "Diane Mariechild" },
    { text: "My coach said I run like a girl. And I said if he ran a little faster, he could too.", author: "Mia Hamm" },
    { text: "If you want something said, ask a man; if you want something done, ask a woman.", author: "Margaret Thatcher" },
    { text: "Extremists have shown what frightens them most: a girl with a book.", author: "Malala Yousafzai" },
    { text: "Don't hold back because you think it's unladylike.", author: "Larry Page" },
    { text: "Women are the real architects of society.", author: "Harriet Beecher Stowe" },
    { text: "The question isn't who's going to let me; it's who is going to stop me.", author: "Ayn Rand" },
    { text: "Do not wait for someone else to come and speak for you. It's you who can change the world.", author: "Malala Yousafzai" },
    { text: "To all the little girls who are watching this, never doubt that you are valuable.", author: "Hillary Clinton" },
    { text: "Above all, be the heroine of your life, not the victim.", author: "Nora Ephron" },
    { text: "I'm tough, I'm ambitious, and I know exactly what I want.", author: "Madonna" },
    { text: "Doubt is a killer. You just have to know who you are and what you stand for.", author: "Jennifer Lopez" },
    { text: "A girl should be two things: who and what she wants.", author: "Coco Chanel" }
];

const quoteContainer = document.getElementById('quoteContainer');
const vibesSection = document.getElementById('vibes');
let slideIndex = 0;
let generatedSlides;
let isPaused = false;

if (quoteContainer) {
    quotes.forEach((q, index) => {
        const slide = document.createElement('div');
        slide.className = 'quote-slide' + (index === 0 ? ' active' : '');
        slide.innerHTML = `
            <p class="quote-text">"${q.text}"</p>
            <p>- ${q.author}</p>
        `;
        quoteContainer.appendChild(slide);
    });
    
    generatedSlides = document.querySelectorAll('.quote-slide');
    
    function showNextSlide() {
        if (isPaused || generatedSlides.length === 0) return;
        generatedSlides.forEach(slide => slide.classList.remove('active'));
        slideIndex++;
        if (slideIndex >= generatedSlides.length) { slideIndex = 0; }
        generatedSlides[slideIndex].classList.add('active');
    }
    
    setInterval(showNextSlide, 3500); // Change quote every 3.5 seconds
}

if (vibesSection) {
    vibesSection.addEventListener('mouseenter', () => { isPaused = true; });
    vibesSection.addEventListener('mouseleave', () => { isPaused = false; });
}

// Navigation & SPA Routing
const mainView = document.getElementById('main-view');
const donateView = document.getElementById('donate-view');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        
        // Handle Gallery Page Routing
        if (targetId === '#gallery') {
            mainView.style.display = 'none';
            if (donateView) donateView.style.display = 'none';
            galleryView.style.display = 'block';
            window.scrollTo(0, 0);
            updateHeader(); // Immediately update header state without animation
            return;
        }

        // Handle Donate Page Routing
        if (targetId === '#donate' || this.classList.contains('open-donate')) {
            mainView.style.display = 'none';
            galleryView.style.display = 'none';
            if (donateView) donateView.style.display = 'block';
            window.scrollTo(0, 0);
            updateHeader();
            return;
        }

        // Handle Sections in Main View
        if (mainView.style.display === 'none') {
            galleryView.style.display = 'none';
            if (donateView) donateView.style.display = 'none';
            mainView.style.display = 'block';
            updateHeader();
        }
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Short delay to allow layout recalculation if view was just toggled
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.getBoundingClientRect().top + window.pageYOffset - 70,
                    behavior: 'smooth'
                });
            }, 50);
        }
    });
});

// Toast Notification System
const showToast = (message) => {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    // Hide after 3.5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
};

// Volunteer form submit
const volunteerForm = document.getElementById('volunteerForm');
if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Thank you for your interest! We will contact you soon.');
        e.target.reset();
    });
}

// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500); // 1.5 seconds minimum display for visual effect
    }
});



// Gallery Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active styling from all buttons
        filterBtns.forEach(b => {
            b.classList.remove('active', 'btn-primary');
            b.classList.add('btn-outline');
        });
        
        // Add active styling to clicked button
        btn.classList.remove('btn-outline');
        btn.classList.add('active', 'btn-primary');
        
        const filterValue = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            item.style.transition = 'all 0.4s ease';
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400); // Wait for transition
            }
        });
    });
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navContainer = document.getElementById('nav-container');

if (mobileMenu && navContainer) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navContainer.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-container a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navContainer.classList.remove('active');
        });
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const icon = darkModeToggle ? darkModeToggle.querySelector('i') : null;

if (darkModeToggle && icon) {
    // Check local storage for preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            localStorage.setItem('darkMode', null);
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}
