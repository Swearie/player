/**
 * KillYourIdol v6.2 Stable - Core Script
 * Merged logic: Old Index stability + New Features
 * Feature: Resume Last Channel on Startup
 */

const DEFAULT_SOURCES_URLS = [
    "https://d15umi5iaezxgx.cloudfront.net/LA7D/DRM/DASH-B/Live.mpd",
    "https://dash2.antik.sk/live/test_rai_uno_tizen/playlist.m3u8",
    "https://iptv-org.github.io/iptv/index.m3u",
    "https://amg00793-amg00793c23-samsung-it-4780.playouts.now.amagi.tv/playlist/amg00793-bbcstudios-bbcearthitaly-samsungit/playlist.m3u8",
    "https://cachehsi1a.netplus.ch/tok_eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNzY3NTc1MTA0Iiwic2lwIjoiIiwicGF0aCI6Ii9saXZlL2Vkcy9yYWkxL2Jyb3dzZXItSExTOC8iLCJzZXNzaW9uX2Nkbl9pZCI6ImRkMWNhOTRiMTI1N2FhNGMiLCJzZXNzaW9uX2lkIjoiIiwiY2xpZW50X2lkIjoiIiwiZGV2aWNlX2lkIjoiIiwibWF4X3Nlc3Npb25zIjowLCJzZXNzaW9uX2R1cmF0aW9uIjowLCJ1cmwiOiJodHRwczovLzEwLjAuMjI5LjE4Iiwic2Vzc2lvbl90aW1lb3V0IjowLCJhdWQiOiI0MSIsInNvdXJjZXMiOlsxMDBdfQ==.3fWbzZ_DMgP2VuhzgPMBL2WcGJjnDg-belqywHI45SKYfov5FqYx0oMcbEszCRlW6s3j-PpSDKzFxf4tbepXTA==/live/eds/rai1/browser-HLS8/rai1.m3u8",
    "http://davidefulgione.it/tivu.m3u",
    "https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/608aa7d8359b270007861489/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1&advertisingId=channel&e",
    "https://raw.githubusercontent.com/Free-TV/IPTV/refs/heads/master/playlists/playlist_italy.m3u8",
    "https://raw.githubusercontent.com/Brenders/Pluto-TV-Italia-M3U/main/PlutoItaly.m3u",
    "https://gist.githubusercontent.com/greenarw/efa4568ed2fa2e53a1aec9073d027243/raw/7a50a2c1643d1548971928aebdd9e906a2043b9f/tv_italia.m3u",
    "https://gist.githubusercontent.com/ottagdotcom/78aaba86229e98156e9d4a5cd643fe1c/raw/70b17e59d60b20cf420701cca58f186166102245/canali.m3u",
    "https://maginetweb-arch.github.io/tileoplayer/tvita.m3u",
    "https://raw.githubusercontent.com/maginetweb-arch/TVITALIA/refs/heads/main/iptvit.m3u",
    "https://killyouridol.altervista.org/lista.m3u",
    "https://raw.githubusercontent.com/Tundrak/IPTV-Italia/main/iptvitaplus.m3u",
    "https://raw.githubusercontent.com/LITUATUI/M3U-IPTV/main/channels/it.m3u",
    "https://iptv-org.github.io/iptv/countries/it.m3u",
    "https://raw.githubusercontent.com/itv-resurrected/itv/main/itv.m3u",
    "https://d31mw7o1gs0dap.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-y5pbi2sq9r609/NOVE_IT.m3u8",
    "https://d3562mgijzx0zq.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-kizqtzpvvl3i8/Realtime_IT.m3u8",
    "https://dk3okdd5036kz.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-o4pw0nc02sthz/Foodnetwork_IT.m3u8",
    "https://d24aqelmrau4kx.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-l1oas691aj7p2/WBTV_IT.m3u8",
    "https://d9fqo6nfqlv2h.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-ulukbrgm1n3yb/Giallo_IT.m3u8",
    "https://d1pmpe0hs35ka5.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-39hsskpppgf72/K2_IT.m3u8",
    "https://d6m7lubks416z.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-zmbstsedxme9s/Frisbee_IT.m3u8",
    "https://d2j2nqgg7bzth.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-02k1gv1j0ufwn/DMAX_IT.m3u8",
    "https://d1tidto9vz737l.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-joaw4f4kh2en1/HGTV_IT.m3u8",
    "https://d205m6k582pec4.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-asg5puyzdtnqu/Motortrend_IT.m3u8",
    "https://hlslive-web-gcdn-skycdn-it.akamaized.net/TACT/12221/web/master.m3u8",
    "https://hlslive-web-gcdn-skycdn-it.akamaized.net/TACT/11223/tv8web/master.m3u8",
    "https://hlslive-web-gcdn-skycdn-it.akamaized.net/TACT/11219/cieloweb/master.m3u8",
    "https://live-embed.supertennix.hiway.media/restreamer/supertennix_client/gpu-a-c0-16/restreamer/outgest/aa3673f1-e178-44a9-a947-ef41db73211a/manifest.m3u8",
];

const LCN_MAP = {
    'rai 1': 1, 'rai 2': 2, 'rai 3': 3, 'rete 4': 4, 'canale 5': 5, 'italia 1': 6, 'la7': 7, 'tv8': 8, 'nove': 9,
    '20 mediaset': 20, 'rai 4': 21, 'iris': 22, 'rai 5': 23, 'rai movie': 24, 'rai premium': 25, 'cielo': 26,
    'twentyseven': 27, 'tv2000': 28, 'la7d': 29, 'la5': 30, 'real time': 31, 'qvc': 32, 'food network': 33,
    'cine34': 34, 'focus': 35, 'rtl 102.5': 36, 'warner tv': 37, 'giallo': 38, 'top crime': 39, 'boing': 40,
    'k2': 41, 'rai gulp': 42, 'rai yoyo': 43, 'frisbee': 44, 'boing plus': 45, 'cartoonito': 46, 'super!': 47,
    'rai news 24': 48, 'mediaset italia 2': 49, 'tgcom24': 51, 'dmax': 52, 'rai storia': 54, 'mediaset extra': 55,
    'motor trend': 59, 'sportitalia': 60, 'supertennix': 64, 'radio italia tv': 70, 'kiss kiss tv': 72
};

const DEFAULT_VISUALS = {
    bodyBg: '#000000', textColor: '#d1d5db', accentColor: '#3b82f6',
    glassR: 10, glassG: 15, glassB: 28,
    glassAlpha: 0.1, glassBlur: 25, glassSaturate: 180, glassBorderAlpha: 0.08, glassBorderColor: '#ffffff',
    btnBgColor: '#0a0f1c', btnBgAlpha: 0.35, btnBorderColor: '#ffffff', btnBorderAlpha: 0.1, btnHoverBg: '#3b82f6', btnHoverAlpha: 0.2,
    vignetteColor: '#000000', vignetteAlpha: 0.8, vignetteStart: 20, vignetteEnd: 100,
    wmBgColor: '#ffffff', wmBgAlpha: 0.1, wmOpacity: 0.8, wmScale: 100, wmBlur: 5, wmScreenshot: false, wmPadding: 10, wmRadius: 12,
    loaderLogoScale: 60, loaderLogoOpacity: 1,
    fontFamily: 'Inter', fontTitle: 30, fontBase: 14, fontUi: 10,
    thumbSize: 16, thumbBgColor: '#ffffff', trackHeight: 4,
    radiusPanel: 24, radiusBtn: 16, radiusInput: 12, spacingBase: 16, spacingLg: 40, animSpeed: 400,
    drawerWidth: 380, drawerBgAlpha: 0.6, drawerItemGap: 8, drawerItemRadius: 12, drawerActiveBg: '#3b82f6', drawerActiveAlpha: 0.2, drawerPillRadius: 8
};

const state = {
    deviceId: '', sources: [], favorites: [], customLists: [], drm: {}, channels: [], 
    categories: new Set(['Tutti']), current: null, currentSourceIndex: 0, engine: 'auto',
    unlockSeq: '', drawerTab: 'channels', activeCategory: 'Tutti', activeListId: null,
    uiTimeout: null, isUiVisible: true, isUnlocked: false, isMouseOverControls: false, 
    playRandomOnStart: false, channelPrefs: {}, visuals: { ...DEFAULT_VISUALS },
    lcnBuffer: '', lcnTimeout: null, lcnOverrides: {}, initialCss: '', lastChannelId: null
};

const video = document.getElementById('main-video');
let playerHls = null, playerDash = null, playerShaka = null;
let signalTimer = null;
let retryTimer = null;

// --- INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    initCssEditor();
    initState();
    initVisualSliders();
    lucide.createIcons();
    
    // Check Cache logic akin to old version
    const cachedChannels = localStorage.getItem('kyi_channels_cache');
    if (cachedChannels) {
        try {
            const parsed = JSON.parse(cachedChannels);
            if (parsed && parsed.length > 0) {
                state.channels = parsed;
                processChannelsForUI();
                // STARTUP STRATEGY: IMMEDIATE
                performStartupCheck(); 
            }
        } catch(e) { console.error("Cache corrupted", e); }
    }
    
    // Always load fresh channels in background or foreground if no cache
    loadChannels(false, !!cachedChannels);
    
    setupInteractions();
    setupEventListeners();
});

function initState() {
    let id = localStorage.getItem('kyi_device_id');
    if (!id) {
        const random = Math.random().toString(36).substring(2, 10).toUpperCase();
        id = `WEB-${random}`;
        localStorage.setItem('kyi_device_id', id);
    }
    state.deviceId = id;
    if(document.getElementById('device-id-display')) document.getElementById('device-id-display').innerText = `DEV: ${id}`;
    if(document.getElementById('sidebar-device-id')) document.getElementById('sidebar-device-id').innerText = id;

    const savedSources = JSON.parse(localStorage.getItem('kyi_sources_v3'));
    state.sources = (savedSources && Array.isArray(savedSources)) ? savedSources : DEFAULT_SOURCES_URLS.map(url => ({ url, label: 'Default', color: '#333333' }));
    
    state.favorites = JSON.parse(localStorage.getItem('kyi_favs')) || [];
    state.customLists = JSON.parse(localStorage.getItem('kyi_custom_lists')) || [];
    state.drm = JSON.parse(localStorage.getItem('kyi_drm')) || {};
    state.playRandomOnStart = JSON.parse(localStorage.getItem('kyi_random_start')) || false;
    state.channelPrefs = JSON.parse(localStorage.getItem('kyi_channel_prefs')) || {};
    state.lcnOverrides = JSON.parse(localStorage.getItem('kyi_lcn_overrides')) || {};
    state.lastChannelId = localStorage.getItem('kyi_last_channel'); // Restore last channel
    
    const savedVisuals = JSON.parse(localStorage.getItem('kyi_visuals'));
    if(savedVisuals) state.visuals = { ...state.visuals, ...savedVisuals };
    applyVisualSettings();
    
    const toggle = document.getElementById('toggle-random-start');
    if(toggle) {
        toggle.checked = state.playRandomOnStart;
        toggle.onchange = (e) => {
            state.playRandomOnStart = e.target.checked;
            localStorage.setItem('kyi_random_start', JSON.stringify(state.playRandomOnStart));
        };
    }
}

// --- CORE CHANNEL LOADING ---

async function loadChannels(isReload = false, isBackground = false) {
    if(isReload || !isBackground) {
        document.getElementById('loader').classList.remove('hidden');
        document.getElementById('loader-status').innerText = isReload ? "Aggiornamento Sorgenti..." : "Caricamento...";
    }
    
    // Simula tempo di caricamento per UX (come nella vecchia versione)
    const progressCircle = document.getElementById('loader-progress');
    const circumference = 440; 
    progressCircle.style.strokeDashoffset = circumference;
    
    let allRawChannels = [];
    const promises = state.sources.map(async (src) => {
        try {
            if(src.url.endsWith('.m3u8') || src.url.endsWith('.mpd')) {
                let name = src.url.split('/').pop().split('.')[0];
                return [{ name: name, logo: "", category: "Single Streams", url: src.url }];
            }
            // Try direct fetch
            let content = null;
            try {
                const res = await fetch(src.url, { signal: AbortSignal.timeout(5000) });
                if(res.ok) content = await res.text();
            } catch(e) {}
            
            // Fallback proxy
            if(!content) {
                const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(src.url)}`;
                const res = await fetch(proxy);
                const data = await res.json();
                content = data.contents;
            }
            return parseM3U(content);
        } catch(e) { return []; }
    });

    const results = await Promise.all(promises);
    results.forEach(channels => { allRawChannels = allRawChannels.concat(channels); });
    
    // Processing & Deduplication
    const grouped = {};
    const categories = new Set();
    allRawChannels.forEach(ch => {
        let cleanName = ch.name.trim();
        const key = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (ch.category && ch.category !== 'Altri') categories.add(ch.category);
        
        // Auto-assign LCN
        let lcn = LCN_MAP[cleanName.toLowerCase()];
        if(!lcn) {
             for (const [mapName, num] of Object.entries(LCN_MAP)) {
                if (cleanName.toLowerCase().startsWith(mapName)) { lcn = num; break; }
            }
        }

        if (!grouped[key]) { 
            grouped[key] = { id: key, name: cleanName, logo: ch.logo, category: ch.category, urls: [ch.url], lcn: lcn || 9999 }; 
        } else { 
            if (!grouped[key].urls.includes(ch.url)) grouped[key].urls.push(ch.url);
            if(lcn && grouped[key].lcn === 9999) grouped[key].lcn = lcn;
        }
    });

    const newChannels = Object.values(grouped).sort((a,b) => {
        if(a.lcn !== b.lcn) return a.lcn - b.lcn;
        return a.name.localeCompare(b.name);
    });

    if (newChannels.length > 0) {
        state.channels = newChannels;
        localStorage.setItem('kyi_channels_cache', JSON.stringify(state.channels));
        processChannelsForUI();
    }

    if (!isBackground) {
        // STARTUP STRATEGY (If not already played by cache)
        if(!state.current) performStartupCheck();
        
        // OLD VERSION BEHAVIOR: Force wait to ensure stability
        setTimeout(() => {
            anime({
                targets: '#loader', opacity: 0, scale: 1.1, duration: 800, easing: 'easeInExpo',
                complete: () => {
                    document.getElementById('loader').classList.add('hidden');
                    document.getElementById('loader').style.opacity = 1;
                    document.getElementById('loader').style.transform = 'none';
                }
            });
        }, 2500); // 2.5s Delay as requested
    }
}

// --- STARTUP LOGIC (THE FIX) ---
function performStartupCheck() {
    let target = null;

    // 1. Check Last Channel (Priority)
    if (state.lastChannelId) {
        target = state.channels.find(c => c.id === state.lastChannelId);
    }

    // 2. Check Random (If enabled and no last channel found)
    if (!target && state.playRandomOnStart) {
        let pool = state.channels.filter(c => state.favorites.includes(c.id));
        if (pool.length === 0) pool = state.channels;
        if (pool.length > 0) target = pool[Math.floor(Math.random() * pool.length)];
    }

    // 3. Fallback (First channel) - Optional, mainly to not show blank
    if (!target && state.channels.length > 0) {
        // Uncomment to force play first channel if nothing else
        // target = state.channels[0]; 
    }

    if (target) {
        console.log("Startup: Playing", target.name);
        // We pass 'true' for isRetry to suppress immediate "No Signal" overlay during startup
        playChannel(target, null, true).catch(err => {
            console.warn("Startup autoplay blocked, retrying muted.");
            video.muted = true;
            playChannel(target, null, true);
        });
    }
}

function processChannelsForUI() {
    state.categories = new Set(['Tutti', 'Preferiti', ...new Set(state.channels.map(c => c.category).filter(c => c && c !== 'Altri'))]);
    renderCategoryPills();
    renderDrawer();
    renderSettings();
}

function parseM3U(raw) {
    if(!raw) return [];
    const lines = raw.replace(/\r\n/g, '\n').split('\n');
    let results = [], current = {};
    lines.forEach(l => {
        l = l.trim();
        if (l.startsWith('#EXTINF:')) {
            const info = l.split(',');
            current.name = info[info.length - 1].trim();
            current.logo = l.match(/tvg-logo="([^"]+)"/)?.[1] || "";
            current.category = l.match(/group-title="([^"]+)"/i)?.[1] || "Altri";
        } else if (l && !l.startsWith('#')) {
            current.url = l;
            if(current.name) results.push({...current});
            current = {};
        }
    });
    return results;
}

// --- PLAYBACK ENGINE ---

async function playChannel(ch, sourceIndex = null, isStartup = false) {
    state.current = ch;
    localStorage.setItem('kyi_last_channel', ch.id); // SAVE LAST CHANNEL

    if (sourceIndex === null) {
        const prefs = state.channelPrefs[ch.id];
        if (prefs) {
            sourceIndex = prefs.source;
            if (prefs.engine) state.engine = prefs.engine;
        } else {
            sourceIndex = 0;
            state.engine = 'auto'; 
        }
    }
    if (sourceIndex >= ch.urls.length) sourceIndex = 0;
    state.currentSourceIndex = sourceIndex;

    // Reset UI
    document.getElementById('no-signal-overlay').classList.add('hidden');
    document.getElementById('no-signal-video').pause();
    clearTimeout(signalTimer);
    clearInterval(retryTimer);
    
    // UI Updates
    document.getElementById('display-name').innerHTML = `${(ch.lcn && ch.lcn < 1000) ? `<span class="text-blue-500 mr-2 font-mono">${ch.lcn}</span>` : ''}${ch.name}`;
    document.getElementById('current-category-badge').innerText = ch.category;
    
    const logoEl = document.getElementById('logo-content');
    if(ch.logo) {
        logoEl.innerHTML = `<img src="${ch.logo}" class="w-full h-full object-contain p-4 relative z-10">`;
        document.getElementById('glow-background').style.backgroundImage = `url('${ch.logo}')`;
    } else {
        logoEl.innerHTML = '<i data-lucide="tv-2" class="w-10 h-10 text-white/10"></i>';
        document.getElementById('glow-background').style.backgroundImage = 'none';
    }
    document.getElementById('current-fav-btn').classList.toggle('text-yellow-500', state.favorites.includes(ch.id));
    renderSourceButtons();

    // Destroy Previous
    if (playerHls) { playerHls.destroy(); playerHls = null; }
    if (playerDash) { playerDash.reset(); playerDash = null; }
    if (playerShaka) { await playerShaka.destroy(); playerShaka = null; }
    video.pause(); video.removeAttribute('src'); video.load();

    const drm = state.drm[ch.id];
    document.getElementById('btn-drm-trigger').classList.toggle('hidden', !drm);
    document.getElementById('decoder-badge').classList.toggle('hidden', !drm);

    // Setup No Signal Timer (longer delay if startup)
    const timeoutDuration = isStartup ? 8000 : 5000; 
    signalTimer = setTimeout(() => {
        const nsOverlay = document.getElementById('no-signal-overlay');
        nsOverlay.classList.remove('hidden');
        document.getElementById('no-signal-video').play().catch(()=>{});
        
        // Auto-retry loop
        retryTimer = setInterval(() => {
            console.log("Auto-retrying channel...");
            playChannel(ch, sourceIndex, true); // Keep isStartup/Retry flag to avoid endless overlay loops
        }, 5000);
    }, timeoutDuration);

    const onPlay = () => {
        clearTimeout(signalTimer);
        clearInterval(retryTimer);
        document.getElementById('no-signal-overlay').classList.add('hidden');
        document.getElementById('no-signal-video').pause();
        video.removeEventListener('playing', onPlay);
    };
    video.addEventListener('playing', onPlay);

    const url = ch.urls[sourceIndex];
    let eng = state.engine;
    if(eng === 'auto') {
        if(drm) eng = 'shaka';
        else if(url.includes('.mpd')) eng = 'shaka';
        else if(url.includes('.m3u8')) eng = 'hls';
        else eng = 'native';
    }

    try {
        if(eng === 'shaka') {
            playerShaka = new shaka.Player(video);
            if(drm) playerShaka.configure({ drm: { clearKeys: { [drm.kid]: drm.key } } });
            await playerShaka.load(url);
        } else if(eng === 'hls' && Hls.isSupported()) {
            playerHls = new Hls();
            playerHls.loadSource(url);
            playerHls.attachMedia(video);
        } else if(eng === 'dash') {
            playerDash = dashjs.MediaPlayer().create();
            playerDash.initialize(video, url, true);
        } else {
            video.src = url;
        }
        await video.play();
    } catch(e) {
        console.error("Play error", e);
    }
    
    updateEngineUI(state.engine);
    saveChannelPrefs(ch.id, state.engine, sourceIndex);
    lucide.createIcons();
    showUi();
}

// --- UI HELPERS ---

function renderSourceButtons() {
    const c = document.getElementById('source-switches');
    c.innerHTML = '';
    if(state.current && state.current.urls.length > 1) {
        state.current.urls.forEach((_, idx) => {
            const b = document.createElement('button');
            const active = idx === state.currentSourceIndex;
            b.className = `w-8 h-8 rounded-lg text-[10px] font-black border flex items-center justify-center transition-all shrink-0 ${active ? 'source-btn-active' : 'bg-white/5 border-white/10 text-white/50 hover:text-white'}`;
            b.innerText = idx + 1;
            b.onclick = (e) => { e.stopPropagation(); playChannel(state.current, idx); };
            c.appendChild(b);
        });
    }
}

// ... Rest of UI functions (Drawer, Settings, CSS Editor) kept same as previous versions ...

function renderCategoryPills() {
    const c = document.getElementById('category-pills');
    c.innerHTML = '';
    state.categories.forEach(cat => {
        const b = document.createElement('button');
        b.className = `category-btn px-4 py-2 rounded-lg text-[10px] font-black uppercase whitespace-nowrap border transition-all ${state.activeCategory === cat ? 'category-active text-white' : 'text-white/40 hover:text-white'} dyn-radius-btn`;
        b.innerText = cat;
        b.onclick = (e) => { e.stopPropagation(); state.activeCategory = cat; renderCategoryPills(); renderDrawer(); };
        c.appendChild(b);
    });
}

function renderDrawer() {
    const list = document.getElementById('drawer-list');
    list.innerHTML = '';
    
    if(state.drawerTab === 'channels') {
        const search = document.getElementById('channel-search').value.toLowerCase();
        let items = state.channels.filter(c => c.name.toLowerCase().includes(search));
        if(state.activeCategory === 'Preferiti') items = items.filter(c => state.favorites.includes(c.id));
        else if(state.activeCategory !== 'Tutti') items = items.filter(c => c.category === state.activeCategory);
        
        if(items.length === 0) list.innerHTML = '<div class="text-center text-white/20 text-xs py-10">Nessun canale</div>';
        else items.forEach(ch => renderChannelItem(ch, list));
    } else {
        // Lists Logic
        if (state.activeListId === null) {
            if(state.customLists.length === 0) list.innerHTML = '<div class="text-center text-white/20 text-xs py-10">Nessuna lista</div>';
            else state.customLists.forEach(l => {
                const d = document.createElement('div');
                d.className = "flex items-center justify-between p-4 glass-panel rounded-2xl border border-white/5 hover:bg-white/5 cursor-pointer dyn-radius-panel";
                d.innerHTML = `<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500"><i data-lucide="list" class="w-5 h-5"></i></div><div><h3 class="text-xs font-black uppercase text-white">${l.name}</h3><p class="text-[9px] text-white/40 font-mono">${l.channelIds.length} Canali</p></div></div><div class="flex items-center gap-2"><button onclick="deleteCustomList('${l.id}', event)" class="p-2 text-white/20 hover:text-red-500"><i data-lucide="trash-2" class="w-4 h-4"></i></button><i data-lucide="chevron-right" class="w-4 h-4 text-white/20"></i></div>`;
                d.onclick = (e) => { if(!e.target.closest('button')) { state.activeListId = l.id; renderDrawer(); }};
                list.appendChild(d);
            });
        } else {
            const l = state.customLists.find(x => x.id === state.activeListId);
            if(!l) { state.activeListId = null; renderDrawer(); return; }
            const h = document.createElement('div');
            h.className = "flex items-center gap-2 mb-4 pb-4 border-b border-white/5";
            h.innerHTML = `<button onclick="state.activeListId=null;renderDrawer()" class="p-2 bg-white/5 rounded-lg text-white/50 hover:text-white"><i data-lucide="arrow-left" class="w-4 h-4"></i></button><span class="text-xs font-black uppercase text-white italic">${l.name}</span>`;
            list.appendChild(h);
            const items = state.channels.filter(c => l.channelIds.includes(c.id));
            if(items.length === 0) list.innerHTML += '<div class="text-center text-white/20 text-xs py-10">Lista vuota</div>';
            else items.forEach(ch => renderChannelItem(ch, list, true));
        }
    }
    lucide.createIcons();
}

function renderChannelItem(ch, container, isRemovable = false) {
    const active = state.current?.id === ch.id;
    const fav = state.favorites.includes(ch.id);
    const div = document.createElement('div');
    div.className = `channel-item flex items-center gap-3 p-3 cursor-pointer transition-all border border-transparent hover:bg-white/5 ${active ? 'channel-active-custom border-white/10' : ''}`;
    
    const action = isRemovable ? 
        `<button onclick="removeFromCurrentList('${ch.id}', event)" class="p-2 text-white/20 hover:text-red-500"><i data-lucide="minus-circle" class="w-4 h-4"></i></button>` :
        `<button onclick="toggleFavorite('${ch.id}', event)" class="p-2 transition-colors ${fav ? 'text-yellow-500' : 'text-white/10 hover:text-yellow-500'}"><i data-lucide="star" class="w-4 h-4 ${fav ? 'fill-current' : ''}"></i></button>`;

    div.innerHTML = `
        ${(ch.lcn && ch.lcn < 1000) ? `<span class="min-w-[1.5rem] text-center text-[9px] font-mono font-bold text-white/30 border border-white/10 rounded px-1">${ch.lcn}</span>` : ''}
        <div class="w-10 h-7 bg-black rounded flex items-center justify-center overflow-hidden border border-white/5 shrink-0">${ch.logo ? `<img src="${ch.logo}" class="w-full h-full object-contain">` : '<i data-lucide="tv" class="w-3 h-3 opacity-20"></i>'}</div>
        <div class="flex-1 min-w-0 flex flex-col"><span class="text-[10px] font-black uppercase truncate italic block ${active ? 'text-blue-500' : 'text-white/60'}">${ch.name}</span><span class="text-[8px] text-white/30 truncate">${ch.category}</span></div>
        ${action}
    `;
    div.onclick = (e) => { if(!e.target.closest('button')) playChannel(ch); };
    container.appendChild(div);
}

// --- STANDARD FUNCTIONS (Settings, CSS, Utils) ---

function initCssEditor() {
    const tag = document.getElementById('core-css');
    const editor = document.getElementById('custom-css-editor');
    state.initialCss = tag ? tag.innerHTML : '';
    const saved = localStorage.getItem('kyi_custom_css');
    if(saved && tag) { tag.innerHTML = saved; if(editor) editor.value = saved; }
    else if(editor) editor.value = state.initialCss;
}
function applyCss() {
    const v = document.getElementById('custom-css-editor').value;
    document.getElementById('core-css').innerHTML = v;
    localStorage.setItem('kyi_custom_css', v);
}
function resetCss() {
    if(confirm("Reset CSS?")) {
        localStorage.removeItem('kyi_custom_css');
        document.getElementById('core-css').innerHTML = state.initialCss;
        document.getElementById('custom-css-editor').value = state.initialCss;
    }
}

function setupEventListeners() {
    document.getElementById('btn-engine-toggle').onclick = (e) => { e.stopPropagation(); document.getElementById('engine-menu').classList.toggle('hidden'); };
    document.getElementById('play-pause-btn').onclick = (e) => { e.stopPropagation(); if(video.paused) { video.play(); } else { video.pause(); } };
    document.getElementById('volume-slider').oninput = (e) => { video.volume = e.target.value / 100; };
    document.getElementById('channel-search').oninput = renderDrawer;
    
    // Keyboard
    document.addEventListener('keydown', (e) => {
        if(e.target.tagName === 'INPUT') return;
        if(/^\d$/.test(e.key)) {
            state.lcnBuffer += e.key;
            updateLcnOverlay();
            clearTimeout(state.lcnTimeout);
            state.lcnTimeout = setTimeout(() => {
                const lcn = parseInt(state.lcnBuffer);
                state.lcnBuffer = '';
                updateLcnOverlay();
                const ch = state.channels.find(c => c.lcn === lcn);
                if(ch) playChannel(ch);
            }, 3000);
        }
    });
}

function updateLcnOverlay() {
    const ov = document.getElementById('lcn-overlay');
    const disp = document.getElementById('lcn-display');
    if(state.lcnBuffer) { ov.style.opacity=1; ov.style.transform='scale(1)'; disp.innerText = state.lcnBuffer; }
    else { ov.style.opacity=0; ov.style.transform='scale(0.9)'; }
}

function setupInteractions() {
    const touch = document.getElementById('video-touch-zone');
    touch.addEventListener('mousemove', showUi);
    touch.addEventListener('click', () => { if(!state.isUiVisible) showUi(); });
    touch.addEventListener('dblclick', toggleFullScreen);
}

function showUi() {
    clearTimeout(state.uiTimeout);
    state.isUiVisible = true;
    document.getElementById('main-content').classList.remove('ui-hidden');
    document.getElementById('video-touch-zone').style.cursor = 'default';
    state.uiTimeout = setTimeout(() => {
        if(!video.paused && !state.isMouseOverControls && document.getElementById('channel-drawer').classList.contains('translate-x-full')) {
            state.isUiVisible = false;
            document.getElementById('main-content').classList.add('ui-hidden');
            document.getElementById('video-touch-zone').style.cursor = 'none';
        }
    }, 4000);
}

// Exports
window.toggleSidebar = () => document.getElementById('sidebar').classList.toggle('-translate-x-full');
window.toggleDrawer = () => document.getElementById('channel-drawer').classList.toggle('translate-x-full');
window.showTab = (t) => {
    if(t==='settings') { renderSettings(); document.getElementById('view-settings').classList.remove('hidden'); setTimeout(()=>document.getElementById('view-settings').classList.remove('settings-ghost'), 10); }
    else document.getElementById('view-settings').classList.add('hidden');
    document.getElementById('sidebar').classList.add('-translate-x-full');
};
window.toggleFullScreen = () => { if(!document.fullscreenElement) document.getElementById('view-live').requestFullscreen(); else document.exitFullscreen(); };
window.togglePiP = () => { if(document.pictureInPictureElement) document.exitPictureInPicture(); else video.requestPictureInPicture(); };
window.toggleFavoriteCurrent = () => { if(state.current) toggleFavorite(state.current.id); };
window.playChannel = playChannel;
window.setDrawerMainTab = setDrawerMainTab;
window.toggleRefreshMenu = (e) => { e.stopPropagation(); document.getElementById('refresh-menu').classList.toggle('hidden'); };
window.reloadSources = () => loadChannels(true);
window.saveBulkSources = saveBulkSources;
window.resetVisuals = resetVisuals;
window.applyCss = applyCss;
window.resetCss = resetCss;
window.exportData = exportData;
window.importData = importData;
window.saveDrmKey = saveDrmKey;
window.closeDrmModal = () => document.getElementById('modal-drm').classList.add('hidden');
window.openDrmModal = openDrmModal;
window.openCreateListModal = openCreateListModal;
window.createCustomList = createCustomList;
window.deleteCustomList = deleteCustomList;
window.openAddToListModal = openAddToListModal;
window.toggleChannelInList = toggleChannelInList;
window.removeFromCurrentList = removeFromCurrentList;
window.captureScreenshot = captureScreenshot;
window.setEngine = (e) => { state.engine = e; document.getElementById('engine-menu').classList.add('hidden'); if(state.current) playChannel(state.current, state.currentSourceIndex); };

// PLACEHOLDER FUNCTIONS FOR MISSING LOGIC (To avoid errors)
function renderSettings() { 
    updateVisualsUI(); 
    const b = document.getElementById('bulk-sources-input');
    if(b) b.value = state.sources.map(s=>s.url).join('\n');
}
function saveBulkSources() {
    const raw = document.getElementById('bulk-sources-input').value;
    state.sources = raw.split('\n').filter(s=>s.trim()).map(u=>({url:u.trim(), label:'Imported'}));
    localStorage.setItem('kyi_sources_v3', JSON.stringify(state.sources));
    location.reload();
}
function exportData() {
    const d = JSON.stringify({favs:state.favorites, lists:state.customLists, sources:state.sources, visuals:state.visuals});
    const b = new Blob([d], {type:'application/json'});
    const a = document.createElement('a'); a.href=URL.createObjectURL(b); a.download='kyi_backup.json'; a.click();
}
function importData() {} // Add if needed
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b)).toString(16).slice(1).toUpperCase();
}
function initVisualSliders() { /* Keep existing logic or simplified binding */ }