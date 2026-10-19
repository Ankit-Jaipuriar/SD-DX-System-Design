const selectedCase = CASE_STUDIES.find((study) => study.slug === new URLSearchParams(location.search).get('case')) || CASE_STUDIES[0];
document.title = `${selectedCase.title} · System Design Dictionary`;
const bullets = (items) => `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
const numbered = (items) => `<ol>${items.map((item) => `<li>${item}</li>`).join('')}</ol>`;
document.getElementById('case-content').innerHTML = `
  <header class="case-header"><div><p class="eyebrow">Case ${selectedCase.number} · ${selectedCase.difficulty} difficulty</p><h1>${selectedCase.title}</h1><p>${selectedCase.summary}</p></div><img class="guide-character case-guide" src="system-guide-fox.png" alt="A friendly fox guide holding a system-design blueprint" /></header>
  <section class="interviewer-note"><strong>How to answer:</strong> State assumptions first. Drive the conversation from requirements to high-level architecture, then let the interviewer choose which component to deepen.</section>
  <section class="case-section"><p class="eyebrow">1 · Clarify the problem</p><div class="two-col"><article><h2>Functional requirements</h2>${bullets(selectedCase.requirements)}</article><article><h2>Out of scope</h2>${bullets(selectedCase.nonGoals)}</article></div></section>
  <section class="case-section"><p class="eyebrow">2 · Establish scale</p><div class="scale-row">${selectedCase.scale.map((item) => `<span>${item}</span>`).join('')}</div></section>
  <section class="case-section"><p class="eyebrow">3 · Define the contracts</p><pre><code>${selectedCase.apis.join('\n')}</code></pre></section>
  <section class="case-section"><p class="eyebrow">4 · Model the data</p><pre><code>${selectedCase.data.join('\n')}</code></pre></section>
  <section class="case-section"><p class="eyebrow">5 · Draw the high-level architecture</p><div class="case-architecture">${selectedCase.components.map((item, index) => `<div class="architecture-node">${item}</div>${index < selectedCase.components.length - 1 ? '<i>→</i>' : ''}`).join('')}</div><p class="architecture-hint">Explain the path before naming every technology. The interviewer is looking for ownership, boundaries, and data flow.</p></section>
  <section class="case-section"><p class="eyebrow">Animated architecture flow</p><div class="case-storyboard" aria-label="Animated architecture walkthrough"><div class="storyboard-toolbar"><span>LIVE REQUEST PATH</span><button id="animation-toggle" type="button">Pause</button></div><div id="storyboard-track" class="storyboard-track">${selectedCase.components.map((item, index) => `<div class="storyboard-node" data-node="${index}"><b>${index + 1}</b><span>${item}</span></div>`).join('')}</div><div class="storyboard-caption"><span id="frame-count">Step 1 of ${selectedCase.flow.length}</span><p id="frame-description" aria-live="polite"></p></div></div></section>
  <section class="case-section"><p class="eyebrow">6 · Walk one critical flow</p>${numbered(selectedCase.flow)}</section>
  <section class="case-section"><p class="eyebrow">7 · Defend trade-offs</p><div class="case-list">${selectedCase.tradeoffs.map((item) => `<article>${item}</article>`).join('')}</div></section>
  <section class="case-section"><p class="eyebrow">8 · Handle failure explicitly</p><div class="case-list warning">${selectedCase.failures.map((item) => `<article>${item}</article>`).join('')}</div></section>
  <section class="case-section interview-follow"><p class="eyebrow">Interviewer follow-ups</p><h2>Where a good interviewer may go next.</h2>${bullets(selectedCase.followups)}</section>
  <nav class="term-next"><a href="case-study.html?case=${CASE_STUDIES[(CASE_STUDIES.indexOf(selectedCase) + 1) % CASE_STUDIES.length].slug}">Next case study <strong>→</strong></a></nav>`;

let currentFrame = 0;
let playing = true;
const frames = selectedCase.flow;
const storyboardNodes = [...document.querySelectorAll('.storyboard-node')];
const frameCount = document.getElementById('frame-count');
const frameDescription = document.getElementById('frame-description');
const animationToggle = document.getElementById('animation-toggle');
function renderFrame() {
  const activeThrough = Math.floor(((currentFrame + 1) * storyboardNodes.length) / frames.length) - 1;
  storyboardNodes.forEach((node, index) => node.classList.toggle('is-active', index <= activeThrough));
  frameCount.textContent = `Step ${currentFrame + 1} of ${frames.length}`;
  frameDescription.textContent = frames[currentFrame];
}
animationToggle.addEventListener('click', () => {
  playing = !playing;
  animationToggle.textContent = playing ? 'Pause' : 'Play';
});
setInterval(() => {
  if (!playing) return;
  currentFrame = (currentFrame + 1) % frames.length;
  renderFrame();
}, 3200);
renderFrame();
