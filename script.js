document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SYSTEM BOOT SEQUENCE ---
    const gate = document.getElementById("gate-screen");
    const progressFill = document.querySelector(".progress-fill");
    const bootSound = document.getElementById("boot-sound");

    let isUnlocked = false;

    // Unlock function
    const unlockSystem = () => {
        if (isUnlocked) return;
        isUnlocked = true;
        
        // Play sound if possible
        bootSound.volume = 0.3;
        bootSound.play().catch(e => console.log("Audio requires interaction"));

        // Progress bar animation
        progressFill.style.width = "100%";

        setTimeout(() => {
            gate.style.opacity = "0";
            setTimeout(() => {
                gate.style.display = "none";
                initTypewriter(); // Start typing only after boot
            }, 800);
        }, 1500);
    };

    // Listeners for unlock
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") unlockSystem();
    });
    gate.addEventListener("click", unlockSystem);

    // --- 2. ADVANCED CURSOR SYSTEM ---
    const cursorDot = document.getElementById("cursor-dot");
    const cursorRing = document.getElementById("cursor-ring");
    
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";
    });

    const animateCursor = () => {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        cursorRing.style.left = ringX + "px";
        cursorRing.style.top = ringY + "px";
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover Intelligence
    const interactables = document.querySelectorAll("a, button, .cyber-card, .log-entry");
    
    interactables.forEach(el => {
        el.addEventListener("mouseenter", () => {
            document.body.classList.add("hovering");
        });
        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("hovering");
        });
    });

    // --- 3. MATRIX RAIN CANVAS ---
    const canvas = document.getElementById("matrix-canvas");
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const cols = Math.floor(width / 20);
    const ypos = Array(cols).fill(0);

    const matrixDraw = () => {
        ctx.fillStyle = "rgba(5, 5, 5, 0.05)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#00ff41";
        ctx.font = "14px 'JetBrains Mono'";

        ypos.forEach((y, ind) => {
            const text = String.fromCharCode(Math.random() * 128);
            const x = ind * 20;
            ctx.fillText(text, x, y);
            
            if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
            else ypos[ind] = y + 20;
        });
    };
    setInterval(matrixDraw, 50);

    // --- 4. TYPEWRITER EFFECT ---
    const titles = ["Red Team Operator", "GenAI Security", "CEH Master", "AppSec Engineer"];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeText = document.getElementById("typing-text");

    function initTypewriter() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typeText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 200;
        }

        setTimeout(initTypewriter, typeSpeed);
    }

    // --- 5. SCROLL REVEAL OBSERVER ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    // --- 6. SCRAMBLE TEXT EFFECT ---
    const scrambleElements = document.querySelectorAll(".scramble-text");
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    scrambleElements.forEach(header => {
        header.addEventListener("mouseenter", event => {
            let iteration = 0;
            const originalText = event.target.innerText;
            
            const interval = setInterval(() => {
                event.target.innerText = originalText
                    .split("")
                    .map((letter, index) => {
                        if(index < iteration) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * 36)];
                    })
                    .join("");
                
                if(iteration >= originalText.length){ 
                    clearInterval(interval);
                }
                
                iteration += 1 / 3;
            }, 30);
        });
    });

});