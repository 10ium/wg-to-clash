// script.js

// Mapping for country codes to emojis
const countryEmojiMap = {
    "US": "🇺🇸", "DE": "🇩🇪", "NL": "🇳🇱", "CA": "🇨🇦", "GB": "🇬🇧", "FR": "🇫🇷",
    "AU": "🇦🇺", "JP": "🇯🇵", "SG": "🇸🇬", "SE": "🇸🇪", "CH": "🇨🇭", "FI": "🇫🇮",
    "NO": "🇳🇴", "DK": "🇩🇰", "BE": "🇧🇪", "AT": "🇦🇹", "ES": "🇪🇸", "IT": "🇮🇹",
    "PL": "🇵🇱", "CZ": "🇨🇿", "IE": "🇮🇪", "NZ": "🇳🇿", "KR": "🇰🇷", "HK": "🇭🇰",
    "TW": "🇹🇼", "IN": "🇮🇳", "BR": "🇧🇷", "MX": "🇲🇽", "ZA": "🇿🇦", "AE": "🇦🇪",
    "TR": "🇹🇷", "RU": "🇷🇺", "CN": "🇨🇳", "IR": "🇮🇷", "RO": "🇷🇴",
    "AF": "🇦🇫", "AL": "🇦🇱", "DZ": "🇩🇿", "AS": "🇦🇸", "AD": "🇦🇩", "AO": "🇦🇴",
    "AI": "🇦🇮", "AQ": "🇦🇶", "AG": "🇦🇬", "AR": "🇦🇷", "AM": "🇦🇲", "AW": "🇦🇼",
    "AZ": "🇦🇿", "BS": "🇧🇸", "BH": "🇧🇭", "BD": "🇧🇩", "BB": "🇧🇧", "BY": "🇧🇾",
    "BZ": "🇧🇿", "BJ": "🇧🇯", "BM": "🇧🇲", "BT": "🇧🇹", "BO": "🇧🇴", "BA": "🇧🇦",
    "BW": "🇧🇼", "BV": "🇧🇻", "IO": "🇮🇴", "BN": "🇧🇳", "BG": "🇧🇬", "BF": "🇧🇫",
    "BI": "🇧🇮", "KH": "🇰🇭", "CM": "🇨🇲", "CV": "🇨🇻", "KY": "🇰🇾", "CF": "🇨🇫",
    "TD": "🇹🇩", "CL": "🇨🇱", "CX": "🇨🇽", "CC": "🇨🇨", "CO": "🇨🇴", "KM": "🇰🇲",
    "CG": "🇨🇬", "CD": "🇨🇩", "CK": "🇨🇰", "CR": "🇨🇷", "CI": "🇨🇮", "HR": "🇭🇷",
    "CU": "🇨🇺", "CY": "🇨🇾", "DJ": "🇩🇯", "DM": "🇩🇲", "DO": "🇩🇴", "EC": "🇪🇨",
    "EG": "🇪🇬", "SV": "🇸🇻", "GQ": "🇬🇶", "ER": "🇪🇷", "EE": "🇪🇪", "ET": "🇪🇹",
    "FK": "🇫🇰", "FO": "🇫🇴", "FJ": "🇫🇯", "GF": "🇬🇫", "PF": "🇵🇫", "TF": "🇹🇫",
    "GA": "🇬🇦", "GM": "🇬🇲", "GE": "🇬🇪", "GH": "🇬🇭", "GI": "🇬🇮", "GR": "🇬🇷",
    "GL": "🇬🇱", "GD": "🇬🇩", "GP": "🇬🇵", "GU": "🇬🇺", "GT": "🇬🇹", "GN": "🇬🇳",
    "GW": "🇬🇼", "GY": "🇬🇾", "HT": "🇭🇹", "HM": "🇭🇲", "HN": "🇭🇳", "HU": "🇭🇺",
    "IS": "🇮🇸", "ID": "🇮🇩", "IQ": "🇮🇶", "IE": "🇮🇪", "IL": "🇮🇱", "JM": "🇯🇲",
    "JO": "🇯🇴", "KZ": "🇰🇿", "KE": "🇰🇪", "KI": "🇰🇮", "KP": "🇰🇵", "KR": "🇰🇷",
    "KW": "🇰🇼", "KG": "🇰🇬", "LA": "🇱🇦", "LV": "🇱🇻", "LB": "🇱🇧", "LS": "🇱🇸",
    "LR": "🇱🇷", "LY": "🇱🇾", "LI": "🇱🇮", "LT": "🇱🇹", "LU": "🇱🇺", "MO": "🇲🇴",
    "MK": "🇲🇰", "MG": "🇲🇬", "MW": "🇲🇼", "MY": "🇲🇾", "MV": "🇲🇻", "ML": "🇲🇱",
    "MT": "🇲🇹", "MH": "🇲🇭", "MQ": "🇲🇶", "MR": "🇲🇷", "MU": "🇲🇺", "YT": "🇾🇹",
    "FM": "🇫🇲", "MD": "🇲🇩", "MC": "🇲🇨", "MN": "🇲🇳", "MS": "🇲🇸", "MA": "🇲🇦",
    "MZ": "🇲🇿", "MM": "🇲🇲", "NA": "🇳🇦", "NR": "🇳🇷", "NP": "🇳🇵", "NC": "🇳🇨",
    "NI": "🇳🇮", "NE": "🇳🇪", "NG": "🇳🇬", "NU": "🇳🇺", "NF": "🇳🇫", "MP": "🇲🇵",
    "OM": "🇴🇲", "PK": "🇵🇰", "PW": "🇵🇼", "PS": "🇵🇸", "PA": "🇵🇦", "PG": "🇵🇬",
    "PY": "🇵🇾", "PE": "🇵🇪", "PH": "🇵🇭", "PN": "🇵🇳", "PT": "🇵🇹", "PR": "🇵🇷",
    "QA": "🇶🇦", "RE": "🇷🇪", "RW": "🇷🇼", "SH": "🇸🇭", "KN": "🇰🇳", "LC": "🇱🇨",
    "PM": "🇵🇲", "VC": "🇻🇨", "WS": "🇼🇸", "SM": "🇸🇲", "ST": "🇸🇹", "SA": "🇸🇦",
    "SN": "🇸🇳", "RS": "🇷🇸", "SC": "🇸🇨", "SL": "🇸🇱", "SK": "🇸🇰", "SI": "🇸🇮",
    "SB": "🇸🇧", "SO": "🇸🇴", "GS": "🇬🇸", "SS": "🇸🇸", "LK": "🇱🇰", "SD": "🇸🇩",
    "SR": "🇸🇷", "SJ": "🇸🇯", "SZ": "🇸🇿", "SY": "🇸🇾", "TJ": "🇹🇯", "TZ": "🇹🇿",
    "TH": "🇹🇭", "TL": "🇹🇱", "TG": "🇹🇬", "TK": "🇹🇰", "TO": "🇹🇴", "TT": "🇹🇹",
    "TN": "🇹🇳", "TM": "🇹🇲", "TC": "🇹🇨", "TV": "🇹🇻", "UG": "🇺🇬", "UA": "🇺🇦",
    "UM": "🇺🇲", "UY": "🇺🇾", "UZ": "🇺🇿", "VU": "🇻🇺", "VE": "🇻🇪", "VN": "🇻🇳",
    "VG": "🇻🇬", "VI": "🇻🇮", "WF": "🇼🇫", "EH": "🇪🇭", "YE": "🇾🇪", "ZM": "🇿🇲",
    "ZW": "🇿🇼"
};

// Get elements from the DOM
const wgConfigInput = document.getElementById('wgConfigInput');
const wgConfigFile = document.getElementById('wgConfigFile');
const fileListDiv = document.getElementById('fileList');
const jcInput = document.getElementById('jcInput');
const jminInput = document.getElementById('jminInput');
const jmaxInput = document.getElementById('jmaxInput');
const amneziaOptionSelect = document.getElementById('amneziaOptionSelect');
const templateSelect = document.getElementById('templateSelect');
const outputFileNameInput = document.getElementById('outputFileName');
const generateBtn = document.getElementById('generateBtn');
const messageDiv = document.getElementById('message');
const themeToggle = document.getElementById('themeToggle'); // New theme toggle element

let uploadedFilesContent = [];

// --- Theme Management ---
/**
 * Sets the theme (light or dark) on the body element.
 * @param {string} theme - 'light' or 'dark'.
 */
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); // Save preference
    themeToggle.checked = (theme === 'dark'); // Update toggle state
}

/**
 * Detects the current time in Tehran and sets the theme accordingly.
 * Day: 6 AM to 6 PM (18:00). Night: otherwise.
 */
function autoSetThemeByTehranTime() {
    const now = new Date();
    // Get current hour in Tehran timezone
    const tehranTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hourCycle: 'h23',
        timeZone: 'Asia/Tehran'
    }).format(now);
    const hour = parseInt(tehranTime, 10);

    if (hour >= 6 && hour < 18) { // 6 AM to 5:59 PM is day
        setTheme('light');
    } else { // 6 PM to 5:59 AM is night
        setTheme('dark');
    }
}

// Initialize theme on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme); // Use saved theme
    } else {
        autoSetThemeByTehranTime(); // Auto-detect if no saved theme
    }
});

// Event listener for theme toggle
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

// --- Existing Logic ---

// Event listener for file input
wgConfigFile.addEventListener('change', (event) => {
    uploadedFilesContent = [];
    const files = event.target.files;
    fileListDiv.innerHTML = ''; // Clear previous list
    if (files.length > 0) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedFilesContent.push(e.target.result);
                // Display file name
                const fileNameSpan = document.createElement('span');
                fileNameSpan.textContent = file.name;
                fileNameSpan.className = 'block text-gray-300';
                fileListDiv.appendChild(fileNameSpan);
            };
            reader.readAsText(file);
        });
    } else {
        fileListDiv.textContent = 'هیچ فایلی انتخاب نشده است.';
    }
});

// Event listener for generate button
generateBtn.addEventListener('click', handleGenerate);

/**
 * Displays a message to the user.
 * @param {string} msg - The message to display.
 * @param {'success'|'error'} type - The type of message (success or error).
 */
function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = `message ${type}`;
    messageDiv.classList.remove('hidden');
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 5000); // Hide after 5 seconds
}

/**
 * Parses a single WireGuard configuration string or URI.
 * @param {string} input - The WireGuard config text or URI.
 * @returns {object|null} Parsed WireGuard config object, or null if invalid.
 */
function parseWireGuardConfigBlockOrUri(input) {
    // Try parsing as URI first
    if (input.startsWith('wireguard://')) {
        try {
            const url = new URL(input);
            const privateKey = decodeURIComponent(url.username);
            const server = url.hostname;
            const port = parseInt(url.port, 10);
            const name = decodeURIComponent(url.hash.substring(1)) || "WG Proxy URI"; // Remove '#'

            const params = new URLSearchParams(url.search);
            const address = params.get('address') ? decodeURIComponent(params.get('address')) : '';
            const publickey = params.get('publickey') ? decodeURIComponent(params.get('publickey')) : '';
            const reserved = params.get('reserved') ? decodeURIComponent(params.get('reserved')).split(',').map(Number).filter(n => !isNaN(n)) : [];
            const mtu = params.get('mtu') ? parseInt(params.get('mtu'), 10) : 1420;
            const keepalive = params.get('keepalive') ? parseInt(params.get('keepalive'), 10) : 0; // PersistentKeepalive

            // Split address into IPv4 and IPv6
            const addresses = address.split(',').map(a => a.trim());
            let ipv4 = '';
            let ipv6 = '';
            addresses.forEach(addr => {
                if (addr.includes(':')) { // Likely IPv6
                    ipv6 = addr;
                } else if (addr.includes('.')) { // Likely IPv4
                    ipv4 = addr;
                }
            });

            return {
                name: name,
                privateKey: privateKey,
                address: ipv4.split('/')[0], // Only IP, not CIDR for Mihomo 'ip' field
                ipv6: ipv6.split('/')[0], // Only IP, not CIDR for Mihomo 'ipv6' field
                dns: [], // DNS is not typically in WG URI, or needs to be extracted from other means
                publicKey: publickey,
                server: server,
                port: port,
                allowedIps: ['0.0.0.0/0', '::/0'], // Default for URI, often implied
                mtu: mtu,
                reserved: reserved,
                persistentKeepalive: keepalive,
                amneziaOptions: null // No Amnezia options from URI by default
            };

        } catch (e) {
            console.warn('Invalid WireGuard URI:', input, e);
            return null;
        }
    } else {
        // Existing logic for parsing config block
        const lines = input.split('\n').map(line => line.trim()).filter(line => line !== '');
        const wgConfig = {};
        let currentSection = '';
        let peerName = '';

        for (const line of lines) {
            if (line.startsWith('[Interface]')) {
                currentSection = 'Interface';
            } else if (line.startsWith('[Peer]')) {
                currentSection = 'Peer';
            } else if (line.startsWith('#') && currentSection === 'Peer') {
                const nameMatch = line.match(/#\s*(.+)/);
                if (nameMatch && nameMatch[1]) {
                    peerName = nameMatch[1].trim();
                }
            } else if (line.includes('=')) {
                const [key, value] = line.split('=', 2).map(s => s.trim());
                if (currentSection === 'Interface') {
                    wgConfig[key] = value;
                } else if (currentSection === 'Peer') {
                    wgConfig[key] = value;
                }
            }
        }

        if (!wgConfig.PrivateKey || !wgConfig.Address || !wgConfig.PublicKey || !wgConfig.Endpoint) {
            console.warn('Invalid WireGuard config block:', input);
            return null;
        }

        const [server, port] = wgConfig.Endpoint.split(':');
        const allowedIps = wgConfig.AllowedIPs ? wgConfig.AllowedIPs.split(',').map(ip => ip.trim()) : ['0.0.0.0/0', '::/0'];
        const dns = wgConfig.DNS ? wgConfig.DNS.split(',').map(d => d.trim()) : [];
        const addresses = wgConfig.Address.split(',').map(a => a.trim());
        let ipv4 = '';
        let ipv6 = '';
        addresses.forEach(addr => {
            if (addr.includes(':')) { // Likely IPv6
                ipv6 = addr;
            } else if (addr.includes('.')) { // Likely IPv4
                ipv4 = addr;
            }
        });

        // Extract reserved from config block if present
        let reserved = [];
        if (wgConfig.Reserved) {
            try {
                let reservedStr = wgConfig.Reserved.replace(/[\[\]\s]/g, ''); // Remove brackets and spaces
                reserved = reservedStr.split(',').map(Number).filter(n => !isNaN(n));
            } catch (e) {
                console.warn('Could not parse reserved field:', wgConfig.Reserved, e);
            }
        }

        // Extract AmneziaWG specific options from [Interface]
        const amneziaOptions = {
            jc: wgConfig.Jc ? parseInt(wgConfig.Jc, 10) : undefined,
            jmin: wgConfig.Jmin ? parseInt(wgConfig.Jmin, 10) : undefined,
            jmax: wgConfig.Jmax ? parseInt(wgConfig.Jmax, 10) : undefined,
            s1: wgConfig.S1 ? parseInt(wgConfig.S1, 10) : undefined,
            s2: wgConfig.S2 ? parseInt(wgConfig.S2, 10) : undefined,
            h1: wgConfig.H1 ? parseInt(wgConfig.H1, 10) : undefined,
            h2: wgConfig.H2 ? parseInt(wgConfig.H2, 10) : undefined,
            h3: wgConfig.H3 ? parseInt(wgConfig.H3, 10) : undefined,
            h4: wgConfig.H4 ? parseInt(wgConfig.H4, 10) : undefined,
        };
        // Check if any Amnezia option was actually found
        const hasAmneziaOptions = Object.values(amneziaOptions).some(val => val !== undefined);


        // Generate a user-friendly name
        let name = "WG Proxy"; // Default name
        if (peerName) {
            const parts = peerName.split('#');
            let countryCode = '';
            let index = '';

            if (parts.length > 1) {
                countryCode = parts[0].replace(/-FREE$/, '').toUpperCase();
                index = parts[parts.length - 1];
            } else {
                countryCode = peerName.replace(/-FREE$/, '').toUpperCase();
            }

            const emoji = countryEmojiMap[countryCode] || '';
            if (peerName.includes('-FREE')) {
                name = `${emoji ? emoji + ' ' : ''}${countryCode} ${index}`;
            } else if (peerName.includes('#')) {
                name = `${emoji ? emoji + ' ' : ''}${parts[0]} ${parts[1]}`;
            } else {
                name = `${emoji ? emoji + ' ' : ''}${peerName}`;
            }
        }

        return {
            name: name,
            privateKey: wgConfig.PrivateKey,
            address: ipv4.split('/')[0],
            ipv6: ipv6.split('/')[0],
            dns: dns,
            publicKey: wgConfig.PublicKey,
            server: server,
            port: parseInt(port, 10),
            allowedIps: allowedIps,
            mtu: wgConfig.MTU ? parseInt(wgConfig.MTU, 10) : 1420,
            reserved: reserved,
            persistentKeepalive: wgConfig.PersistentKeepalive ? parseInt(wgConfig.PersistentKeepalive, 10) : 0,
            amneziaOptions: hasAmneziaOptions ? amneziaOptions : null
        };
    }
}

/**
 * Converts a parsed WireGuard config to Mihomo proxy format.
 * @param {object} wgConfig - Parsed WireGuard config object.
 * @param {number} jcUI - Jitter Control value from UI.
 * @param {number} jminUI - Jitter Minimum value from UI.
 * @param {number} jmaxUI - Jitter Maximum value from UI.
 * @param {string} amneziaOption - Selected AmneziaWG option ('use-ui-values', 'use-config-values', 'no-amnezia').
 * @returns {object} Mihomo proxy object.
 */
function convertWgToMihomo(wgConfig, jcUI, jminUI, jmaxUI, amneziaOption) {
    // IMPORTANT: Do NOT manually quote proxyName here.
    // jsyaml.dump will handle quoting for the 'proxies' section.
    // The 'proxyNames' array (used for proxy-groups) will be quoted separately
    // in processTemplateText if needed.
    const mihomoProxy = {
        name: wgConfig.name, // Use the raw, unquoted name from wgConfig
        type: 'wireguard',
        server: wgConfig.server,
        port: wgConfig.port,
        ip: wgConfig.address,
        'private-key': wgConfig.privateKey,
        'public-key': wgConfig.publicKey,
        'allowed-ips': wgConfig.allowedIps,
        udp: true,
        mtu: wgConfig.mtu,
        'remote-dns-resolve': true,
    };

    if (wgConfig.ipv6) {
        mihomoProxy.ipv6 = wgConfig.ipv6;
    }
    if (wgConfig.dns && wgConfig.dns.length > 0) {
        mihomoProxy.dns = wgConfig.dns;
    }
    if (wgConfig.reserved && wgConfig.reserved.length > 0) {
        mihomoProxy.reserved = wgConfig.reserved;
    }
    if (wgConfig.persistentKeepalive) {
        mihomoProxy['persistent-keepalive'] = wgConfig.persistentKeepalive;
    }

    if (amneziaOption === 'use-ui-values') {
        mihomoProxy['amnezia-wg-option'] = {
            jc: jcUI,
            jmin: jminUI,
            jmax: jmaxUI,
            s1: 0,
            s2: 0,
            h1: 1,
            h2: 2,
            h3: 3,
            h4: 4
        };
    } else if (amneziaOption === 'use-config-values' && wgConfig.amneziaOptions) {
        const configAmnezia = wgConfig.amneziaOptions;
        // Only add amnezia-wg-option if at least jc, jmin, jmax are present from config
        if (configAmnezia.jc !== undefined && configAmnezia.jmin !== undefined && configAmnezia.jmax !== undefined) {
            mihomoProxy['amnezia-wg-option'] = {
                jc: configAmnezia.jc,
                jmin: configAmnezia.jmin,
                jmax: configAmnezia.jmax,
                s1: configAmnezia.s1 !== undefined ? configAmnezia.s1 : 0,
                s2: configAmnezia.s2 !== undefined ? configAmnezia.s2 : 0,
                h1: configAmnezia.h1 !== undefined ? configAmnezia.h1 : 1,
                h2: configAmnezia.h2 !== undefined ? configAmnezia.h2 : 2,
                h3: configAmnezia.h3 !== undefined ? configAmnezia.h3 : 3,
                h4: configAmnezia.h4 !== undefined ? configAmnezia.h4 : 4
            };
        } else {
            console.warn('Selected "use-config-values" but config is missing core AmneziaWG options (jc, jmin, jmax). Skipping amnezia-wg-option for this proxy.', wgConfig);
        }
    }
    // If 'no-amnezia' is selected, or 'use-config-values' but no valid config values, amnezia-wg-option is not added.

    return mihomoProxy;
}

/**
 * Processes the template text by replacing placeholders with generated content
 * and ensures problematic strings are quoted.
 * @param {string} templateText - The raw template text.
 * @param {Array<object>} mihomoProxies - Array of generated Mihomo proxy objects.
 * @param {Array<string>} proxyNames - Array of generated proxy names.
 * @returns {string} The final YAML string.
 */
function processTemplateText(templateText, mihomoProxies, proxyNames) {
    let finalYaml = templateText;

    // Convert mihomoProxies array to YAML string with correct indentation
    const proxyListYaml = mihomoProxies.map(proxy => {
        // Dump each proxy object. jsyaml.dump will handle quoting for the 'name' field.
        let dumpedProxy = jsyaml.dump(proxy, { indent: 2, lineWidth: -1 }).trim();
        // Add 2 spaces indentation for each line of the proxy object,
        // then prepend '- ' to the first line and 4 spaces to subsequent lines
        // to align under "proxies:"
        return dumpedProxy.split('\n').map((line, index) => {
            if (index === 0) {
                return `  - ${line}`; // Add '- ' for the first line of each proxy
            }
            return `    ${line}`; // Add 4 spaces for subsequent lines
        }).join('\n');
    }).join('\n'); // Join individual proxy YAML blocks with a newline

    // Ensure proxy names in proxy groups are quoted if they contain spaces or emojis
    // This logic is specifically for the proxy-groups section where names are directly listed.
    const quotedProxyNames = proxyNames.map(name => {
        // Regex to check for spaces, emojis, or specific problematic keywords like 'true', 'false', 'on', 'off', 'null'
        // Ensure it doesn't double quote if already quoted (though proxyNames should be unquoted here now)
        const needsQuotes = name.includes(' ') ||
                            /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/u.test(name) || // Basic emoji ranges
                            /[\u0600-\u06FF]/.test(name) || // Persian characters
                            ['true', 'false', 'on', 'off', 'yes', 'no', 'null'].includes(name.toLowerCase().trim()); // Problematic keywords, trim name before check
        return needsQuotes ? `"${name}"` : name;
    });
    const proxyNamesListYaml = quotedProxyNames.map(name => `      - ${name}`).join('\n'); // 6 spaces for indentation

    // Replace PROXIES placeholder
    finalYaml = finalYaml.replace(/##_PROXIES_PLACEHOLDER_##/g, proxyListYaml);

    // Replace PROXY_NAMES_LIST placeholder
    finalYaml = finalYaml.replace(/##_PROXY_NAMES_LIST_PLACEHOLDER_##/g, proxyNamesListYaml);


    // Apply general quoting fixes to the entire generated YAML (important for dns, url, etc.)
    finalYaml = finalYaml.replace(/(\s*-\s*)(['"]?)(time\.\*\.com|ntp\.\*\.com)(\2)(\s*)/g, (match, indent, quote, domain, endQuote, trailingSpace) => {
        return `${indent}'${domain}'${trailingSpace}`;
    });
    finalYaml = finalYaml.replace(/(\s*-\s*)(['"]?)(any:53|tcp:\/\/any:53)(\2)(\s*)/g, (match, indent, quote, value, endQuote, trailingSpace) => {
        return `${indent}'${value}'${trailingSpace}`;
    });
    // This regex ensures IPs are quoted, but be careful not to double quote already quoted strings.
    finalYaml = finalYaml.replace(/(\s*-\s*)(?!['"])((\d{1,3}\.){3}\d{1,3}|\[?[\da-fA-F:]+\]?)(?=\s*$|\s*#)/gm, (match, indent, ip) => {
        return `${indent}'${ip}'`;
    });
    finalYaml = finalYaml.replace(/((?:\s*-\s*)|(?:url:\s*))(['"]?)(https?:\/\/[^\s]+|tls:\/\/[^\s]+)(\2)(\s*)/g, (match, prefix, quote, url, endQuote, trailingSpace) => {
        return `${prefix}'${url}'${trailingSpace}`;
    });

    // Ensure group names with emojis or special characters are quoted, if not already.
    // This targets only the "name:" key directly, to avoid accidental quoting of other values.
    finalYaml = finalYaml.replace(/(name: )([\p{L}\p{N}\p{S}\p{P}\s]+)/gu, (match, prefix, name) => {
        if (!name.startsWith('"') && !name.endsWith('"')) { // Only add quotes if not already quoted (both start and end)
            // Check for spaces, emojis, or specific problematic keywords like 'true', 'false', 'on', 'off', 'null'
            const hasSpecialChars = name.includes(' ') ||
                                    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/u.test(name) || // Basic emoji ranges
                                    /[\u0600-\u06FF]/.test(name) || // Persian characters
                                    ['true', 'false', 'on', 'off', 'yes', 'no', 'null'].includes(name.toLowerCase().trim()); // Problematic keywords, trim name before check
            if (hasSpecialChars) {
                return `${prefix}"${name.trim()}"`;
            }
        }
        return match; // Return original if already quoted or no special characters
    });


    return finalYaml;
}


/**
 * Main function to handle generation and download.
 */
async function handleGenerate() {
    const jc = parseInt(jcInput.value, 10);
    const jmin = parseInt(jminInput.value, 10);
    const jmax = parseInt(jmaxInput.value, 10);
    const amneziaOption = amneziaOptionSelect.value;
    let outputFileName = outputFileNameInput.value.trim();

    // Automatically add .yaml extension if not present
    if (!outputFileName.endsWith('.yaml') && !outputFileName.endsWith('.yml')) {
        outputFileName += '.yaml';
    }

    const selectedTemplateKey = templateSelect.value;
    
    // Dynamically fetch the selected template content as raw text
    const templatePath = `./config-templates/${selectedTemplateKey}.yaml`; // Still .yaml extension for file type, but we treat it as text
    let baseTemplateContent;
    try {
        const response = await fetch(templatePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        baseTemplateContent = await response.text(); // Read as plain text
    } catch (error) {
        console.error('Error fetching template:', error);
        showMessage(`خطا در بارگذاری تمپلت: ${error.message}`, 'error');
        return;
    }

    if (!baseTemplateContent) {
        showMessage('تمپلت قوانین انتخاب شده یافت نشد.', 'error');
        return;
    }

    if (amneziaOption === 'use-ui-values' && (isNaN(jc) || isNaN(jmin) || isNaN(jmax))) {
        showMessage('لطفاً مقادیر jc، jmin و jmax را به درستی وارد کنید، زیرا گزینه "استفاده از مقادیر وارد شده" انتخاب شده است.', 'error');
        return;
    }

    let allWgConfigs = [];
    const textAreaContent = wgConfigInput.value.trim();
    const uploadedFiles = uploadedFilesContent;

    // Process all input (textarea and uploaded files) as raw WireGuard configs/URIs
    const processRawBlocks = (content) => {
        if (!content.trim()) return;

        const blocks = content.split(/(?=\[Interface\])|(?=wireguard:\/\/)/g).filter(block => block.trim() !== '');
        blocks.forEach(block => {
            const parsed = parseWireGuardConfigBlockOrUri(block.trim());
            if (parsed) {
                allWgConfigs.push(parsed);
            }
        });
    };

    if (textAreaContent) {
        processRawBlocks(textAreaContent);
    }
    for (const fileContent of uploadedFiles) {
        processRawBlocks(fileContent);
    }

    if (allWgConfigs.length === 0) {
        showMessage('هیچ کانفیگ WireGuard معتبری یافت نشد. لطفاً ورودی را بررسی کنید.', 'error');
        return;
    }

    // Ensure unique names for proxies
    const usedNames = new Set();
    allWgConfigs.forEach((config, index) => {
        let baseName = config.name.trim();
        if (!baseName || baseName.toLowerCase().includes('wg proxy') || baseName.toLowerCase().includes('wireguard')) {
            if (config.server) {
                baseName = `WG-${config.server.replace(/\./g, '-')}`;
            } else {
                baseName = "WG Proxy";
            }
        }

        let currentName = baseName;
        let counter = 1;
        while (usedNames.has(currentName)) {
            currentName = `${baseName}-${counter}`;
            counter++;
        }
        config.name = currentName;
        usedNames.add(currentName);
    });

    const mihomoProxies = [];
    const proxyNames = [];

    allWgConfigs.forEach(wgConfig => {
        const mihomoProxy = convertWgToMihomo(wgConfig, jc, jmin, jmax, amneziaOption);
        mihomoProxies.push(mihomoProxy);
        proxyNames.push(mihomoProxy.name); // Push the raw, unquoted name here
    });

    try {
        // Process the template text by replacing placeholders
        const finalYamlContent = processTemplateText(baseTemplateContent, mihomoProxies, proxyNames);

        downloadFile(outputFileName, finalYamlContent);
        showMessage('فایل کانفیگ با موفقیت تولید و دانلود شد!', 'success');
    } catch (error) {
        console.error('Error generating YAML:', error);
        showMessage('خطا در تولید فایل YAML: ' + error.message, 'error');
    }
}

/**
 * Downloads a file with the given content.
 * @param {string} filename - The name of the file to download.
 * @param {string} content - The content of the file.
 */
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/yaml;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) { // Feature detection
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } else {
        // Fallback for older browsers
        window.open('data:text/yaml;charset=utf-8,' + encodeURIComponent(content));
    }
}
