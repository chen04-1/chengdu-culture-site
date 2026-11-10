(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menu && nav) {
    menu.setAttribute('aria-controls', 'main-nav');
    menu.setAttribute('aria-expanded', 'false');
    nav.id = 'main-nav';
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
      nav.classList.toggle('is-open', open);
    });
  }
  const current = document.querySelector(`.main-nav a[data-page="${document.body.dataset.page}"]`);
  if (current) { current.classList.add('active'); current.setAttribute('aria-current', 'page'); }
  const slides = [...document.querySelectorAll('.hero-slide')];
  const dots = [...document.querySelectorAll('.hero-controls .dot')];
  if (!slides.length) return;
  let index = 0;
  function show(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => { dot.classList.toggle('active', i === index); dot.setAttribute('aria-pressed', String(i === index)); });
  }
  document.querySelector('.hero-controls .prev')?.addEventListener('click', () => show(index - 1));
  document.querySelector('.hero-controls .next')?.addEventListener('click', () => show(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
  show(0);
})();
