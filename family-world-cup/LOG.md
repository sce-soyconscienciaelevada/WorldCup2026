# Mundial Familiar WC 2026 — Project Log

---

## 2026-06-12 — Session log

### What was built / fixed

**Deployment**
- Created `index.html` at repo root → fixes Vercel 404 on root URL
- Vercel free tier requires **public** GitHub repo — do NOT make private

**Auto-results (ESPN API)**
- football-data.org free tier: silent 403, excludes World Cup → abandoned
- TheSportsDB: 0 events returned (wrong league ID) → abandoned
- ESPN public API: `site.api.espn.com` — no key, CORS-enabled, **working**
- Pattern: one request per match date, all in parallel
  ```
  https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=YYYYMMDD
  ```
- League slug `fifa.world` = correct slug for WC 2026
- Results auto-update every 10 min on dashboard

**Config persistence (survives cache clear)**
- All credentials hardcoded as fallbacks in `js/config.js`
- JSONBin Access Key (scoped) used — NOT Master Key
- Header: `X-Access-Key` (not `X-Master-Key`)
- EmailJS config synced to JSONBin `_config` field → loads on any device

**Admin password**
- Moved from `localStorage` → JSONBin cloud (`_config.admin_pw`)
- Page loads → fetches password from cloud before login form shown
- Change password → saves to JSONBin → persists forever, any device, any cache clear
- Default password: `mundial2026` (change it once from admin → stays changed)
- Password hint removed from login screen

**Security**
- JSONBin Master Key replaced with scoped Access Key
  - Access Key: can only read/write this one bin
  - Master Key: kept private (not in any code)
- Admin password hint removed from public login page

**Flags**
- "Partidos hoy" section: switched from emoji to `WC2026.fi()` flag images

---

## Architecture

| Layer | Tool | Detail |
|-------|------|--------|
| Hosting | Vercel | Auto-deploys on git push to `main` |
| Database | JSONBin.io | Bin ID: `6a2c1d4ef5f4af5e29e6e9b0` |
| Auth | JSONBin Access Key | Scoped to this bin only |
| Auto-results | ESPN public API | Per-date parallel fetch, no API key needed |
| Emails | EmailJS | Service: `Mundial Familiar` / Template: `template_0is02au` |
| Admin password | JSONBin `_config.admin_pw` | Cloud-stored, survives cache clear |

---

## How to connect real data & auto-update dashboard (steps)

This is the pattern used in this project. Use it for any new pool/project:

### Step 1 — Wire `js/data.js`
Must contain `WC2026.allMatches` — array of all 72 matches with `{ id, date, home, away, time }`.
Date format: `YYYY-MM-DD`. Home/away: 3-letter team codes (e.g. `ARG`, `FRA`).

### Step 2 — Wire `js/matches.js` (ESPN fetch)
```javascript
async _fetchDate(dateStr) {
  // dateStr = 'YYYYMMDD'
  const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${dateStr}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.events || [];
}
```
- Collects all unique match dates from `WC2026.allMatches` where `date <= today`
- Fetches all dates in parallel with `Promise.all()`
- Maps ESPN team names/abbreviations → internal 3-letter codes via `NAME_MAP`
- Matches ESPN events to `WC2026.allMatches` by home+away code pair
- Outputs `{ results: { matchId: { home, away, status } }, live: [matchId] }`

### Step 3 — Wire `js/store.js` (JSONBin)
- `FWCStore.read()` → loads all data from JSONBin
- `FWCStore.write(data)` → saves everything back
- `FWCStore.update(fn)` → read → apply fn → write
- On 404: auto-initializes bin with `defaults()`
- All requests use `X-Access-Key` header

### Step 4 — Wire `js/config.js` (credentials)
Hardcode all credentials as fallbacks so cache clear never breaks the app:
```javascript
get BIN_KEY() { return localStorage.getItem('fwc_bin_key') || 'YOUR_ACCESS_KEY' }
```

### Step 5 — Dashboard startup sequence
```javascript
// 1. Load store data (participants, predictions, manual results)
const storeData = await FWCStore.read();
_results = storeData.results || {};

// 2. Start ESPN poller — fires immediately, then every 10 min
FWCMatches.start(({ results, live }) => {
  // Merge ESPN results over manual results
  _results = { ...(storeData.results || {}), ...results };
  renderGroups();   // update group tables
  renderStandings(); // update leaderboard
});
```

### Step 6 — Check it works
Open browser → F12 → Console. Look for:
```
[FWCMatches] ESPN OK — N fechas, N eventos, N resultados
```
`N resultados > 0` = group tables will populate automatically.
`N resultados = 0` = league slug wrong or tournament hasn't started yet.

---

## Files reference

| File | Purpose |
|------|---------|
| `js/config.js` | Credentials (hardcoded fallbacks) |
| `js/store.js` | JSONBin read/write |
| `js/matches.js` | ESPN auto-results poller |
| `js/data.js` | WC2026 teams + all 72 matches |
| `js/scoring.js` | Points calculation |
| `dashboard.html` | Main participant view |
| `admin.html` | Admin panel (password, results, participants) |
| `registro.html` | Registration form |
| `predicciones.html` | Predictions form |
| `index.html` | Root redirect (required for Vercel) |

---

## Lessons — build these in from the start (not as patches)

| # | Lesson | Why it matters |
|---|--------|---------------|
| 1 | Use scoped DB key from day one | Master Key exposes full account — use Access Key scoped to one bin |
| 2 | Check hosting tier limits before recommending visibility changes | Vercel free = public repo required. Making it private broke the deploy |
| 3 | Disable login UI while async credential fetch runs | Without this, user clicks before cloud pw loads, gets stale default |
| 4 | Spread existing config fields on partial updates | `_config: { newField }` wipes `admin_pw` — always `...(data._config \|\| {})` first |
| 5 | Store auth in cloud from day one, not localStorage | localStorage clears = reset. Wire cloud persistence at initial build |
| 6 | Set up dev→git sync command at project start | Two-copy strategy must be documented early or fixes don't deploy |
| 7 | Confirm scope before editing — never touch unrelated project files | Modified `theo.html` when only family dashboard needed changes |

---

## 2026-06-12 — Session 2 log

### Changes made

**Security**
- Replaced JSONBin Master Key with scoped Access Key in `js/config.js` and `js/store.js`
- Removed admin password hint from login screen

**Admin password persistence (4 bugs fixed)**
- Moved password storage from `localStorage` → JSONBin cloud (`_config.admin_pw`)
- `loadAdminPw()`: fetches cloud pw on page load, disables login button until fetch resolves (race condition fix)
- `saveConfig()`: spreads `...(data._config || {})` before writing EmailJS config — prevents wiping `admin_pw`
- Default: `mundial2026` — change once from admin to persist permanently

**Predictions form (predicciones.html) — full UI rewrite**
- Table layout ported from `admin.html` (group headers with flags, status dot, date/local time, home, score inputs, away, pts, Save/✕ per row)
- Times converted BST (UTC+1) → user's local browser timezone: `new Date(\`\${date}T\${time}:00+01:00\`)`
- Lock logic: kicks off exactly at match start time (not just date)
- Per-row Save button + global "Guardar todo" bar

**Dashboard (dashboard.html) — new sections**
- Added **Fase Eliminatoria**: static bracket R32 → Octavos → Cuartos → Semis → 3er Lugar → ⭐ Final (placeholder until June 27)
- Added **Próximos Partidos**: 30 upcoming matches grouped by date, local time, flags, group tag, `X/Y predichos` count

**Data**
- Participant "Joan" renamed to "Joan & Theo" directly in JSONBin via API
- Import tool in admin: auto-detects `parsed.predictions || parsed` (accepts full wc2026-state.json or predictions object only)

**Predictions (predicciones.html)**
- Prediction chips on dashboard hidden until match kick-off time
- Podium hidden until admin sets `actualPodium`

### Files changed this session
| File | What changed |
|------|-------------|
| `js/config.js` | Access Key fallback (not Master Key) |
| `js/store.js` | Header changed to `X-Access-Key` |
| `admin.html` | Password hint removed, `loadAdminPw()` race fix, `saveConfig()` spread fix, import tool |
| `predicciones.html` | Full rewrite — table UI, local time, per-row save |
| `dashboard.html` | Knockout Stage + Upcoming Matches sections added |
| `LOG.md` | This file |

---

## Known issues / notes

- ESPN API has no WC 2026 data until tournament starts (2026-06-14) — console will show `0 resultados` until then
- Vercel free tier = public GitHub repo required
- Both copies must stay in sync: `family-world-cup/` (dev) and `Family-WorldCup2026/` (git repo)
  - Sync command: `Copy-Item "family-world-cup\FILE" "Family-WorldCup2026\FILE" -Force`
