import { INT, BRL } from '../utils/format.js';
import { sectionCard, tilesHTML } from './UI.js';

export function renderConteudo(week){
  const c = week.conteudo;
  const card = sectionCard({
    title: 'Conteúdo',
    icon: '📦',
    bodyHTML: tilesHTML([
      { value: INT(c.escoadosEntregues), label:'Escoados entregues', tone:'good' },
      { value: INT(c.escoadosPendentes), label:'Escoados pendentes', tone: c.escoadosPendentes>0?'warn':'good' },
      { value: INT(c.contratosFechados), label:'Contratos fechados' },
      { value: BRL(c.faturamentoComCupom), label:'Faturamento cupons' },
    ])
  });

  const details = document.createElement('details');
  details.innerHTML = `
    <summary>Ver detalhes de conteúdo</summary>
    <table id="tb-conteudo"></table>
  `;
  card.querySelector('.cat-body').appendChild(details);

  const tb = details.querySelector('#tb-conteudo');
  tb.innerHTML = `
    <thead><tr><th>Indicador</th><th>Qtd/Valor</th></tr></thead>
    <tbody>
      <tr><td>Nº de envio p/ criadores do mural</td><td>${INT(c.enviosMural)}</td></tr>
      <tr><td>Nº de envio p/ novos criadores</td><td>${INT(c.enviosNovosCriadores)}</td></tr>
      <tr><td>Materiais escoados entregues</td><td>${INT(c.escoadosEntregues)}</td></tr>
      <tr><td>Materiais escoados pendentes</td><td>${INT(c.escoadosPendentes)}</td></tr>
      <tr><td>Materiais escoados aguardando aprovação</td><td>${INT(c.escoadosAguardandoAprovacao)}</td></tr>
      <tr><td>Primeira entrega entregues</td><td>${INT(c.primeiraEntregaEntregues)}</td></tr>
      <tr><td>Primeira entrega pendentes</td><td>${INT(c.primeiraEntregaPendentes)}</td></tr>
      <tr><td>Primeira entrega aguardando aprovação</td><td>${INT(c.primeiraEntregaAguardandoAprovacao)}</td></tr>
      <tr><td>Prontos para escoar não escoados</td><td>${INT(c.prontosParaEscoarNaoEscoados)}</td></tr>
      <tr><td>Formulários META Receptivas</td><td>${INT(c.metaReceptivas)}</td></tr>
      <tr><td>Formulários META Ativas</td><td>${INT(c.metaAtivas)}</td></tr>
      <tr><td>Formulários sem esteira</td><td>${INT(c.semEsteira)}</td></tr>
      <tr><td>Formulários YouTube</td><td>${INT(c.youtube)}</td></tr>
      <tr><td>Prospecções ativas</td><td>${INT(c.prospeccoesAtivas)}</td></tr>
      <tr><td>Orçamentos BIG INFLUS</td><td>${INT(c.orcamentosBigInflus)}</td></tr>
      <tr><td>Contratos fechados</td><td>${INT(c.contratosFechados)}</td></tr>
      <tr><td>Criadores sem material</td><td>${INT(c.criadoresSemMaterial)}</td></tr>
      <tr><td>Vendas com cupons de criadores</td><td>${INT(c.vendasComCupom)}</td></tr>
      <tr><td>Faturamento via cupons</td><td>${BRL(c.faturamentoComCupom)}</td></tr>
    </tbody>
  `;
  return card;
}

export function renderEdicao(week){
  const e = week.edicao;
  const card = sectionCard({
    title: 'Edição / Design',
    icon: '✂️',
    bodyHTML: tilesHTML([
      { value: INT(e.escoadosEditados), label:'Escoados editados', tone:'good' },
      { value: INT(e.escoadosPendentesEdicao), label:'Pendentes edição', tone: e.escoadosPendentesEdicao>0?'warn':'good' },
      { value: INT(e.estaticosProntos), label:'Estáticos prontos' },
      { value: INT(e.carrosseisProntos), label:'Carrosséis prontos' },
    ])
  });

  const details = document.createElement('details');
  details.innerHTML = `
    <summary>Ver detalhes de edição</summary>
    <table id="tb-edicao"></table>
  `;
  card.querySelector('.cat-body').appendChild(details);

  const tb = details.querySelector('#tb-edicao');
  tb.innerHTML = `
    <thead><tr><th>Indicador</th><th>Qtd</th></tr></thead>
    <tbody>
      <tr><td>Escoados editados (pronto/rodando)</td><td>${INT(e.escoadosEditados)}</td></tr>
      <tr><td>Escoados pendentes para edição</td><td>${INT(e.escoadosPendentesEdicao)}</td></tr>
      <tr><td>Estáticos prontos</td><td>${INT(e.estaticosProntos)}</td></tr>
      <tr><td>Estáticos aguardando revisão</td><td>${INT(e.estaticosAguardandoRev)}</td></tr>
      <tr><td>Carrosséis prontos</td><td>${INT(e.carrosseisProntos)}</td></tr>
      <tr><td>Carrosséis aguardando revisão</td><td>${INT(e.carrosseisAguardandoRev)}</td></tr>
    </tbody>
  `;
  return card;
}
