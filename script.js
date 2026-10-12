const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
});

mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-category]').forEach((card) => {
    const visible = filter === 'all' || card.dataset.category === filter;
    card.style.display = visible ? '' : 'none';
  });
}));

const form = document.querySelector('#contactForm');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const message = [
    'Merhaba ProTech, yeni bir proje hakkında konuşmak istiyorum.',
    '',
    `Ad: ${formData.get('name')}`,
    `E-posta: ${formData.get('email')}`,
    `Proje tipi: ${formData.get('service')}`,
    `Bütçe: ${formData.get('budget')}`,
    `Detay: ${formData.get('message')}`,
  ].join('\n');
  const submit = form.querySelector('button[type="submit"]');
  const original = submit.innerHTML;
  submit.disabled = true;
  submit.innerHTML = 'WhatsApp açılıyor… <span>↗</span>';
  window.open(`https://wa.me/905013242362?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  window.setTimeout(() => {
    form.reset();
    submit.disabled = false;
    submit.innerHTML = original;
  }, 900);
});
