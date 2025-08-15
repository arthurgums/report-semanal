// UI helpers para os “cards por categoria” e tiles de KPI
export function sectionCard({ title, icon = '', bodyHTML = '' }){
  const el = document.createElement('section');
  el.className = 'cat-card';
  el.innerHTML = `
    <div class="cat-title">
      <span class="ico">${icon}</span>
      <h2>${title}</h2>
    </div>
    <div class="cat-body">${bodyHTML}</div>
  `;
  return el;
}

export function tilesHTML(tiles){
  return `<div class="kpi-tiles">${tiles.map(tileHTML).join('')}</div>`;
}

function tileHTML(t){
  const tone = t.tone || 'neutral'; // neutral | good | warn | bad
  const badge = t.badge ? `<div class="badge ${t.badgeTone||''}">${t.badge}</div>` : '';
  return `
    <div class="tile t-${tone}">
      <div class="value">${t.value ?? '–'}</div>
      <div class="label">${t.label ?? ''}</div>
      ${badge}
    </div>
  `;
}
