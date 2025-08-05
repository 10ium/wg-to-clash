// ===================================================================
// script.js - v5: File Processing Bug FIXED. Final Robust Version.
// ===================================================================

// --- Data Sources ---
const countryEmojiMap = { "US": "🇺🇸", "DE": "🇩🇪", "NL": "🇳🇱", "CA": "🇨🇦", "GB": "🇬🇧", "FR": "🇫🇷", "AU": "🇦🇺", "JP": "🇯🇵", "SG": "🇸🇬", "SE": "🇸🇪", "CH": "🇨🇭", "FI": "🇫🇮", "NO": "🇳🇴", "DK": "🇩🇰", "BE": "🇧🇪", "AT": "🇦🇹", "ES": "🇪🇸", "IT": "🇮🇹", "PL": "🇵🇱", "CZ": "🇨🇿", "IE": "🇮🇪", "NZ": "🇳🇿", "KR": "🇰🇷", "HK": "🇭🇰", "TW": "🇹🇼", "IN": "🇮🇳", "BR": "🇧🇷", "MX": "🇲🇽", "ZA": "🇿🇦", "AE": "🇦🇪", "TR": "🇹🇷", "RU": "🇷🇺", "CN": "🇨🇳", "IR": "🇮🇷", "RO": "🇷🇴", "AF": "🇦🇫", "AL": "🇦🇱", "DZ": "🇩🇿", "AS": "🇦🇸", "AD": "🇦🇩", "AO": "🇦🇴", "AI": "🇦🇮", "AQ": "🇦🇶", "AG": "🇦🇬", "AR": "🇦🇷", "AM": "🇦🇲", "AW": "🇦🇼", "AZ": "🇦🇿", "BS": "🇧🇸", "BH": "🇧🇭", "BD": "🇧🇩", "BB": "🇧🇧", "BY": "🇧🇾", "BZ": "🇧🇿", "BJ": "🇧🇯", "BM": "🇧🇲", "BT": "🇧🇹", "BO": "🇧🇴", "BA": "🇧🇦", "BW": "🇧🇼", "BV": "🇧🇻", "IO": "🇮🇴", "BN": "🇧🇳", "BG": "🇧🇬", "BF": "🇧🇫", "BI": "🇧🇮", "KH": "🇰🇭", "CM": "🇨🇲", "CV": "🇨🇻", "KY": "🇰🇾", "CF": "🇨🇫", "TD": "🇹🇩", "CL": "🇨🇱", "CX": "🇨🇽", "CC": "🇨🇨", "CO": "🇨🇴", "KM": "🇰🇲", "CG": "🇨🇬", "CD": "🇨🇩", "CK": "🇨🇰", "CR": "🇨🇷", "CI": "🇨🇮", "HR": "🇭🇷", "CU": "🇨🇺", "CY": "🇨🇾", "DJ": "🇩🇯", "DM": "🇩🇲", "DO": "🇩🇴", "EC": "🇪🇨", "EG": "🇪🇬", "SV": "🇸🇻", "GQ": "🇬🇶", "ER": "🇪🇷", "EE": "🇪🇪", "ET": "🇪🇹", "FK": "🇫🇰", "FO": "🇫🇴", "FJ": "🇫🇯", "GF": "🇬🇫", "PF": "🇵🇫", "TF": "🇹🇫", "GA": "🇬🇦", "GM": "🇬🇲", "GE": "🇬🇪", "GH": "🇬🇭", "GI": "🇬🇮", "GR": "🇬🇷", "GL": "🇬🇱", "GD": "🇬🇩", "GP": "🇬🇵", "GU": "🇬🇺", "GT": "🇬🇹", "GN": "🇬🇳", "GW": "🇬🇼", "GY": "🇬🇾", "HT": "🇭🇹", "HM": "🇭🇲", "HN": "🇭🇳", "HU": "🇭🇺", "IS": "🇮🇸", "ID": "🇮🇩", "IQ": "🇮🇶", "IL": "🇮🇱", "JM": "🇯🇲", "JO": "🇯🇴", "KZ": "🇰🇿", "KE": "🇰🇪", "KI": "🇰🇮", "KP": "🇰🇵", "KW": "🇰🇼", "KG": "🇰🇬", "LA": "🇱🇦", "LV": "🇱🇻", "LB": "🇱🇧", "LS": "🇱🇸", "LR": "🇱🇷", "LY": "🇱🇾", "LI": "🇱🇮", "LT": "🇱🇹", "LU": "🇱🇺", "MO": "🇲🇴", "MK": "🇲🇰", "MG": "🇲🇬", "MW": "🇲🇼", "MY": "🇲🇾", "MV": "🇲🇻", "ML": "🇲🇱", "MT": "🇲🇹", "MH": "🇲🇭", "MQ": "🇲🇶", "MR": "🇲🇷", "MU": "🇲🇺", "YT": "🇾🇹", "FM": "🇫🇲", "MD": "🇲🇩", "MC": "🇲🇨", "MN": "🇲🇳", "MS": "🇲🇸", "MA": "🇲🇦", "MZ": "🇲🇿", "MM": "🇲🇲", "NA": "🇳🇦", "NR": "🇳🇷", "NP": "🇳🇵", "NC": "🇳🇨", "NI": "🇳🇮", "NE": "🇳🇪", "NG": "🇳🇬", "NU": "🇳🇺", "NF": "🇳🇫", "MP": "🇲🇵", "OM": "🇴🇲", "PK": "🇵🇰", "PW": "🇵🇼", "PS": "🇵🇸", "PA": "🇵🇦", "PG": "🇵🇬", "PY": "🇵🇾", "PE": "🇵🇪", "PH": "🇵🇭", "PN": "🇵🇳", "PT": "🇵🇹", "PR": "🇵🇷", "QA": "🇶🇦", "RE": "🇷🇪", "RW": "🇷🇼", "SH": "🇸🇭", "KN": "🇰🇳", "LC": "🇱🇨", "PM": "🇵🇲", "VC": "🇻🇨", "WS": "🇼🇸", "SM": "🇸🇲", "ST": "🇸🇹", "SA": "🇸🇦", "SN": "🇸🇳", "RS": "🇷🇸", "SC": "🇸🇨", "SL": "🇸🇱", "SK": "🇸🇰", "SI": "🇸🇮", "SB": "🇸🇧", "SO": "🇸🇴", "GS": "🇬🇸", "SS": "🇸🇸", "LK": "🇱🇰", "SD": "🇸🇩", "SR": "🇸🇷", "SJ": "🇸🇯", "SZ": "🇸🇿", "SY": "🇸🇾", "TJ": "🇹🇯", "TZ": "🇹🇿", "TH": "🇹🇭", "TL": "🇹🇱", "TG": "🇹🇬", "TK": "🇹🇰", "TO": "🇹🇴", "TT": "🇹🇹", "TN": "🇹🇳", "TM": "🇹🇲", "TC": "🇹🇨", "TV": "🇹🇻", "UG": "🇺🇬", "UA": "🇺🇦", "UM": "🇺🇲", "UY": "🇺🇾", "UZ": "🇺🇿", "VU": "🇻🇺", "VE": "🇻🇪", "VN": "🇻🇳", "VG": "🇻🇬", "VI": "🇻🇮", "WF": "🇼🇫", "EH": "🇪🇭", "YE": "🇾🇪", "ZM": "🇿🇲", "ZW": "🇿🇼"};
const amneziaProfiles = [
    { value: 'custom', name: 'مقادیر دستی', dataName: 'Custom', defaultChecked: false },
    { value: '4,64,120', name: 'حالت بهینه', dataName: 'Optimal', defaultChecked: true },
    { value: '6,64,80', name: 'اینترنت ضعیف', dataName: 'Weak_Net', defaultChecked: false },
    { value: '8,64,150', name: 'حداکثر پنهان‌سازی', dataName: 'Aggressive', defaultChecked: false },
    { value: '2,64,70', name: 'حداکثر سرعت', dataName: 'Fast', defaultChecked: false },
    { value: '4,40,70', name: 'پیشنهاد @wbnet', dataName: 'wbnet', defaultChecked: false },
    { value: '4,40,250', name: 'پیشنهاد hamedp71', dataName: 'hamedp71', defaultChecked: false },
    { value: '3,10,30', name: 'مبدل روسی (میکرو)', dataName: 'Rus_Micro', defaultChecked: false },
    { value: '10,30,60', name: 'مبدل روسی (زیاد)', dataName: 'Rus_Flood', defaultChecked: false },
];

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
const profileCheckboxContainer = document.getElementById('profileCheckboxContainer');
const profileSelectionGroup = document.getElementById('profileSelectionGroup');
const customValuesGroup = document.getElementById('customValuesGroup');

// --- UI Initialization and Management ---
function renderAmneziaProfiles() {
    profileCheckboxContainer.innerHTML = '';
    amneziaProfiles.forEach(profile => {
        const div = document.createElement('div');
        div.className = 'flex items-center';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `profile-${profile.dataName}`;
        checkbox.value = profile.value;
        checkbox.dataset.name = profile.dataName;
        checkbox.checked = profile.defaultChecked;
        checkbox.className = 'form-checkbox cursor-pointer';
        
        const label = document.createElement('label');
        label.htmlFor = `profile-${profile.dataName}`;
        label.textContent = profile.name;
        label.className = 'mr-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer';

        div.appendChild(checkbox);
        div.appendChild(label);
        profileCheckboxContainer.appendChild(div);
    });
}

function getSelectedProfiles() {
    return Array.from(profileCheckboxContainer.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => ({
            value: cb.value,
            name: cb.nextElementSibling.textContent,
            dataName: cb.dataset.name
        }));
}

function updateValueInputsAndProfiles() {
    const customCheckbox = document.getElementById('profile-Custom');
    const otherCheckboxes = Array.from(profileCheckboxContainer.querySelectorAll('input:not(#profile-Custom)'));
    const isCustomChecked = customCheckbox.checked;
    
    jcInput.disabled = !isCustomChecked;
    jminInput.disabled = !isCustomChecked;
    jmaxInput.disabled = !isCustomChecked;
    
    if (isCustomChecked) {
        otherCheckboxes.forEach(cb => cb.checked = false);
    }
    
    updateOutputFilename();
}

function toggleProfileSectionState() {
    const isUiMode = amneziaOptionSelect.value === 'use-ui-values';
    
    profileSelectionGroup.classList.toggle('opacity-50', !isUiMode);
    profileSelectionGroup.classList.toggle('pointer-events-none', !isUiMode);
    customValuesGroup.classList.toggle('opacity-50', !isUiMode);
    customValuesGroup.classList.toggle('pointer-events-none', !isUiMode);

    Array.from(profileCheckboxContainer.querySelectorAll('input')).forEach(cb => cb.disabled = !isUiMode);

    if (isUiMode) {
        updateValueInputsAndProfiles();
    } else {
        jcInput.disabled = true;
        jminInput.disabled = true;
        jmaxInput.disabled = true;
    }
}


function updateOutputFilename() {
    const baseFileName = 'Mihomo_WireGuard';
    let finalName = baseFileName;
    const amneziaMode = amneziaOptionSelect.value;
    const selectedProfiles = getSelectedProfiles();

    if (amneziaMode === 'use-ui-values' && selectedProfiles.length > 0) {
        if (selectedProfiles.length > 1) {
            finalName += `_[Multi-Profile]`;
        } else {
            finalName += `_[${selectedProfiles[0].dataName}]`;
        }
    }
    const selectedTemplateOption = templateSelect.options[templateSelect.selectedIndex];
    const templateName = selectedTemplateOption.dataset.name || 'Rules';
    finalName += `_[${templateName}]`;
    outputFileNameInput.value = finalName;
}


// --- Event Listeners Setup ---
document.addEventListener('DOMContentLoaded', () => {
    renderAmneziaProfiles();
    toggleProfileSectionState(); 
    profileCheckboxContainer.addEventListener('change', updateValueInputsAndProfiles);
    amneziaOptionSelect.addEventListener('change', () => {
        toggleProfileSectionState();
        updateOutputFilename();
    });
    templateSelect.addEventListener('change', updateOutputFilename);
});

// --- UI Messaging Functions ---
function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = 'mt-4 p-3 rounded-lg text-center font-medium';
    const typeClasses = {
        'success': 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300',
        'error': 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300',
        'info': 'bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300'
    };
    messageDiv.classList.add(...(typeClasses[type] || typeClasses['info']).split(' '));
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
        sourceNode.className = "text-yellow-600 dark:text-yellow-400 opacity-80 ml-2";
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
        li.className = 'flex items-center gap-x-3 p-1.5 bg-sky-100/50 dark:bg-slate-700/30 rounded-md';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-checkbox';
        checkbox.id = `config-checkbox-${index}`;
        checkbox.value = index;
        checkbox.checked = true;
        const label = document.createElement('label');
        label.htmlFor = `config-checkbox-${index}`;
        label.textContent = config.name;
        label.className = "cursor-pointer flex-grow text-sm font-medium text-slate-800 dark:text-slate-200";
        li.appendChild(checkbox);
        li.appendChild(label);
        stagedConfigsList.appendChild(li);
    });
}

// --- CORE LOGIC (Parsing, Generation) ---

// ===== NEW ROBUST FILE READER =====
/**
 * Reads a list of files as text using Promises to avoid race conditions.
 * @param {FileList} files - The FileList object from a file input.
 * @returns {Promise<string[]>} A promise that resolves to an array of file contents.
 */
function readFilesAsText(files) {
    return Promise.all(Array.from(files).map(file =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        })
    ));
}

async function fetchSubscriptionContents(urls) {
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    const promises = urls.map(url =>
        fetch(`${corsProxy}${encodeURIComponent(url)}`)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.text();
            })
            .catch(error => ({ error: true, reason: `دانلود لینک اشتراک ناموفق بود (${error.message})`, source: url }))
    );
    return Promise.all(promises);
}

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
        const emoji = countryEmojiMap[countryCode] || '🏳️';
        config.name = `${emoji} ${countryCode} ${identifier}`.trim().replace(/\s+/g, ' ');
    } else {
        config.name = `WG-${config.server.replace(/[.:\[\]]/g, '-')}`;
    }
    const addresses = Array.isArray(config.address) ? config.address.join(',').split(',') : config.address.split(',');
    config.ip = addresses.find(addr => addr.includes('.'))?.split('/')[0] || '172.16.0.2';
    config.ipv6 = addresses.find(addr => addr.includes(':'))?.split('/')[0] || '';
    return config;
}

function parseFromMihomo(configObject) { /* ... unchanged ... */ return (configObject.proxies || []).filter(p=>p.type&&"wireguard"===p.type.toLowerCase()).map(p=>validateAndComplete({name:p.name||null,privateKey:p["private-key"]||null,publicKey:p["public-key"]||null,server:p.server||null,port:p.port||null,address:p.ip,ipv6:p.ipv6,mtu:p.mtu,allowedIps:p["allowed-ips"],dns:p.dns,amneziaOptionsFromConfig:p["amnezia-wg-option"]||null},JSON.stringify(p)))}
function parseFromSingBox(configObject) { /* ... unchanged ... */ return (configObject.outbounds || []).filter(o=>o.type&&"wireguard"===o.type.toLowerCase()).map(o=>validateAndComplete({name:o.tag||null,privateKey:o.private_key||null,publicKey:o.peer_public_key||null,server:o.server||null,port:o.server_port||null,address:o.local_address,mtu:o.mtu,amneziaOptionsFromConfig:o.amnezia||null},JSON.stringify(o)))}
function parseFromText(textContent) { /* ... unchanged ... */ return textContent.split(/(?=\[Interface\])|(?=wireguard:\/\/)/g).filter(b=>b.trim()).map(block=>{let rawConfig={},peerComment="";try{if(block.startsWith("wireguard://")){const url=new URL(block),params=new URLSearchParams(url.search);rawConfig={name:decodeURIComponent(url.hash.substring(1))||null,privateKey:decodeURIComponent(url.username)||null,server:url.hostname||null,port:url.port?parseInt(url.port,10):null,publicKey:params.get("publickey")?decodeURIComponent(params.get("publickey")):null,address:params.get("address"),mtu:params.get("mtu")?parseInt(params.get("mtu"),10):null}}else{const lines=block.split("\n").map(l=>l.trim()),interfaceSection={},peerSection={};let currentSection="";lines.forEach(line=>{const lowerLine=line.toLowerCase();if(lowerLine.startsWith("[interface]"))currentSection="Interface";else if(lowerLine.startsWith("[peer]"))currentSection="Peer";else if(line.startsWith("#")&&"Peer"===currentSection){const commentText=line.substring(1).trim();peerComment||(peerComment=commentText)}else if(line.includes("=")){const[key,value]=line.split("=",2).map(s=>s.trim());"Interface"===currentSection?interfaceSection[key.toLowerCase()]=value:"Peer"===currentSection&&(peerSection[key.toLowerCase()]=value)}});const[server,port]=(peerSection.endpoint||"").split(":"),amneziaOpts=interfaceSection.jc&&interfaceSection.jmin&&interfaceSection.jmax?{jc:parseInt(interfaceSection.jc),jmin:parseInt(interfaceSection.jmin),jmax:parseInt(interfaceSection.jmax)}:null;rawConfig={name:peerComment||null,privateKey:interfaceSection.privatekey||null,publicKey:peerSection.publickey||null,server:server||null,port:port?parseInt(port,10):null,address:interfaceSection.address,mtu:interfaceSection.mtu?parseInt(interfaceSection.mtu):null,dns:(interfaceSection.dns||"").split(",").map(d=>d.trim()).filter(Boolean),allowedIps:peerSection.allowedips?peerSection.allowedips.split(",").map(ip=>ip.trim()).filter(Boolean):null,amneziaOptionsFromConfig:amneziaOpts}}return validateAndComplete(rawConfig,block)}catch(e){return{error:!0,reason:"ساختار کانفیگ نامعتبر است",source:block}}})}
function parseAllInputs(textContent) { try { const structuredConfig=jsyaml.load(textContent);if("object"==typeof structuredConfig&&null!==structuredConfig){if(structuredConfig.proxies&&Array.isArray(structuredConfig.proxies))return parseFromMihomo(structuredConfig);if(structuredConfig.outbounds&&Array.isArray(structuredConfig.outbounds))return parseFromSingBox(structuredConfig)}}catch(e){}return parseFromText(textContent)}
function convertWgToMihomo(wgConfig, jcUI, jminUI, jmaxUI, amneziaOption) { /* ... unchanged ... */ const mihomoProxy={name:wgConfig.name,type:"wireguard",server:wgConfig.server,port:wgConfig.port,ip:wgConfig.ip,"private-key":wgConfig.privateKey,"public-key":wgConfig.publicKey,"allowed-ips":wgConfig.allowedIps,udp:!0,mtu:wgConfig.mtu,"remote-dns-resolve":!0};return wgConfig.ipv6&&(mihomoProxy.ipv6=wgConfig.ipv6),wgConfig.dns?.length>0&&(mihomoProxy.dns=wgConfig.dns),"use-config-values"===amneziaOption&&wgConfig.amneziaOptionsFromConfig?mihomoProxy["amnezia-wg-option"]=wgConfig.amneziaOptionsFromConfig:"use-ui-values"===amneziaOption&&(mihomoProxy["amnezia-wg-option"]={jc:jcUI,jmin:jminUI,jmax:jmaxUI,s1:0,s2:0,h1:1,h2:2,h3:3,h4:4}),mihomoProxy}
function processTemplateText(templateText, mihomoProxies) { /* ... unchanged ... */ const proxyBlocks=[],proxyNames=[];return mihomoProxies.forEach(proxy=>{let yamlFrag=jsyaml.dump({proxies:[proxy]},{indent:4,lineWidth:-1,flowLevel:3,noCompatMode:!0});yamlFrag=yamlFrag.replace(/^proxies:\n/,""),yamlFrag=yamlFrag.replace(/^-/,"  -"),proxyBlocks.push(yamlFrag),proxyNames.push(`"${proxy.name}"`)}),templateText.replace(/##_PROXIES_PLACEHOLDER_##/g,proxyBlocks.join("")).replace(/##_PROXY_NAMES_LIST_PLACEHOLDER_##/g,proxyNames.map(n=>`      - ${n}`).join("\n"))}
function downloadFile(filename, content) { /* ... unchanged ... */ const blob=new Blob([content],{type:"application/x-yaml; charset=utf-8;"}),link=document.createElement("a"),url=URL.createObjectURL(blob);link.href=url,link.download=filename,document.body.appendChild(link),link.click(),document.body.removeChild(link),URL.revokeObjectURL(url)}

// --- Action Handlers ---
processInputBtn.addEventListener('click', async function handleProcessInput() {
    messageDiv.classList.add('hidden');
    displayErrorDetails([]);
    showMessage('در حال پردازش ورودی...', 'info');
    
    let errorDetails = [];
    
    // ===== ROBUST INPUT GATHERING =====
    // 1. Get content from file input
    let fileContents = [];
    if (wgConfigFile.files.length > 0) {
        try {
            fileContents = await readFilesAsText(wgConfigFile.files);
        } catch (e) {
            errorDetails.push({ reason: 'خطا در خواندن یکی از فایل‌ها.', source: e.message });
        }
    }

    // 2. Combine with text area content
    let allRawText = [wgConfigInput.value, ...fileContents].join('\n').trim();

    // 3. Get subscription links
    const lines = allRawText.split('\n').map(l => l.trim());
    const urls = lines.filter(l => l.startsWith('http'));
    const nonUrlContent = lines.filter(l => !l.startsWith('http')).join('\n');
    let subscriptionContent = '';

    if (urls.length > 0) {
        showMessage(`در حال دانلود محتوای ${urls.length} لینک...`, 'info');
        const fetchedResults = await fetchSubscriptionContents(urls);
        fetchedResults.forEach(result => {
            if (result.error) errorDetails.push(result);
            else subscriptionContent += `\n${result}`;
        });
    }

    const finalContentToParse = [nonUrlContent, subscriptionContent].join('\n').trim();
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
    
    showMessage(`عملیات انجام شد! (${successfulConfigs.length} کانفیگ اضافه شد، ${errorDetails.length} خطا یافت شد)`, successfulConfigs.length > 0 ? 'success' : 'error');
    displayErrorDetails(errorDetails);

    // Clear all inputs after processing
    wgConfigInput.value = '';
    wgConfigFile.value = ''; // This is crucial for re-uploading the same file
    fileListDiv.innerHTML = '';
});

generateBtn.addEventListener('click', async function handleGenerateAndDownload() {
    // This function remains unchanged as it was already correct.
    messageDiv.classList.add('hidden');
    displayErrorDetails([]);

    const selectedConfigs = Array.from(document.querySelectorAll('#stagedConfigsList input[type="checkbox"]:checked'))
        .map(cb => stagedConfigs[parseInt(cb.value, 10)]);

    if (selectedConfigs.length === 0) {
        showMessage('هیچ کانفیگی برای تولید فایل خروجی انتخاب نشده است!', 'error');
        return;
    }

    const amneziaOption = amneziaOptionSelect.value;
    const selectedProfiles = getSelectedProfiles();

    if (amneziaOption === 'use-ui-values' && selectedProfiles.length === 0) {
        showMessage('حداقل یک پروفایل AmneziaWG باید انتخاب شود!', 'error');
        return;
    }

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

    const allMihomoProxies = [];
    const usedNames = new Set();
    
    selectedConfigs.forEach(baseConfig => {
        if (amneziaOption !== 'use-ui-values') {
            const configCopy = JSON.parse(JSON.stringify(baseConfig));
            let newName = configCopy.name;
            let count = 1;
            while(usedNames.has(newName)) { newName = `${configCopy.name}-${count++}`; }
            configCopy.name = newName;
            usedNames.add(newName);
            
            allMihomoProxies.push(convertWgToMihomo(configCopy, 0, 0, 0, amneziaOption));
        } else {
            selectedProfiles.forEach(profile => {
                const configForThisProfile = JSON.parse(JSON.stringify(baseConfig));
                let jc, jmin, jmax;
                if (profile.value === 'custom') {
                    jc = parseInt(jcInput.value, 10);
                    jmin = parseInt(jminInput.value, 10);
                    jmax = parseInt(jmaxInput.value, 10);
                } else {
                    [jc, jmin, jmax] = profile.value.split(',').map(Number);
                }
                
                let newName = `${configForThisProfile.name} [${profile.dataName}]`.trim();
                let count = 1;
                while (usedNames.has(newName)) {
                    newName = `${configForThisProfile.name} [${profile.dataName}]-${count++}`.trim();
                }
                configForThisProfile.name = newName;
                usedNames.add(newName);
                
                const mihomoProxy = convertWgToMihomo(configForThisProfile, jc, jmin, jmax, amneziaOption);
                allMihomoProxies.push(mihomoProxy);
            });
        }
    });

    if (allMihomoProxies.length === 0) {
        showMessage('هیچ پراکسی برای تولید ایجاد نشد. لطفاً تنظیمات را بررسی کنید.', 'error');
        return;
    }

    try {
        const finalYaml = processTemplateText(baseTemplateContent, allMihomoProxies);
        downloadFile(outputFileName, finalYaml);
        showMessage(`فایل با ${allMihomoProxies.length} پراکسی (از ${selectedConfigs.length} کانفیگ) با موفقیت تولید شد!`, 'success');
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
