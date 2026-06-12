// FIFA World Cup 2026 — Static Tournament Data
const WC2026 = {
  teams: {
    MEX: { name: 'Mexico',               flag: '🇲🇽', code: 'mx'     },
    KOR: { name: 'South Korea',          flag: '🇰🇷', code: 'kr'     },
    CZE: { name: 'Czech Republic',       flag: '🇨🇿', code: 'cz'     },
    RSA: { name: 'South Africa',         flag: '🇿🇦', code: 'za'     },
    CAN: { name: 'Canada',               flag: '🇨🇦', code: 'ca'     },
    BOS: { name: 'Bosnia & Herzegovina', flag: '🇧🇦', code: 'ba'     },
    QAT: { name: 'Qatar',                flag: '🇶🇦', code: 'qa'     },
    SUI: { name: 'Switzerland',          flag: '🇨🇭', code: 'ch'     },
    BRA: { name: 'Brazil',               flag: '🇧🇷', code: 'br'     },
    MAR: { name: 'Morocco',              flag: '🇲🇦', code: 'ma'     },
    HAI: { name: 'Haiti',                flag: '🇭🇹', code: 'ht'     },
    SCO: { name: 'Scotland',             flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', code: 'gb-sct' },
    USA: { name: 'United States',        flag: '🇺🇸', code: 'us'     },
    PAR: { name: 'Paraguay',             flag: '🇵🇾', code: 'py'     },
    AUS: { name: 'Australia',            flag: '🇦🇺', code: 'au'     },
    TUR: { name: 'Turkey',               flag: '🇹🇷', code: 'tr'     },
    GER: { name: 'Germany',              flag: '🇩🇪', code: 'de'     },
    CUW: { name: 'Curaçao',              flag: '🇨🇼', code: 'cw'     },
    CIV: { name: 'Ivory Coast',          flag: '🇨🇮', code: 'ci'     },
    ECU: { name: 'Ecuador',              flag: '🇪🇨', code: 'ec'     },
    NED: { name: 'Netherlands',          flag: '🇳🇱', code: 'nl'     },
    JAP: { name: 'Japan',                flag: '🇯🇵', code: 'jp'     },
    SWE: { name: 'Sweden',               flag: '🇸🇪', code: 'se'     },
    TUN: { name: 'Tunisia',              flag: '🇹🇳', code: 'tn'     },
    BEL: { name: 'Belgium',              flag: '🇧🇪', code: 'be'     },
    EGY: { name: 'Egypt',                flag: '🇪🇬', code: 'eg'     },
    IRN: { name: 'Iran',                 flag: '🇮🇷', code: 'ir'     },
    NZL: { name: 'New Zealand',          flag: '🇳🇿', code: 'nz'     },
    ESP: { name: 'Spain',                flag: '🇪🇸', code: 'es'     },
    CPV: { name: 'Cape Verde',           flag: '🇨🇻', code: 'cv'     },
    KSA: { name: 'Saudi Arabia',         flag: '🇸🇦', code: 'sa'     },
    URU: { name: 'Uruguay',              flag: '🇺🇾', code: 'uy'     },
    FRA: { name: 'France',               flag: '🇫🇷', code: 'fr'     },
    SEN: { name: 'Senegal',              flag: '🇸🇳', code: 'sn'     },
    IRA: { name: 'Iraq',                 flag: '🇮🇶', code: 'iq'     },
    NOR: { name: 'Norway',               flag: '🇳🇴', code: 'no'     },
    ARG: { name: 'Argentina',            flag: '🇦🇷', code: 'ar'     },
    ALG: { name: 'Algeria',              flag: '🇩🇿', code: 'dz'     },
    AUT: { name: 'Austria',              flag: '🇦🇹', code: 'at'     },
    JOR: { name: 'Jordan',               flag: '🇯🇴', code: 'jo'     },
    POR: { name: 'Portugal',             flag: '🇵🇹', code: 'pt'     },
    COD: { name: 'DR Congo',             flag: '🇨🇩', code: 'cd'     },
    UZB: { name: 'Uzbekistan',           flag: '🇺🇿', code: 'uz'     },
    COL: { name: 'Colombia',             flag: '🇨🇴', code: 'co'     },
    ENG: { name: 'England',              flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', code: 'gb-eng' },
    CRO: { name: 'Croatia',              flag: '🇭🇷', code: 'hr'     },
    GHA: { name: 'Ghana',                flag: '🇬🇭', code: 'gh'     },
    PAN: { name: 'Panama',               flag: '🇵🇦', code: 'pa'     },
  },

  groups: {
    A: {
      teams: ['MEX','KOR','CZE','RSA'],
      matches: [
        { id:'A1', home:'MEX', away:'RSA', date:'2026-06-11', time:'16:00' },
        { id:'A2', home:'KOR', away:'CZE', date:'2026-06-11', time:'23:00' },
        { id:'A3', home:'CZE', away:'RSA', date:'2026-06-18', time:'13:00' },
        { id:'A4', home:'MEX', away:'KOR', date:'2026-06-18', time:'22:00' },
        { id:'A5', home:'RSA', away:'KOR', date:'2026-06-24', time:'22:00' },
        { id:'A6', home:'MEX', away:'CZE', date:'2026-06-24', time:'22:00' },
      ]
    },
    B: {
      teams: ['CAN','BOS','QAT','SUI'],
      matches: [
        { id:'B1', home:'CAN', away:'BOS', date:'2026-06-12', time:'16:00' },
        { id:'B2', home:'QAT', away:'SUI', date:'2026-06-13', time:'16:00' },
        { id:'B3', home:'SUI', away:'BOS', date:'2026-06-18', time:'16:00' },
        { id:'B4', home:'CAN', away:'QAT', date:'2026-06-18', time:'19:00' },
        { id:'B5', home:'SUI', away:'CAN', date:'2026-06-24', time:'16:00' },
        { id:'B6', home:'BOS', away:'QAT', date:'2026-06-24', time:'16:00' },
      ]
    },
    C: {
      teams: ['BRA','MAR','HAI','SCO'],
      matches: [
        { id:'C1', home:'BRA', away:'MAR', date:'2026-06-13', time:'16:00' },
        { id:'C2', home:'HAI', away:'SCO', date:'2026-06-13', time:'22:00' },
        { id:'C3', home:'SCO', away:'MAR', date:'2026-06-19', time:'19:00' },
        { id:'C4', home:'BRA', away:'HAI', date:'2026-06-19', time:'21:30' },
        { id:'C5', home:'MAR', away:'HAI', date:'2026-06-24', time:'19:00' },
        { id:'C6', home:'SCO', away:'BRA', date:'2026-06-24', time:'19:00' },
      ]
    },
    D: {
      teams: ['USA','PAR','AUS','TUR'],
      matches: [
        { id:'D1', home:'USA', away:'PAR', date:'2026-06-12', time:'22:00' },
        { id:'D2', home:'AUS', away:'TUR', date:'2026-06-14', time:'01:00' },
        { id:'D3', home:'USA', away:'AUS', date:'2026-06-19', time:'16:00' },
        { id:'D4', home:'TUR', away:'PAR', date:'2026-06-20', time:'01:00' },
        { id:'D5', home:'PAR', away:'AUS', date:'2026-06-25', time:'23:00' },
        { id:'D6', home:'TUR', away:'USA', date:'2026-06-25', time:'23:00' },
      ]
    },
    E: {
      teams: ['GER','CUW','CIV','ECU'],
      matches: [
        { id:'E1', home:'GER', away:'CUW', date:'2026-06-14', time:'14:00' },
        { id:'E2', home:'CIV', away:'ECU', date:'2026-06-14', time:'20:00' },
        { id:'E3', home:'GER', away:'CIV', date:'2026-06-20', time:'17:00' },
        { id:'E4', home:'ECU', away:'CUW', date:'2026-06-20', time:'22:00' },
        { id:'E5', home:'CUW', away:'CIV', date:'2026-06-25', time:'17:00' },
        { id:'E6', home:'ECU', away:'GER', date:'2026-06-25', time:'17:00' },
      ]
    },
    F: {
      teams: ['NED','JAP','SWE','TUN'],
      matches: [
        { id:'F1', home:'NED', away:'JAP', date:'2026-06-14', time:'17:00' },
        { id:'F2', home:'SWE', away:'TUN', date:'2026-06-14', time:'23:00' },
        { id:'F3', home:'NED', away:'SWE', date:'2026-06-20', time:'14:00' },
        { id:'F4', home:'TUN', away:'JAP', date:'2026-06-21', time:'01:00' },
        { id:'F5', home:'JAP', away:'SWE', date:'2026-06-25', time:'20:00' },
        { id:'F6', home:'TUN', away:'NED', date:'2026-06-25', time:'20:00' },
      ]
    },
    G: {
      teams: ['BEL','EGY','IRN','NZL'],
      matches: [
        { id:'G1', home:'BEL', away:'EGY', date:'2026-06-15', time:'16:00' },
        { id:'G2', home:'IRN', away:'NZL', date:'2026-06-15', time:'22:00' },
        { id:'G3', home:'BEL', away:'IRN', date:'2026-06-21', time:'16:00' },
        { id:'G4', home:'NZL', away:'EGY', date:'2026-06-21', time:'22:00' },
        { id:'G5', home:'EGY', away:'IRN', date:'2026-06-27', time:'00:00' },
        { id:'G6', home:'NZL', away:'BEL', date:'2026-06-27', time:'00:00' },
      ]
    },
    H: {
      teams: ['ESP','CPV','KSA','URU'],
      matches: [
        { id:'H1', home:'ESP', away:'CPV', date:'2026-06-15', time:'13:00' },
        { id:'H2', home:'KSA', away:'URU', date:'2026-06-15', time:'20:00' },
        { id:'H3', home:'ESP', away:'KSA', date:'2026-06-21', time:'13:00' },
        { id:'H4', home:'URU', away:'CPV', date:'2026-06-21', time:'19:00' },
        { id:'H5', home:'URU', away:'ESP', date:'2026-06-26', time:'21:00' },
        { id:'H6', home:'CPV', away:'KSA', date:'2026-06-26', time:'21:00' },
      ]
    },
    I: {
      teams: ['FRA','SEN','IRA','NOR'],
      matches: [
        { id:'I1', home:'FRA', away:'SEN', date:'2026-06-16', time:'16:00' },
        { id:'I2', home:'IRA', away:'NOR', date:'2026-06-16', time:'19:00' },
        { id:'I3', home:'FRA', away:'IRA', date:'2026-06-22', time:'18:00' },
        { id:'I4', home:'NOR', away:'SEN', date:'2026-06-22', time:'21:00' },
        { id:'I5', home:'NOR', away:'FRA', date:'2026-06-26', time:'16:00' },
        { id:'I6', home:'SEN', away:'IRA', date:'2026-06-26', time:'16:00' },
      ]
    },
    J: {
      teams: ['ARG','ALG','AUT','JOR'],
      matches: [
        { id:'J1', home:'ARG', away:'ALG', date:'2026-06-16', time:'22:00' },
        { id:'J2', home:'AUT', away:'JOR', date:'2026-06-17', time:'01:00' },
        { id:'J3', home:'ARG', away:'AUT', date:'2026-06-22', time:'14:00' },
        { id:'J4', home:'JOR', away:'ALG', date:'2026-06-23', time:'00:00' },
        { id:'J5', home:'JOR', away:'ARG', date:'2026-06-27', time:'23:00' },
        { id:'J6', home:'ALG', away:'AUT', date:'2026-06-27', time:'23:00' },
      ]
    },
    K: {
      teams: ['POR','COD','UZB','COL'],
      matches: [
        { id:'K1', home:'POR', away:'COD', date:'2026-06-17', time:'14:00' },
        { id:'K2', home:'UZB', away:'COL', date:'2026-06-17', time:'23:00' },
        { id:'K3', home:'POR', away:'UZB', date:'2026-06-23', time:'14:00' },
        { id:'K4', home:'COL', away:'COD', date:'2026-06-23', time:'23:00' },
        { id:'K5', home:'COD', away:'UZB', date:'2026-06-27', time:'20:30' },
        { id:'K6', home:'COL', away:'POR', date:'2026-06-27', time:'20:30' },
      ]
    },
    L: {
      teams: ['ENG','CRO','GHA','PAN'],
      matches: [
        { id:'L1', home:'ENG', away:'CRO', date:'2026-06-17', time:'17:00' },
        { id:'L2', home:'GHA', away:'PAN', date:'2026-06-17', time:'20:00' },
        { id:'L3', home:'ENG', away:'GHA', date:'2026-06-23', time:'17:00' },
        { id:'L4', home:'PAN', away:'CRO', date:'2026-06-23', time:'20:00' },
        { id:'L5', home:'PAN', away:'ENG', date:'2026-06-27', time:'18:00' },
        { id:'L6', home:'CRO', away:'GHA', date:'2026-06-27', time:'18:00' },
      ]
    },
  },

  get allMatches() {
    return Object.values(this.groups).flatMap(g => g.matches);
  },

  getMatch(id) {
    return this.allMatches.find(m => m.id === id);
  },

  team(code) {
    return this.teams[code] || { name: code, flag: '🏳️', code: code.toLowerCase() };
  },

  // Flag image from flagcdn.com — w40 PNG, sized via CSS height
  fi(teamCode, h = 20) {
    const t = this.teams[teamCode];
    const fc = t ? t.code : teamCode.toLowerCase();
    return `<img src="https://flagcdn.com/w40/${fc}.png" alt="${teamCode}" loading="lazy" style="height:${h}px;width:auto;border-radius:2px;vertical-align:middle;box-shadow:0 1px 3px rgba(0,0,0,0.35);display:inline-block">`;
  },

  groupStandings(groupKey, results) {
    const group = this.groups[groupKey];
    const s = {};
    group.teams.forEach(t => { s[t] = { team: t, pj:0, g:0, e:0, p:0, gf:0, gc:0, pts:0 }; });
    group.matches.forEach(m => {
      const res = results[m.id];
      if (!res) return;
      const h = s[m.home], a = s[m.away];
      h.pj++; a.pj++;
      h.gf += res.home; h.gc += res.away;
      a.gf += res.away; a.gc += res.home;
      if (res.home > res.away)      { h.g++; h.pts += 3; a.p++; }
      else if (res.away > res.home) { a.g++; a.pts += 3; h.p++; }
      else                           { h.e++; h.pts += 1; a.e++; a.pts += 1; }
    });
    return Object.values(s).sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if ((b.gf - b.gc) !== (a.gf - a.gc)) return (b.gf - b.gc) - (a.gf - a.gc);
      return b.gf - a.gf;
    });
  }
};
