// js/main.js
(async () => {
  const app = document.getElementById('app');
  const tabsEl = document.getElementById('tabs');
  const activeLabelEl = document.getElementById('activeLabel');
  const toggleModoBtn = document.getElementById('toggleModo');

  const m = (p) => import(new URL(p, import.meta.url)); // resolve relativo ao próprio main.js

  function showFatal(err){
    console.error(err);
    app.insertAdjacentHTML('afterbegin', `
      <div class="card" style="border:1px solid #ff6b6b">
        <h2>Erro ao carregar módulos</h2>
        <pre style="white-space:pre-wrap">${(err && (err.stack || err.message)) || err}</pre>
        <p class="small muted">Verifique caminhos e se está servindo via HTTP (Live Server ou http.server).</p>
      </div>
    `);
  }

  try {
    const [
      { weeksData },
      { renderTabs },
      { renderHighlights },
      { renderFinanceiro },
      { renderScripts },
      { renderConteudo, renderEdicao },
      { renderAdsSection },
      { renderCharts }
    ] = await Promise.all([
      m('../data/weeksData.js'),
      m('./components/Tabs.js'),
      m('./components/Highlights.js'),
      m('./components/Financeiro.js'),
      m('./components/Scripts.js'),
      m('./components/ContentSections.js'),
      m('./components/AdsBlock.js'),
      m('./components/Charts.js'),
    ]);

    let currentChartsDestroy = null;

    function setMode(simple){
      document.body.setAttribute('data-mode', simple ? 'simple' : 'detailed');
      toggleModoBtn.textContent = simple ? 'Modo detalhado' : 'Modo simples';
      toggleModoBtn.setAttribute('aria-pressed', String(!simple));
      document.querySelectorAll('details').forEach(d => d.open = !simple);
    }

    function renderWeek(i){
      const w = weeksData[i];
      if(!w) return;
      activeLabelEl.textContent = w.label;

      if (currentChartsDestroy) { currentChartsDestroy(); currentChartsDestroy = null; }
      [...app.querySelectorAll('section, .grid')].forEach(n => n.remove());

      const highlights = renderHighlights(w);
      const financeiro = renderFinanceiro(w);
      const charts = renderCharts(w);
      const scripts = renderScripts(w);
      const conteudo = renderConteudo(w);
      const edicao = renderEdicao(w);
      const meta = renderAdsSection('Meta Ads', w.metaAds);
      const google = renderAdsSection('Google Ads', w.googleAds);

      const footnote = app.querySelector('.footnote');
      [highlights, financeiro, charts.el, scripts, conteudo, edicao, meta, google]
        .forEach(sec => app.insertBefore(sec, footnote));

      currentChartsDestroy = charts.destroy;
    }

    renderTabs(tabsEl, weeksData, renderWeek);
    renderWeek(0);
    setMode(true);
    document.querySelectorAll('details').forEach(d => d.open = false);

    toggleModoBtn.addEventListener('click', ()=>{
      const isSimple = document.body.getAttribute('data-mode') === 'simple';
      setMode(!isSimple);
    });
  } catch (err) {
    showFatal(err);
  }
})();
