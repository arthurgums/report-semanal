export function renderTabs(container, weeks, onSelect){
  container.innerHTML = '';
  weeks.forEach((w, idx) => {
    const b = document.createElement('button');
    b.className = 'tab-btn';
    b.type = 'button';
    b.textContent = w.label;
    b.setAttribute('aria-selected', idx===0 ? 'true' : 'false');
    b.addEventListener('click', () => {
      [...container.children].forEach(el => el.setAttribute('aria-selected','false'));
      b.setAttribute('aria-selected','true');
      onSelect(idx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    container.appendChild(b);
  });
}
