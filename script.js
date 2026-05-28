// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

/* ==========================================================================
   NAVIGATION NAVBAR LOGIC
   ========================================================================== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll Navbar Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Highlight Active Link on Scroll
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Check if current scroll position is inside the section
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close Mobile Menu on Link Click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/* ==========================================================================
   CURSOR AMBIENT GLOW EFFECT
   ========================================================================== */
const cursorGlow = document.getElementById('cursor-glow');

document.addEventListener('mousemove', (e) => {
    // We use position: fixed, so simple viewport coordinates are perfect
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
});

// Scale glow on interactive elements hover
const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .skills-tab');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '550px';
        cursorGlow.style.height = '550px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 242, 254, 0.22) 0%, rgba(155, 81, 224, 0.08) 50%, rgba(0,0,0,0) 70%)';
    });
    el.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '400px';
        cursorGlow.style.height = '400px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, rgba(155, 81, 224, 0.05) 50%, rgba(0,0,0,0) 70%)';
    });
});

/* ==========================================================================
   TYPEWRITER EFFECT IN HERO
   ========================================================================== */
const typewriterElement = document.getElementById('typewriter');
const roles = [
    'Full Stack Engineer.',
    'UI/UX Designer.',
    'AI Automation Creator.',
    'Problem Solver.'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        // Remove characters
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40; // delete faster
    } else {
        // Add characters
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // normal typing speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
        // Pause at the end of word
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        // Go to next word
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400; // pause before typing next word
    }

    setTimeout(type, typeSpeed);
}

// Start typewriter effect
setTimeout(type, 1000);

/* ==========================================================================
   ABOUT & TECH STACK INTERACTIVITY
   ========================================================================== */
const skillTabs = document.querySelectorAll('.skills-tab');
const skillPanels = document.querySelectorAll('.skills-panel');
const skillFills = document.querySelectorAll('.skill-bar-fill');

// Store target widths and reset to 0 for scroll animation
skillFills.forEach(fill => {
    const targetWidth = fill.style.width;
    fill.setAttribute('data-target-width', targetWidth);
    fill.style.width = '0%';
});

// Trigger skills animation when section scrolled into view
const skillsSection = document.getElementById('about');
let skillsAnimated = false;

const triggerSkillsAnimation = () => {
    if (skillsAnimated) return;
    
    const sectionRect = skillsSection.getBoundingClientRect();
    const isVisible = sectionRect.top < window.innerHeight - 150;
    
    if (isVisible) {
        const activePanel = document.querySelector('.skills-panel.active');
        animatePanelFills(activePanel);
        skillsAnimated = true;
    }
};

window.addEventListener('scroll', triggerSkillsAnimation);
window.addEventListener('load', triggerSkillsAnimation);

function animatePanelFills(panel) {
    if (!panel) return;
    const fills = panel.querySelectorAll('.skill-bar-fill');
    fills.forEach(fill => {
        const target = fill.getAttribute('data-target-width');
        fill.style.width = target;
    });
}

// Handle skills tab switching
skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        skillTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all panels
        skillPanels.forEach(p => p.classList.remove('active'));
        
        // Show selected panel
        const category = tab.getAttribute('data-category');
        const selectedPanel = document.getElementById(`skills-${category}`);
        selectedPanel.classList.add('active');
        
        // Animate fills for newly active panel
        animatePanelFills(selectedPanel);
    });
});

/* ==========================================================================
   PROJECTS FILTER LOGIC
   ========================================================================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active button styling
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || cardCategory === filterValue) {
                card.style.display = 'flex';
                // Trigger transition
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                // Hide after transition
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

/* ==========================================================================
   PROJECT DETAILS MODAL LOGIC
   ========================================================================== */
const projectModal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');
const detailButtons = document.querySelectorAll('.btn-project-detail');

// Database of project details
const projectDetailsDB = {
    "1": {
        title: "AI-Powered Analytics Dashboard",
        category: "Full Stack",
        timeline: "Feb 2026 - Apr 2026",
        client: "FinLeap Analytics",
        icon: "bar-chart-3",
        gradient: "gradient-blue",
        summary: "A beautiful analytics dashboard visualizing real-time SaaS application usage with integrated predictive churn modeling.",
        details: "This application aggregates events from various clients and feeds them to an integrated linear regression algorithm to forecast churn probability. Designed using custom charts and canvas maps, users receive instant feedback on account health and performance scores.",
        challenges: [
            "Handling live WebSocket streams with high throughput without causing render lag.",
            "Implementing interactive client charts with dynamic range zoom features."
        ],
        solution: "Optimized component re-renders through state throttling and built a custom Canvas drawing hook to render complex timelines in batches.",
        tech: ["React", "Node.js", "PostgreSQL", "Chart.js", "WebSocket"]
    },
    "2": {
        title: "Eco-friendly E-commerce UI",
        category: "Frontend",
        timeline: "Jan 2026",
        client: "EcoStore Corp",
        icon: "shopping-bag",
        gradient: "gradient-purple",
        summary: "A fluid, interactive shopfront utilizing layout transitions, filters, and dynamic local cart cache systems.",
        details: "An elegant retail visual interface designed specifically for green products. Focused heavily on high-speed page loads, organic animations, and accessibility.",
        challenges: [
            "Achieving a 100/100 Lighthouse performance score with media-rich product listing pages.",
            "Creating page-to-page layout morphs that feel instant."
        ],
        solution: "Leveraged Next.js Static Site Generation (SSG), optimized WebP formats, and implemented shared layout animation scripts for smooth fluid state transitions.",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Lighthouse"]
    },
    "3": {
        title: "Smart Task Automation Agent",
        category: "AI / Automation",
        timeline: "Mar 2026",
        client: "Self Project",
        icon: "terminal",
        gradient: "gradient-pink",
        summary: "An orchestration system that connects web applications to local tasks via a secure local LLM gateway.",
        details: "A productivity agent that reads incoming email logs, categorizes tasks using local Llama 3 models, and issues script actions to system APIs based on text instructions.",
        challenges: [
            "Setting up high accuracy intent classification with smaller local models.",
            "Structuring system scripts execution securely."
        ],
        solution: "Established a detailed chain-of-thought prompt structure and wrapped system calls inside a Docker container with absolute minimal privileges.",
        tech: ["FastAPI", "LangChain", "Python", "Llama3", "Docker"]
    },
    "4": {
        title: "Realtime Collaborative Workspace",
        category: "Full Stack",
        timeline: "Nov 2025 - Dec 2025",
        client: "CollabInc",
        icon: "users",
        gradient: "gradient-orange",
        summary: "A multiplayer whiteboard tool with real-time text chatting, drawing tools, and document editing sockets.",
        details: "A rich digital workspace designed to let teams whiteboard ideas, draw components, edit drafts, and hold discussions in real time.",
        challenges: [
            "Keeping collaborative drawing shapes synchronized with minimal visual lag across all user clients.",
            "Resolving simultaneous document conflicts (two users typing at once)."
        ],
        solution: "Implemented Operational Transformation (OT) conflict resolution engines and scaled client sync states through Redis Pub/Sub channels.",
        tech: ["React", "Socket.io", "Express", "Redis", "Canvas API"]
    },
    "5": {
        title: "Ambient Soundscape Audio Player",
        category: "Frontend",
        timeline: "Oct 2025",
        client: "ZenWaves",
        icon: "music",
        gradient: "gradient-green",
        summary: "A visualizer application supporting spatial audio controls, customizable white-noise mixers, and relaxing UI visuals.",
        details: "An immersive sensory application that mixes user-selected loops (rain, waves, wind) and presents visual patterns dynamically tuned to active frequencies.",
        challenges: [
            "Achieving smooth canvas visualizer frame rates while blending audio streams.",
            "Handling browser constraints on autoplaying audio contexts."
        ],
        solution: "Employed the Web Audio API to mix and capture frequency gains, mapping them directly to a GPU-accelerated Canvas WebGL canvas loop.",
        tech: ["Vanilla JS", "Web Audio API", "HTML5 Canvas", "WebGL"]
    },
    "6": {
        title: "LLM Code Reviewer Extension",
        category: "AI / Automation",
        timeline: "Dec 2025",
        client: "AIOps Tools",
        icon: "brain-circuit",
        gradient: "gradient-cyan",
        summary: "A code intelligence platform that flags bad formatting patterns and automatically drafts Git pull request writeups.",
        details: "An AI helper that reads repository change logs, identifies logic flows, detects code smells, and writes comprehensive descriptions summarizing the updates.",
        challenges: [
            "Reducing token consumption for long file diffs.",
            "Generating helpful code improvements instead of hallucinated fixes."
        ],
        solution: "Designed a diff pre-parser to crop empty rows or formatting-only changes before sending queries, and configured structured JSON schemas in Gemini models.",
        tech: ["TypeScript", "Gemini API", "Node.js", "Git / GitHub API"]
    }
};

// Open Modal with content
detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-project-id');
        const proj = projectDetailsDB[id];
        
        if (!proj) return;
        
        // Build challenges list HTML
        let challengesHTML = '';
        proj.challenges.forEach(challenge => {
            challengesHTML += `<li>${challenge}</li>`;
        });

        // Build tech stack tags HTML
        let techHTML = '';
        proj.tech.forEach(t => {
            techHTML += `<span>${t}</span>`;
        });

        modalBody.innerHTML = `
            <div class="modal-project-img">
                <div class="project-overlay-gradient ${proj.gradient}" style="opacity: 0.25;"></div>
                <div class="modal-project-img-placeholder">
                    <i data-lucide="${proj.icon}"></i>
                    <span>${proj.title}</span>
                </div>
            </div>
            
            <div class="modal-project-category text-cyan" style="font-family: var(--font-mono); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 5px;">
                ${proj.category}
            </div>
            <h3 class="modal-project-title">${proj.title}</h3>
            
            <div class="modal-project-meta">
                <div class="meta-item"><i data-lucide="calendar"></i> <span>${proj.timeline}</span></div>
                <div class="meta-item"><i data-lucide="briefcase"></i> <span>${proj.client}</span></div>
            </div>
            
            <div class="modal-project-body">
                <p><strong>Overview:</strong> ${proj.summary}</p>
                <p>${proj.details}</p>
                
                <h4>Core Challenges:</h4>
                <ul class="modal-project-list">
                    ${challengesHTML}
                </ul>
                
                <p><strong>The Solution:</strong> ${proj.solution}</p>
                
                <h4 style="margin-bottom: 12px;">Tech Stack:</h4>
                <div class="project-tech" style="margin-bottom: 20px;">
                    ${techHTML}
                </div>
            </div>
            
            <div class="modal-project-footer">
                <a href="#" class="btn btn-primary btn-sm">Visit Project <i data-lucide="arrow-up-right"></i></a>
                <a href="https://github.com" target="_blank" class="btn btn-secondary btn-sm">GitHub Repository <i data-lucide="github"></i></a>
            </div>
        `;
        
        // Trigger lucide icon creation inside modal
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Open modal window
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    });
});

// Close Modal functions
const closeModal = () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // restore background scrolling
};

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// Close on Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeModal();
    }
});

/* ==========================================================================
   CONTACT FORM VALIDATION & SUCCESS UI
   ========================================================================== */
const contactForm = document.getElementById('contact-form');
const successAlert = document.getElementById('success-alert');
const alertCloseBtn = document.getElementById('success-alert-close');
const formSubmitBtn = document.getElementById('form-submit-btn');

// Close Alert
alertCloseBtn.addEventListener('click', () => {
    successAlert.classList.remove('show');
});

// Validate Email Helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Form Field Submit Validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isFormValid = true;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Validate Name
    if (nameInput.value.trim() === '') {
        nameInput.parentElement.classList.add('invalid');
        isFormValid = false;
    } else {
        nameInput.parentElement.classList.remove('invalid');
    }
    
    // Validate Email
    if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
        emailInput.parentElement.classList.add('invalid');
        isFormValid = false;
    } else {
        emailInput.parentElement.classList.remove('invalid');
    }
    
    // Validate Subject
    if (subjectInput.value.trim() === '') {
        subjectInput.parentElement.classList.add('invalid');
        isFormValid = false;
    } else {
        subjectInput.parentElement.classList.remove('invalid');
    }
    
    // Validate Message
    if (messageInput.value.trim() === '') {
        messageInput.parentElement.classList.add('invalid');
        isFormValid = false;
    } else {
        messageInput.parentElement.classList.remove('invalid');
    }
    
    // Handle Submission outcome
    if (isFormValid) {
        // Change submit button state to simulating loading
        const originalBtnText = formSubmitBtn.innerHTML;
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = `Sending... <span class="spinner" style="display:inline-block; animation:spin 1s linear infinite; margin-left: 5px;">🌀</span>`;
        
        // Simulate network dispatch delay
        setTimeout(() => {
            // Restore button
            formSubmitBtn.disabled = false;
            formSubmitBtn.innerHTML = originalBtnText;
            
            // Show custom visual success popup alert
            successAlert.classList.add('show');
            
            // Auto hide alert after 5.5 seconds
            setTimeout(() => {
                successAlert.classList.remove('show');
            }, 5500);
            
            // Clear inputs
            contactForm.reset();
        }, 1500);
    }
});

// Remove invalid class dynamically on field input typing
const inputs = contactForm.querySelectorAll('.form-control');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            input.parentElement.classList.remove('invalid');
        }
    });
});

// Inline Spinner Spin animation
const spinStyle = document.createElement('style');
spinStyle.innerHTML = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(spinStyle);
