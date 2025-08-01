// ===================================================================
// script.js - Final Version with Staging Area and Config Management
// ===================================================================

// --- Country Code to Emoji Mapping ---
const countryEmojiMap = { "US": "🇺🇸", "DE": "🇩🇪", "NL": "🇳🇱", "CA": "🇨🇦", "GB": "🇬🇧", "FR": "🇫🇷", "AU": "🇦🇺", "JP": "🇯🇵", "SG": "🇸🇬", "SE": "🇸🇪", "CH": "🇨🇭", "FI": "🇫🇮", "NO": "🇳🇴", "DK": "🇩🇰", "BE": "🇧🇪", "AT": "🇦🇹", "ES": "🇪🇸", "IT": "🇮🇹", "PL": "🇵🇱", "CZ": "🇨🇿", "IE": "🇮🇪", "NZ": "🇳🇿", "KR": "🇰🇷", "HK": "🇭🇰", "TW": "🇹🇼", "IN": "🇮🇳", "BR": "🇧🇷", "MX": "🇲🇽", "ZA": "🇿🇦", "AE": "🇦🇪", "TR": "🇹🇷", "RU": "🇷🇺", "CN": "🇨🇳", "IR": "🇮🇷", "RO": "🇷🇴", "AF": "🇦🇫", "AL": "🇦🇱", "DZ": "🇩🇿", "AS": "🇦🇸", "AD": "🇦🇩", "AO": "🇦🇴", "AI": "🇦🇮", "AQ": "🇦🇶", "AG": "🇦🇬", "AR": "🇦🇷", "AM": "🇦🇲", "AW": "🇦🇼", "AZ": "🇦🇿", "BS": "🇧🇸", "BH": "🇧🇭", "BD": "🇧🇩", "BB": "🇧🇧", "BY": "🇧🇾", "BZ": "🇧🇿", "BJ": "🇧🇯", "BM": "🇧🇲", "BT": "🇧🇹", "BO": "🇧🇴", "BA": "🇧🇦", "BW": "🇧🇼", "BV": "🇧🇻", "IO": "🇮🇴", "BN": "🇧🇳", "BG": "🇧🇬", "BF": "🇧🇫", "BI": "🇧🇮", "KH": "🇰🇭", "CM": "🇨🇲", "CV": "🇨🇻", "KY": "🇰🇾", "CF": "🇨🇫", "TD": "🇹🇩", "CL": "🇨🇱", "CX": "🇨🇽", "CC": "🇨🇨", "CO": "🇨🇴", "KM": "🇰🇲", "CG": "🇨🇬", "CD": "🇨🇩", "CK": "🇨🇰", "CR": "🇨🇷", "CI": "🇨🇮", "HR": "🇭🇷", "CU": "🇨🇺", "CY": "🇨🇾", "DJ": "🇩🇯", "DM": "🇩🇲", "DO": "🇩🇴", "EC": "🇪🇨", "EG": "🇪🇬", "SV": "🇸🇻", "GQ": "🇬🇶", "ER": "🇪🇷", "EE": "🇪🇪", "ET": "🇪🇹", "FK": "🇫🇰", "FO": "🇫🇴", "FJ": "🇫🇯", "GF": "🇬🇫", "PF": "🇵🇫", "TF": "🇹🇫", "GA": "🇬🇦", "GM": "🇬🇲", "GE": "🇬🇪", "GH": "🇬🇭", "GI": "🇬🇮", "GR": "🇬🇷", "GL": "🇬🇱", "GD": "🇬🇩", "GP": "🇬🇵", "GU": "🇬🇺", "GT": "🇬🇹", "GN": "🇬🇳", "GW": "🇬🇼", "GY": "🇬🇾", "HT": "🇭🇹", "HM": "🇭🇲", "HN": "🇭🇳", "HU": "🇭🇺", "IS": "🇮🇸", "ID": "🇮🇩", "IQ": "🇮🇶", "IL": "🇮🇱", "JM": "🇯🇲", "JO": "🇯🇴", "KZ": "🇰🇿", "KE": "🇰🇪", "KI": "🇰🇮", "KP": "🇰🇵", "KW": "🇰🇼", "KG": "🇰🇬", "LA": "🇱🇦", "LV": "🇱🇻", "LB": "🇱🇧", "LS": "🇱🇸", "LR": "🇱🇷", "LY": "🇱🇾", "LI": "🇱🇮", "LT": "🇱🇹", "LU": "🇱🇺", "MO": "🇲🇴", "MK": "🇲🇰", "MG": "🇲🇬", "MW": "🇲🇼", "MY": "🇲🇾", "MV": "🇲🇻", "ML": "🇲🇱", "MT": "🇲🇹", "MH": "🇲🇭", "MQ": "🇲🇶", "MR": "🇲🇷", "MU": "🇲🇺", "YT": "🇾🇹", "FM": "🇫🇲", "MD": "🇲🇩", "MC": "🇲🇨", "MN": "🇲🇳", "MS": "🇲🇸", "MA": "🇲🇦", "MZ": "🇲🇿", "MM": "🇲🇲", "NA": "🇳🇦", "NR": "🇳🇷", "NP": "🇳🇵", "NC": "🇳🇨", "NI": "🇳🇮", "NE": "🇳🇪", "NG": "🇳🇬", "NU": "🇳🇺", "NF": "🇳🇫", "MP": "🇲🇵", "OM": "🇴🇲", "PK": "🇵🇰", "PW": "🇵🇼", "PS": "🇵🇸", "PA": "🇵🇦", "PG": "🇵🇬", "PY": "🇵🇾", "PE": "🇵🇪", "PH": "🇵🇭", "PN": "🇵🇳", "PT": "🇵🇹", "PR": "🇵🇷", "QA": "🇶🇦", "RE": "🇷🇪", "RW": "🇷🇼", "SH": "🇸🇭", "KN": "🇰🇳", "LC": "🇱🇨", "PM": "🇵🇲", "VC": "🇻🇨", "WS": "🇼🇸", "SM": "🇸🇲", "ST": "🇸🇹", "SA": "🇸🇦", "SN": "🇸🇳", "RS": "🇷🇸", "SC": "🇸🇨", "SL": "🇸🇱", "SK": "🇸🇰", "SI": "🇸🇮", "SB": "🇸🇧", "SO": "🇸🇴", "GS": "🇬🇸", "SS": "🇸🇸", "LK": "🇱🇰", "SD": "🇸🇩", "SR": "🇸🇷", "SJ": "🇸🇯", "SZ": "🇸🇿", "SY": "🇸🇾", "TJ": "🇹🇯", "TZ": "🇹🇿", "TH": "🇹🇭", "TL": "🇹🇱", "TG": "🇹🇬", "TK": "🇹🇰", "TO": "🇹🇴", "TT": "🇹🇹", "TN": "🇹🇳", "TM": "🇹🇲", "TC": "🇹🇨", "TV": "🇹🇻", "UG": "🇺🇬", "UA": "🇺🇦", "UM": "🇺🇲", "UY": "🇺🇾", "UZ": "🇺🇿", "VU": "🇻🇺", "VE": "🇻🇪", "VN": "🇻🇳", "VG": "🇻🇬", "VI": "🇻🇮", "WF": "🇼🇫", "EH": "🇪🇭", "YE": "🇾🇪", "ZM": "🇿🇲", "ZW": "🇿🇼"};

// --- Global State ---
let stagedConfigs = [];

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
const messageDiv = document.getElementById('message');
const themeToggle = document.getElementById('themeToggle');
const errorDetailsContainer = document.getElementById('errorDetailsContainer');
const errorList = document.getElementById('errorList');
const processInputBtn = document.getElementById('processInputBtn');
const generateBtn = document.getElementById('generateBtn');
const stagedConfigsContainer = document.getElementById('stagedConfigsContainer');
const stagedConfigsList = document.getElementById('stagedConfigsList');
const selectAllBtn = document.getElementById('selectAllBtn');
const deselectAllBtn = document.getElementById('deselectAllBtn');
const clearListBtn = document.getElementById('clearListBtn');
const configCounter = document.getElementById('configCounter');

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

// --- Staged Configs UI Rendering ---
function renderStagedConfigs() {
    stagedConfigsList.innerHTML = '';
    if (stagedConfigs.length === 0) {
        stagedConfigsContainer.classList.add('hidden');
        return;
    }
    configCounter.textContent = `${stagedConfigs.length} کانفیگ در لیست`;
    stagedConfigsContainer.classList.remove('hidden');
    stagedConfigs.forEach((config, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `config-checkbox-${index}`;
        checkbox.value = index;
        checkbox.checked = true;
        const label = document.createElement('label');
        label.htmlFor = `config-checkbox-${index}`;
        label.textContent = config.name;
        label.className = "cursor-pointer flex-grow";
        li.appendChild(checkbox);
        li.appendChild(label);
        stagedConfigsList.appendChild(li);
    });
}

// --- Subscription Link Fetcher ---
async function fetchSubscriptionContents(urls) {
    const promises = urls.map(url =>
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`خطای ${response.status}`);
                return response.text();
            })
            .catch(error => ({ error: true, reason: `دانلود لینک اشتراک ناموفق بود (${error.message})`, source: url }))
    );
    return Promise.all(promises);
}

// --- Universal Validator and Completer ---
function validateAndComplete(config, source) {
    const essentials = ['privateKey', 'publicKey', 'server', 'port'];
    for (const key of essentials) {
        if (!config[key] || (typeof config[key] === 'string' && config[key].trim() === '')) {
            return { error: true, reason: `مقدار ضروری "${key}" یافت نشد.`, source: source };
        }
    }
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
        config.name = `WG-${config.server.replace(/[.:\[\]]/g, '-')}`;
    }
    const addresses = Array.isArray(config.address) ? config.address : config.address.split(',');
    config.ip = addresses.find(addr => addr.includes('.'))?.split('/')[0] || '';
    config.ipv6 = addresses.find(addr => addr.includes(':'))?.split('/')[0] || '';
    return config;
}

// --- Format-Specific Parsers ---
function parseFromMihomo(configObject) {
    const proxies = configObject.proxies || [];
    return proxies
        .filter(p => p.type && p.type.toLowerCase() === 'wireguard')
        .map(p => {
            const mappedConfig = {
                name: p.name || null, privateKey: p['private-key'] || null, publicKey: p['public-key'] || null,
                server: p.server || null, port: p.port || null, address: p.ip, ipv6: p.ipv6, mtu: p.mtu,
                allowedIps: p['allowed-ips'], dns: p.dns, amneziaOptionsFromConfig: p['amnezia-wg-option'] || null
            };
            return validateAndComplete(mappedConfig, JSON.stringify(p));
        });
}

function parseFromSingBox(configObject) {
    const outbounds = configObject.outbounds || [];
    return outbounds
        .filter(o => o.type && o.type.toLowerCase() === 'wireguard')
        .map(o => {
            const mappedConfig = {
                name: o.tag || null, privateKey: o.private_key || null, publicKey: o.peer_public_key || null,
                server: o.server || null, port: o.server_port || null, address: o.local_address, mtu: o.mtu,
                amneziaOptionsFromConfig: o.amnezia || null,
            };
            return validateAndComplete(mappedConfig, JSON.stringify(o));
        });
}

function parseFromText(textContent) {
    const blocks = textContent.split(/(?=\[Interface\])|(?=wireguard:\/\/)/g).filter(b => b.trim());
    return blocks.map(block => {
        let rawConfig = {}, peerComment = '';
        try {
            if (block.startsWith('wireguard://')) {
                const url = new URL(block); const params = new URLSearchParams(url.search);
                rawConfig = {
                    name: decodeURIComponent(url.hash.substring(1)) || null, privateKey: decodeURIComponent(url.username) || null,
                    server: url.hostname || null, port: url.port ? parseInt(url.port, 10) : null,
                    publicKey: params.get('publickey') ? decodeURIComponent(params.get('publickey')) : null,
                    address: params.get('address'), mtu: params.get('mtu') ? parseInt(params.get('mtu'), 10) : null,
                };
            } else {
                const lines = block.split('\n').map(l => l.trim());
                const interfaceSection = {}, peerSection = {}; let currentSection = '';
                lines.forEach(line => {
                    if (line.startsWith('#')) { if (!peerComment) peerComment = line.substring(1).trim(); } 
                    else {
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
                const amneziaOpts = (interfaceSection.jc && interfaceSection.jmin && interfaceSection.jmax) ? {
                    jc: parseInt(interfaceSection.jc), jmin: parseInt(interfaceSection.jmin), jmax: parseInt(interfaceSection.jmax)
                } : null;
                rawConfig = {
                    name: peerComment || null, privateKey: interfaceSection.privatekey || null, publicKey: peerSection.publickey || null,
                    server: server || null, port: port ? parseInt(port, 10) : null, address: interfaceSection.address,
                    mtu: interfaceSection.mtu ? parseInt(interfaceSection.mtu) : null,
                    dns: (interfaceSection.dns || '').split(',').map(d => d.trim()).filter(Boolean),
                    allowedIps: peerSection.allowedips ? peerSection.allowedips.split(',').map(ip => ip.trim()).filter(Boolean) : null,
                    amneziaOptionsFromConfig: amneziaOpts,
                };
            }
            return validateAndComplete(rawConfig, block);
        } catch (e) {
            return { error: true, reason: 'ساختار کانفیگ نامعتبر است', source: block };
        }
    });
}

// --- Main Parser Orchestrator ---
function parseAllInputs(textContent) {
    let structuredConfig;
    try {
        structuredConfig = jsyaml.load(textContent);
    } catch (e) {
        return parseFromText(textContent);
    }
    if (typeof structuredConfig === 'object' && structuredConfig !== null) {
        if (structuredConfig.outbounds && Array.isArray(structuredConfig.outbounds)) {
            return parseFromSingBox(structuredConfig);
        }
        if (structuredConfig.proxies && Array.isArray(structuredConfig.proxies)) {
            return parseFromMihomo(structuredConfig);
        }
    }
    return parseFromText(textContent);
}

// --- Mihomo Conversion ---
function convertWgToMihomo(wgConfig, jcUI, jminUI, jmaxUI, amneziaOption) {
    const mihomoProxy = {
        name: wgConfig.name, type: 'wireguard', server: wgConfig.server, port: wgConfig.port, ip: wgConfig.ip,
        'private-key': wgConfig.privateKey, 'public-key': wgConfig.publicKey, 'allowed-ips': wgConfig.allowedIps,
        udp: true, mtu: wgConfig.mtu,
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

// --- Template Processing & Download ---
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

// --- "Process and Add" Handler ---
processInputBtn.addEventListener('click', async function handleProcessInput() {
    messageDiv.classList.add('hidden');
    displayErrorDetails([]);
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
        showMessage('هیچ ورودی جدیدی برای پردازش یافت نشد.', 'error');
        displayErrorDetails(errorDetails);
        return;
    }
    const parsedResults = parseAllInputs(finalContentToParse);
    const successfulConfigs = parsedResults.filter(p => !p.error);
    const failedConfigs = parsedResults.filter(p => p.error);
    errorDetails.push(...failedConfigs);
    if (successfulConfigs.length > 0) {
        stagedConfigs.push(...successfulConfigs);
        renderStagedConfigs();
    }
    showMessage(`عملیات انجام شد! (${successfulConfigs.length} کانفیگ اضافه شد، ${errorDetails.length} خطا یافت شد)`, 'success');
    displayErrorDetails(errorDetails);
    wgConfigInput.value = '';
    wgConfigFile.value = '';
    uploadedFilesContent = [];
    fileListDiv.innerHTML = '';
});

// --- "Generate and Download" Handler ---
generateBtn.addEventListener('click', async function handleGenerateAndDownload() {
    messageDiv.classList.add('hidden');
    displayErrorDetails([]);
    const selectedConfigs = [];
    document.querySelectorAll('#stagedConfigsList input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
            selectedConfigs.push(stagedConfigs[parseInt(cb.value, 10)]);
        }
    });
    if (selectedConfigs.length === 0) {
        showMessage('هیچ کانفیگی برای تولید فایل خروجی انتخاب نشده است!', 'error');
        return;
    }
    const jc = parseInt(jcInput.value, 10), jmin = parseInt(jminInput.value, 10), jmax = parseInt(jmaxInput.value, 10);
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
    const usedNames = new Set();
    selectedConfigs.forEach(cfg => {
        let finalName = cfg.name;
        let count = 1;
        while (usedNames.has(finalName)) finalName = `${cfg.name}-${count++}`;
        cfg.name = finalName;
        usedNames.add(finalName);
    });
    const mihomoProxies = selectedConfigs.map(c => convertWgToMihomo(c, jc, jmin, jmax, amneziaOption));
    try {
        const finalYaml = processTemplateText(baseTemplateContent, mihomoProxies);
        downloadFile(outputFileName, finalYaml);
        showMessage(`فایل با ${selectedConfigs.length} کانفیگ با موفقیت تولید شد!`, 'success');
    } catch (e) {
        showMessage('خطا در تولید فایل نهایی: ' + e.message, 'error');
        displayErrorDetails([{ reason: e.message, source: 'YAML Generation' }]);
    }
});

// --- Bulk Action Event Listeners ---
selectAllBtn.addEventListener('click', () => {
    document.querySelectorAll('#stagedConfigsList input[type="checkbox"]').forEach(cb => cb.checked = true);
});
deselectAllBtn.addEventListener('click', () => {
    document.querySelectorAll('#stagedConfigsList input[type="checkbox"]').forEach(cb => cb.checked = false);
});
clearListBtn.addEventListener('click', () => {
    stagedConfigs = [];
    renderStagedConfigs();
    showMessage('لیست کانفیگ‌ها پاک شد.', 'success');
});
