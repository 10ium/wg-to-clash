// ===================================================================
// script.js
// ===================================================================

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

// -----------------------------------------------
// DOM elements
// -----------------------------------------------
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
const themeToggle = document.getElementById('themeToggle');

let uploadedFilesContent = [];

// -----------------------------------------------
// Theme management (unchanged)
// -----------------------------------------------
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.checked = (theme === 'dark');
}
function autoSetThemeByTehranTime() {
    const now = new Date();
    const tehranTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric', hourCycle: 'h23', timeZone: 'Asia/Tehran'
    }).format(now);
    const hour = parseInt(tehranTime, 10);
    if (hour >= 6 && hour < 18) setTheme('light');
    else setTheme('dark');
}
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
    else autoSetThemeByTehranTime();
});
themeToggle.addEventListener('change', () => {
    setTheme(themeToggle.checked ? 'dark' : 'light');
});

// -----------------------------------------------
// File input handling (unchanged)
// -----------------------------------------------
wgConfigFile.addEventListener('change', (event) => {
    uploadedFilesContent = [];
    const files = event.target.files;
    fileListDiv.innerHTML = '';
    if (files.length > 0) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedFilesContent.push(e.target.result);
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

// -----------------------------------------------
// Utility functions (unchanged)
// -----------------------------------------------
function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = `message ${type}`;
    messageDiv.classList.remove('hidden');
    setTimeout(() => messageDiv.classList.add('hidden'), 5000);
}

// -----------------------------------------------
// WireGuard config parsing (unchanged)
// -----------------------------------------------
function parseWireGuardConfigBlockOrUri(input) {
    if (input.startsWith('wireguard://')) {
        try {
            const url = new URL(input);
            const privateKey = decodeURIComponent(url.username);
            const server = url.hostname;
            const port = parseInt(url.port, 10);
            const name = decodeURIComponent(url.hash.substring(1)) || "WG Proxy URI";
            const params = new URLSearchParams(url.search);
            const address = params.get('address') ? decodeURIComponent(params.get('address')) : '';
            const publickey = params.get('publickey') ? decodeURIComponent(params.get('publickey')) : '';
            const reserved = params.get('reserved')
                ? decodeURIComponent(params.get('reserved')).split(',').map(Number).filter(n => !isNaN(n))
                : [];
            const mtu = params.get('mtu') ? parseInt(params.get('mtu'), 10) : 1420;
            const keepalive = params.get('keepalive') ? parseInt(params.get('keepalive'), 10) : 0;

            const addresses = address.split(',').map(a => a.trim());
            let ipv4 = '', ipv6 = '';
            addresses.forEach(addr => {
                if (addr.includes(':')) ipv6 = addr;
                else if (addr.includes('.')) ipv4 = addr;
            });

            return {
                name,
                privateKey,
                address: ipv4.split('/')[0],
                ipv6: ipv6.split('/')[0],
                dns: [],
                publicKey: publickey,
                server,
                port,
                allowedIps: ['0.0.0.0/0', '::/0'],
                mtu,
                reserved,
                persistentKeepalive: keepalive,
                amneziaOptions: null
            };
        } catch (e) {
            console.warn('Invalid WireGuard URI:', input, e);
            return null;
        }
    } else {
        const lines = input.split('\n').map(l => l.trim()).filter(l => l);
        const wgConfig = {};
        let currentSection = '', peerName = '';
        for (const line of lines) {
            if (line.startsWith('[Interface]')) currentSection = 'Interface';
            else if (line.startsWith('[Peer]')) currentSection = 'Peer';
            else if (line.startsWith('#') && currentSection === 'Peer') {
                const m = line.match(/#\s*(.+)/);
                if (m && m[1]) peerName = m[1].trim();
            } else if (line.includes('=')) {
                const [k, v] = line.split('=', 2).map(s => s.trim());
                wgConfig[k] = v;
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
        let ipv4 = '', ipv6 = '';
        addresses.forEach(addr => {
            if (addr.includes(':')) ipv6 = addr;
            else if (addr.includes('.')) ipv4 = addr;
        });
        let reserved = [];
        if (wgConfig.Reserved) {
            try {
                reserved = wgConfig.Reserved.replace(/[\[\]\s]/g, '')
                    .split(',')
                    .map(Number)
                    .filter(n => !isNaN(n));
            } catch (e) {
                console.warn('Could not parse reserved field:', wgConfig.Reserved, e);
            }
        }
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
        const hasAmneziaOptions = Object.values(amneziaOptions).some(v => v !== undefined);
        let name = "WG Proxy";
        if (peerName) {
            let countryCode = '', identifier = '';
            const hashMatch = peerName.match(/^([A-Z]{2})(?:-FREE)?#(.+)$/i);
            const hyphenMatch = peerName.match(/^([A-Z]{2})(?:-FREE)?-(.+)$/i);
            const simple = peerName.match(/^([A-Z]{2})(?:-FREE)?$/i);
            if (hashMatch) { countryCode = hashMatch[1].toUpperCase(); identifier = hashMatch[2].trim(); }
            else if (hyphenMatch) { countryCode = hyphenMatch[1].toUpperCase(); identifier = hyphenMatch[2].trim(); }
            else if (simple) { countryCode = simple[1].toUpperCase(); identifier = ''; }
            else { name = peerName.trim().replace(/\s+/g, '-'); }
            const emoji = countryEmojiMap[countryCode] || '';
            if (identifier) name = `${emoji ? emoji + ' ' : ''}${countryCode}-${identifier}`;
            else name = `${emoji ? emoji + ' ' : ''}${countryCode}`;
        }
        name = name.trim();
        return {
            name,
            privateKey: wgConfig.PrivateKey,
            address: ipv4.split('/')[0],
            ipv6: ipv6.split('/')[0],
            dns,
            publicKey: wgConfig.PublicKey,
            server,
            port: parseInt(port, 10),
            allowedIps,
            mtu: wgConfig.MTU ? parseInt(wgConfig.MTU, 10) : 1420,
            reserved,
            persistentKeepalive: wgConfig.PersistentKeepalive ? parseInt(wgConfig.PersistentKeepalive, 10) : 0,
            amneziaOptions: hasAmneziaOptions ? amneziaOptions : null
        };
    }
}

// -----------------------------------------------
// Conversion to Mihomo proxy object (unchanged)
// -----------------------------------------------
function convertWgToMihomo(wgConfig, jcUI, jminUI, jmaxUI, amneziaOption) {
    const mihomoProxy = {
        name: wgConfig.name,
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
    if (wgConfig.ipv6) mihomoProxy.ipv6 = wgConfig.ipv6;
    if (wgConfig.dns?.length) mihomoProxy.dns = wgConfig.dns;
    if (wgConfig.reserved?.length) mihomoProxy.reserved = wgConfig.reserved;
    if (wgConfig.persistentKeepalive) mihomoProxy['persistent-keepalive'] = wgConfig.persistentKeepalive;

    if (amneziaOption === 'use-ui-values') {
        mihomoProxy['amnezia-wg-option'] = {
            jc: jcUI, jmin: jminUI, jmax: jmaxUI,
            s1: 0, s2: 0, h1: 1, h2: 2, h3: 3, h4: 4
        };
    } else if (amneziaOption === 'use-config-values' && wgConfig.amneziaOptions) {
        const c = wgConfig.amneziaOptions;
        if (c.jc !== undefined && c.jmin !== undefined && c.jmax !== undefined) {
            mihomoProxy['amnezia-wg-option'] = {
                jc: c.jc, jmin: c.jmin, jmax: c.jmax,
                s1: c.s1 ?? 0, s2: c.s2 ?? 0,
                h1: c.h1 ?? 1, h2: c.h2 ?? 2, h3: c.h3 ?? 3, h4: c.h4 ?? 4
            };
        }
    }
    return mihomoProxy;
}

// =========================================================
// اصلاح اصلی: یکنواخت‌سازی نام پروکسی‌ها
// =========================================================
function processTemplateText(templateText, mihomoProxies) {
    const proxyBlocks = [];
    const proxyNames   = [];

    mihomoProxies.forEach(proxy => {
        let yamlFrag = jsyaml.dump(proxy, {
            indent: 2,
            lineWidth: -1,
            flowLevel: 2,
            noCompatMode: true
        }).trim();

        yamlFrag = yamlFrag
            .replace(/^(private-key|public-key):\s*(['"]?)([A-Za-z0-9+/=]+)(['"]?)$/gm,
                (m, key, q1, val, q2) => {
                    if (!val.endsWith('=') && /^[A-Za-z0-9+/]*={0,2}$/.test(val)) val += '=';
                    return `${key}: '${val}'`;
                });

        const block = yamlFrag.split('\n')
            .map((l, i) => (i === 0 ? `  - ${l}` : `    ${l}`))
            .join('\n');

        proxyBlocks.push(block);

        const nameMatch = yamlFrag.match(/^name:\s*(.*)$/m);
        proxyNames.push(nameMatch ? nameMatch[1] : `"${proxy.name}"`);
    });

    const proxyNameListYaml = proxyNames.map(n => `      - ${n}`).join('\n');

    let finalYaml = templateText
        .replace(/##_PROXIES_PLACEHOLDER_##/g,   proxyBlocks.join('\n'))
        .replace(/##_PROXY_NAMES_LIST_PLACEHOLDER_##/g, proxyNameListYaml);

    // پاک‌سازی iconهای <url …>
    finalYaml = finalYaml.replace(/icon:\s*<url[^>]*>([^<]*)<\/url>/g, 'icon: $1');
    return finalYaml;
}

// -----------------------------------------------
// Main generator handler (unchanged)
// -----------------------------------------------
async function handleGenerate() {
    const jc = parseInt(jcInput.value, 10);
    const jmin = parseInt(jminInput.value, 10);
    const jmax = parseInt(jmaxInput.value, 10);
    const amneziaOption = amneziaOptionSelect.value;
    let outputFileName = outputFileNameInput.value.trim();
    if (!outputFileName.endsWith('.yaml') && !outputFileName.endsWith('.yml')) outputFileName += '.yaml';

    const selectedTemplateKey = templateSelect.value;
    const templatePath = `./config-templates/${selectedTemplateKey}.yaml`;
    let baseTemplateContent;
    try {
        const response = await fetch(templatePath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        baseTemplateContent = await response.text();
    } catch (error) {
        console.error('Error fetching template:', error);
        showMessage(`خطا در بارگذاری تمپلت: ${error.message}`, 'error');
        return;
    }
    if (!baseTemplateContent) { showMessage('تمپلت قوانین انتخاب شده یافت نشد.', 'error'); return; }

    if (amneziaOption === 'use-ui-values' && (isNaN(jc) || isNaN(jmin) || isNaN(jmax))) {
        showMessage('لطفاً مقادیر jc، jmin و jmax را به درستی وارد کنید…', 'error');
        return;
    }

    let allWgConfigs = [];
    const textAreaContent = wgConfigInput.value.trim();
    const processRawBlocks = (content) => {
        if (!content.trim()) return;
        const blocks = content.split(/(?=\[Interface\])|(?=wireguard:\/\/)/g).filter(b => b.trim());
        blocks.forEach(b => {
            const parsed = parseWireGuardConfigBlockOrUri(b.trim());
            if (parsed) allWgConfigs.push(parsed);
        });
    };
    if (textAreaContent) processRawBlocks(textAreaContent);
    uploadedFilesContent.forEach(fc => processRawBlocks(fc));

    if (allWgConfigs.length === 0) {
        showMessage('هیچ کانفیگ WireGuard معتبری یافت نشد.', 'error');
        return;
    }

    // unique names
    const usedNames = new Set();
    allWgConfigs.forEach(cfg => {
        let base = cfg.name.trim();
        if (!base || base.toLowerCase().includes('wg proxy')) {
            base = cfg.server ? `WG-${cfg.server.replace(/\./g, '-')}` : 'WG-Proxy';
        }
        let cur = base, cnt = 1;
        while (usedNames.has(cur)) cur = `${base}-${cnt++}`;
        cfg.name = cur;
        usedNames.add(cur);
    });

    const mihomoProxies = allWgConfigs.map(c => convertWgToMihomo(c, jc, jmin, jmax, amneziaOption));
    try {
        const finalYaml = processTemplateText(baseTemplateContent, mihomoProxies);
        downloadFile(outputFileName, finalYaml);
        showMessage('فایل کانفیگ با موفقیت تولید و دانلود شد!', 'success');
    } catch (e) {
        console.error(e);
        showMessage('خطا در تولید YAML: ' + e.message, 'error');
    }
}
/**
 * Downloads a file with the given content.
 * @param {string} filename - The name of the file to download.
 * @param {string} content - The content of the file.
 */
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'application/yaml;charset=utf-8;' }); // تغییر نوع MIME
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
        // استفاده از data URI scheme و encodeURIComponent
        window.open('data:application/yaml;charset=utf-8,' + encodeURIComponent(content));
    }
}