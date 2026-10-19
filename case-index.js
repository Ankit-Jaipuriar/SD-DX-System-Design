document.getElementById('case-grid').innerHTML = CASE_STUDIES.map((study) => `
  <a class="case-card" href="case-study.html?case=${study.slug}">
    <span>${study.number} · ${study.difficulty}</span><h2>${study.title}</h2><p>${study.subtitle}</p><strong>Practise the case →</strong>
  </a>`).join('');
