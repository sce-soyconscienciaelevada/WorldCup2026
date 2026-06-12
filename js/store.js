// State management — localStorage + optional JSON file sync
const Store = {
  KEY: 'wc2026_state',

  defaults() {
    return {
      predictions: {
        A1: { home:2, away:0 }, A2: { home:2, away:0 },
        B1: { home:1, away:1 }, B2: { home:0, away:2 },
        C1: { home:4, away:2 }, C2: { home:0, away:3 },
        D1: { home:2, away:1 }, D2: { home:0, away:4 },
        E1: { home:4, away:0 }, E2: { home:2, away:2 },
        F1: { home:3, away:0 }, F2: { home:3, away:1 },
        G1: { home:3, away:1 }, G2: { home:1, away:1 },
        H1: { home:4, away:0 }, H2: { home:0, away:3 },
        I1: { home:4, away:2 }, I2: { home:0, away:3 },
        J1: { home:4, away:0 }, J2: { home:2, away:0 },
        K1: { home:5, away:0 }, K2: { home:0, away:3 },
        L1: { home:4, away:1 }, L2: { home:3, away:2 },
      },
      results: {
        A1: { home:2, away:1 }, // MEX 2-1 RSA (played)
      },
      podium: { first:'ARG', second:'ENG', third:'POR' },
      actualPodium: null,
      knockout: {},
      ntfyTopic: '',
      binId: '',
      binKey: '',
      profile: {
        name: 'Theo', nick: '', pos: 'FWD', num: 9, dob: '', nat: '', foot: 'Right',
        club: 'Liverpool FC', bio: '', avatar: '⚽',
        pac: 80, sho: 85, pas: 75, dri: 88, def: 50, phy: 72,
      },
      lastUpdated: new Date().toISOString(),
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        // Deep merge: keep defaults for any missing keys
        const def = this.defaults();
        return {
          ...def,
          ...saved,
          predictions: { ...def.predictions, ...saved.predictions },
          results: { ...def.results, ...saved.results },
          podium: { ...def.podium, ...(saved.podium || {}) },
          profile: { ...def.profile, ...(saved.profile || {}) },
        };
      }
    } catch (e) { console.error('Store load error:', e); }
    return this.defaults();
  },

  save(state) {
    state.lastUpdated = new Date().toISOString();
    localStorage.setItem(this.KEY, JSON.stringify(state));
  },

  export(state) {
    return JSON.stringify(state, null, 2);
  },

  import(json) {
    const parsed = JSON.parse(json); // throws if invalid
    this.save(parsed);
    return this.load(); // return merged result
  },

  downloadJSON(state) {
    const blob = new Blob([this.export(state)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'wc2026-state.json';
    a.click();
    URL.revokeObjectURL(a.href);
  },

  // Try to load from /data/state.json (GitHub Pages), fallback to localStorage
  async loadRemote() {
    try {
      const res = await fetch('./data/state.json?t=' + Date.now());
      if (res.ok) {
        const remote = await res.json();
        // If remote is newer than local, prefer remote
        const local = this.load();
        const remoteDate = new Date(remote.lastUpdated || 0);
        const localDate = new Date(local.lastUpdated || 0);
        if (remoteDate > localDate) {
          this.save(remote);
          return this.load();
        }
        return local;
      }
    } catch (e) { /* no remote file — that's fine */ }
    return this.load();
  }
};
