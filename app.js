const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion');
  const reveals = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); reveals.unobserve(entry.target); }
  }), { threshold: 0.06 });
  document.querySelectorAll('.reveal').forEach(el => reveals.observe(el));
}
const nav = document.querySelector('.nav-pill');
const updateNav = () => {
  const inInfo = document.querySelector('#about').getBoundingClientRect().top < innerHeight * 0.5;
  nav.classList.toggle('info-active', inInfo);
  nav.querySelectorAll('a').forEach(a => {
    const active = a.hash === (inInfo ? '#about' : '#work');
    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
  });
};
window.addEventListener('scroll', updateNav, { passive: true }); updateNav();
const cases = {
  warehouse: {
    label: 'Commercial experience · approximately one year',
    title: 'From a failed scan to a working process.',
    html: `<h3>The problem</h3><p>Products from different suppliers arrived with inconsistent GS1 DataMatrix formats. Some scans were not recognized by the existing warehouse system, requiring a separate scanning tool, a spreadsheet export and manual transfer into accounting.</p><h3>My contribution</h3><p>I diagnosed the exchange between the scanner, warehouse application and accounting system. I built terminal applications that intercept the scan, identify its format, restore separators and barcode type markers, then pass the corrected representation into the existing workflow.</p><p>The normalization preserves product identifiers, batch information and cryptographic data. Correctly formatted codes are left unchanged. Processing happens locally, without needing a continuous network connection.</p><h3>Validation and outcome</h3><p>I implemented separate rules for three warehouse areas and validated them on real product codes and physical terminals. The affected goods could then be processed without the intermediate spreadsheet step, using the same equipment and operator interface.</p><h3>Engineering choices</h3><ul><li>Extend the existing warehouse infrastructure.</li><li>Preserve the entire code payload through normalization.</li><li>Keep each warehouse area's rules isolated.</li><li>Validate against physical samples before deployment.</li></ul><p class="case-note">Commercial work. Employer and product names are anonymized.</p>`
  },
  flagr: {
    label: 'Independent project · Go backend engineering',
    title: 'A feature flag service, end to end.',
    html: `<p>Flagr brings together several backend concerns in one independently built project: flag evaluation, API design, caching, audit events and observability.</p><h3>Implementation</h3><ul><li>REST and gRPC interfaces, with a Go client SDK and local caching.</li><li>PostgreSQL persistence and Redis caching.</li><li>Kafka audit processing with retries and a dead-letter queue.</li><li>Prometheus metrics and OpenTelemetry traces, viewed through Grafana and Jaeger.</li><li>A React interface, unit tests, container-based integration tests and GitHub Actions checks.</li></ul><h3>Design focus</h3><p>The service separates flag evaluation from its HTTP and gRPC interfaces. Repository and cache interfaces allow service behavior to be tested independently, while container-based tests exercise the database layer.</p><p class="case-note">Independent project. Explore the implementation, tests and setup instructions in the repository.</p><a class="text-link" href="https://github.com/Royal17x/flagr" target="_blank" rel="noopener noreferrer">View source on GitHub ↗</a>`
  }
};
const dialog = document.querySelector('#case-dialog');
let opener;
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
  const c = cases[button.dataset.case]; opener = button;
  document.querySelector('#case-label').textContent = c.label;
  document.querySelector('#case-title').textContent = c.title;
  document.querySelector('#case-content').innerHTML = c.html;
  dialog.showModal(); document.body.style.overflow = 'hidden';
}));
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); }});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus(); });
