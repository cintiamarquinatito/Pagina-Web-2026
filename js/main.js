let cart = JSON.parse(localStorage.getItem('dulcePelucheCart')) || [];

function saveCart() {
  localStorage.setItem('dulcePelucheCart', JSON.stringify(cart));
}

function toggleCart() {
  const modal = document.getElementById('cart-modal');
  if (modal) modal.classList.toggle('open');
}

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart();
  renderCart();
  const modal = document.getElementById('cart-modal');
  if (modal && !modal.classList.contains('open')) {
    modal.classList.add('open');
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function renderCart() {
  const countEl = document.getElementById('cart-count');
  const itemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  if (countEl) countEl.textContent = totalItems;

  if (!itemsEl || !totalEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Tu cesta está vacía 🧸</p>';
    totalEl.textContent = 'Bs. 0';
    return;
  }

  let total = 0;
  itemsEl.innerHTML = cart.map((item, idx) => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    return `
      <div class="cart-item">
        <span><strong>${item.qty}x</strong> ${item.name}</span>
        <span>
          Bs. ${subtotal}
          <button class="btn-remove-item" onclick="removeFromCart(${idx})" title="Quitar">✕</button>
        </span>
      </div>
    `;
  }).join('');

  totalEl.textContent = `Bs. ${total}`;
}

function sendWhatsApp(phone, vendor) {
  if (cart.length === 0) {
    alert('Tu cesta está vacía. Agrega un peluche primero.');
    return;
  }

  let total = 0;
  let text = `¡Hola ${vendor}! Quiero realizar el siguiente pedido en *Dulce Peluche*:\n\n`;
  cart.forEach(item => {
    const sub = item.price * item.qty;
    total += sub;
    text += `• ${item.qty}x ${item.name} — Bs. ${sub}\n`;
  });
  text += `\n*Total: Bs. ${total}*\n¿Me confirmas disponibilidad?`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
}

document.addEventListener('DOMContentLoaded', renderCart);