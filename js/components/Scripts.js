import { INT, PCT } from '../utils/format.js';
import { sectionCard, tilesHTML } from './UI.js';

function table(el, obj){
  el.innerHTML = `
    <thead><tr><th>Métrica</th><th>Qtd</th></tr></thead>
    <tbody>
      <tr><td>Nº total de scripts escritos</td><td>${INT(obj.escritos)}</td></tr>
      <tr><td>Nº total de scripts aprovados</td><td>${INT(obj.aprovados)}</td></tr>
      <tr><td>Nº de scripts baseados em referência</td><td>${INT(obj.comReferencia)}</td></tr>
    </tbody>
  `;
}

export function renderScripts(week){
  const tot = week.scripts.total;
  const aprovPct = tot.escritos ? (tot.aprovados / tot.escritos) * 100 : null;

  const card = sectionCard({
    title: 'Scripts',
    icon: '🧾',
    bodyHTML: tilesHTML([
      { value: INT(tot.escritos),    label:'Feitos (total)' },
      { value: INT(tot.aprovados),   label:'Aprovados', tone:'good' },
      { value: INT(tot.comReferencia), label:'Com referência' },
      { value: aprovPct==null?'–':PCT(aprovPct), label:'% aprovação', tone: aprovPct>=60?'good':'warn' },
    ])
  });

  const details = document.createElement('details');
  details.innerHTML = `
    <summary>Ver por linha (AIG, Natural Fire, Extratos)</summary>
    <div class="cols-3">
      <div><h3 style="margin:8px 0 6px 0">All In Greens</h3><table id="tb-scripts-aig"></table></div>
      <div><h3 style="margin:8px 0 6px 0">Natural Fire</h3><table id="tb-scripts-nf"></table></div>
      <div><h3 style="margin:8px 0 6px 0">Extratos</h3><table id="tb-scripts-ex"></table></div>
    </div>
    <div style="margin-top:12px">
      <h3 style="margin:0 0 6px 0">Total</h3>
      <table id="tb-scripts-total"></table>
    </div>
  `;
  card.querySelector('.cat-body').appendChild(details);

  table(details.querySelector('#tb-scripts-aig'), week.scripts.allInGreens);
  table(details.querySelector('#tb-scripts-nf'),  week.scripts.naturalFire);
  table(details.querySelector('#tb-scripts-ex'),  week.scripts.extratos);
  table(details.querySelector('#tb-scripts-total'), week.scripts.total);

  return card;
}
