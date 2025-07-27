// script.js

// Mapping for country codes to emojis
const countryEmojiMap = {
    "US": "🇺🇸", "DE": "🇩🇪", "NL": "🇳🇱", "CA": "🇨🇦", "GB": "🇬🇧", "FR": "🇫🇷",
    "AU": "🇦🇺", "JP": "🇯🇵", "SG": "🇸🇬", "SE": "🇸🇪", "CH": "🇨🇭", "FI": "🇫🇮",
    "NO": "🇳🇴", "DK": "🇩🇰", "BE": "🇧🇪", "AT": "🇦🇹", "ES": "🇪🇸", "IT": "🇮🇹",
    "PL": "🇵🇱", "CZ": "🇨🇿", "IE": "🇮🇪", "NZ": "🇳🇿", "KR": "🇰🇷", "HK": "🇭🇰",
    "TW": "🇹🇼", "IN": "🇮🇳", "BR": "🇧🇷", "MX": "🇲🇽", "ZA": "🇿🇦", "AE": "🇦🇪",
    "TR": "🇹🇷", "RU": "🇷🇺", "CN": "🇨🇳", "IR": "🇮🇷" // Added Iran
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

let uploadedFilesContent = [];

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
 * Parses Mihomo/Hiddify-like YAML/JSON config.
 * @param {string} yamlOrJsonText - The config text in YAML or JSON format.
 * @returns {Array<object>|null} Array of parsed WireGuard config objects, or null if parsing fails.
 */
function parseMihomoConfig(yamlOrJsonText) {
    try {
        const config = jsyaml.load(yamlOrJsonText); // js-yaml can parse JSON too
        let configList = [];

        if (config && config.proxies && Array.isArray(config.proxies)) {
            configList = config.proxies;
        } else if (config && config.outbounds && Array.isArray(config.outbounds)) { // For Hiddify-like JSON
            configList = config.outbounds;
        } else {
            return null; // Not a valid Mihomo/Hiddify config or no relevant lists
        }

        const parsedConfigs = [];
        configList.forEach(proxy => {
            if (proxy.type === 'wireguard') {
                let ipv4 = '';
                let ipv6 = '';
                if (Array.isArray(proxy.local_address)) {
                    proxy.local_address.forEach(addr => {
                        if (addr.includes(':')) {
                            ipv6 = addr.split('/')[0];
                        } else if (addr.includes('.')) {
                            ipv4 = addr.split('/')[0];
                        }
                    });
                } else if (typeof proxy.local_address === 'string') {
                    const addrs = proxy.local_address.split(',').map(a => a.trim());
                    addrs.forEach(addr => {
                        if (addr.includes(':')) {
                            ipv6 = addr.split('/')[0];
                        } else if (addr.includes('.')) {
                            ipv4 = addr.split('/')[0];
                        }
                    });
                }

                const wgConfig = {
                    name: proxy.name || proxy.tag || "WG Proxy", // Hiddify uses 'tag'
                    privateKey: proxy['private_key'] || proxy['private-key'], // Hiddify uses 'private_key'
                    address: ipv4,
                    ipv6: ipv6,
                    dns: proxy.dns || [],
                    publicKey: proxy['peer_public_key'] || proxy['public-key'], // Hiddify uses 'peer_public_key'
                    server: proxy.server,
                    port: proxy['server_port'] || proxy.port, // Hiddify uses 'server_port'
                    allowedIps: proxy['allowed_ips'] || proxy['allowed-ips'] || ['0.0.0.0/0', '::/0'],
                    mtu: proxy.mtu || 1420,
                    reserved: proxy.reserved || [],
                    persistentKeepalive: proxy['persistent_keepalive'] || proxy['persistent-keepalive'] || 0,
                };

                if (proxy['amnezia-wg-option']) {
                    wgConfig.amneziaOptions = {
                        jc: proxy['amnezia-wg-option'].jc,
                        jmin: proxy['amnezia-wg-option'].jmin,
                        jmax: proxy['amnezia-wg-option'].jmax,
                        s1: proxy['amnezia-wg-option'].s1,
                        s2: proxy['amnezia-wg-option'].s2,
                        h1: proxy['amnezia-wg-option'].h1,
                        h2: proxy['amnezia-wg-option'].h2,
                        h3: proxy['amnezia-wg-option'].h3,
                        h4: proxy['amnezia-wg-option'].h4,
                    };
                } else {
                    wgConfig.amneziaOptions = null;
                }

                if (wgConfig.privateKey && (wgConfig.address || wgConfig.ipv6) && wgConfig.publicKey && wgConfig.server && wgConfig.port) {
                    parsedConfigs.push(wgConfig);
                } else {
                    console.warn('Incomplete WireGuard proxy (Mihomo/Hiddify-like) found:', proxy);
                }
            }
        });
        return parsedConfigs;
    } catch (e) {
        console.error('Error parsing Mihomo/Hiddify-like YAML/JSON:', e);
        return null; // Indicates parsing failure
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
 * Main function to handle generation and download.
 */
async function handleGenerate() {
    const jc = parseInt(jcInput.value, 10);
    const jmin = parseInt(jminInput.value, 10);
    const jmax = parseInt(jmaxInput.value, 10);
    const amneziaOption = amneziaOptionSelect.value;
    let outputFileName = outputFileNameInput.value.trim(); // Get filename without extension

    // Automatically add .yaml extension if not present
    if (!outputFileName.endsWith('.yaml') && !outputFileName.endsWith('.yml')) {
        outputFileName += '.yaml';
    }

    const selectedTemplateKey = templateSelect.value;
    
    // Dynamically fetch the selected template content
    const templatePath = `./config-templates/${selectedTemplateKey}.yaml`;
    let baseTemplateContent;
    try {
        const response = await fetch(templatePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        baseTemplateContent = await response.text();
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

    // --- Input Detection and Parsing ---
    let parsedFromMihomo = false;

    // Try parsing as Mihomo/Hiddify YAML/JSON first
    const combinedContent = textAreaContent + '\n' + uploadedFiles.join('\n');
    const mihomoParsed = parseMihomoConfig(combinedContent);
    if (mihomoParsed !== null && mihomoParsed.length > 0) {
        allWgConfigs = mihomoParsed;
        parsedFromMihomo = true;
    }

    // If not parsed from Mihomo/Hiddify, or no configs found there, try parsing as raw WG configs/URIs
    if (!parsedFromMihomo) {
        // Process text area input as raw WG configs/URIs
        if (textAreaContent) {
            // Split by common WG block/URI delimiters
            const blocks = textAreaContent.split(/(?=\[Interface\])|(?=wireguard:\/\/)/g).filter(block => block.trim() !== '');
            blocks.forEach(block => {
                const parsed = parseWireGuardConfigBlockOrUri(block.trim());
                if (parsed) {
                    allWgConfigs.push(parsed);
                }
            });
        }

        // Process uploaded files content as raw WG configs/URIs
        for (const fileContent of uploadedFiles) {
            const blocks = fileContent.split(/(?=\[Interface\])|(?=wireguard:\/\/)/g).filter(block => block.trim() !== '');
            blocks.forEach(block => {
                const parsed = parseWireGuardConfigBlockOrUri(block.trim());
                if (parsed) {
                    allWgConfigs.push(parsed);
                }
            });
        }
    }


    if (allWgConfigs.length === 0) {
        showMessage('هیچ کانفیگ WireGuard معتبری یافت نشد. لطفاً ورودی را بررسی کنید.', 'error');
        return;
    }

    // Ensure unique names for proxies
    const usedNames = new Set();
    allWgConfigs.forEach((config, index) => {
        let baseName = config.name.trim();
        // Check if the name is empty, or contains generic terms like "WG Proxy" or "Wireguard"
        if (!baseName || baseName.toLowerCase().includes('wg proxy') || baseName.toLowerCase().includes('wireguard')) {
            // Try to use server IP as a base for more specific naming if available
            if (config.server) {
                baseName = `WG-${config.server.replace(/\./g, '-')}`; // e.g., WG-188-114-99-59
            } else {
                baseName = "WG Proxy"; // Fallback if no server IP
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
        proxyNames.push(mihomoProxy.name);
    });

    // Parse the selected base template
    let mihomoConfig = jsyaml.load(baseTemplateContent);

    // Insert generated proxies into the template's 'proxies' section
    mihomoConfig.proxies = mihomoProxies;

    // Update 'proxy-groups' with the list of generated proxy names
    if (mihomoConfig['proxy-groups'] && Array.isArray(mihomoConfig['proxy-groups'])) {
        mihomoConfig['proxy-groups'].forEach(group => {
            // Find groups that should contain the dynamic proxy list
            if (group.name === "دستی 🤏🏻" || group.name === "خودکار (بهترین پینگ) 🤖") {
                group.proxies = proxyNames;
            }
        });
    }

    try {
        // Convert JS object to YAML string
        const yamlString = jsyaml.dump(mihomoConfig, { indent: 2, lineWidth: -1 }); // lineWidth: -1 for no line wrapping
        downloadFile(outputFileName, yamlString);
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
