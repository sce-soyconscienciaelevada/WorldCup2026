# World Cup 2026 Portal — Reference Guide

How everything works. Read this before touching anything.

---

## Live URLs

| Portal | URL |
|--------|-----|
| Public scoreboard | `https://your-vercel-url.vercel.app/` |
| Theo's portal | `https://your-vercel-url.vercel.app/theo.html` |
| Admin panel | `https://your-vercel-url.vercel.app/admin.html` |

---

## Credentials & Config

### JSONBin (cloud database)
- **Bin ID:** `6a2b8ed1f5f4af5e29e42bc2`
- **Master Key:** `$2a$10$dzKZtO2M/PRjlWVS4Dm/ruIgV1EMuAvKqWUCyQ3NyVBA21o7e5FXK`
- **Dashboard:** https://jsonbin.io → log in → Bins
- Stores: wall posts, chat messages, admin password, live results

### ntfy (push notifications)
- **Topic:** `Theo-wc`
- Joan receives notifications at: https://ntfy.sh/Theo-wc (or ntfy mobile app)
- Fires when: Theo sends a chat message

### Admin portal
- **Default password:** `admin2026`
- Stored in cloud — change it once from admin panel → stays changed on all devices/cache clears

### Theo's portal
- **Password:** hardcoded in `theo.html` as `const PORTAL_PW`
- To change: edit `theo.html`, find `const PORTAL_PW`, update value, commit + push

---

## How State Works

Data loads in 4 layers (each overrides the previous):

```
1. store.js defaults       ← fallback, almost never reached
2. data/state.json         ← baseline committed to git (Vercel serves this)
3. localStorage            ← Theo's edits (prediction changes, profile photo)
4. cloud.results           ← live ESPN scores pushed by admin
```

**To force state.json to override Theo's localStorage:**  
Update `lastUpdated` timestamp in `data/state.json` to a future/newer time → commit + push.  
On next Theo refresh, remote wins and overwrites his local copy.

---

## How to Change Things

### Change Theo's predictions
1. Edit `data/state.json` → find the match ID (A1, B3, etc.) under `predictions`
2. Bump `lastUpdated` to current ISO timestamp
3. `git add data/state.json && git commit -m "fix: update predictions" && git push`
4. Vercel deploys in ~60 sec → Theo refreshes → sees new predictions

### Add/correct a result manually
**Option A (admin panel):** Admin portal → Results tab → type score directly → Save  
**Option B (file):** Edit `data/state.json` → add under `results`: `"A1": { "home": 2, "away": 1 }` → push

### Sync live scores from ESPN
Admin panel → Results tab → "⚡ Sync Now"  
Or go to Sync tab → "⚡ Sync Now"  
Results write to cloud automatically. Theo sees them on next refresh. No git push needed.

### Change admin password
Admin panel → Theo tab → "Change Password" section → enter new password → Save  
Saves to cloud. Works immediately on all devices.

### Update Theo's player card (profile)
Admin panel → Theo's Card tab → edit name/stats/avatar → Save Profile

### Update podium prediction
Admin panel → Podium tab → select teams → Save

---

## Match IDs Reference

Groups A–L, each group has 6 matches:

| ID | Match |
|----|-------|
| A1 | MEX vs RSA |
| A2 | KOR vs CZE |
| A3 | CZE vs RSA |
| A4 | MEX vs KOR |
| A5 | RSA vs KOR |
| A6 | MEX vs CZE |
| B1 | CAN vs BOS |
| B2 | QAT vs SUI |
| ... | (see js/data.js for all 72) |

Full list in `js/data.js` → `WC2026.groups`.

---

## File Map

| File | What it does | Change when... |
|------|-------------|----------------|
| `theo.html` | Theo's entire portal | Changing Theo's UI, his password, tabs |
| `admin.html` | Joan's control panel | Adding admin features |
| `index.html` | Public scoreboard | Changing public-facing display |
| `js/data.js` | All teams + all 72 fixtures | Never — tournament data is fixed |
| `js/store.js` | State load/save logic | Changing state structure |
| `js/scoring.js` | Points calculation | Changing scoring rules |
| `data/state.json` | Ground truth for predictions/results | Correcting predictions, seeding results |
| `vercel.json` | Vercel config (cache headers) | Almost never |

---

## Deploy Flow

Every `git push` to `master` → Vercel auto-deploys in ~60 seconds.  
No build step. Pure static HTML.

```bash
git add -A
git commit -m "description"
git push
```

---

## Scoring Logic

| Outcome | Points |
|---------|--------|
| Exact score match | 6 pts |
| Correct winner + correct goal diff | 4 pts |
| Correct winner only | 2 pts |
| Wrong | 0 pts |

Logic lives in `js/scoring.js` → `Scoring.matchPoints(prediction, result)`.

---

## Known Limits

- JSONBin free tier: 10,000 requests/month. Wall/chat each count as reads+writes. Should be fine for personal use.
- ESPN API returns no WC 2026 data until tournament starts (2026-06-14). "0 eventos" before then is expected.
- State.json is a static file — can't be written from the browser. Results from ESPN sync go to cloud, not state.json.
- Vercel free = GitHub repo must be public. Don't put passwords or secrets in code beyond the JSONBin scoped key.
<!-- updated: 2026-06-12 17:13 -->
