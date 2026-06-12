# World Cup 2026 — Session Log

## 2026-06-12 | My Card redesign + profile save fix + ntfy fix

**Issues fixed:**
- My Card tab is now the default first tab Theo sees on login
- Profile redesigned as a formal football club scouting card (dark navy, club header, photo frame, stats grid)
- Theo can now edit his own card directly from his portal (no longer admin-only)
- Theo can upload his own photo — stored as base64 in `wc2026_theo_profile` localStorage key (separate from state.json so admin pushes don't overwrite it)
- ntfy cross-device fix: topic now read from `state.ntfyTopic` as fallback (set in admin → export state.json → push → Theo's portal uses it automatically)

**Files changed:** `theo.html`, `store.js`, `admin.html`

---

## 2026-06-11 | Cloud sync (JSONBin) + admin sync tab

**What shipped:**
- `theo.html` wall notes, stickers, chat messages auto-sync to JSONBin on save
- On load, cloud data merges with localStorage (cloud wins for text/stickers; drawings/photos stay device-local)
- `admin.html` → Sync tab: new "☁️ Theo's Cloud Sync" card — paste Master Key → Create New Bin → done
- "👁 View Theo's Content" button pulls Theo's full chat + wall posts from cloud

**Setup required (one-time):**
1. jsonbin.io → free account → API Keys → copy Master Key
2. Admin panel → Sync tab → paste key → + Create New Bin
3. Theo's portal syncs automatically from that point

---

## 2026-06-10 | Profile via state.json + admin Theo's Card tab

**What shipped:**
- Profile (name, stats, avatar) controlled from admin → Theo's Card tab
- Saved to `state` → exported as `state.json` → committed + pushed → Theo loads it cross-device
- `store.js` deep-merges `profile` on load

---

## 2026-06-09 | Player card + wall + chat notifications

**What shipped:**
- FIFA-style player card in Theo's portal (profile tab)
- Wall: notes, drawings, photos, stickers
- Chat: messages to Joan, emoji reactions
- ntfy.sh push notification when Theo sends a message

---

## 2026-06-08 | Remember-me login + Theo portal password manager

**What shipped:**
- Admin: remember me 30 days checkbox
- Admin → Sync tab: change Theo's portal password
- Theo's password visible/hidden toggle in admin

---

## 2026-06-07 | Initial release

**What shipped:**
- `index.html` — public site with all group fixtures
- `admin.html` — predictions, results, podium, export/import
- `theo.html` — Theo's private portal (My Score, Liverpool, Trivia, Chat, YouTube, My Card, My Wall)
- `js/store.js` — localStorage + state.json remote sync
- `js/data.js` — all WC2026 teams + fixtures
- `js/scoring.js` — points calculation
- `data/state.json` — committed state (predictions, results, profile)
- Deployed on Vercel via `vercel.json`
<!-- updated: 2026-06-12 00:53 -->
