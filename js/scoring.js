// Scoring rules:
// Correct outcome (W or D): 5 pts
// Exact goals per team: 1 pt each
// Exact score bonus: 6 pts
// Champion: +30 | Runner-up: +20 | Third: +10

const Scoring = {
  matchPoints(prediction, result) {
    if (!prediction || !result ||
        prediction.home == null || prediction.away == null ||
        result.home == null || result.away == null) return null;

    let pts = 0;
    const pOut = Math.sign(prediction.home - prediction.away);
    const rOut = Math.sign(result.home - result.away);

    if (pOut === rOut) pts += 5;
    if (prediction.home === result.home) pts += 1;
    if (prediction.away === result.away) pts += 1;
    if (prediction.home === result.home && prediction.away === result.away) pts += 6;

    return pts;
  },

  podiumPoints(predicted, actual) {
    if (!actual || !predicted) return 0;
    let pts = 0;
    if (predicted.first  && predicted.first  === actual.first)  pts += 30;
    if (predicted.second && predicted.second === actual.second) pts += 20;
    if (predicted.third  && predicted.third  === actual.third)  pts += 10;
    return pts;
  },

  totalPoints(state) {
    let total = 0;
    WC2026.allMatches.forEach(m => {
      const pts = this.matchPoints(state.predictions[m.id], state.results[m.id]);
      if (pts !== null) total += pts;
    });
    total += this.podiumPoints(state.podium, state.actualPodium);
    return total;
  },

  maxPossible(state) {
    let max = 0;
    WC2026.allMatches.forEach(m => {
      if (state.predictions[m.id]) max += 13; // 5+1+1+6
    });
    if (state.podium && !state.actualPodium) max += 60;
    return max;
  },

  breakdown(state) {
    return WC2026.allMatches.map(m => ({
      id: m.id,
      match: m,
      prediction: state.predictions[m.id] || null,
      result: state.results[m.id] || null,
      points: this.matchPoints(state.predictions[m.id], state.results[m.id]),
    }));
  }
};
