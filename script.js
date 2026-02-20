/* 3️⃣ Complete JavaScript background engine */
// 🔐 SUPABASE CONFIGURATION (ADD YOUR KEYS BELOW)
// Paste your Supabase Project URL and Publishable Key.
// ⚠️ Never use service_role key on client-side.
const CONFIG = {
    SUPABASE_URL: "https://uicxnlfulmnpragakjkt.supabase.co",
    SUPABASE_PUBLISHABLE_KEY: "sb_publishable_V-rKqlVrbUKlFquwDq83oA_Ai6uIu33"
};

document.addEventListener("DOMContentLoaded", () => {
    
    // --- UTILITY: Check for Touch Device ---
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    /* ==========================================================================
       🔐 1. CINEMATIC BOOT AUTHORIZATION SEQUENCE
       ========================================================================== */
    const gate = document.getElementById("gate-screen");
    const progressFill = document.querySelector(".auth-fill");
    const authSound = document.getElementById("auth-sound");
    const diagnosticLogs = document.getElementById("diagnostic-logs");
    const authSubtitle = document.querySelector('.auth-subtitle');
    const authTitle = document.querySelector('.auth-title');
    const scanBeam = document.querySelector('.scan-beam');
    let isUnlocked = false;

    // Lock scrolling initially for security immersion
    document.body.style.overflow = "hidden";

    // Dynamic Diagnostics Typewriter Array
    const logs = [
        "> initializing secure kernel...",
        "> validating operator signature...",
        "> loading red_team modules...",
        "> establishing encrypted handshake..."
    ];
    let logIndex = 0;
    let charIndex = 0;
    let typingTimeout;

    // Typewriter for diagnostics logs
    function typeDiagnosticLog() {
        if (isUnlocked || !diagnosticLogs) return; // Halt if user already authorized
        
        if (logIndex < logs.length) {
            if (charIndex === 0) {
                const p = document.createElement("div");
                p.className = "log-line";
                p.id = "current-log";
                diagnosticLogs.appendChild(p);
            }
            
            const currentP = document.getElementById("current-log");
            currentP.innerHTML += logs[logIndex].charAt(charIndex);
            charIndex++;
            
            if (charIndex < logs[logIndex].length) {
                typingTimeout = setTimeout(typeDiagnosticLog, 25 + Math.random() * 30);
            } else {
                currentP.removeAttribute("id");
                logIndex++;
                charIndex = 0;
                typingTimeout = setTimeout(typeDiagnosticLog, 500); // System pause before next diagnostic
            }
        }
    }
    
    // Initiate diagnostics immediately
    typeDiagnosticLog();

    // The core unlock trigger function
    const triggerUnlock = () => {
        if (isUnlocked) return;
        isUnlocked = true;
        
        // Interrupt ongoing diagnostics
        clearTimeout(typingTimeout);

        // Audio cue: Futuristic Confirmation
        if (authSound) {
            authSound.volume = 0.5;
            authSound.play().catch(() => {
                console.log("Audio autoplay restricted by browser policies.");
            });
        }

        // Output Final Acceptance Log
        if (diagnosticLogs) {
            const successLog = document.createElement("div");
            successLog.className = "log-line log-success";
            successLog.innerHTML = "> AUTHORIZATION ACCEPTED [200 OK]";
            diagnosticLogs.appendChild(successLog);
        }

        // Visually update the UI state to 'Granted'
        if (authSubtitle) {
            authSubtitle.innerHTML = "ACCESS GRANTED";
            authSubtitle.classList.remove('blink');
            authSubtitle.style.color = "var(--neon-green)";
            authSubtitle.style.textShadow = "0 0 10px var(--neon-green)";
        }
        
        if (authTitle) {
            authTitle.style.color = "var(--neon-green)";
            authTitle.style.textShadow = "0 0 20px var(--neon-green)";
            authTitle.classList.remove('auth-glitch'); // Stop heavy glitching on success
        }

        // Terminate scanning beam
        if (scanBeam) scanBeam.style.display = 'none';
        
        // Progress sequence
        if (progressFill) progressFill.style.width = "100%";

        // Fade Transition into main application
        setTimeout(() => {
            if (gate) gate.style.opacity = "0";
            setTimeout(() => {
                if (gate) gate.style.display = "none";
                document.body.style.overflow = "auto";
                
                // Initialize main site animations
                initTypewriter();
                const heroReveal = document.querySelector('.reveal-hero');
                if (heroReveal) heroReveal.classList.add('active');
            }, 1000);
        }, 1200); // Allows operator to read "ACCESS GRANTED" before fade
    };

    // Listeners for Authorization
    document.addEventListener("keydown", (e) => { if (e.key === "Enter") triggerUnlock(); });
    if (gate) {
        gate.addEventListener("click", triggerUnlock);
        gate.addEventListener("touchstart", triggerUnlock, {passive: true});
    }

    /* ==========================================================================
       🎯 2. TACTICAL RETICLE & GLOW ENGINE (Desktop Only)
       ========================================================================== */
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
            
            if (cursorCore) {
                cursorCore.style.left = targetX + "px";
                cursorCore.style.top = targetY + "px";
            }

            document.documentElement.style.setProperty('--mouse-x', `${targetX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${targetY + window.scrollY}px`);
        });

        const renderCursor = () => {
            ringX += (targetX - ringX) * 0.15;
            ringY += (targetY - ringY) * 0.15;
            
            if (cursorRing) {
                cursorRing.style.left = ringX + "px";
                cursorRing.style.top = ringY + "px";
            }
            
            requestAnimationFrame(renderCursor);
        };
        renderCursor();

        // Intelligent Hover States
        const interactables = document.querySelectorAll("a, button, .interactive-card, .log-node");
        interactables.forEach(el => {
            el.addEventListener("mouseenter", () => document.body.classList.add("hover-active"));
            el.addEventListener("mouseleave", () => document.body.classList.remove("hover-active"));
        });

        // Dynamic Glassmorphism Spotlights
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

        // Hero Parallax Layering
        const heroConsole = document.querySelector('.hero-glass-console');
        if (heroConsole) {
            document.addEventListener('mousemove', e => {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 100;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 100;
                heroConsole.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            });
        }
    }

    /* ==========================================================================
       🧠 3. ELITE NEURAL INTRUSION DETECTION ENGINE (CANVAS BACKGROUND)
       ========================================================================== */
    (function initNeuralDefenseGrid() {
        const canvas = document.getElementById('neural-defense-grid');
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false }); 
        
        const COLORS = {
            bg: '#02040a',         
            cyan: '0, 240, 255',   
            green: '0, 255, 156',  
            red: '255, 0, 64'      
        };

        const NEURAL_CONFIG = {
            particleCount: isTouchDevice ? 45 : 120,    
            gridSpacing: isTouchDevice ? 80 : 45,       
            linkRadius: isTouchDevice ? 110 : 160,      
            mouseRadius: isTouchDevice ? 150 : 250,     
            pulseThreshold: 45,                         
            glowEnabled: !isTouchDevice                 
        };

        let w, h;
        let particles = [];
        let gridNodes = [];
        let pulses = [];
        let threatScannerY = -200;
        
        const operator = {
            x: -1000, y: -1000, lastX: -1000, lastY: -1000, speed: 0, idleFrames: 0
        };

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            initSystem();
        }
        window.addEventListener('resize', resize);

        function updateOperator(x, y) {
            operator.lastX = operator.x;
            operator.lastY = operator.y;
            operator.x = x;
            operator.y = y;
            const vx = operator.x - operator.lastX;
            const vy = operator.y - operator.lastY;
            operator.speed = Math.hypot(vx, vy);
            operator.idleFrames = 0; 

            if (operator.speed > NEURAL_CONFIG.pulseThreshold && pulses.length < 3) {
                pulses.push(new EnergyPulse(operator.x, operator.y, operator.speed));
            }
        }
        
        window.addEventListener('mousemove', e => updateOperator(e.clientX, e.clientY));
        window.addEventListener('touchmove', e => updateOperator(e.touches[0].clientX, e.touches[0].clientY), {passive: true});
        window.addEventListener('mouseout', () => { operator.x = -1000; operator.y = -1000; });

        class GridNode {
            constructor(x, y) {
                this.baseX = x; this.baseY = y; this.x = x; this.y = y;
            }
            update() {
                const dx = operator.x - this.baseX;
                const dy = operator.y - this.baseY;
                const dist = Math.hypot(dx, dy);

                if (dist < NEURAL_CONFIG.mouseRadius) {
                    const force = Math.pow((NEURAL_CONFIG.mouseRadius - dist) / NEURAL_CONFIG.mouseRadius, 2);
                    const targetX = this.baseX + (dx * force * 0.2);
                    const targetY = this.baseY + (dy * force * 0.2);
                    this.x += (targetX - this.x) * 0.1;
                    this.y += (targetY - this.y) * 0.1;
                } else {
                    this.x += (this.baseX - this.x) * 0.05;
                    this.y += (this.baseY - this.y) * 0.05;
                }
            }
            draw() {
                ctx.fillStyle = `rgba(${COLORS.cyan}, 0.2)`;
                ctx.fillRect(this.x - 1, this.y - 1, 2, 2);
            }
        }

        class NeuralParticle {
            constructor() {
                this.x = Math.random() * w; this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 1.2; this.vy = (Math.random() - 0.5) * 1.2;
                this.size = Math.random() * 1.5 + 0.5;
                this.isAlert = Math.random() > 0.95; 
                this.color = this.isAlert ? COLORS.red : COLORS.green;
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                const margin = 100;
                if (this.x < -margin) this.x = w + margin;
                if (this.x > w + margin) this.x = -margin;
                if (this.y < -margin) this.y = h + margin;
                if (this.y > h + margin) this.y = -margin;

                const dx = operator.x - this.x;
                const dy = operator.y - this.y;
                const dist = Math.hypot(dx, dy);

                if (dist < NEURAL_CONFIG.mouseRadius) {
                    const force = (NEURAL_CONFIG.mouseRadius - dist) / NEURAL_CONFIG.mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force * 1.5;
                    this.y += Math.sin(angle) * force * 1.5;
                    this.x += Math.cos(angle + Math.PI / 2) * force * 2.0;
                    this.y += Math.sin(angle + Math.PI / 2) * force * 2.0;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgb(${this.color})`;
                if (NEURAL_CONFIG.glowEnabled) {
                    ctx.shadowBlur = this.isAlert ? 15 : 8;
                    ctx.shadowColor = `rgb(${this.color})`;
                }
                ctx.fill();
                ctx.shadowBlur = 0; 
            }
        }

        class EnergyPulse {
            constructor(x, y, speed) {
                this.x = x; this.y = y; this.radius = 5; this.alpha = 0.7;
                this.growthRate = Math.min(speed * 0.15, 6) + 2; 
            }
            update() {
                this.radius += this.growthRate; this.alpha -= 0.012; 
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${COLORS.cyan}, ${Math.max(0, this.alpha)})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }

        function initSystem() {
            particles = []; gridNodes = []; pulses = [];
            for (let i = 0; i < NEURAL_CONFIG.particleCount; i++) particles.push(new NeuralParticle());
            const overscan = 150;
            for (let x = -overscan; x <= w + overscan; x += NEURAL_CONFIG.gridSpacing) {
                for (let y = -overscan; y <= h + overscan; y += NEURAL_CONFIG.gridSpacing) {
                    gridNodes.push(new GridNode(x, y));
                }
            }
        }

        function render() {
            ctx.fillStyle = `rgba(2, 4, 10, 0.25)`; 
            ctx.fillRect(0, 0, w, h);

            operator.idleFrames++;

            if (!isTouchDevice && operator.idleFrames < 100) {
                const shiftX = (operator.x - w / 2) * 0.015;
                const shiftY = (operator.y - h / 2) * 0.015;
                ctx.setTransform(1, 0, 0, 1, -shiftX, -shiftY);
            } else {
                ctx.setTransform(1, 0, 0, 1, 0, 0); 
            }

            for (let i = 0; i < gridNodes.length; i++) { gridNodes[i].update(); gridNodes[i].draw(); }
            for (let i = pulses.length - 1; i >= 0; i--) {
                pulses[i].update(); pulses[i].draw();
                if (pulses[i].alpha <= 0) pulses.splice(i, 1);
            }

            threatScannerY += operator.idleFrames > 120 ? 3.5 : 1.5; 
            if (threatScannerY > h + 300) threatScannerY = -200;
            
            const scanGrad = ctx.createLinearGradient(0, threatScannerY - 80, 0, threatScannerY);
            scanGrad.addColorStop(0, `rgba(${COLORS.cyan}, 0)`);
            scanGrad.addColorStop(0.8, `rgba(${COLORS.cyan}, 0.05)`);
            scanGrad.addColorStop(1, `rgba(${COLORS.cyan}, 0.2)`);
            
            ctx.fillStyle = scanGrad;
            ctx.fillRect(-200, threatScannerY - 80, w + 400, 80); 
            ctx.beginPath();
            ctx.moveTo(-200, threatScannerY);
            ctx.lineTo(w + 400, threatScannerY);
            ctx.strokeStyle = `rgba(${COLORS.cyan}, 0.5)`;
            ctx.lineWidth = 1; ctx.stroke();

            for (let i = 0; i < particles.length; i++) {
                particles[i].update(); particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < NEURAL_CONFIG.linkRadius) {
                        let opacity = 1 - (dist / NEURAL_CONFIG.linkRadius);
                        let linkColor = COLORS.green; 
                        
                        const distToMouse = Math.hypot(operator.x - particles[i].x, operator.y - particles[i].y);
                        if (distToMouse < 200 && operator.speed < 4 && operator.idleFrames < 60) {
                            linkColor = COLORS.cyan; opacity *= 2.0; 
                        } else {
                            opacity *= 0.3; 
                        }

                        if (particles[i].isAlert || particles[j].isAlert) {
                            linkColor = COLORS.red; opacity *= 1.5;
                        }

                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${linkColor}, ${Math.min(opacity, 1)})`;
                        ctx.lineWidth = 0.8; ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(render);
        }
        resize(); render();
    })();

    /* ==========================================================================
       📝 4. CINEMATIC TYPEWRITER & SCROLL EFFECTS
       ========================================================================== */
    const roles = ["Red_Team_Operator", "GenAI_Security_Spec", "AppSec_Engineer", "CEH_Master"];
    let roleIdx = 0, charIdx = 0, isDeleting = false;
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
            speed = 2500; isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; speed = 300; 
        }
        setTimeout(initTypewriter, speed);
    };

    const observerOptions = { root: null, rootMargin: "0px 0px -50px 0px", threshold: 0.05 };
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

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

    /* ==========================================================================
       📡 5. SECURE VISITOR TELEMETRY (SUPABASE)
       ========================================================================== */
    (async function initVisitorLogging() {
        setTimeout(async () => {
            try {
                const SUPABASE_URL = CONFIG.SUPABASE_URL;
                const SUPABASE_KEY = CONFIG.SUPABASE_PUBLISHABLE_KEY;

                let locationData = { country_name: "Unknown", region: "Unknown", city: "Unknown" };
                try {
                    const ipResponse = await fetch('https://ipapi.co/json/');
                    if (ipResponse.ok) locationData = await ipResponse.json();
                } catch (ipError) {}

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

                let device_type = "Desktop";
                if (/Mobi|Android/i.test(ua)) device_type = "Mobile";
                if (/Tablet|iPad/i.test(ua)) device_type = "Tablet";

                let model_name = "Unknown Model";
                let device_name = "Unknown Device";

                if (navigator.userAgentData && navigator.userAgentData.brands) {
                    const brands = navigator.userAgentData.brands.map(b => b.brand).join(", ");
                    if (brands) model_name = brands;
                }

                if (ua.includes("iPhone")) { model_name = "Apple iPhone"; device_name = "iPhone"; } 
                else if (ua.includes("iPad")) { model_name = "Apple iPad"; device_name = "iPad"; } 
                else if (ua.includes("Pixel")) { model_name = "Google Pixel Device"; device_name = "Android Device"; } 
                else if (ua.includes("SM-")) { model_name = "Samsung Galaxy Device"; device_name = "Android Device"; } 
                else if (ua.includes("Windows")) { model_name = "Windows PC / Laptop"; device_name = "Windows PC"; } 
                else if (ua.includes("Macintosh")) { model_name = "MacBook / Mac Device"; device_name = "MacBook"; } 
                else if (ua.includes("Linux") && !ua.includes("Android")) { model_name = "Linux Machine"; device_name = "Linux PC"; } 
                else if (ua.includes("Android")) { model_name = "Generic Android Device"; device_name = "Android Device"; } 
                else { device_name = `${os} Device`; }

                let environment_type = "Physical Device";
                if ((window.screen.width < 800 && device_type === "Desktop") || ua.includes("X11") || ua.includes("VirtualBox") || ua.includes("VMware")) {
                    environment_type = "VM / Emulator Suspected";
                }

                const payload = {
                    country: locationData.country_name || "Unknown",
                    state: locationData.region || "Unknown",
                    city: locationData.city || "Unknown",
                    browser: browser,
                    os: os,
                    resolution: `${window.screen.width}x${window.screen.height}`,
                    date: new Date().toISOString().split('T')[0],
                    timestamp: new Date().toISOString(),
                    device_type: device_type,
                    device_name: device_name,
                    model_name: model_name,
                    environment_type: environment_type
                };

                if (SUPABASE_URL !== "PASTE_YOUR_PROJECT_URL_HERE" && SUPABASE_KEY !== "PASTE_YOUR_PUBLISHABLE_KEY_HERE" && SUPABASE_URL && SUPABASE_KEY) {
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
                // Silent catch
            }
        }, 3000); 
    })();

});
