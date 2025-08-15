import { INT } from '../utils/format.js';
import { sectionCard, tilesHTML } from './UI.js';

function sumAds(block){ if(!block) return 0; return Number(block.tofuUpados||0) + Number(block.mofuBofuUpados||0); }
function tableFromBlock(block){
  return `
    <thead><tr><th>Métrica</th><th>Qtd</th></tr></thead>
    <tbody>
      <tr><td>TOFU upados</td><td>${INT(block.tofuUpados)}</td></tr>
      <tr><td>— Estático/Carrossel</td><td>${INT(block.tofuEstatico)}</td></tr>
      <tr><td>— Vídeo</td><td>${INT(block.tofuVideo)}</td></tr>
      <tr><td>TOFU validados</td><td>${INT(block.tofuValidados)}</td></tr>
      <tr><td>TOFU não validados/em teste</td><td>${INT(block.tofuNaoValidados)}</td></tr>
      <tr><td>MOFU/BOFU upados</td><td>${INT(block.mofuBofuUpados)}</td></tr>
      <tr><td>— Estático/Carrossel</td><td>${INT(block.mofuBofuEstatico)}</td></tr>
      <tr><td>— Vídeo</td><td>${INT(block.mofuBofuVideo)}</td></tr>
      <tr><td>MOFU/BOFU validados</td><td>${INT(block.mofuBofuValidados)}</td></tr>
      <tr><td>MOFU/BOFU não validados</td><td>${INT(block.mofuBofuNaoValidados)}</td></tr>
    </tbody>
  `;
}

export function renderAdsSection(title, data){
  const t = data.total;
  const upados = sumAds(t);
  const validados = Number(t.tofuValidados||0) + Number(t.mofuBofuValidados||0);
  const naoVal   = Number(t.tofuNaoValidados||0) + Number(t.mofuBofuNaoValidados||0);

  const card = sectionCard({
    title,
    icon: title.includes('Google') ? '🔎' : '📣',
    bodyHTML: tilesHTML([
      { value: INT(upados), label:'Ads upados' },
      { value: INT(validados), label:'Validados', tone:'good' },
      { value: INT(naoVal), label:'Em teste', tone: naoVal>0?'warn':'good' },
      { value: `${INT(t.tofuVideo||0)} vídeo • ${INT(t.tofuEstatico||0)} estático`, label:'TOFU (split)' },
    ])
  });

  const details = document.createElement('details');
  details.innerHTML = `
    <summary>Ver por linha (Total / AIG / Natural Fire / Extratos)</summary>
    <div class="cols-3">
      <div><h3 style="margin:0 0 6px 0">Total</h3><table id="tb-ads-total"></table></div>
      <div><h3 style="margin:0 0 6px 0">All In Greens</h3><table id="tb-ads-aig"></table></div>
      <div><h3 style="margin:0 0 6px 0">Natural Fire</h3><table id="tb-ads-nf"></table></div>
    </div>
    <div style="margin-top:12px">
      <h3 style="margin:0 0 6px 0">Extratos</h3><table id="tb-ads-ex"></table>
    </div>
  `;
  card.querySelector('.cat-body').appendChild(details);

  details.querySelector('#tb-ads-total').innerHTML = tableFromBlock(data.total);
  details.querySelector('#tb-ads-aig').innerHTML   = tableFromBlock(data.allInGreens);
  details.querySelector('#tb-ads-nf').innerHTML    = tableFromBlock(data.naturalFire);
  details.querySelector('#tb-ads-ex').innerHTML    = tableFromBlock(data.extratos);

  return card;
}
