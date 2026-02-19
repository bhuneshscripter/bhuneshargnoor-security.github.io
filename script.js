document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. PREMIUM BOOT SEQUENCE ---
    const gate = document.getElementById("gate-screen");
    const progressFill = document.querySelector(".auth-fill");
    const bootSound = document.getElementById("boot-sound");
    let isUnlocked = false;

    // Lock scrolling initially
    document.body.style.overflow = "hidden";

    const triggerUnlock = () => {
        if (isUnlocked) return;
        isUnlocked = true;
        
        bootSound.volume = 0.2;
        bootSound.play().catch(() => {}); // Handle auto-play policies silently

        document.querySelector('.auth-subtitle').innerHTML = "DECRYPTING_MODULES...";
        document.querySelector('.auth-subtitle').classList.remove('blink');
        
        progressFill.style.width = "100%";

        setTimeout(() => {
            gate.style.opacity = "0";
            setTimeout(() => {
                gate.style.display = "none";
                document.body.style.overflow = "auto";
                initTypewriter();
                // Trigger hero entrance
                document.querySelector('.reveal-hero').classList.add('active');
            }, 1000);
        }, 1500);
    };

    document.addEventListener("keydown", (e) => { if (e.key === "Enter") triggerUnlock(); });
    gate.addEventListener("click", triggerUnlock);

    // --- 2. TACTICAL RETICLE & GLOW ENGINE ---
    const cursorCore = document.getElementById("cursor-core");
    const cursorRing = document.getElementById("cursor-ring");
    
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;

    // Track mouse coordinates & update CSS vars for localized glow
    document.addEventListener("mousemove", (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        
        // Instant update for the core dot
        cursorCore.style.left = targetX + "px";
        cursorCore.style.top = targetY + "px";

        // Global variables for ambient glow
        document.documentElement.style.setProperty('--mouse-x', `${targetX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${targetY + window.scrollY}px`);
    });

    // Smooth Lerp for the outer ring (Inertia effect)
    const renderCursor = () => {
        ringX += (targetX - ringX) * 0.15; // Higher = tighter, Lower = looser
        ringY += (targetY - ringY) * 0.15;
        
        cursorRing.style.left = ringX + "px";
        cursorRing.style.top = ringY + "px";
        
        requestAnimationFrame(renderCursor);
    };
    renderCursor();

    // Intelligent Hover States
    const interactables = document.querySelectorAll("a, button, .interactive-card, .log-node");
    interactables.forEach(el => {
        el.addEventListener("mouseenter", () => document.body.classList.add("hover-active"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("hover-active"));
    });

    // --- 3. DYNAMIC CARD SPOTLIGHT (Glassmorphism Edge Tracing) ---
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 4. HERO PARALLAX ---
    const heroConsole = document.querySelector('.hero-glass-console');
    document.addEventListener('mousemove', e => {
        if(!heroConsole) return;
        const xAxis = (window.innerWidth / 2 - e.pageX) / 100;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 100;
        heroConsole.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // --- 5. SUBTLE MATRIX DEPTH ---
    const canvas = document.getElementById("matrix-canvas");
    const ctx = canvas.getContext("2d");
    
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    const cols = Math.floor(w / 30); // Very sparse
    const ypos = Array(cols).fill(0);

    const drawMatrix = () => {
        ctx.fillStyle = "rgba(2, 4, 10, 0.15)"; // High fade for subtlety
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#00f0ff";
        ctx.font = "10px 'JetBrains Mono'";

        ypos.forEach((y, i) => {
            const text = String.fromCharCode(Math.random() * 128);
            const x = i * 30;
            ctx.fillText(text, x, y);
            if (y > 100 + Math.random() * 10000) ypos[i] = 0;
            else ypos[i] = y + 30;
        });
    };
    setInterval(drawMatrix, 70); // Slow, cinematic trickle

    // --- 6. CINEMATIC TYPEWRITER ---
    const roles = ["Red_Team_Operator", "GenAI_Security_Spec", "AppSec_Engineer", "CEH_Master"];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeElement = document.getElementById("typing-text");

    const initTypewriter = () => {
        const currentRole = roles[roleIdx];
        
        if (isDeleting) {
            typeElement.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typeElement.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 30 : 60;

        if (!isDeleting && charIdx === currentRole.length) {
            speed = 2500; // Hold full text
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            speed = 300; // Pause before next word
        }

        setTimeout(initTypewriter, speed);
    };

    // --- 7. ELEGANT SCROLL REVEAL OBSERVER ---
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -80px 0px", // Trigger when 80px into viewport
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

    // --- 8. INTELLIGENT SCRAMBLE TEXT ---
    const scrambleElements = document.querySelectorAll(".scramble-text");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";

    scrambleElements.forEach(el => {
        el.addEventListener("mouseenter", e => {
            let iterations = 0;
            const original = e.target.dataset.text || e.target.innerText;
            if(!e.target.dataset.text) e.target.dataset.text = original; // Store original
            
            const interval = setInterval(() => {
                e.target.innerText = original.split("").map((letter, i) => {
                    if(i < iterations) return original[i];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("");
                
                if(iterations >= original.length) clearInterval(interval);
                iterations += 1 / 3; // Decode speed
            }, 30);
        });
    });

});
