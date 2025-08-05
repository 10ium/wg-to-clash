// ===================================================================
// script.js - v2.4 - Feature Restoration & UX Improvements
// ===================================================================

// ===== CONFIGURATION & CONSTANTS =====
const countryEmojiMap={"US":"🇺🇸","DE":"🇩🇪","NL":"🇳🇱","CA":"🇨🇦","GB":"🇬🇧","FR":"🇫🇷","AU":"🇦🇺","JP":"🇯🇵","SG":"🇸🇬","SE":"🇸🇪","CH":"🇨🇭","FI":"🇫🇮","NO":"🇳🇴","DK":"🇩🇰","BE":"🇧🇪","AT":"🇦🇹","ES":"🇪🇸","IT":"🇮🇹","PL":"🇵🇱","CZ":"🇨🇿","IE":"🇮🇪","NZ":"🇳🇿","KR":"🇰🇷","HK":"🇭🇰","TW":"🇹🇼","IN":"🇮🇳","BR":"🇧🇷","MX":"🇲🇽","ZA":"🇿🇦","AE":"🇦🇪","TR":"🇹🇷","RU":"🇷🇺","CN":"🇨🇳","IR":"🇮🇷","RO":"🇷🇴","AF":"🇦🇫","AL":"🇦🇱","DZ":"🇩🇿","AS":"🇦🇸","AD":"🇦🇩","AO":"🇦🇴","AI":"🇦🇮","AQ":"🇦🇶","AG":"🇦🇬","AR":"🇦🇷","AM":"🇦🇲","AW":"🇦🇼","AZ":"🇦🇿","BS":"🇧🇸","BH":"🇧🇭","BD":"🇧🇩","BB":"🇧🇧","BY":"🇧🇾","BZ":"🇧🇿","BJ":"🇧🇯","BM":"🇧🇲","BT":"🇧🇹","BO":"🇧🇴","BA":"🇧🇦","BW":"🇧🇼","BV":"🇧🇻","IO":"🇮🇴","BN":"🇧🇳","BG":"🇧🇬","BF":"🇧🇫","BI":"🇧🇮","KH":"🇰🇭","CM":"🇨🇲","CV":"🇨🇻","KY":"🇰🇾","CF":"🇨🇫","TD":"🇹🇩","CL":"🇨🇱","CX":"🇨🇽","CC":"🇨🇨","CO":"🇨🇴","KM":"🇰🇲","CG":"🇨🇬","CD":"🇨🇩","CK":"🇨🇰","CR":"🇨🇷","CI":"🇨🇮","HR":"🇭🇷","CU":"🇨🇺","CY":"🇨🇾","DJ":"🇩🇯","DM":"🇩🇲","DO":"🇩🇴","EC":"🇪🇨","EG":"🇪🇬","SV":"🇸🇻","GQ":"🇬🇶","ER":"🇪🇷","EE":"🇪🇪","ET":"🇪🇹","FK":"🇫🇰","FO":"🇫🇴","FJ":"🇫🇯","GF":"🇬🇫","PF":"🇵🇫","TF":"🇹🇫","GA":"🇬🇦","GM":"🇬🇲","GE":"🇬🇪","GH":"🇬🇭","GI":"🇬🇮","GR":"🇬🇷","GL":"🇬🇱","GD":"🇬🇩","GP":"🇬🇵","GU":"🇬🇺","GT":"🇬🇹","GN":"🇬🇳","GW":"🇬🇼","GY":"🇬🇾","HT":"🇭🇹","HM":"🇭🇲","HN":"🇭🇳","HU":"🇭🇺","IS":"🇮🇸","ID":"🇮🇩","IQ":"🇮🇶","IL":"🇮🇱","JM":"🇯🇲","JO":"🇯🇴","KZ":"🇰🇿","KE":"🇰🇪","KI":"🇰🇮","KP":"🇰🇵","KW":"🇰🇼","KG":"🇰🇬","LA":"🇱🇦","LV":"🇱🇻","LB":"🇱🇧","LS":"🇱🇸","LR":"🇱🇷","LY":"🇱🇾","LI":"🇱🇮","LT":"🇱🇹","LU":"🇱🇺","MO":"🇲🇴","MK":"🇲🇰","MG":"🇲🇬","MW":"🇲🇼","MY":"🇲🇾","MV":"🇲🇻","ML":"🇲🇱","MT":"🇲🇹","MH":"🇲🇭","MQ":"🇲🇶","MR":"🇲🇷","MU":"🇲🇺","YT":"🇾🇹","FM":"🇫🇲","MD":"🇲🇩","MC":"🇲🇨","MN":"🇲🇳","MS":"🇲🇸","MA":"🇲🇦","MZ":"🇲🇿","MM":"🇲🇲","NA":"🇳🇦","NR":"🇳🇷","NP":"🇳🇵","NC":"🇳🇨","NI":"🇳🇮","NE":"🇳🇪","NG":"🇳🇬","NU":"🇳🇺","NF":"🇳🇫","MP":"🇲🇵","OM":"🇴🇲","PK":"🇵🇰","PW":"🇵🇼","PS":"🇵🇸","PA":"🇵🇦","PG":"🇵🇬","PY":"🇵🇾","PE":"🇵🇪","PH":"🇵🇭","PN":"🇵🇳","PT":"🇵🇹","PR":"🇵🇷","QA":"🇶🇦","RE":"🇷🇪","RW":"🇷🇼","SH":"🇸🇭","KN":"🇰🇳","LC":"🇱🇨","PM":"🇵🇲","VC":"🇻🇨","WS":"🇼🇸","SM":"🇸🇲","ST":"🇸🇹","SA":"🇸🇦","SN":"🇸🇳","RS":"🇷🇸","SC":"🇸🇨","SL":"🇸🇱","SK":"🇸🇰","SI":"🇸🇮","SB":"🇸🇧","SO":"🇸🇴","GS":"🇬🇸","SS":"🇸🇸","LK":"🇱🇰","SD":"🇸🇩","SR":"🇸🇷","SJ":"🇸🇯","SZ":"🇸🇿","SY":"🇸🇾","TJ":"🇹🇯","TZ":"🇹🇿","TH":"🇹🇭","TL":"🇹🇱","TG":"🇹🇬","TK":"🇹🇰","TO":"🇹🇴","TT":"🇹🇹","TN":"🇹🇳","TM":"🇹🇲","TC":"🇹🇨","TV":"🇹🇻","UG":"🇺🇬","UA":"🇺🇦","UM":"🇺🇲","UY":"🇺🇾","UZ":"🇺🇿","VU":"🇻🇺","VE":"🇻🇪","VN":"🇻🇳","VG":"🇻🇬","VI":"🇻🇮","WF":"🇼🇫","EH":"🇪🇭","YE":"🇾🇪","ZM":"🇿🇲","ZW":"🇿🇼"};

const AMNEZIA_PROFILES = [
    { id: 'custom', name: 'سفارشی (مقادیر دستی)', isCustom: true, checked: false },
    { id: 'optimal', name: 'Optimal', jc: 4, jmin: 64, jmax: 120, checked: true },
    { id: 'weak_net', name: 'Weak_Net', jc: 6, jmin: 64, jmax: 80, checked: false },
    { id: 'aggressive', name: 'Aggressive', jc: 8, jmin: 64, jmax: 150, checked: false },
    { id: 'fast', name: 'Fast', jc: 2, jmin: 64, jmax: 70, checked: false },
    { id: 'wbnet', name: 'wbnet', jc: 4, jmin: 40, jmax: 70, checked: false },
    { id: 'hamedp71', name: 'hamedp71', jc: 4, jmin: 40, jmax: 250, checked: false },
    { id: 'rus_micro', name: 'Rus_Micro', jc: 3, jmin: 10, jmax: 30, checked: false },
    { id: 'rus_flood', name: 'Rus_Flood', jc: 10, jmin: 30, jmax: 60, checked: false },
];

// --- Global State ---
let stagedConfigs = [];
let uploadedFilesContent = [];

// --- DOM Elements ---
const wgConfigInput = document.getElementById('wgConfigInput');
const wgConfigFile = document.getElementById('wgConfigFile');
const fileListDiv = document.getElementById('fileList');
const amneziaOptionSelect = document.getElementById('amneziaOptionSelect');
const templateSelect = document.getElementById('templateSelect');
const outputFileNameInput = document.getElementById('outputFileName');
const themeToggle = document.getElementById('themeToggle');
const themeIconDark = document.getElementById('theme-icon-dark');
const themeIconLight = document.getElementById('theme-icon-light');
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
const amneziaProfilesContainer = document.getElementById('amneziaProfilesContainer');
const customProfileInputs = document.getElementById('customProfileInputs');
const jcInput = document.getElementById('jcInput');
const jminInput = document.getElementById('jminInput');
const jmaxInput = document.getElementById('jmaxInput');

// --- Theme Management ---
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        themeIconLight.classList.remove('hidden');
        themeIconDark.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        themeIconLight.classList.add('hidden');
        themeIconDark.classList.remove('hidden');
    }
    localStorage.setItem('theme', theme);
}

// --- Dynamic Content & UI Initialization ---
function createCheckbox(item, groupName) {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex items-center';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `${groupName}-${item.id}`;
    checkbox.name = groupName;
    checkbox.value = item.id;
    checkbox.checked = item.checked;
    checkbox.className = 'form-checkbox';
    if(item.isCustom) {
        checkbox.addEventListener('change', (e) => {
            customProfileInputs.classList.toggle('hidden', !e.target.checked);
            updateOutputFilename();
        });
    } else {
        checkbox.addEventListener('change', updateOutputFilename);
    }
    const label = document.createElement('label');
    label.htmlFor = `${groupName}-${item.id}`;
    label.textContent = item.name;
    label.className = 'mr-2 text-slate-700 dark:text-slate-300 cursor-pointer';

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    return wrapper;
}

function initializeUI() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    AMNEZIA_PROFILES.forEach(profile => {
        amneziaProfilesContainer.appendChild(createCheckbox(profile, 'amneziaProfile'));
    });
    
    templateSelect.addEventListener('change', updateOutputFilename);
    updateOutputFilename();
}

// --- Smart Filename Generation ---
function updateOutputFilename() {
    let baseName = 'Mihomo_WG';
    
    const selectedProfileElements = Array.from(document.querySelectorAll('[name="amneziaProfile"]:checked'));
    const selectedProfileNames = selectedProfileElements.map(cb => {
        const profile = AMNEZIA_PROFILES.find(p => p.id === cb.value);
        return profile.isCustom ? 'Custom' : profile.name;
    });

    if (selectedProfileNames.length === 1) {
        baseName += `_[${selectedProfileNames[0]}]`;
    } else if (selectedProfileNames.length > 1) {
        baseName += `_[Multi]`;
    }

    const selectedTemplateOption = templateSelect.options[templateSelect.selectedIndex];
    const templateName = selectedTemplateOption.dataset.name;
    baseName += `_[${templateName}]`;

    outputFileNameInput.value = baseName;
}

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
                const fileChip = document.createElement('div');
                fileChip.className = 'inline-block bg-slate-200 dark:bg-slate-700 rounded-full px-3 py-1 text-xs font-medium';
                fileChip.textContent = file.name;
                fileListDiv.appendChild(fileChip);
            };
            reader.readAsText(file);
        });
    }
});

// --- UI Messaging ---
function showMessage(msg, type, duration = 4000) {
    const bgColor = type === 'success' ? 'bg-emerald-100 dark:bg-emerald-900/50' : 'bg-red-100 dark:bg-red-900/50';
    const textColor = type === 'success' ? 'text-emerald-800 dark:text-emerald-300' : 'text-red-800 dark:text-red-300';
    const container = document.createElement('div');
    container.className = `fixed bottom-5 right-5 z-50 p-4 rounded-lg shadow-md ${bgColor} ${textColor}`;
    container.textContent = msg;
    document.body.appendChild(container);
    setTimeout(() => container.remove(), duration);
}

function displayErrorDetails(errors) {
    errorList.innerHTML = '';
    if (errors.length === 0) {
        errorDetailsContainer.classList.add('hidden');
        return;
    }
    errors.forEach(err => {
        const li = document.createElement('li');
        li.textContent = err.reason;
        const sourceNode = document.createElement('code');
        sourceNode.textContent = ` (منبع: ${err.source.substring(0, 70)}...)`;
        sourceNode.className = "text-yellow-600 dark:text-yellow-400 opacity-80 ml-2 text-xs";
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
    configCounter.textContent = `${stagedConfigs.length} کانفیگ`;
    stagedConfigsContainer.classList.remove('hidden');

    stagedConfigs.forEach((config, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex items-center p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `config-checkbox-${index}`;
        checkbox.value = index;
        checkbox.checked = true;
        checkbox.className = 'form-checkbox ml-3';

        const label = document.createElement('label');
        label.htmlFor = `config-checkbox-${index}`;
        label.textContent = config.name;
        label.className = "cursor-pointer flex-grow text-sm";
        
        wrapper.appendChild(label);
        wrapper.appendChild(checkbox);
        stagedConfigsList.appendChild(wrapper);
    });
}

// --- Subscription Link Fetcher ---
async function fetchSubscriptionContents(urls) {
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const promises = urls.map(url =>
        fetch(`${proxyUrl}${encodeURIComponent(url)}`)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .catch(error => ({ error: true, reason: `دانلود لینک اشتراک ناموفق بود (${error.message})`, source: url }))
    );
    return Promise.all(promises);
}

// --- Parsers and Validator (Unchanged) ---
function validateAndComplete(config, source) {const essentials = ['privateKey', 'publicKey', 'server', 'port']; for (const key of essentials) { if (!config[key] || (typeof config[key] === 'string' && config[key].trim() === '')) { return { error: true, reason: `مقدار ضروری "${key}" یافت نشد.`, source: source }; } } config.address = config.address || '172.16.0.2/32'; config.mtu = config.mtu || 1420; config.allowedIps = config.allowedIps || ['0.0.0.0/0', '::/0']; if (config.name) { let countryCode = '', identifier = ''; const nameMatch = config.name.match(/^([A-Z]{2})[#\s-](.*)$/i); if (nameMatch) { countryCode = nameMatch[1].toUpperCase(); identifier = nameMatch[2].trim(); } else { identifier = config.name; } const emoji = countryEmojiMap[countryCode] || '🏳️'; config.name = `${emoji} ${identifier}`.trim().replace(/\s+/g, ' '); } else { config.name = `WG-${config.server.replace(/[.:\[\]]/g, '-')}`; } const addresses = Array.isArray(config.address) ? config.address : config.address.split(',').map(addr => addr.trim()); config.ip = addresses.find(addr => addr.includes('.'))?.split('/')[0] || ''; config.ipv6 = addresses.find(addr => addr.includes(':'))?.split('/')[0] || ''; return config; }
function parseFromMihomo(configObject) { const proxies = configObject.proxies || []; return proxies.filter(p => p.type && p.type.toLowerCase() === 'wireguard').map(p => { const mappedConfig = { name: p.name || null, privateKey: p['private-key'] || null, publicKey: p['public-key'] || null, server: p.server || null, port: p.port || null, address: p.ip, ipv6: p.ipv6, mtu: p.mtu, allowedIps: p['allowed-ips'], dns: p.dns, amneziaOptionsFromConfig: p['amnezia-wg-option'] || null }; return validateAndComplete(mappedConfig, JSON.stringify(p)); }); }
function parseFromSingBox(configObject) { const outbounds = configObject.outbounds || []; return outbounds.filter(o => o.type && o.type.toLowerCase() === 'wireguard').map(o => { const mappedConfig = { name: o.tag || null, privateKey: o.private_key || null, publicKey: o.peer_public_key || null, server: o.server || null, port: o.server_port || null, address: o.local_address, mtu: o.mtu, amneziaOptionsFromConfig: o.amnezia || null }; return validateAndComplete(mappedConfig, JSON.stringify(o)); }); }
function parseFromText(textContent) { const blocks = textContent.split(/(?=\[Interface\])|(?=wireguard:\/\/)/g).filter(b => b.trim()); return blocks.map(block => { let rawConfig = {}, peerComment = ''; try { if (block.startsWith('wireguard://')) { const url = new URL(block); const params = new URLSearchParams(url.search); rawConfig = { name: decodeURIComponent(url.hash.substring(1)) || null, privateKey: decodeURIComponent(url.username) || null, server: url.hostname || null, port: url.port ? parseInt(url.port, 10) : null, publicKey: params.get('publickey') ? decodeURIComponent(params.get('publickey')) : null, address: params.get('address'), mtu: params.get('mtu') ? parseInt(params.get('mtu'), 10) : null, }; } else { const lines = block.split('\n').map(l => l.trim()); const interfaceSection = {}, peerSection = {}; let currentSection = ''; lines.forEach(line => { const lowerLine = line.toLowerCase(); if (lowerLine.startsWith('[interface]')) { currentSection = 'Interface'; } else if (lowerLine.startsWith('[peer]')) { currentSection = 'Peer'; } else if (line.startsWith('#') && currentSection === 'Peer') { const commentText = line.substring(1).trim(); if (!peerComment) { peerComment = commentText; } } else if (line.includes('=')) { const [key, value] = line.split('=', 2).map(s => s.trim()); if (currentSection === 'Interface') interfaceSection[key.toLowerCase()] = value; else if (currentSection === 'Peer') peerSection[key.toLowerCase()] = value; } }); const [server, port] = (peerSection.endpoint || '').split(':'); const amneziaOpts = (interfaceSection.jc && interfaceSection.jmin && interfaceSection.jmax) ? { jc: parseInt(interfaceSection.jc), jmin: parseInt(interfaceSection.jmin), jmax: parseInt(interfaceSection.jmax) } : null; rawConfig = { name: peerComment || null, privateKey: interfaceSection.privatekey || null, publicKey: peerSection.publickey || null, server: server || null, port: port ? parseInt(port, 10) : null, address: interfaceSection.address, mtu: interfaceSection.mtu ? parseInt(interfaceSection.mtu) : null, dns: (interfaceSection.dns || '').split(',').map(d => d.trim()).filter(Boolean), allowedIps: peerSection.allowedips ? peerSection.allowedips.split(',').map(ip => ip.trim()).filter(Boolean) : null, amneziaOptionsFromConfig: amneziaOpts, }; } return validateAndComplete(rawConfig, block); } catch (e) { return { error: true, reason: 'ساختار کانفیگ نامعتبر است', source: block }; } }); }
function parseAllInputs(textContent) { let structuredConfig; try { structuredConfig = jsyaml.load(textContent); } catch (e) { return parseFromText(textContent); } if (typeof structuredConfig === 'object' && structuredConfig !== null) { if (structuredConfig.outbounds) return parseFromSingBox(structuredConfig); if (structuredConfig.proxies) return parseFromMihomo(structuredConfig); } return parseFromText(textContent); }
function convertWgToMihomo(wgConfig, amneziaSettings) { const mihomoProxy = { name: wgConfig.name, type: 'wireguard', server: wgConfig.server, port: wgConfig.port, ip: wgConfig.ip, 'private-key': wgConfig.privateKey, 'public-key': wgConfig.publicKey, 'allowed-ips': wgConfig.allowedIps, udp: true, mtu: wgConfig.mtu, 'remote-dns-resolve': true, }; if (wgConfig.ipv6) mihomoProxy.ipv6 = wgConfig.ipv6; if (wgConfig.dns?.length > 0) mihomoProxy.dns = wgConfig.dns; if (amneziaSettings) { mihomoProxy['amnezia-wg-option'] = amneziaSettings; } return mihomoProxy; }
function processTemplateText(templateText, mihomoProxies) { const proxyBlocks = [], proxyNames = []; mihomoProxies.forEach(proxy => { let yamlFrag = jsyaml.dump(proxy, { indent: 2, lineWidth: -1, flowLevel: 3, noCompatMode: true }).trim(); yamlFrag = yamlFrag.replace(/^(private-key|public-key):\s*([A-Za-z0-9+/=]+)$/gm, (match, key, value) => { if (!value.endsWith('=')) { const paddingNeeded = (4 - (value.length % 4)) % 4; if (paddingNeeded < 3) value += '='.repeat(paddingNeeded); } return `${key}: '${value}'`; }); if (proxy.dns && proxy.dns.length > 0) { const dnsBlock = proxy.dns.map(d => `      - ${d}`).join('\n'); yamlFrag = yamlFrag.replace(/dns:\s*\[.*\]/, `dns:\n${dnsBlock}`); } if (proxy.allowedIps && proxy.allowedIps.length > 0) { const allowedIpsBlock = proxy.allowedIps.map(ip => `      - '${ip}'`).join('\n'); yamlFrag = yamlFrag.replace(/allowed-ips:\s*\[.*\]/, `allowed-ips:\n${allowedIpsBlock}`); } const block = yamlFrag.split('\n').map((l, i) => (i === 0 ? `  - ${l}` : `    ${l}`)).join('\n'); proxyBlocks.push(block); proxyNames.push(`"${proxy.name}"`); }); const proxyNameListYaml = proxyNames.map(n => `      - ${n}`).join('\n'); return templateText.replace(/##_PROXIES_PLACEHOLDER_##/g, proxyBlocks.join('\n')).replace(/##_PROXY_NAMES_LIST_PLACEHOLDER_##/g, proxyNameListYaml); }
function downloadFile(filename, content) { const blob = new Blob([content], { type: 'application/x-yaml;charset=utf-8;' }); const link = document.createElement('a'); const url = URL.createObjectURL(blob); link.href = url; link.download = filename; document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url); }

// --- "Process and Add" Handler ---
processInputBtn.addEventListener('click', async function handleProcessInput() { /* ... Unchanged ... */ displayErrorDetails([]); let allRawText=[wgConfigInput.value,...uploadedFilesContent].join('\n').trim(); const lines=allRawText.split('\n').map(l=>l.trim()); const urls=lines.filter(l=>l.startsWith('http')); const nonUrlContent=lines.filter(l=>!l.startsWith('http')).join('\n'); let errorDetails=[]; if(urls.length>0){showMessage(`در حال دانلود محتوای ${urls.length} لینک...`,'success'); const fetchedResults=await fetchSubscriptionContents(urls); let subscriptionContent=''; fetchedResults.forEach(result=>{if(result.error)errorDetails.push(result); else subscriptionContent+=result+'\n\n';}); allRawText=[nonUrlContent,subscriptionContent].join('\n\n').trim();} if(!allRawText){showMessage('هیچ ورودی جدیدی برای پردازش یافت نشد.','error'); displayErrorDetails(errorDetails); return;} const parsedResults=parseAllInputs(allRawText); const successfulConfigs=parsedResults.filter(p=>!p.error); const failedConfigs=parsedResults.filter(p=>p.error); errorDetails.push(...failedConfigs); if(successfulConfigs.length>0){stagedConfigs.push(...successfulConfigs); renderStagedConfigs();} showMessage(`انجام شد! (${successfulConfigs.length} کانفیگ اضافه شد، ${errorDetails.length} خطا)`,'success'); displayErrorDetails(errorDetails); wgConfigInput.value=''; wgConfigFile.value=''; uploadedFilesContent=[]; fileListDiv.innerHTML=''; });

// --- "Generate and Download" Handler (Updated Logic) ---
generateBtn.addEventListener('click', async function handleGenerateAndDownload() {
    displayErrorDetails([]);

    const selectedWgConfigs = [];
    document.querySelectorAll('#stagedConfigsList input[type="checkbox"]:checked').forEach(cb => {
        selectedWgConfigs.push(stagedConfigs[parseInt(cb.value, 10)]);
    });
    if (selectedWgConfigs.length === 0) {
        return showMessage('هیچ کانفیگی برای تولید خروجی انتخاب نشده است!', 'error');
    }

    const selectedAmneziaProfileElements = Array.from(document.querySelectorAll('[name="amneziaProfile"]:checked'));
    const selectedAmneziaProfileIds = selectedAmneziaProfileElements.map(cb => cb.value);
    let selectedAmneziaProfiles = AMNEZIA_PROFILES.filter(p => selectedAmneziaProfileIds.includes(p.id));

    if (selectedAmneziaProfileIds.includes('custom')) {
        const customProfile = {
            id: 'custom', name: 'Custom', isCustom: true,
            jc: parseInt(jcInput.value, 10),
            jmin: parseInt(jminInput.value, 10),
            jmax: parseInt(jmaxInput.value, 10)
        };
        // Replace the placeholder custom profile with the one with actual values
        selectedAmneziaProfiles = selectedAmneziaProfiles.map(p => p.id === 'custom' ? customProfile : p);
    }
    
    const templateId = templateSelect.value;
    const amneziaMode = amneziaOptionSelect.value;
    const outputFileName = outputFileNameInput.value.trim() + '.yaml';

    if (!outputFileName || outputFileName === '.yaml') {
        return showMessage('نام فایل خروجی نمی‌تواند خالی باشد!', 'error');
    }

    try {
        const response = await fetch(`./config-templates/${templateId}.yaml`);
        if (!response.ok) throw new Error(`خطای HTTP ${response.status}`);
        const baseTemplateContent = await response.text();
        
        const mihomoProxies = [];
        const usedNames = new Set();
        
        selectedWgConfigs.forEach(wgConfig => {
            if (amneziaMode === 'use-ui-values' && selectedAmneziaProfiles.length > 0) {
                selectedAmneziaProfiles.forEach(profile => {
                    const newWgConfig = JSON.parse(JSON.stringify(wgConfig));
                    let finalName = `${newWgConfig.name} [${profile.name}]`;
                    let count = 1;
                    while (usedNames.has(finalName)) finalName = `${newWgConfig.name} [${profile.name}]-${count++}`;
                    newWgConfig.name = finalName;
                    usedNames.add(finalName);

                    const amneziaSettings = { jc: profile.jc, jmin: profile.jmin, jmax: profile.jmax, s1: 0, s2: 0, h1: 1, h2: 2, h3: 3, h4: 4 };
                    mihomoProxies.push(convertWgToMihomo(newWgConfig, amneziaSettings));
                });
            } else {
                const newWgConfig = JSON.parse(JSON.stringify(wgConfig));
                let finalName = newWgConfig.name;
                let count = 1;
                while (usedNames.has(finalName)) finalName = `${newWgConfig.name}-${count++}`;
                newWgConfig.name = finalName;
                usedNames.add(finalName);
                
                let amneziaSettings = null;
                if (amneziaMode === 'use-config-values' && newWgConfig.amneziaOptionsFromConfig) {
                    amneziaSettings = newWgConfig.amneziaOptionsFromConfig;
                }
                mihomoProxies.push(convertWgToMihomo(newWgConfig, amneziaSettings));
            }
        });

        const finalYaml = processTemplateText(baseTemplateContent, mihomoProxies);
        downloadFile(outputFileName, finalYaml);
        showMessage(`فایل ${outputFileName} با موفقیت تولید شد!`, 'success');

    } catch (error) {
        showMessage(`خطا در بارگذاری یا پردازش تمپلت: ${error.message}`, 'error');
        displayErrorDetails([{ reason: error.message, source: `Template: ${templateId}` }]);
    }
});


// --- Bulk Action & Startup Event Listeners ---
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});
selectAllBtn.addEventListener('click', () => document.querySelectorAll('#stagedConfigsList input[type="checkbox"]').forEach(cb => cb.checked = true));
deselectAllBtn.addEventListener('click', () => document.querySelectorAll('#stagedConfigsList input[type="checkbox"]').forEach(cb => cb.checked = false));
clearListBtn.addEventListener('click', () => {
    stagedConfigs = [];
    renderStagedConfigs();
    showMessage('لیست کانفیگ‌ها پاک شد.', 'success');
});

document.addEventListener('DOMContentLoaded', initializeUI);
