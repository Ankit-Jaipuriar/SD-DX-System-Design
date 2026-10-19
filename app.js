const grid = document.getElementById('term-grid');
const search = document.getElementById('search');
const empty = document.getElementById('empty-state');

function renderTerms(query = '') {
  const normalized = query.trim().toLowerCase();
  const matches = SYSTEM_TERMS.filter((term) => `${term.name} ${term.category} ${term.short}`.toLowerCase().includes(normalized));
  grid.innerHTML = matches.map((term) => `
    <a class="term-card" href="term.html?term=${term.slug}">
      <span class="term-number">${term.number}</span>
      <span class="term-category">${term.category}</span>
      <h3>${term.name}</h3>
      <p>${term.short}</p>
      <span class="term-link">Open field note <b>→</b></span>
    </a>`).join('');
  empty.hidden = matches.length !== 0;
}

search.addEventListener('input', (event) => renderTerms(event.target.value));
renderTerms();
