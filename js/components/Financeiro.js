import { BRL, INT, PCT } from '../utils/format.js';
import { sectionCard, tilesHTML } from './UI.js';

export function renderFinanceiro(week){
  const f = week.financeiro;
  const canais = f.pedidosPorCanal || {};
  const yampiTotal = Number(canais.yampiNovos||0) + Number(canais.yampiRecorrentes||0);
  const recorrPct = yampiTotal ? (Number(canais.yampiRecorrentes||0) / yampiTotal) * 100 : null;

  const gastos = f.gastosAnuncios || {};
  const gastosTotais = ['meta','google','tiktok','mlAds']
    .reduce((s,k)=> s + (Number(gastos[k]||0)), 0);

  const lucro = Number(f.lucro||0);
  const lucroDia = lucro/7;

  const tiles = [
    { value: BRL(f.faturamento), label: 'Faturamento total' },
    { value: BRL(f.ticketMedio), label: 'Ticket médio' },
    { value: PCT(f.conversao.checkoutYampi), label: 'Conversão checkout', tone: (f.conversao.checkoutYampi>=40?'good':'warn') },
    { value: recorrPct==null?'–':PCT(recorrPct), label: 'Clientes recorrentes' },
    { value: INT(f.pedidosPagosTotais), label: 'Vendas totais', badge: f.pedidosPagosTotais>=500?'Bom volume':'', badgeTone: 'good' },

    { value: BRL(gastos.meta), label: 'Gasto Meta Ads' },
    { value: BRL(gastos.google), label: 'Gasto Google Ads' },
    { value: BRL(gastosTotais), label: 'Gastos totais' },

    { value: BRL(lucro), label: 'Lucro', tone: (lucro>=0?'good':'bad'), badge: lucro<0?'-7,10%':'', badgeTone: 'bad' },
    { value: BRL(lucroDia), label: 'Lucro médio diário', tone: (lucroDia>=0?'good':'bad') },
    { value: PCT(f.margemPercent), label: 'Margem' },
    { value: PCT(f.roiPercent), label: 'ROI' },
  ];

  const card = sectionCard({
    title: 'Financeiro',
    icon: '📊💰',
    bodyHTML: tilesHTML(tiles)
  });

  // Detalhes (tabelas) iguais aos originais
  const details = document.createElement('details');
  details.innerHTML = `
    <summary>Ver detalhes financeiros</summary>
    <div class="cols-2">
      <div>
        <table>
          <thead><tr><th>Canal de pedidos</th><th>Qtd</th></tr></thead>
          <tbody id="tb-fin-canais"></tbody>
        </table>
      </div>
      <div>
        <table>
          <thead><tr><th>Gastos em Ads</th><th>Valor</th></tr></thead>
          <tbody id="tb-fin-ads"></tbody>
        </table>
      </div>
    </div>
  `;
  card.querySelector('.cat-body').appendChild(details);

  const tbFinCanais = details.querySelector('#tb-fin-canais');
  [
    ['Yampi (novos)', canais.yampiNovos],
    ['Yampi (recorrentes)', canais.yampiRecorrentes],
    ['Digital Manager Guru', canais.dmg],
    ['Mercado Livre', canais.mercadolivre],
    ['Shopee', canais.shopee],
    ['Amazon', canais.amazon],
    ['TikTok Shops', canais.tiktokShops],
  ].forEach(([k,v]) => tbFinCanais.insertAdjacentHTML('beforeend', `<tr><td>${k}</td><td>${INT(v)}</td></tr>`));

  const tbFinAds = details.querySelector('#tb-fin-ads');
  const rows = [['Meta Ads',gastos.meta],['Google Ads',gastos.google],['TikTok Ads',gastos.tiktok],['Mercado Livre Ads',gastos.mlAds]];
  let total=0;
  rows.forEach(([k,v]) => { total += (Number(v)||0); tbFinAds.insertAdjacentHTML('beforeend', `<tr><td>${k}</td><td>${BRL(v)}</td></tr>`); });
  tbFinAds.insertAdjacentHTML('beforeend', `<tr><th>Total</th><th>${BRL(total)}</th></tr>`);

  return card;
}
