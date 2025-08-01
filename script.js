// ===================================================================
// script.js - Final Version with Multi-Format Parsing & All Features
// ===================================================================

// --- Country Code to Emoji Mapping ---
const countryEmojiMap = { "US": "🇺🇸", "DE": "🇩🇪", "NL": "🇳🇱", "CA": "🇨🇦", "GB": "🇬🇧", "FR": "🇫🇷", "AU": "🇦🇺", "JP": "🇯🇵", "SG": "🇸🇬", "SE": "🇸🇪", "CH": "🇨🇭", "FI": "🇫🇮", "NO": "🇳🇴", "DK": "🇩🇰", "BE": "🇧🇪", "AT": "🇦🇹", "ES": "🇪🇸", "IT": "🇮🇹", "PL": "🇵🇱", "CZ": "🇨🇿", "IE": "🇮🇪", "NZ": "🇳🇿", "KR": "🇰🇷", "HK": "🇭🇰", "TW": "🇹🇼", "IN": "🇮🇳", "BR": "🇧🇷", "MX": "🇲🇽", "ZA": "🇿🇦", "AE": "🇦🇪", "TR": "🇹🇷", "RU": "🇷🇺", "CN": "🇨🇳", "IR": "🇮🇷", "RO": "🇷🇴", "AF": "🇦🇫", "AL": "🇦🇱", "DZ": "🇩🇿", "AS": "🇦🇸", "AD": "🇦🇩", "AO": "🇦🇴", "AI": "🇦🇮", "AQ": "🇦🇶", "AG": "🇦🇬", "AR": "🇦🇷", "AM": "🇦🇲", "AW": "🇦🇼", "AZ": "🇦🇿", "BS": "🇧🇸", "BH": "🇧🇭", "BD": "🇧🇩", "BB": "🇧🇧", "BY": "🇧🇾", "BZ": "🇧🇿", "BJ": "🇧🇯", "BM": "🇧🇲", "BT": "🇧🇹", "BO": "🇧🇴", "BA": "🇧🇦", "BW": "🇧🇼", "BV": "🇧🇻", "IO": "🇮🇴", "BN": "🇧🇳", "BG": "🇧🇬", "BF": "🇧🇫", "BI": "🇧🇮", "KH": "🇰🇭", "CM": "🇨🇲", "CV": "🇨🇻", "KY": "🇰🇾", "CF": "🇨🇫", "TD": "🇹🇩", "CL": "🇨🇱", "CX": "🇨🇽", "CC": "🇨🇨", "CO": "🇨🇴", "KM": "🇰🇲", "CG": "🇨🇬", "CD": "🇨🇩", "CK": "🇨🇰", "CR": "🇨🇷", "CI": "🇨🇮", "HR": "🇭🇷", "CU": "🇨🇺", "CY": "🇨🇾", "DJ": "🇩🇯", "DM": "🇩🇲", "DO": "🇩🇴", "EC": "🇪🇨", "EG": "🇪🇬", "SV": "🇸🇻", "GQ": "🇬🇶", "ER": "🇪🇷", "EE": "🇪🇪", "ET": "🇪🇹", "FK": "🇫🇰", "FO": "🇫🇴", "FJ": "🇫🇯", "GF": "🇬🇫", "PF": "🇵🇫", "TF": "🇹🇫", "GA": "🇬🇦", "GM": "🇬🇲", "GE": "🇬🇪", "GH": "🇬🇭", "GI": "🇬🇮", "GR": "🇬🇷", "GL": "🇬🇱", "GD": "🇬🇩", "GP": "🇬🇵", "GU": "🇬🇺", "GT": "🇬🇹", "GN": "🇬🇳", "GW": "🇬🇼", "GY": "🇬🇾", "HT": "🇭🇹", "HM": "🇭🇲", "HN": "🇭🇳", "HU": "🇭🇺", "IS": "🇮🇸", "ID": "🇮🇩", "IQ": "🇮🇶", "IL": "🇮🇱", "JM": "🇯🇲", "JO": "🇯🇴", "KZ": "🇰🇿", "KE": "🇰🇪", "KI": "🇰🇮", "KP": "🇰🇵", "KW": "🇰🇼", "KG": "🇰🇬", "LA": "🇱🇦", "LV": "🇱🇻", "LB": "🇱🇧", "LS": "🇱🇸", "LR": "🇱🇷", "LY": "🇱🇾", "LI": "🇱🇮", "LT": "🇱🇹", "LU": "🇱🇺", "MO": "🇲🇴", "MK": "🇲🇰", "MG": "🇲🇬", "MW": "🇲🇼", "MY": "🇲🇾", "MV": "🇲🇻", "ML": "🇲🇱", "MT": "🇲🇹", "MH": "🇲🇭", "MQ": "🇲🇶", "MR": "🇲🇷", "MU": "🇲🇺", "YT": "🇾🇹", "FM": "🇫🇲", "MD": "🇲🇩", "MC": "🇲🇨", "MN": "🇲🇳", "MS": "🇲🇸", "MA": "🇲🇦", "MZ": "🇲🇿", "MM": "🇲🇲", "NA": "🇳🇦", "NR": "🇳🇷", "NP": "🇳🇵", "NC": "🇳🇨", "NI": "🇳🇮", "NE": "🇳🇪", "NG": "🇳🇬", "NU": "🇳🇺", "NF": "🇳🇫", "MP": "🇲🇵", "OM": "🇴🇲", "PK": "🇵🇰", "PW": "🇵🇼", "PS": "🇵🇸", "PA": "🇵🇦", "PG": "🇵🇬", "PY": "🇵🇾", "PE": "🇵🇪", "PH": "🇵🇭", "PN": "🇵🇳", "PT": "🇵🇹", "PR": "🇵🇷", "QA": "🇶🇦", "RE": "🇷🇪", "RW": "🇷🇼", "SH": "🇸🇭", "KN": "🇰🇳", "LC": "🇱🇨", "PM": "🇵🇲", "VC": "🇻🇨", "WS": "🇼🇸", "SM": "🇸🇲", "ST": "🇸🇹", "SA": "🇸🇦", "SN": "🇸🇳", "RS": "🇷🇸", "SC": "🇸🇨", "SL": "🇸🇱", "SK": "🇸🇰", "SI": "🇸🇮", "SB": "🇸🇧", "SO": "🇸🇴", "GS": "🇬🇸", "SS": "🇸🇸", "LK": "🇱🇰", "SD": "🇸🇩", "SR": "🇸🇷", "SJ": "🇸🇯", "SZ": "🇸🇿", "SY": "🇸🇾", "TJ": "🇹🇯", "TZ": "🇹🇿", "TH": "🇹🇭", "TL": "🇹🇱", "TG": "🇹🇬", "TK": "🇹🇰", "TO": "🇹🇴", "TT": "🇹🇹", "TN": "🇹🇳", "TM": "🇹🇲", "TC": "🇹🇨", "TV": "🇹🇻", "UG": "🇺🇬", "UA": "🇺🇦", "UM": "🇺🇲", "UY": "🇺🇾", "UZ": "🇺🇿", "VU": "🇻🇺", "VE": "🇻🇪", "VN": "🇻🇳", "VG": "🇻🇬", "VI": "🇻🇮", "WF": "🇼🇫", "EH": "🇪🇭", "YE": "🇾🇪", "ZM": "🇿🇲", "ZW": "🇿🇼"};

// --- DOM Elements ---
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
const errorDetailsContainer = document.getElementById('errorDetailsContainer');
const errorList = document.getElementById('errorList');

let uploadedFilesContent = [];

// --- Theme Management ---
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.checked = (theme === 'dark');
}
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme || 'dark');
});
themeToggle.addEventListener('change', () => {
    setTheme(themeToggle.checked ? 'dark' : 'light');
});

// --- File Input Handling ---
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
                fileNameSpan.className = 'block';
                fileListDiv.appendChild(fileNameSpan);
            };
            reader.readAsText(file);
        });
    }
});

// --- UI Messaging Functions ---
function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = `message ${type}`;
    messageDiv.classList.remove('hidden');
}

function displayErrorDetails(errors) {
    errorList.innerHTML = '';
    if (errors.length === 0) {
        errorDetailsContainer.classList.add('hidden');
        return;
    }
    errors.forEach(err => {
        const li = document.createElement('li');
        const sourceNode = document.createElement('code');
        sourceNode.textContent = ` (منبع: ${err.source.substring(0, 70)}...)`;
        sourceNode.className = "text-yellow-400 opacity-80 ml-2";
        li.textContent = err.reason;
        li.appendChild(sourceNode);
        errorList.appendChild(li);
    });
    errorDetailsContainer.classList.remove('hidden');
}

// --- Subscription Link Fetcher ---
async function fetchSubscriptionContents(urls) {
    const promises = urls.map(url =>
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`خطای ${response.status}`);
                return response.text();
            })
            .catch(error => ({ 
                error: true, 
                reason: `دانلود لینک اشتراک ناموفق بود (${error.message})`,
                source: url 
            }))
    );
    return Promise.all(promises);
}

// --- Mihomo/Clash Config Extractor ---
function extractProxiesFromMihomo(configObject) {
    const proxies = configObject.proxies || configObject.outbounds || [];
    return proxies
        .filter(p => p.type && p.type.toLowerCase() === 'wireguard')
        .map(p => {
            const localAddress = Array.isArray(p.local_address) ? p.local_address.join(',') : p.ip;
            const amneziaOptions = p['amnezia-wg-option'] ? {
                jc: p['amnezia-wg-option'].jc,
                jmin: p['amnezia-wg-option'].jmin,
                jmax: p['amnezia-wg-option'].jmax,
            } : null;

            // Map Mihomo fields to our internal standard format
            const mappedConfig = {
                name: p.name || null,
                privateKey: p.private_key || null,
                publicKey: p.public_key || p.peer_public_key || null,
                server: p.server || null,
                port: p.port || p.server_port || null,
                address: localAddress || '172.16.0.2/32',
                mtu: p.mtu || 1420,
                allowedIps: p.allowed_ips || ['0.0.0.0/0', '::/0'],
                dns: p.dns || [],
                amneziaOptionsFromConfig: amneziaOptions,
            };
            return validateAndComplete(mappedConfig, JSON.stringify(p));
        });
}

// --- Standard WireGuard Config Parser ---
function parseWireGuardConfig(inputBlock) {
    let rawConfig = {};
    let peerComment = '';
    
    try {
        if (inputBlock.startsWith('wireguard://')) {
            const url = new URL(inputBlock);
            const params = new URLSearchParams(url.search);
            rawConfig = {
                privateKey: decodeURIComponent(url.username) || null,
                server: url.hostname || null,
                port: url.port ? parseInt(url.port, 10) : null,
                publicKey: params.get('publickey') ? decodeURIComponent(params.get('publickey')) : null,
                address: params.get('address'),
                mtu: params.get('mtu') ? parseInt(params.get('mtu'), 10) : null,
                name: decodeURIComponent(url.hash.substring(1)) || null,
            };
        } else {
            const lines = inputBlock.split('\n').map(l => l.trim());
            const interfaceSection = {};
            const peerSection = {};
            let currentSection = '';

            lines.forEach(line => {
                if (line.startsWith('#')) {
                    if (!peerComment) peerComment = line.substring(1).trim();
                } else {
                    const lowerLine = line.toLowerCase();
                    if (lowerLine.startsWith('[interface]')) currentSection = 'Interface';
                    else if (lowerLine.startsWith('[peer]')) currentSection = 'Peer';
                    else if (line.includes('=')) {
                        const [key, value] = line.split('=', 2).map(s => s.trim());
                        if (currentSection === 'Interface') interfaceSection[key.toLowerCase()] = value;
                        else if (currentSection === 'Peer') peerSection[key.toLowerCase()] = value;
                    }
                }
            });

            const [server, port] = (peerSection.endpoint || '').split(':');
            const amneziaOptions = (interfaceSection.jc && interfaceSection.jmin && interfaceSection.jmax) ? {
                jc: parseInt(interfaceSection.jc, 10),
                jmin: parseInt(interfaceSection.jmin, 10),
                jmax: parseInt(interfaceSection.jmax, 10),
            } : null;

            rawConfig = {
                privateKey: interfaceSection.privatekey || null,
                publicKey: peerSection.publickey || null,
                server: server || null,
                port: port ? parseInt(port, 10) : null,
                address: interfaceSection.address,
                mtu: interfaceSection.mtu ? parseInt(interfaceSection.mtu, 10) : null,
                dns: (interfaceSection.dns || '').split(',').map(d => d.trim()).filter(Boolean),
                allowedIps: peerSection.allowedips ? peerSection.allowedips.split(',').map(ip => ip.trim()).filter(Boolean) : null,
                name: peerComment || null,
                amneziaOptionsFromConfig: amneziaOptions,
            };
        }
    } catch (e) {
        return { error: true, reason: 'ساختار کلی کانفیگ نامعتبر است', source: inputBlock };
    }
    
    return validateAndComplete(rawConfig, inputBlock);
}

// --- Validator and Completer ---
function validateAndComplete(config, source) {
    const essentials = ['privateKey', 'publicKey', 'server', 'port'];
    for (const key of essentials) {
        if (!config[key] || (typeof config[key] === 'string' && config[key].trim() === '')) {
            return { error: true, reason: `مقدار ضروری "${key}" یافت نشد.`, source: source };
        }
    }
    
    // Set defaults for optional fields if they are missing
    config.address = config.address || '172.16.0.2/32';
    config.mtu = config.mtu || 1420;
    config.allowedIps = config.allowedIps || ['0.0.0.0/0', '::/0'];

    if (config.name) {
        let countryCode = '', identifier = '';
        const nameMatch = config.name.match(/^([A-Z]{2})[#\s-](.*)$/i);
        if (nameMatch) {
            countryCode = nameMatch[1].toUpperCase();
            identifier = nameMatch[2].trim();
        } else {
            identifier = config.name;
        }
        const emoji = countryEmojiMap[countryCode] || '';
        config.name = `${emoji} ${countryCode} ${identifier}`.trim().replace(/\s+/g, ' ');
    } else {
        config.name = `WG-${config.server.replace(/[.:]/g, '-')}`;
    }

    const addresses = config.address.split(',').map(a => a.trim());
    config.ip = addresses.find(addr => addr.includes('.'))?.split('/')[0] || '';
    config.ipv6 = addresses.find(addr => addr.includes(':'))?.split('/')[0] || '';
    
    return config;
}

// --- Mihomo Conversion ---
function convertWgToMihomo(wgConfig, jcUI, jminUI, jmaxUI, amneziaOption) {
    const mihomoProxy = {
        name: wgConfig.name,
        type: 'wireguard',
        server: wgConfig.server,
        port: wgConfig.port,
        ip: wgConfig.ip,
        'private-key': wgConfig.privateKey,
        'public-key': wgConfig.publicKey,
        'allowed-ips': wgConfig.allowedIps,
        udp: true,
        mtu: wgConfig.mtu,
    };
    if (wgConfig.ipv6) mihomoProxy.ipv6 = wgConfig.ipv6;
    if (wgConfig.dns?.length > 0) mihomoProxy.dns = wgConfig.dns;
    
    if (amneziaOption === 'use-config-values' && wgConfig.amneziaOptionsFromConfig) {
        mihomoProxy['amnezia-wg-option'] = wgConfig.amneziaOptionsFromConfig;
    } else if (amneziaOption === 'use-ui-values') {
        mihomoProxy['amnezia-wg-option'] = { jc: jcUI, jmin: jminUI, jmax: jmaxUI, s1: 0, s2: 0, h1: 1, h2: 2, h3: 3, h4: 4 };
    }
    
    return mihomoProxy;
}

// --- Template Processing ---
function processTemplateText(templateText, mihomoProxies) {
    const proxyBlocks = mihomoProxies.map(proxy => {
        let yamlFrag = jsyaml.dump(proxy, { indent: 4, flowLevel: 2, noCompatMode: true });
        return `  - ${yamlFrag.replace(/\n/g, '\n    ').trim()}`;
    }).join('\n');
    const proxyNameListYaml = mihomoProxies.map(p => `      - "${p.name}"`).join('\n');
    return templateText
        .replace(/##_PROXIES_PLACEHOLDER_##/g, proxyBlocks)
        .replace(/##_PROXY_NAMES_LIST_PLACEHOLDER_##/g, proxyNameListYaml);
}

// --- Download Helper ---
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'application/x-yaml; charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// --- Main Generator Handler ---
generateBtn.addEventListener('click', async function handleGenerate() {
    messageDiv.classList.add('hidden');
    displayErrorDetails([]);

    const jc = parseInt(jcInput.value, 10);
    const jmin = parseInt(jminInput.value, 10);
    const jmax = parseInt(jmaxInput.value, 10);
    const amneziaOption = amneziaOptionSelect.value;
    let outputFileName = outputFileNameInput.value.trim() + '.yaml';

    let baseTemplateContent;
    try {
        const response = await fetch(`./config-templates/${templateSelect.value}.yaml`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        baseTemplateContent = await response.text();
    } catch (error) {
        showMessage(`خطا در بارگذاری تمپلت: ${error.message}`, 'error');
        return;
    }

    let allRawText = [wgConfigInput.value, ...uploadedFilesContent].join('\n').trim();
    const lines = allRawText.split('\n').map(l => l.trim());
    const urls = lines.filter(l => l.startsWith('http'));
    const nonUrlContent = lines.filter(l => !l.startsWith('http')).join('\n');
    let errorDetails = [];
    let subscriptionContent = '';
    
    if (urls.length > 0) {
        showMessage(`در حال دانلود محتوای ${urls.length} لینک...`, 'success');
        const fetchedResults = await fetchSubscriptionContents(urls);
        fetchedResults.forEach(result => {
            if (result.error) errorDetails.push(result);
            else subscriptionContent += result + '\n\n';
        });
    }

    const finalContentToParse = [nonUrlContent, subscriptionContent].join('\n\n').trim();
    if (!finalContentToParse) {
        showMessage('هیچ ورودی معتبری برای پردازش یافت نشد.', 'error');
        displayErrorDetails(errorDetails);
        return;
    }
    
    let parsedConfigs = [];
    try {
        const jsonOrYaml = jsyaml.load(finalContentToParse);
        if (typeof jsonOrYaml === 'object' && jsonOrYaml !== null) {
            parsedConfigs = extractProxiesFromMihomo(jsonOrYaml);
        } else {
             throw new Error("Not a valid object.");
        }
    } catch (e) {
        // If parsing as a single object fails, fallback to block-based parsing
        const blocks = finalContentToParse.split(/(?=\[Interface\])|(?=wireguard:\/\/)/g).filter(b => b.trim());
        blocks.forEach(block => {
            const result = parseWireGuardConfig(block.trim());
            parsedConfigs.push(result);
        });
    }
    
    const successfulConfigs = parsedConfigs.filter(p => !p.error);
    const failedConfigs = parsedConfigs.filter(p => p.error);
    errorDetails.push(...failedConfigs);

    if (successfulConfigs.length === 0) {
        showMessage('پردازش ناموفق! هیچ کانفیگ معتبری یافت نشد.', 'error');
        displayErrorDetails(errorDetails);
        return;
    }

    const usedNames = new Set();
    successfulConfigs.forEach(cfg => {
        let finalName = cfg.name;
        let count = 1;
        while (usedNames.has(finalName)) finalName = `${cfg.name}-${count++}`;
        cfg.name = finalName;
        usedNames.add(finalName);
    });
    
    const mihomoProxies = successfulConfigs.map(c => convertWgToMihomo(c, jc, jmin, jmax, amneziaOption));
    try {
        const finalYaml = processTemplateText(baseTemplateContent, mihomoProxies);
        downloadFile(outputFileName, finalYaml);
        showMessage(`عملیات انجام شد! (${successfulConfigs.length} موفق, ${errorDetails.length} ناموفق)`, 'success');
        displayErrorDetails(errorDetails);
    } catch (e) {
        showMessage('خطا در تولید فایل نهایی: ' + e.message, 'error');
        displayErrorDetails([{ reason: e.message, source: 'YAML Generation' }]);
    }
});
