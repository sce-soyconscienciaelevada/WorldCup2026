// Credenciales — localStorage override + hardcoded fallbacks
const FWC = {
  get BIN_ID()      { return localStorage.getItem('fwc_bin_id')      || '6a2c1d4ef5f4af5e29e6e9b0' },
  get BIN_KEY()     { return localStorage.getItem('fwc_bin_key')      || '$2a$10$rXCkfVUVGA1MslES3vyfF.TVfwVINKuyf3Q8w5g.hRR6RMxZnJ.H2' },
  get FD_KEY()      { return localStorage.getItem('fwc_fd_key')       || '648877ba8a0641738bfa305c7c9a4e88' },
  get EJ_SERVICE()  { return localStorage.getItem('fwc_ej_service')   || 'Mundial Familiar' },
  get EJ_TEMPLATE() { return localStorage.getItem('fwc_ej_template')  || 'template_0is02au' },
  get EJ_PUBLIC()   { return localStorage.getItem('fwc_ej_public')    || 'sx-hAlNp0t7AJZmNJ' },

  START_DATE: '2026-06-14',

  get BASE_URL() {
    return window.location.href.replace(/\/[^/]+(\?.*)?$/, '');
  },
  get PRED_URL() {
    return this.BASE_URL + '/predicciones.html';
  },

  isConfigured() { return !!(this.BIN_ID && this.BIN_KEY); },

  set(key, value) {
    value ? localStorage.setItem('fwc_' + key, value)
          : localStorage.removeItem('fwc_' + key);
  },
};
