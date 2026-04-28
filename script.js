const products = {
  ubtan: { price: 1, mr: "कांती उटणे", en: "Kanti Ubtan" },
  "bath-salt": { price: 1, mr: "कांती बाथ सॉल्ट", en: "Kanti Bath Salt" },
  "bath-soap": { price: 1, mr: "कांती बाथ सोप", en: "Kanti Bath Soap" },
  "face-mask-offer": { price: 1, mr: "Herbal Summer Face Mask Offer", en: "Herbal Summer Face Mask Offer" },
  "face-oil": { price: 1, mr: "कांती फेस ऑईल", en: "Kanti Face Oil" },
  "gift-hamper": { price: 1, mr: "कांती गिफ्ट हॅम्पर", en: "Kanti Gift Hamper" },
};

const whatsappNumber = "918208427976";
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const offerModal = document.querySelector("[data-offer-modal]");
const offerOpen = document.querySelector("[data-offer-open]");
const offerCloseButtons = document.querySelectorAll("[data-offer-close]");
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartItemsEl = document.querySelector("[data-cart-items]");
const cartEmptyEl = document.querySelector("[data-cart-empty]");
const cartTotalEl = document.querySelector("[data-cart-total]");
const cartCountEl = document.querySelector("[data-cart-count]");
const toastEl = document.querySelector("[data-toast]");

let activeLang = localStorage.getItem("kantiLang") || "mr";
let cart = JSON.parse(localStorage.getItem("kantiCart") || "{}");
let toastTimer;

document.body.dataset.activeLang = activeLang;
document.documentElement.lang = activeLang;
updateLanguageButtons();
renderCart();

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-lang-set]").forEach((button) => {
  button.addEventListener("click", () => {
    activeLang = button.dataset.langSet;
    localStorage.setItem("kantiLang", activeLang);
    document.body.dataset.activeLang = activeLang;
    document.documentElement.lang = activeLang;
    updateLanguageButtons();
    renderCart();
  });
});

document.querySelectorAll("[data-add-cart]").forEach((button) => {
  button.addEventListener("click", () => {
    addToCart(button.dataset.addCart);
    showToast(activeLang === "mr" ? "Product cart मध्ये add झाला." : "Product added to cart.");
  });
});

document.querySelectorAll("[data-buy-now]").forEach((button) => {
  button.addEventListener("click", () => {
    buyNow(button.dataset.buyNow);
  });
});

document.querySelectorAll("[data-cart-open]").forEach((button) => {
  button.addEventListener("click", () => setCartOpen(true));
});

document.querySelector("[data-cart-close]")?.addEventListener("click", () => setCartOpen(false));
document.querySelector("[data-cart-clear]")?.addEventListener("click", clearCart);
document.querySelector("[data-cart-checkout]")?.addEventListener("click", checkoutCart);

cartDrawer?.addEventListener("click", (event) => {
  if (event.target === cartDrawer) setCartOpen(false);
});

window.addEventListener(
  "scroll",
  () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  },
  { passive: true }
);

function setOfferOpen(isOpen) {
  if (!offerModal) return;
  offerModal.classList.toggle("is-open", isOpen);
  offerModal.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("menu-open", isOpen);
}

offerOpen?.addEventListener("click", () => setOfferOpen(true));
offerCloseButtons.forEach((button) => button.addEventListener("click", () => setOfferOpen(false)));
offerModal?.addEventListener("click", (event) => {
  if (event.target === offerModal) setOfferOpen(false);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setOfferOpen(false);
    setCartOpen(false);
  }
});

function updateLanguageButtons() {
  document.querySelectorAll("[data-lang-set]").forEach((button) => {
    button.classList.toggle("active", button.dataset.langSet === activeLang);
  });
}

function addToCart(sku) {
  if (!products[sku]) return;
  cart[sku] = (cart[sku] || 0) + 1;
  saveCart();
  renderCart();
}

function updateQuantity(sku, delta) {
  if (!products[sku]) return;
  cart[sku] = (cart[sku] || 0) + delta;
  if (cart[sku] <= 0) delete cart[sku];
  saveCart();
  renderCart();
}

function clearCart() {
  cart = {};
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("kantiCart", JSON.stringify(cart));
}

function cartEntries() {
  return Object.entries(cart).filter(([sku, qty]) => products[sku] && qty > 0);
}

function renderCart() {
  const entries = cartEntries();
  const totalQty = entries.reduce((sum, [, qty]) => sum + qty, 0);
  const total = entries.reduce((sum, [sku, qty]) => sum + products[sku].price * qty, 0);

  cartCountEl.textContent = totalQty;
  cartTotalEl.textContent = `₹${total}`;
  cartEmptyEl.classList.toggle("is-visible", entries.length === 0);

  cartItemsEl.innerHTML = entries
    .map(([sku, qty]) => {
      const product = products[sku];
      const name = product[activeLang];
      return `
        <div class="cart-item">
          <div>
            <h3>${name}</h3>
            <p>₹${product.price} × ${qty} = ₹${product.price * qty}</p>
          </div>
          <div class="cart-qty">
            <button type="button" data-qty="${sku}" data-delta="-1">−</button>
            <strong>${qty}</strong>
            <button type="button" data-qty="${sku}" data-delta="1">+</button>
          </div>
        </div>
      `;
    })
    .join("");

  cartItemsEl.querySelectorAll("[data-qty]").forEach((button) => {
    button.addEventListener("click", () => updateQuantity(button.dataset.qty, Number(button.dataset.delta)));
  });
}

function setCartOpen(isOpen) {
  if (!cartDrawer) return;
  cartDrawer.classList.toggle("is-open", isOpen);
  cartDrawer.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("menu-open", isOpen);
}

function buyNow(sku) {
  const product = products[sku];
  if (!product) return;
  const message =
    activeLang === "mr"
      ? `नमस्कार Sree Kanti, मला ${product.mr} order करायचे आहे.\nQuantity: 1\nTotal: ₹${product.price}`
      : `Hello Sree Kanti, I want to order ${product.en}.\nQuantity: 1\nTotal: ₹${product.price}`;
  openWhatsApp(message);
}

function checkoutCart() {
  const entries = cartEntries();
  if (!entries.length) {
    showToast(activeLang === "mr" ? "Cart रिकामे आहे." : "Cart is empty.");
    return;
  }

  const lines = entries.map(([sku, qty], index) => {
    const product = products[sku];
    return `${index + 1}. ${product[activeLang]} - Qty ${qty} - ₹${product.price * qty}`;
  });
  const total = entries.reduce((sum, [sku, qty]) => sum + products[sku].price * qty, 0);
  const intro =
    activeLang === "mr"
      ? "नमस्कार Sree Kanti, मला खालील products order करायचे आहेत:"
      : "Hello Sree Kanti, I want to order the following products:";
  openWhatsApp(`${intro}\n\n${lines.join("\n")}\n\nTotal: ₹${total}`);
}

function openWhatsApp(message) {
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2200);
}
