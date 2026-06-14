// JSONBin store — lectura y escritura de todos los datos de la quiniela familiar
const FWCStore = {
  BASE: 'https://api.jsonbin.io/v3/b/',

  _fetch(url, opts = {}, ms = 10000) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ms);
    return fetch(url, { ...opts, signal: ctrl.signal })
      .finally(() => clearTimeout(timer));
  },

  async read() {
    if (!FWC.BIN_ID || !FWC.BIN_KEY) {
      throw new Error('Sistema no configurado. Contacta al organizador.');
    }
    const res = await this._fetch(this.BASE + FWC.BIN_ID + '/latest', {
      headers: { 'X-Access-Key': FWC.BIN_KEY, 'X-Bin-Meta': 'false' }
    });
    if (res.status === 404) {
      // Bin vacío/nuevo — inicializar con estructura por defecto
      const d = this.defaults();
      await this.write(d);
      return d;
    }
    if (!res.ok) throw new Error('Error leyendo datos (' + res.status + ')');
    return res.json();
  },

  async write(data) {
    const res = await this._fetch(this.BASE + FWC.BIN_ID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': FWC.BIN_KEY,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error guardando datos (' + res.status + ')');
    return res.json();
  },

  // Lee, aplica fn(data), escribe. Retorna el data actualizado.
  async update(fn) {
    const data = await this.read();
    const updated = fn(data);
    await this.write(updated);
    return updated;
  },

  defaults() {
    return {
      participants: [],   // [{ id, token, nombre, email, regla, registeredAt }]
      predictions: {},    // { token: { matches: { matchId: {home,away} }, podium: {first,second,third} } }
      results: {},        // { matchId: {home,away} } — resultados manuales desde admin
      _config: {},        // EmailJS config synced to cloud for cross-device access
      reglas: [],
      settings: {
        registrationOpen: true,
        predictionsOpen: true,
        actualPodium: null,
      },
    };
  },

  // Devuelve participante por token, null si no existe
  findByToken(data, token) {
    return data.participants.find(p => p.token === token) || null;
  },
};
