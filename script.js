document.addEventListener("DOMContentLoaded", () => {
    
    // --- UTILITY: Check for Touch Device ---
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

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
                document.querySelector('.reveal-hero').classList.add('active');
            }, 800);
        }, 1200);
    };

    document.addEventListener("keydown", (e) => { if (e.key === "Enter") triggerUnlock(); });
    gate.addEventListener("click", triggerUnlock);
    gate.addEventListener("touchstart", triggerUnlock, {passive: true});

    // --- 2. TACTICAL RETICLE & GLOW ENGINE (Desktop Only) ---
    if (!isTouchDevice) {
        const cursorCore = document.getElementById("cursor-core");
        const cursorRing = document.getElementById("cursor-ring");
        
        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;
        let ringX = targetX;
        let ringY = targetY;

        document.addEventListener("mousemove", (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
            
            cursorCore.style.left = targetX + "px";
            cursorCore.style.top = targetY + "px";

            document.documentElement.style.setProperty('--mouse-x', `${targetX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${targetY + window.scrollY}px`);
        });

        const renderCursor = () => {
            ringX += (targetX - ringX) * 0.15;
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

        // --- 3. DYNAMIC CARD SPOTLIGHT ---
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
    }

    // --- 5. SUBTLE MATRIX DEPTH ---
    const canvas = document.getElementById("matrix-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;

        window.addEventListener("resize", () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        });

        // Less dense on mobile to save performance
        const divider = isTouchDevice ? 40 : 30;
        const cols = Math.floor(w / divider); 
        const ypos = Array(cols).fill(0);

        const drawMatrix = () => {
            ctx.fillStyle = "rgba(2, 4, 10, 0.15)"; 
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "#00f0ff";
            ctx.font = "10px 'JetBrains Mono'";

            ypos.forEach((y, i) => {
                const text = String.fromCharCode(Math.random() * 128);
                const x = i * divider;
                ctx.fillText(text, x, y);
                if (y > 100 + Math.random() * 10000) ypos[i] = 0;
                else ypos[i] = y + divider;
            });
        };
        // Run slower on mobile for battery saving
        setInterval(drawMatrix, isTouchDevice ? 100 : 70);
    }

    // --- 6. CINEMATIC TYPEWRITER ---
    const roles = ["Red_Team_Operator", "GenAI_Security_Spec", "AppSec_Engineer", "CEH_Master"];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeElement = document.getElementById("typing-text");

    const initTypewriter = () => {
        if(!typeElement) return;
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
            speed = 2500; 
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            speed = 300; 
        }

        setTimeout(initTypewriter, speed);
    };

    // --- 7. ELEGANT SCROLL REVEAL OBSERVER ---
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.05
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
    if (!isTouchDevice) {
        const scrambleElements = document.querySelectorAll(".scramble-text");
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";

        scrambleElements.forEach(el => {
            el.addEventListener("mouseenter", e => {
                let iterations = 0;
                const original = e.target.dataset.text || e.target.innerText;
                if(!e.target.dataset.text) e.target.dataset.text = original;
                
                const interval = setInterval(() => {
                    e.target.innerText = original.split("").map((letter, i) => {
                        if(i < iterations) return original[i];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join("");
                    
                    if(iterations >= original.length) clearInterval(interval);
                    iterations += 1 / 3; 
                }, 30);
            });
        });
    }

    // --- 9. SECURE VISITOR LOGGING SYSTEM (SUPABASE REST API) ---
    // Executes asynchronously so it doesn't block UI rendering
    (async function initVisitorLogging() {
        const SUPABASE_URL = "https://uicxnlfulmnpragakjkt.supabase.co";
        const SUPABASE_KEY = "sb_publishable_V-rKqlVrbUKlFquwDq83oA_Ai6uIu33";
        
        setTimeout(async () => {
            try {
                // 1. Fetch IP Geolocation Data
                let locationData = { country_name: "Unknown", region: "Unknown", city: "Unknown" };
                try {
                    const ipResponse = await fetch('https://ipapi.co/json/');
                    if (ipResponse.ok) {
                        locationData = await ipResponse.json();
                    }
                } catch (e) { /* Silent fail */ }

                // 2. Extract Device Intelligence from UserAgent
                const ua = navigator.userAgent;
                
                let browser = "Unknown";
                if (ua.includes("Firefox")) browser = "Firefox";
                else if (ua.includes("SamsungBrowser")) browser = "Samsung Internet";
                else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
                else if (ua.includes("Edge") || ua.includes("Edg")) browser = "Edge";
                else if (ua.includes("Chrome")) browser = "Chrome";
                else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";

                let os = "Unknown";
                if (ua.includes("Win")) os = "Windows";
                else if (ua.includes("Mac")) os = "MacOS";
                else if (ua.includes("Linux")) os = "Linux";
                else if (ua.includes("Android")) os = "Android";
                else if (ua.includes("like Mac")) os = "iOS";

                let deviceType = "Desktop";
                if (/Mobi|Android/i.test(ua)) deviceType = "Mobile";
                if (/Tablet|iPad/i.test(ua)) deviceType = "Tablet";

                // 3. Assemble Secure Payload
                const payload = {
                    country: locationData.country_name || "Unknown",
                    state: locationData.region || "Unknown",
                    city: locationData.city || "Unknown",
                    browser: browser,
                    os: os,
                    device_type: deviceType,
                    device_name: `${os} Device`,
                    screen_resolution: `${window.screen.width}x${window.screen.height}`,
                    date: new Date().toISOString().split('T')[0],
                    timestamp: new Date().toISOString()
                };

                // 4. Transmit to Supabase Database
                if (SUPABASE_URL !== "https://uicxnlfulmnpragakjkt.supabase.co") {
                    await fetch(`${SUPABASE_URL}/rest/v1/visitor_logs`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': SUPABASE_KEY,
                            'Authorization': `Bearer ${SUPABASE_KEY}`,
                            'Prefer': 'return=minimal'
                        },
                        body: JSON.stringify(payload)
                    });
                }
            } catch (error) {
                // Fail silently to preserve user experience
            }
        }, 3500); // 3.5s delay prioritizes critical rendering path
    })();

});
