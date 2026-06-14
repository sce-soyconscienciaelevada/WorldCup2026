// Resultados reales — ESPN por fecha (group stage) + live scores
const FWCMatches = {
  POLL_MS: 10 * 60 * 1000,
  _timer: null,

  NAME_MAP: {
    'Mexico':'MEX','South Korea':'KOR','Korea Republic':'KOR','Czech Republic':'CZE',
    'South Africa':'RSA','Canada':'CAN','Bosnia and Herzegovina':'BOS','Bosnia & Herzegovina':'BOS',
    'Qatar':'QAT','Switzerland':'SUI','Brazil':'BRA','Morocco':'MAR','Haiti':'HAI',
    'Scotland':'SCO','United States':'USA','Paraguay':'PAR','Australia':'AUS',
    'Turkey':'TUR','Türkiye':'TUR','Germany':'GER','Curacao':'CUW','Curaçao':'CUW',
    "Ivory Coast":'CIV',"Côte d'Ivoire":'CIV','Cote dIvoire':'CIV',
    'Ecuador':'ECU','Netherlands':'NED','Japan':'JAP','Sweden':'SWE',
    'Tunisia':'TUN','Belgium':'BEL','Egypt':'EGY','Iran':'IRN','New Zealand':'NZL',
    'Spain':'ESP','Cape Verde':'CPV','Saudi Arabia':'KSA','Uruguay':'URU',
    'France':'FRA','Senegal':'SEN','Iraq':'IRA','Norway':'NOR',
    'Argentina':'ARG','Algeria':'ALG','Austria':'AUT','Jordan':'JOR',
    'Portugal':'POR','DR Congo':'COD','Congo DR':'COD','Democratic Republic of the Congo':'COD',
    'Uzbekistan':'UZB','Colombia':'COL','England':'ENG','Croatia':'CRO',
    'Ghana':'GHA','Panama':'PAN',
    // ESPN abbreviations
    'MEX':'MEX','KOR':'KOR','CZE':'CZE','RSA':'RSA','ZAF':'RSA',
    'CAN':'CAN','BIH':'BOS','QAT':'QAT','SUI':'SUI','BRA':'BRA',
    'MAR':'MAR','HAI':'HAI','SCO':'SCO','USA':'USA','PAR':'PAR',
    'AUS':'AUS','TUR':'TUR','GER':'GER','CUW':'CUW','CIV':'CIV',
    'ECU':'ECU','NED':'NED','JPN':'JAP','SWE':'SWE','TUN':'TUN',
    'BEL':'BEL','EGY':'EGY','IRN':'IRN','NZL':'NZL','ESP':'ESP',
    'CPV':'CPV','KSA':'KSA','URU':'URU','FRA':'FRA','SEN':'SEN',
    'IRQ':'IRA','NOR':'NOR','ARG':'ARG','ALG':'ALG','AUT':'AUT',
    'JOR':'JOR','POR':'POR','COD':'COD','UZB':'UZB','COL':'COL',
    'ENG':'ENG','CRO':'CRO','GHA':'GHA','PAN':'PAN',
  },

  _code(name) { return name ? (this.NAME_MAP[name] || this.NAME_MAP[name.trim()] || null) : null; },

  async _fetchDate(dateStr) {
    // dateStr = 'YYYYMMDD'
    const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${dateStr}`;
    const ctrl  = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    const res   = await fetch(url, { signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) return [];
    const data = await res.json();
    return data.events || [];
  },

  _parseEvent(ev, results, live) {
    const comp  = ev.competitions?.[0];
    if (!comp) return;
    const homeC = comp.competitors?.find(c => c.homeAway === 'home');
    const awayC = comp.competitors?.find(c => c.homeAway === 'away');
    if (!homeC || !awayC) return;
    const home = this._code(homeC.team?.displayName) || this._code(homeC.team?.abbreviation);
    const away = this._code(awayC.team?.displayName) || this._code(awayC.team?.abbreviation);
    if (!home || !away) return;
    const our = WC2026.allMatches.find(x => x.home === home && x.away === away);
    if (!our) return;
    const status   = ev.status?.type?.name || '';
    const isLive   = status === 'STATUS_IN_PROGRESS' || status === 'STATUS_HALFTIME';
    const isDone   = status === 'STATUS_FINAL' || ev.status?.type?.completed === true;
    if (isLive) live.push(our.id);
    if ((isDone || isLive) && homeC.score != null && awayC.score != null) {
      results[our.id] = {
        home: parseInt(homeC.score, 10),
        away: parseInt(awayC.score, 10),
        status: isDone ? 'FINISHED' : 'IN_PLAY',
      };
    }
  },

  async fetchResults() {
    const today   = new Date().toISOString().slice(0, 10);
    const results = {};
    const live    = [];

    // All unique dates with WC matches up to today
    const dates = [...new Set(
      WC2026.allMatches
        .filter(m => m.date <= today)
        .map(m => m.date)
    )];

    if (!dates.length) return null;

    // Fetch all dates in parallel
    const allEvents = await Promise.all(
      dates.map(d => this._fetchDate(d.replace(/-/g, '')).catch(() => []))
    );

    let total = 0;
    allEvents.forEach(events => {
      total += events.length;
      events.forEach(ev => this._parseEvent(ev, results, live));
    });

    console.log(`[FWCMatches] ESPN OK — ${dates.length} fechas, ${total} eventos, ${Object.keys(results).length} resultados`);

    return Object.keys(results).length > 0 || live.length > 0
      ? { results, live }
      : null;
  },

  start(onUpdate) {
    const tick = async () => {
      const data = await this.fetchResults();
      if (data) onUpdate(data);
    };
    tick();
    this._timer = setInterval(tick, this.POLL_MS);
  },

  stop() {
    if (this._timer) { clearInterval(this._timer); this._timer = null; }
  },
};
