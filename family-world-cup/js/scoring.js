// Sistema de puntuación de la quiniela familiar
// Fase de grupos:  exacto=3pts | resultado correcto=1pt | fallo=0
// Eliminatorias:  exacto=5pts | resultado correcto=2pts | fallo=0
// Podio WC:       campeón=+10 | subcampeón=+5 | tercer lugar=+3

const FWCScoring = {

  isKnockout(matchDate) {
    return matchDate >= '2026-06-29';
  },

  matchPoints(pred, result, matchDate) {
    if (!pred || !result) return null;
    if (pred.home == null || pred.away == null) return null;
    if (result.home == null || result.away == null) return null;

    const pOut = Math.sign(pred.home - pred.away);
    const rOut = Math.sign(result.home - result.away);
    const exact = pred.home === result.home && pred.away === result.away;
    const knockout = this.isKnockout(matchDate);

    if (exact)         return knockout ? 5 : 3;
    if (pOut === rOut) return knockout ? 2 : 1;
    return 0;
  },

  podiumPoints(predicted, actual) {
    if (!actual || !predicted) return 0;
    let pts = 0;
    if (predicted.first  && predicted.first  === actual.first)  pts += 10;
    if (predicted.second && predicted.second === actual.second) pts += 5;
    if (predicted.third  && predicted.third  === actual.third)  pts += 3;
    return pts;
  },

  totalForToken(token, predictions, results, actualPodium) {
    const preds = predictions[token];
    if (!preds) return 0;
    let total = 0;

    const matches = preds.matches || {};
    WC2026.allMatches
      .filter(m => m.date >= FWC.START_DATE)
      .forEach(m => {
        const pts = this.matchPoints(matches[m.id], results[m.id], m.date);
        if (pts !== null) total += pts;
      });

    total += this.podiumPoints(preds.podium, actualPodium);
    return total;
  },

  // Desglose partido a partido para un participante
  breakdown(token, predictions, results) {
    const matches = (predictions[token] || {}).matches || {};
    return WC2026.allMatches
      .filter(m => m.date >= FWC.START_DATE)
      .map(m => ({
        id: m.id,
        match: m,
        pred: matches[m.id] || null,
        result: results[m.id] || null,
        pts: this.matchPoints(matches[m.id], results[m.id], m.date),
      }));
  },

  leaderboard(participants, predictions, results, actualPodium) {
    return participants
      .map(p => ({
        ...p,
        puntos: this.totalForToken(p.token, predictions, results, actualPodium),
        completadas: Object.keys((predictions[p.token] || {}).matches || {}).length,
      }))
      .sort((a, b) => b.puntos - a.puntos || a.nombre.localeCompare(b.nombre));
  },
};
