export const BRL = v => v === null || v === undefined ? "–" : Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
export const INT = v => v === null || v === undefined ? "–" : Number(v).toLocaleString('pt-BR');
export const PCT = v => v === null || v === undefined ? "–" : `${Number(v).toFixed(2).replace('.', ',')}%`;
export const clampPct = v => Math.max(0, Math.min(100, Number(v) || 0));
export const el = (tag, attrs={}, html='') => {
  const n = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v]) => n.setAttribute(k, v));
  if (html) n.innerHTML = html;
  return n;
};
