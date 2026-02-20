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
        
        if (bootSound) {
            bootSound.volume = 0.2;
            bootSound.play().catch(() => {
                console.log("Audio autoplay restricted by browser.");
            });
        }

        const subtitle = document.querySelector('.auth-subtitle');
        if (subtitle) {
            subtitle.innerHTML = "DECRYPTING_MODULES...";
            subtitle.classList.remove('blink');
        }
        
        if (progressFill) progressFill.style.width = "100%";

        setTimeout(() => {
            if (gate) gate.style.opacity = "0";
            setTimeout(() => {
                if (gate) gate.style.display = "none";
                document.body.style.overflow = "auto";
                initTypewriter();
                const heroReveal = document.querySelector('.reveal-hero');
                if (heroReveal) heroReveal.classList.add('active');
            }, 800);
        }, 1200);
    };

    document.addEventListener("keydown", (e) => { if (e.key === "Enter") triggerUnlock(); });
    if (gate) {
        gate.addEventListener("click", triggerUnlock);
        gate.addEventListener("touchstart", triggerUnlock, {passive: true});
    }

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
        if (heroConsole) {
            document.addEventListener('mousemove', e => {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 100;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 100;
                heroConsole.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            });
        }
    }

    /* ==========================================================================
       🧠 ELITE NEURAL INTRUSION DETECTION ENGINE (CANVAS BACKGROUND)
       ========================================================================== */
    (function initNeuralDefenseGrid() {
        const canvas = document.getElementById('neural-defense-grid');
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for opaque background
        
        // --- 🎨 STRICT HACKER STYLE PALETTE ---
        const COLORS = {
            bg: '#02040a',         // Deep Navy
            cyan: '0, 240, 255',   // Electric Cyan (#00f0ff)
            green: '0, 255, 156',  // Neon Green (#00ff9c)
            red: '255, 0, 64'      // Alert Pulse Red (#ff0040)
        };

        // --- ⚡ SYSTEM ARCHITECTURE CONFIGURATION ---
        const NEURAL_CONFIG = {
            particleCount: isTouchDevice ? 45 : 120,    // 50% reduction for mobile
            gridSpacing: isTouchDevice ? 80 : 45,       // Wider grid on mobile
            linkRadius: isTouchDevice ? 110 : 160,      // Connection threshold distance
            mouseRadius: isTouchDevice ? 150 : 250,     // Magnetic gravity well size
            pulseThreshold: 45,                         // Velocity required to trigger energy ripple
            glowEnabled: !isTouchDevice                 // Disable expensive canvas shadows on mobile
        };

        let w, h;
        let particles = [];
        let gridNodes = [];
        let pulses = [];
        let threatScannerY = -200;
        
        // 🎯 Operator Tracking (Mouse/Touch State)
        const operator = {
            x: -1000, 
            y: -1000,
            lastX: -1000, 
            lastY: -1000,
            speed: 0,
            idleFrames: 0
        };

        // --- 📐 RESIZE & INITIALIZATION ---
        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            initSystem();
        }
        window.addEventListener('resize', resize);

        // --- 📡 OPERATOR PRESENCE DETECTION ---
        function updateOperator(x, y) {
            operator.lastX = operator.x;
            operator.lastY = operator.y;
            operator.x = x;
            operator.y = y;
            
            const vx = operator.x - operator.lastX;
            const vy = operator.y - operator.lastY;
            operator.speed = Math.hypot(vx, vy);
            operator.idleFrames = 0; // Reset idle timer upon detection

            // 💥 Energy Ripple Engine: Triggered by rapid, decisive mouse movements
            if (operator.speed > NEURAL_CONFIG.pulseThreshold && pulses.length < 3) {
                pulses.push(new EnergyPulse(operator.x, operator.y, operator.speed));
            }
        }
        
        window.addEventListener('mousemove', e => updateOperator(e.clientX, e.clientY));
        window.addEventListener('touchmove', e => updateOperator(e.touches[0].clientX, e.touches[0].clientY), {passive: true});
        window.addEventListener('mouseout', () => { operator.x = -1000; operator.y = -1000; });

        // --- 🧲 1. MAGNETIC GRID DISTORTION PHYSICS ---
        class GridNode {
            constructor(x, y) {
                this.baseX = x;
                this.baseY = y;
                this.x = x;
                this.y = y;
            }
            update() {
                const dx = operator.x - this.baseX;
                const dy = operator.y - this.baseY;
                const dist = Math.hypot(dx, dy);

                if (dist < NEURAL_CONFIG.mouseRadius) {
                    // Grid warps toward cursor creating a magnetic distortion field
                    const force = Math.pow((NEURAL_CONFIG.mouseRadius - dist) / NEURAL_CONFIG.mouseRadius, 2);
                    const targetX = this.baseX + (dx * force * 0.2);
                    const targetY = this.baseY + (dy * force * 0.2);
                    
                    // Smooth easing physics (LERP)
                    this.x += (targetX - this.x) * 0.1;
                    this.y += (targetY - this.y) * 0.1;
                } else {
                    // Snap back to base position when operator leaves
                    this.x += (this.baseX - this.x) * 0.05;
                    this.y += (this.baseY - this.y) * 0.05;
                }
            }
            draw() {
                ctx.fillStyle = `rgba(${COLORS.cyan}, 0.2)`;
                ctx.fillRect(this.x - 1, this.y - 1, 2, 2);
            }
        }

        // --- 🦠 2. CURSOR-ATTRACTED PARTICLE NETWORK ---
        class NeuralParticle {
            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 1.2;
                this.vy = (Math.random() - 0.5) * 1.2;
                this.size = Math.random() * 1.5 + 0.5;
                this.isAlert = Math.random() > 0.95; // 5% chance of being an Alert Pulse Red node
                this.color = this.isAlert ? COLORS.red : COLORS.green;
            }

            update() {
                // Autonomous Drift
                this.x += this.vx;
                this.y += this.vy;

                // Screen Wrapping for continuous seamless flow (with overscan margin)
                const margin = 100;
                if (this.x < -margin) this.x = w + margin;
                if (this.x > w + margin) this.x = -margin;
                if (this.y < -margin) this.y = h + margin;
                if (this.y > h + margin) this.y = -margin;

                const dx = operator.x - this.x;
                const dy = operator.y - this.y;
                const dist = Math.hypot(dx, dy);

                // Gravity Field & Orbital Mechanics
                if (dist < NEURAL_CONFIG.mouseRadius) {
                    const force = (NEURAL_CONFIG.mouseRadius - dist) / NEURAL_CONFIG.mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    
                    // 1. Pull toward operator (Gravity attraction)
                    this.x += Math.cos(angle) * force * 1.5;
                    this.y += Math.sin(angle) * force * 1.5;
                    
                    // 2. Tangential force (Orbital swirling effect creating a vortex)
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
                ctx.shadowBlur = 0; // Reset immediately to prevent bleeding and save GPU
            }
        }

        // --- 💥 3. ENERGY PULSE RIPPLE ENGINE ---
        class EnergyPulse {
            constructor(x, y, speed) {
                this.x = x;
                this.y = y;
                this.radius = 5;
                this.alpha = 0.7;
                this.growthRate = Math.min(speed * 0.15, 6) + 2; 
            }
            update() {
                this.radius += this.growthRate;
                this.alpha -= 0.012; // Fading glow
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${COLORS.cyan}, ${Math.max(0, this.alpha)})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }

        // --- 🚀 SYSTEM INITIALIZATION ---
        function initSystem() {
            particles = [];
            gridNodes = [];
            pulses = [];
            
            // Populate Neural Network
            for (let i = 0; i < NEURAL_CONFIG.particleCount; i++) {
                particles.push(new NeuralParticle());
            }
            
            // Populate Magnetic Defense Grid (Overscan to handle parallax seamless wrapping)
            const overscan = 150;
            for (let x = -overscan; x <= w + overscan; x += NEURAL_CONFIG.gridSpacing) {
                for (let y = -overscan; y <= h + overscan; y += NEURAL_CONFIG.gridSpacing) {
                    gridNodes.push(new GridNode(x, y));
                }
            }
        }

        // --- 🎞️ CORE ANIMATION LOOP (60FPS) ---
        function render() {
            // Clear screen with opacity to create smooth motion trails
            ctx.fillStyle = `rgba(2, 4, 10, 0.25)`; // Trails fade into Deep Navy Void
            ctx.fillRect(0, 0, w, h);

            operator.idleFrames++;

            // 🌌 4. Subtle 3D Parallax Illusion (Desktop Only)
            if (!isTouchDevice && operator.idleFrames < 100) {
                const shiftX = (operator.x - w / 2) * 0.015;
                const shiftY = (operator.y - h / 2) * 0.015;
                ctx.setTransform(1, 0, 0, 1, -shiftX, -shiftY);
            } else {
                ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform smoothly when idle
            }

            // Process Magnetic Grid
            for (let i = 0; i < gridNodes.length; i++) {
                gridNodes[i].update();
                gridNodes[i].draw();
            }

            // Process Energy Pulses
            for (let i = pulses.length - 1; i >= 0; i--) {
                pulses[i].update();
                pulses[i].draw();
                if (pulses[i].alpha <= 0) pulses.splice(i, 1);
            }

            // 📡 5. Idle Autonomous Mode: Periodic Threat Scan Sweep Line
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
            ctx.lineWidth = 1;
            ctx.stroke();

            // 🧠 6. Update Particles & Neural Link Formation
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Form Neural Links (Optimized by distance threshold)
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < NEURAL_CONFIG.linkRadius) {
                        let opacity = 1 - (dist / NEURAL_CONFIG.linkRadius);
                        let linkColor = COLORS.green; // Default safe link
                        
                        // Intelligent System Scanning behavior:
                        const distToMouse = Math.hypot(operator.x - particles[i].x, operator.y - particles[i].y);
                        if (distToMouse < 200 && operator.speed < 4 && operator.idleFrames < 60) {
                            linkColor = COLORS.cyan; 
                            opacity *= 2.0; // Over-brighten active scan
                        } else {
                            opacity *= 0.3; // Dim autonomous background links
                        }

                        // Red Alert Links
                        if (particles[i].isAlert || particles[j].isAlert) {
                            linkColor = COLORS.red;
                            opacity *= 1.5;
                        }

                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${linkColor}, ${Math.min(opacity, 1)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(render);
        }

        // --- 🚀 IGNITION ---
        resize();
        render();

    })();

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

    // 📡 Visitor logging system starts here
    (async function initVisitorLogging() {
        setTimeout(async () => {
            try {
                // 🔐 Using centralized Supabase credentials from CONFIG
                const SUPABASE_URL = CONFIG.SUPABASE_URL;
                const SUPABASE_KEY = CONFIG.SUPABASE_PUBLISHABLE_KEY;

                // Fetch Geolocation
                let locationData = { country_name: "Unknown", region: "Unknown", city: "Unknown" };
                try {
                    const ipResponse = await fetch('https://ipapi.co/json/');
                    if (ipResponse.ok) {
                        locationData = await ipResponse.json();
                    }
                } catch (ipError) {
                    console.log("Failed to fetch location data.");
                }

                // Detect Browser and OS
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

                // Detect Device Type
                let device_type = "Desktop";
                if (/Mobi|Android/i.test(ua)) device_type = "Mobile";
                if (/Tablet|iPad/i.test(ua)) device_type = "Tablet";

                // 🧠 Advanced device fingerprinting (best-effort model detection)
                let model_name = "Unknown Model";
                let device_name = "Unknown Device";

                if (navigator.userAgentData && navigator.userAgentData.brands) {
                    const brands = navigator.userAgentData.brands.map(b => b.brand).join(", ");
                    if (brands) model_name = brands;
                }

                if (ua.includes("iPhone")) { 
                    model_name = "Apple iPhone"; 
                    device_name = "iPhone"; 
                } else if (ua.includes("iPad")) { 
                    model_name = "Apple iPad"; 
                    device_name = "iPad"; 
                } else if (ua.includes("Pixel")) { 
                    model_name = "Google Pixel Device"; 
                    device_name = "Android Device"; 
                } else if (ua.includes("SM-")) { 
                    model_name = "Samsung Galaxy Device"; 
                    device_name = "Android Device"; 
                } else if (ua.includes("Windows")) { 
                    model_name = "Windows PC / Laptop"; 
                    device_name = "Windows PC"; 
                } else if (ua.includes("Macintosh")) { 
                    model_name = "MacBook / Mac Device"; 
                    device_name = "MacBook"; 
                } else if (ua.includes("Linux") && !ua.includes("Android")) { 
                    model_name = "Linux Machine"; 
                    device_name = "Linux PC"; 
                } else if (ua.includes("Android")) {
                    model_name = "Generic Android Device";
                    device_name = "Android Device";
                } else {
                    device_name = `${os} Device`;
                }

                // 🖥️ Environment classification (VM vs Physical)
                let environment_type = "Physical Device";
                const screenWidth = window.screen.width;
                if ((screenWidth < 800 && device_type === "Desktop") || 
                    ua.includes("X11") || 
                    ua.includes("VirtualBox") || 
                    ua.includes("VMware")) {
                    environment_type = "VM / Emulator Suspected";
                }

                // Construct strict payload matching exact table columns
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

                // 📡 Sending enriched telemetry to Supabase securely
                if (SUPABASE_URL !== "PASTE_YOUR_PROJECT_URL_HERE" && SUPABASE_KEY !== "PASTE_YOUR_PUBLISHABLE_KEY_HERE" && SUPABASE_URL && SUPABASE_KEY) {
                    const supabaseResponse = await fetch(`${SUPABASE_URL}/rest/v1/visitor_logs`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': SUPABASE_KEY,
                            'Authorization': `Bearer ${SUPABASE_KEY}`,
                            'Prefer': 'return=minimal'
                        },
                        body: JSON.stringify(payload)
                    });

                    if (supabaseResponse.ok) {
                        console.log("Visitor logged successfully");
                    } else {
                        const errorText = await supabaseResponse.text();
                        console.log("Supabase logging failed: " + errorText);
                    }
                } else {
                    console.log("Supabase configuration missing or invalid. Logging bypassed.");
                }

            } catch (error) {
                console.log("Error during visitor logging execution: " + error.message);
            }
        }, 2500); 
    })();

});
