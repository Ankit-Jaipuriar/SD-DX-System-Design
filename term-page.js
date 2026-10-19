const params = new URLSearchParams(window.location.search);
const term = SYSTEM_TERMS.find((item) => item.slug === params.get('term')) || SYSTEM_TERMS[0];
document.title = `${term.name} · System Design Dictionary`;

function list(items) { return items.map((item) => `<li>${item}</li>`).join(''); }
function node(node) { return `<button class="diagram-node" data-id="${node.id}" style="left:${node.x}%;top:${node.y}%" type="button">${node.label}</button>`; }
const byId = term.diagram ? Object.fromEntries(term.diagram.nodes.map((node) => [node.id, node])) : {};
const questions = INTERVIEW_QUESTIONS[term.slug] || [];
const diagramSection = term.diagram ? `
  <section class="interactive-section" aria-labelledby="diagram-title">
    <div class="diagram-intro"><p class="eyebrow">Interactive diagram</p><h2 id="diagram-title">Follow the flow.</h2><p>Click any component to understand its responsibility.</p></div>
    <div class="diagram" role="group" aria-label="Interactive ${term.name} diagram">
      <svg class="diagram-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs><marker id="arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5z" /></marker></defs>
        ${term.diagram.edges.map(([from, to]) => `<line x1="${byId[from].x}" y1="${byId[from].y}" x2="${byId[to].x}" y2="${byId[to].y}" marker-end="url(#arrow)" />`).join('')}
      </svg>
      ${term.diagram.nodes.map(node).join('')}
    </div>
    <p id="diagram-detail" class="diagram-detail" aria-live="polite">Select a component in the diagram.</p>
  </section>` : '';

document.getElementById('term-content').innerHTML = `
  <header class="term-header">
    <p class="eyebrow">${term.number} · ${term.category}</p>
    <h1>${term.name}</h1>
    <p class="term-definition">${term.definition}</p>
  </header>
  ${diagramSection}
  <section class="notes-grid">
    <article><p class="eyebrow">The problem</p><h2>Why it exists</h2><p>${term.why}</p></article>
    <article class="example"><p class="eyebrow">A concrete example</p><h2>In practice</h2><p>${term.example}</p></article>
  </section>
  <section class="decision-grid">
    <article><p class="eyebrow">Use it when</p><ul>${list(term.useWhen)}</ul></article>
    <article><p class="eyebrow">Trade-offs</p><ul>${list(term.tradeoffs)}</ul></article>
  </section>
  <section class="interview-section" aria-labelledby="interview-title">
    <p class="eyebrow">Interview ladder</p>
    <h2 id="interview-title">Questions worth practising.</h2>
    <div class="question-list">${questions.map(([level, question], index) => `<article class="question"><span>${level}</span><details><summary>${question}</summary><p>${INTERVIEW_ANSWERS[term.slug]?.[index] || 'Answer coming soon.'}</p></details></article>`).join('')}</div>
  </section>
  <nav class="term-next"><a href="term.html?term=${SYSTEM_TERMS[(SYSTEM_TERMS.indexOf(term) + 1) % SYSTEM_TERMS.length].slug}">Next field note <strong>→</strong></a></nav>`;

document.querySelectorAll('.diagram-node').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.diagram-node').forEach((item) => item.classList.remove('selected'));
    button.classList.add('selected');
    document.getElementById('diagram-detail').textContent = byId[button.dataset.id].detail;
  });
});
