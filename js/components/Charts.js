import { BRL, PCT } from '../utils/format.js';
import { sectionCard } from './UI.js';

export function renderCharts(week){
  const outer = document.createElement('section');
  outer.className = 'grid charts-card';

  // Atribuição
  const atribCard = sectionCard({ title:'Atribuição de vendas (%)', icon:'🧭', bodyHTML:`<canvas id="chartAtribuicao" height="160"></canvas><div class="footnote">Inclui “Não localizado” quando informado.</div>` });
  atribCard.classList.add('card');

  // Pedidos
  const pedidosCard = sectionCard({ title:'Pedidos por canal', icon:'🧾', bodyHTML:`<canvas id="chartPedidos" height="160"></canvas>` });
  pedidosCard.classList.add('card');

  // Gastos
  const gastosCard = sectionCard({ title:'Gastos em anúncios', icon:'💸', bodyHTML:`<canvas id="chartGastos" height="160"></canvas>` });
  gastosCard.classList.add('card');

  outer.append(atribCard, pedidosCard, gastosCard);

  let chAtrib=null, chPed=null, chGasto=null;

  // ===== charts (mesmo código que já tinha)
  const atrib = week.financeiro.atribuicaoVendasPercent || {};
  const atrLabels = [
    ['Social Media', atrib.socialMedia],
    ['SalesArmy', atrib.salesArmy],
    ['Orgânico', atrib.organico],
    ['Email mkt', atrib.email],
    ['Meta Ads', atrib.metaAds],
    ['Google Ads', atrib.googleAds],
    ['Mercado Livre', atrib.mercadolivre],
    ['Shopee', atrib.shopee],
    ['Amazon', atrib.amazon],
    ['TikTok Shops', atrib.tiktokShops],
    ['TikTok Ads', atrib.tiktokAds],
    ['Indproduct', atrib.indproduct],
    ['Judge.Me', atrib.judgeMe],
    ['MeuGURU', atrib.meuGuru],
  ].filter(([,v]) => v !== undefined && v !== null);

  if (week.financeiro.naoLocalizadoPercent !== undefined && week.financeiro.naoLocalizadoPercent !== null) {
    atrLabels.push(['Não localizado', week.financeiro.naoLocalizadoPercent]);
  }

  chAtrib = new Chart(atribCard.querySelector('#chartAtribuicao'), {
    type: 'doughnut',
    data: { labels: atrLabels.map(r=>r[0]), datasets: [{ data: atrLabels.map(r=>Number(r[1])||0) }] },
    options: { responsive:true, plugins:{ legend:{ position:'bottom' }, tooltip:{ callbacks:{ label: ctx => `${ctx.label}: ${PCT(ctx.parsed)}` } } }, cutout: '55%' }
  });

  const c = week.financeiro.pedidosPorCanal;
  const rowsCanais = [
    ['Yampi (novos)', c.yampiNovos],
    ['Yampi (recorrentes)', c.yampiRecorrentes],
    ['Digital Manager Guru', c.dmg],
    ['Mercado Livre', c.mercadolivre],
    ['Shopee', c.shopee],
    ['Amazon', c.amazon],
    ['TikTok Shops', c.tiktokShops],
  ];
  chPed = new Chart(pedidosCard.querySelector('#chartPedidos'), {
    type: 'bar',
    data: { labels: rowsCanais.map(r=>r[0]), datasets: [{ data: rowsCanais.map(r=>Number(r[1])||0) }] },
    options:{ responsive:true, plugins:{ legend:{ display:false }}, scales:{ y:{ beginAtZero:true, ticks:{ precision:0 } } } }
  });

  const a = week.financeiro.gastosAnuncios;
  const rowsAds = [['Meta Ads',a.meta],['Google Ads',a.google],['TikTok Ads',a.tiktok],['Mercado Livre Ads',a.mlAds]];
  chGasto = new Chart(gastosCard.querySelector('#chartGastos'), {
    type: 'bar',
    data: { labels: rowsAds.map(r=>r[0]), datasets:[{ data: rowsAds.map(r=>Number(r[1])||0) }] },
    options:{ responsive:true, plugins:{ legend:{ display:false }, tooltip:{ callbacks:{ label: ctx => `${BRL(ctx.parsed.y)}` }}}, scales:{ y:{ beginAtZero:true } } }
  });

  return {
    el: outer,
    destroy(){
      try{ chAtrib && chAtrib.destroy(); }catch(e){}
      try{ chPed && chPed.destroy(); }catch(e){}
      try{ chGasto && chGasto.destroy(); }catch(e){}
    }
  };
}
