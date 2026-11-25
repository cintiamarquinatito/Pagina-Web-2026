const WHATSAPP_CINTIA = "59163397495";
const WHATSAPP_BRIANA = "59164550630";

let cart = [];

function showToast(mensaje) {
  let toast = document.getElementById("dp-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "dp-toast";
    toast.style.cssText =
      "position:fixed;bottom:22px;right:22px;background:#1d3c5c;color:#ffffff;border:2px dashed #64bce8;padding:12px 20px;border-radius:999px;font-family:'Fredoka',sans-serif;font-weight:500;font-size:0.9rem;z-index:999;box-shadow:0 8px 20px rgba(29,60,92,0.25);transition:opacity 0.3s;";
    document.body.appendChild(toast);
  }
  toast.textContent = mensaje;
  toast.style.opacity = "1";
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = "0";
  }, 2000);
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
  showToast(`♥ ${name} agregado a la cesta`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const countEl = document.getElementById("cart-count");
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (countEl) countEl.textContent = `(${cart.length})`;
  if (!list || !totalEl) return;

  if (cart.length === 0) {
    list.innerHTML = '<p class="cart-empty">Aún no agregaste peluches.</p>';
    totalEl.textContent = "Bs. 0";
    return;
  }

  let total = 0;
  list.innerHTML = cart
    .map((item, i) => {
      total += item.price;
      return `
        <div class="cart-item">
          <span>${item.name}</span>
          <span>
            <strong>Bs. ${item.price}</strong>
            <button class="btn-remove-item" onclick="removeFromCart(${i})">✕</button>
          </span>
        </div>
      `;
    })
    .join("");

  totalEl.textContent = `Bs. ${total}`;
}

function toggleCart() {
  const modal = document.getElementById("cart-modal");
  if (modal) modal.classList.toggle("open");
}

function sendWhatsApp(quien) {
  if (cart.length === 0) {
    alert("Agrega al menos un peluche primero.");
    return;
  }

  const numero = quien === "cintia" ? WHATSAPP_CINTIA : WHATSAPP_BRIANA;
  const nombre = quien === "cintia" ? "Cintia" : "Briana";

  const lines = cart
    .map((item) => `• ${item.name} (Bs. ${item.price})`)
    .join("%0A");
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const msg = `Hola ${nombre}! Quiero hacer este pedido de peluches:%0A%0A${lines}%0A%0A*Total: Bs. ${total}*`;

  window.open(`https://wa.me/${numero}?text=${msg}`, "_blank");
}