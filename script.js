// 🔐 SUPABASE CONFIGURATION (ADD YOUR KEYS BELOW)
// Paste your Supabase Project URL and Publishable Key.
// ⚠️ Never use service_role key on client-side.
const CONFIG = {
  SUPABASE_URL: "https://uicxnlfulmnpragakjkt.supabase.co", // <-- PASTE PROJECT URL HERE
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_V-rKqlVrbUKlFquwDq83oA_Ai6uIu33" // <-- PASTE ANON PUBLIC KEY HERE
};

// ... [Keep all your existing boot sequence, cursor, matrix, and observer logic here] ...

// 📡 Visitor logging system starts here
(async function initVisitorLogging() {
    // Delay execution by 2.5 seconds to ensure non-blocking UI render
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
            if (SUPABASE_URL !== "https://YOUR_PROJECT_ID.supabase.co" && SUPABASE_KEY !== "YOUR_PUBLIC_ANON_KEY_HERE" && SUPABASE_URL && SUPABASE_KEY) {
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
