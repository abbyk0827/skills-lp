const root = document.documentElement;
document.getElementById('themeBtn').addEventListener('click', () => {
  const now = root.getAttribute('data-theme');
  root.setAttribute('data-theme', now === 'rose' ? '' : 'rose');
});

const links = [...document.querySelectorAll('nav a')];
const io = new IntersectionObserver(entries => {
  const v = entries.filter(e => e.isIntersecting)
                   .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!v) return;
  const id = v.target.id;
  links.forEach(a => a.removeAttribute('aria-current'));
  const hit = document.querySelector(`nav a[href="#${id}"]`);
  if (hit) hit.setAttribute('aria-current', 'page');
}, { threshold: [0.6] });
document.querySelectorAll('section').forEach(el => io.observe(el));

const offset = 72;
links.forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}));

const form = document.getElementById('contact'),
      email = document.getElementById('email'),
      msg = document.getElementById('msg');
form.addEventListener('submit', e => {
  e.preventDefault();
  msg.textContent = '';
  if (!email.checkValidity()) {
    msg.textContent = 'メールアドレスを正しく入力してください。';
    email.focus(); return;
  }
  msg.textContent = '送信しました（テスト）';
  form.reset();
});
