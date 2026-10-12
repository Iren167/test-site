// бургер-меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

// год в подвале
document.getElementById('year').textContent = new Date().getFullYear();

// плавное появление блоков при прокрутке
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('is-visible');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 60 + 'ms';
    io.observe(el);
  });
} else {
  items.forEach((el) => el.classList.add('is-visible'));
}

// форма: проверка на стороне браузера, ничего не отправляется
const form = document.getElementById('form');
const ok = document.getElementById('formOk');

function setError(name, msg) {
  const input = form.elements[name];
  form.querySelector('[data-for="' + name + '"]').textContent = msg;
  input.classList.toggle('is-invalid', Boolean(msg));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.elements.name.value.trim();
  const phone = form.elements.phone.value.trim();
  const digits = phone.replace(/\D/g, '');

  setError('name', name.length < 2 ? 'Введите имя' : '');
  setError('phone', digits.length < 10 ? 'Введите телефон полностью' : '');
  if (name.length < 2 || digits.length < 10) { ok.hidden = true; return; }

  ok.textContent = 'Спасибо, ' + name + '! Заявка принята, мы перезвоним вам в течение дня.';
  ok.hidden = false;
  form.reset();
});
