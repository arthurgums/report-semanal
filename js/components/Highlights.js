// js/components/Highlights.js
import { INT } from '../utils/format.js';
import { sectionCard, tilesHTML } from './UI.js';

function sumAds(block){
  if(!block) return 0;
  return Number(block.tofuUpados||0) + Number(block.mofuBofuUpados||0);
}

export function renderHighlights(week){
  const scriptsTotal = Number(week.scripts?.total?.escritos || 0);
  const scriptsAprov = Number(week.scripts?.total?.aprovados || 0);
  const scriptsRef   = Number(week.scripts?.total?.comReferencia || 0);

  const escoEdit = Number(week.edicao?.escoadosEditados || 0);
  const escoPend = Number(week.edicao?.escoadosPendentesEdicao || 0);

  const metaUp = sumAds(week.metaAds?.total);
  const googUp = sumAds(week.googleAds?.total);
  const adsUpAll = metaUp + googUp;

  const tiles = [
    {
      value: INT(scriptsTotal),
      label: 'Scripts feitos',
      badge: `Aprov.: ${INT(scriptsAprov)} • Ref.: ${INT(scriptsRef)}`,
      badgeTone: 'good'
    },
    {
      value: INT(escoEdit),
      label: 'Materiais escoados editados',
      badge: `Pendentes edição: ${INT(escoPend)}`,
      badgeTone: escoPend > 0 ? 'warn' : 'good'
    },
    {
      value: INT(adsUpAll),
      label: 'Ads upados (semana)',
      badge: `Meta: ${INT(metaUp)} • Google: ${INT(googUp)}`
    }
  ];

  return sectionCard({
    title: 'Destaques',
    icon: '✨',
    bodyHTML: tilesHTML(tiles)
  });
}
