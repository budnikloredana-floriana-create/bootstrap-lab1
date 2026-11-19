const $ = (id) => document.getElementById(id);

// Toast-сповіщення
const toast = (text) => {
  $('toastText').textContent = text;
  bootstrap.Toast.getOrCreateInstance($('toast')).show();
};

// Запасна картинка, якщо фото ще немає в папці images
const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%237a4526'/%3E%3C/svg%3E";
document.querySelectorAll('img.card-img-top').forEach((img) => {
  const useFallback = () => { img.src = PLACEHOLDER; };
  img.addEventListener('error', useFallback, { once: true });
  if (img.complete && img.naturalWidth === 0) useFallback();
});

// Слайдер обсмаження
const roasts = [
  { n: 'Світле обсмаження', c: '#a8693a', t: 'Фруктові та квіткові ноти, яскрава кислинка.', d: 'V60 або кемекс' },
  { n: 'Середнє обсмаження', c: '#7a4526', t: 'Карамель, горіхи та збалансований смак.', d: 'флет-вайт або капучино' },
  { n: 'Темне обсмаження', c: '#4a2a17', t: 'Шоколад, спеції та щільне тіло.', d: 'американо або лате' },
  { n: 'Еспресо-обсмаження', c: '#1c120d', t: 'Гіркий шоколад і димні ноти для любителів міцної кави.', d: 'подвійний еспресо' }
];

const setRoast = () => {
  const r = roasts[$('roast').value];
  document.querySelector('.hero').style.background = r.c;
  $('roastName').textContent = r.n;
  $('roastText').textContent = r.t;
  $('roastDrink').textContent = r.d;
};
$('roast').addEventListener('input', setRoast);
setRoast();

// Темна тема (data-bs-theme)
$('themeBtn').addEventListener('click', () => {
  const html = document.documentElement;
  html.setAttribute('data-bs-theme', html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark');
});

$('newsBtn').addEventListener('click', () => toast('Нове: айс-латте, чізкейк і зерно місяця.'));

// Замовлення
const order = [];

const renderOrder = () => {
  $('orderList').innerHTML = order.length
    ? order.map((o) => `<li class="list-group-item d-flex justify-content-between"><span>${o.item}</span><span>${o.price} грн</span></li>`).join('')
    : '<li class="list-group-item text-body-secondary">Поки порожньо. Додайте щось із меню.</li>';
  $('total').textContent = order.reduce((sum, o) => sum + o.price, 0) + ' грн';
  $('cartCount').textContent = order.length;
};

document.querySelectorAll('.add-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    order.push({ item: btn.dataset.item, price: Number(btn.dataset.price) });
    renderOrder();
    toast('Додано: ' + btn.dataset.item);
  });
});

$('payBtn').addEventListener('click', () => {
  if (!order.length) { toast('Спочатку додайте позиції з меню.'); return; }
  order.length = 0;
  renderOrder();
  toast('Замовлення прийнято. Дякуємо!');
});
renderOrder();

// Валідація форми бронювання
$('bookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  if (form.checkValidity()) {
    toast('Столик заброньовано. Чекаємо на вас!');
    form.reset();
    form.classList.remove('was-validated');
  } else {
    form.classList.add('was-validated');
  }
});