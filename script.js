const whatsappNumber = "918208427976";
const products = [
  {
    sku: "ubtan",
    category: "skin",
    image: "assets/products/ubtan.jpg",
    price: 1,
    mrp: 99,
    rating: 4.8,
    reviews: 128,
    tags: ["Ubtan", "Glow", "Powder"],
    mr: {
      name: "कांती उटणे",
      desc: "पारंपरिक उटण्यापासून प्रेरित powder cleanser. त्वचा स्वच्छ, मऊ आणि ताजीतवानी वाटण्यासाठी.",
      bullets: ["दूध, गुलाबजल किंवा दह्यासोबत paste करा", "चेहरा, मान, हात आणि पायांसाठी योग्य"],
    },
    en: {
      name: "Kanti Ubtan",
      desc: "Traditional ubtan-inspired powder cleanser for a clean, soft and refreshed skin feel.",
      bullets: ["Mix with milk, rose water or curd", "Suitable for face, neck, hands and feet"],
    },
  },
  {
    sku: "bath-salt",
    category: "bath",
    image: "assets/products/bath-salt.jpg",
    price: 1,
    mrp: 149,
    rating: 4.7,
    reviews: 94,
    tags: ["Bath Salt", "Rose", "Relax"],
    mr: {
      name: "कांती बाथ सॉल्ट",
      desc: "Rose-petal आणि mineral salt inspired blend. Foot soak आणि relaxing bath साठी.",
      bullets: ["गरम पाण्यात मिसळून वापरा", "Pedicure routine आणि gifting साठी योग्य"],
    },
    en: {
      name: "Kanti Bath Salt",
      desc: "Rose-petal and mineral salt inspired blend for foot soaks and relaxing baths.",
      bullets: ["Mix in warm water", "Ideal for pedicure routines and gifting"],
    },
  },
  {
    sku: "bath-soap",
    category: "bath",
    image: "assets/products/bath-soap.jpg",
    price: 1,
    mrp: 79,
    rating: 4.6,
    reviews: 76,
    tags: ["Soap", "Herbal", "Daily"],
    mr: {
      name: "कांती बाथ सोप",
      desc: "Herbal handmade-style bathing bar. रोजच्या स्नानासाठी gentle cleansing feel.",
      bullets: ["Daily bath routine मध्ये वापरण्यास सोपा", "Hamper add-on म्हणून चांगला"],
    },
    en: {
      name: "Kanti Bath Soap",
      desc: "Herbal handmade-style bathing bar for a gentle everyday cleansing feel.",
      bullets: ["Easy for daily bath routines", "Works beautifully as a hamper add-on"],
    },
  },
  {
    sku: "face-mask-offer",
    category: "skin",
    image: "assets/products/face-mask.jpg",
    price: 1,
    mrp: 65,
    rating: 4.9,
    reviews: 211,
    deal: true,
    tags: ["Face Mask", "Offer", "Summer"],
    mr: {
      name: "Herbal Summer Face Mask",
      desc: "Cooling, tan removal आणि deep cleansing inspired face mask powder. Limited launch offer.",
      bullets: ["Rose water, milk किंवा aloe gel सोबत mix करा", "10-12 मिनिटांनी पूर्ण dry होण्याआधी rinse करा"],
    },
    en: {
      name: "Herbal Summer Face Mask",
      desc: "Cooling, tan-removal and deep-cleansing inspired face mask powder. Limited launch offer.",
      bullets: ["Mix with rose water, milk or aloe gel", "Rinse before fully dry after 10-12 minutes"],
    },
  },
  {
    sku: "face-oil",
    category: "skin",
    image: "assets/products/face-oil.jpg",
    price: 1,
    mrp: 199,
    rating: 4.7,
    reviews: 83,
    tags: ["Face Oil", "Glow", "Night"],
    mr: {
      name: "कांती फेस ऑईल",
      desc: "Night skincare routine नंतर soft, nourished finish देण्यासाठी facial oil.",
      bullets: ["स्वच्छ चेहऱ्यावर 2-3 थेंब massage करा", "Glow finish आणि night care साठी"],
    },
    en: {
      name: "Kanti Face Oil",
      desc: "Facial oil for a soft, nourished finish after your night skincare routine.",
      bullets: ["Massage 2-3 drops on a clean face", "For glow finish and night care"],
    },
  },
  {
    sku: "gift-hamper",
    category: "gift",
    image: "assets/products/gift-hamper.jpg",
    price: 1,
    mrp: 399,
    rating: 4.9,
    reviews: 156,
    tags: ["Gift", "Hamper", "Festival"],
    mr: {
      name: "कांती गिफ्ट हॅम्पर",
      desc: "Skincare आणि bath care products चे gifting combination. सण, corporate gifting आणि return gifts साठी.",
      bullets: ["Budget आणि quantity नुसार custom options", "Premium labels आणि elegant presentation"],
    },
    en: {
      name: "Kanti Gift Hamper",
      desc: "Curated skincare and bath care gifting combination for festivals and return gifts.",
      bullets: ["Custom options by budget and quantity", "Premium labels and elegant presentation"],
    },
  },
];

const state = {
  lang: localStorage.getItem("kantiLang") || "mr",
  category: "all",
  search: "",
  sort: "featured",
  minRating: false,
  cart: JSON.parse(localStorage.getItem("kantiCart") || "{}"),
  wishlist: [],
  recent: JSON.parse(localStorage.getItem("kantiRecent") || "[]"),
  pincode: localStorage.getItem("kantiPincode") || "",
  user: null,
  users: JSON.parse(localStorage.getItem("kantiUsersDb") || "[]"),
  ordersByUser: JSON.parse(localStorage.getItem("kantiOrdersDb") || "{}"),
  accountMode: "register",
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const els = {
  grid: $("[data-product-grid]"),
  resultCount: $("[data-result-count]"),
  searchInput: $("[data-search-input]"),
  categorySelect: $("[data-category-select]"),
  sort: $("[data-sort]"),
  ratingFilter: $("[data-rating-filter]"),
  noResults: $("[data-no-results]"),
  cartDrawer: $("[data-cart-drawer]"),
  wishlistDrawer: $("[data-wishlist-drawer]"),
  cartItems: $("[data-cart-items]"),
  wishlistItems: $("[data-wishlist-items]"),
  cartEmpty: $("[data-cart-empty]"),
  wishlistEmpty: $("[data-wishlist-empty]"),
  cartTotal: $("[data-cart-total]"),
  cartCount: $("[data-cart-count]"),
  wishlistCount: $("[data-wishlist-count]"),
  quickModal: $("[data-quick-modal]"),
  offerModal: $("[data-offer-modal]"),
  locationModal: $("[data-location-modal]"),
  accountModal: $("[data-account-modal]"),
  registerForm: $("[data-register-form]"),
  loginForm: $("[data-login-form]"),
  accountLabel: $("[data-account-label]"),
  pincode: $("[data-pincode]"),
  recentSection: $("[data-recent-section]"),
  recentGrid: $("[data-recent-grid]"),
  toast: $("[data-toast]"),
  dashboard: $("[data-dashboard]"),
  accountForm: $("[data-account-form]"),
  dashboardWelcome: $("[data-dashboard-welcome]"),
  orderHistory: $("[data-order-history]"),
  dashboardWishlist: $("[data-dashboard-wishlist]"),
  countdown: $("[data-countdown]"),
  accountStateTitle: $("[data-account-state-title]"),
};

let toastTimer;

init();

function init() {
  document.body.dataset.activeLang = state.lang;
  document.documentElement.lang = state.lang;
  safely(hydrateSession);
  if (els.pincode) els.pincode.value = state.pincode;
  safely(populateAccountForm);
  updateLanguageButtons();
  safely(updateAccountUi);
  bindEvents();
  safely(() => setAccountMode("register"));
  renderProducts();
  renderCart();
  renderWishlist();
  safely(renderDashboard);
  renderRecent();
  startCountdown();
}

function safely(fn) {
  try {
    fn();
  } catch (error) {
    console.error("Non-blocking UI error:", error);
  }
}

function hydrateSession() {
  syncUsersFromBackend();
  const activeUsername = localStorage.getItem("kantiActiveUser");
  state.user = state.users.find((u) => u.username === activeUsername || u.email === activeUsername) || null;
  state.wishlist = state.user?.wishlist || [];
}

function bindEvents() {
  $$("[data-lang-set]").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.langSet)));
  $("[data-search-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    state.search = els.searchInput.value.trim();
    renderProducts();
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast(state.search ? `Search: ${state.search}` : (state.lang === "mr" ? "सर्व products दाखवत आहे." : "Showing all products."));
  });
  els.searchInput?.addEventListener("input", () => {
    state.search = els.searchInput.value.trim();
    renderProducts();
  });
  els.categorySelect?.addEventListener("change", () => {
    state.category = els.categorySelect.value;
    updateFilterChips();
    renderProducts();
  });
  $$("[data-filter]").forEach((button) => button.addEventListener("click", () => {
    state.category = button.dataset.filter;
    els.categorySelect.value = state.category;
    updateFilterChips();
    renderProducts();
  }));
  els.sort?.addEventListener("change", () => {
    state.sort = els.sort.value;
    renderProducts();
  });
  els.ratingFilter?.addEventListener("change", () => {
    state.minRating = els.ratingFilter.checked;
    renderProducts();
  });
  $$("[data-cart-open]").forEach((button) => button.addEventListener("click", () => openDrawer("cart")));
  $$("[data-wishlist-open]").forEach((button) => button.addEventListener("click", () => openDrawer("wishlist")));
  $("[data-cart-close]")?.addEventListener("click", closeDrawers);
  $("[data-wishlist-close]")?.addEventListener("click", closeDrawers);
  $("[data-cart-clear]")?.addEventListener("click", clearCart);
  $("[data-cart-checkout]")?.addEventListener("click", checkoutCart);
  $("[data-apply-coupon]")?.addEventListener("click", () => showToast(state.lang === "mr" ? "Coupon note WhatsApp order मध्ये जोडले जाईल." : "Coupon note will be included in WhatsApp order."));
  $$("[data-offer-open]").forEach((button) => button.addEventListener("click", () => setModal(els.offerModal, true)));
  $$("[data-offer-close]").forEach((button) => button.addEventListener("click", () => setModal(els.offerModal, false)));
  $$("[data-location-close]").forEach((button) => button.addEventListener("click", () => setModal(els.locationModal, false)));
  $$("[data-account-open]").forEach((button) => button.addEventListener("click", () => {
    const allowedModes = ["register", "login", "account"];
    const requestedMode = allowedModes.includes(button.dataset.accountOpen) ? button.dataset.accountOpen : "login";
    openAccountPortal(requestedMode);
  }));
  $$("[data-account-close]").forEach((button) => button.addEventListener("click", () => setModal(els.accountModal, false)));
  $("[data-save-pincode]")?.addEventListener("click", savePincode);
  els.registerForm?.addEventListener("submit", (event) => saveAccount(event, "register"));
  els.loginForm?.addEventListener("submit", (event) => saveAccount(event, "login"));
  $("[data-account-logout]")?.addEventListener("click", logoutAccount);
  document.addEventListener("click", handleDocumentClick);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDrawers();
      setModal(els.offerModal, false);
      setModal(els.quickModal, false);
      setModal(els.locationModal, false);
      setModal(els.accountModal, false);
    }
  });
}

function setAccountMode(mode, notify = true) {
  if (!["register", "login", "account"].includes(mode)) mode = "login";
  if (mode === "account" && !state.user) {
    mode = "login";
    if (notify) showToast("Please login first to open Customer Account.");
  }
  state.accountMode = mode;
  const modeTitle = {
    register: "Sign Up Form",
    login: "Login Form",
    account: "Customer Account",
  };
  if (els.accountStateTitle) els.accountStateTitle.textContent = modeTitle[mode] || "Sign Up Form";
  $$("[data-account-panel]").forEach((panel) => { panel.hidden = panel.dataset.accountPanel !== mode; });
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("kantiLang", lang);
  document.body.dataset.activeLang = lang;
  document.documentElement.lang = lang;
  els.searchInput.placeholder = lang === "mr" ? "उत्पादन शोधा..." : "Search products...";
  updateLanguageButtons();
  updateAccountUi();
  renderProducts();
  renderCart();
  renderWishlist();
  renderDashboard();
  renderRecent();
}

function updateLanguageButtons() {
  $$("[data-lang-set]").forEach((button) => button.classList.toggle("active", button.dataset.langSet === state.lang));
}

function updateFilterChips() {
  $$("[data-filter]").forEach((button) => button.classList.toggle("active", button.dataset.filter === state.category));
}

function filteredProducts() {
  const query = state.search.toLowerCase();
  let list = products.filter((product) => {
    const text = `${product.mr.name} ${product.en.name} ${product.tags.join(" ")} ${product.mr.desc} ${product.en.desc}`.toLowerCase();
    const matchesCategory = state.category === "all" || product.category === state.category;
    const matchesSearch = !query || text.includes(query);
    const matchesRating = !state.minRating || product.rating >= 4.5;
    return matchesCategory && matchesSearch && matchesRating;
  });

  if (state.sort === "rating") list = list.sort((a, b) => b.rating - a.rating);
  if (state.sort === "name") list = list.sort((a, b) => a.en.name.localeCompare(b.en.name));
  if (state.sort === "price") list = list.sort((a, b) => a.price - b.price);
  if (state.sort === "featured") list = list.sort((a, b) => Number(b.deal || false) - Number(a.deal || false));
  return list;
}

function renderProducts() {
  const list = filteredProducts();
  els.resultCount.textContent =
    state.lang === "mr" ? `${list.length} products दिसत आहेत` : `${list.length} products found`;
  els.noResults.hidden = list.length !== 0;
  els.grid.innerHTML = list.map(productCard).join("");
}

function productCard(product) {
  const copy = product[state.lang];
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const wished = state.wishlist.includes(product.sku);
  return `
    <article class="product-card">
      <div class="product-media">
        <img src="${product.image}" alt="${copy.name}">
        ${product.deal ? `<span class="badge">${state.lang === "mr" ? "ऑफर" : "Deal"}</span>` : ""}
        <button class="wish-btn ${wished ? "active" : ""}" type="button" data-wishlist-toggle="${product.sku}" aria-label="Wishlist">♥</button>
      </div>
      <div class="product-body">
        <div class="stars">★ ${product.rating} <span>(${product.reviews})</span></div>
        <h3 class="product-title">${copy.name}</h3>
        <p class="product-desc">${copy.desc}</p>
        <div class="product-meta">${product.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        <div class="product-price"><strong>₹${product.price}</strong><del>₹${product.mrp}</del><span>${off}% off</span></div>
        <div class="stock">${state.lang === "mr" ? "In stock" : "In stock"}</div>
        <div class="product-actions">
          <button type="button" data-add-cart="${product.sku}">${state.lang === "mr" ? "कार्टमध्ये टाका" : "Add to Cart"}</button>
          <button type="button" data-buy-now="${product.sku}">${state.lang === "mr" ? "आता खरेदी करा" : "Buy Now"}</button>
          <button class="quick-btn" type="button" data-quick-view="${product.sku}">${state.lang === "mr" ? "Quick View" : "Quick View"}</button>
        </div>
      </div>
    </article>
  `;
}

function handleDocumentClick(event) {
  const add = event.target.closest("[data-add-cart]");
  const buy = event.target.closest("[data-buy-now]");
  const quick = event.target.closest("[data-quick-view]");
  const wish = event.target.closest("[data-wishlist-toggle]");
  if (add) addToCart(add.dataset.addCart);
  if (buy) buyNow(buy.dataset.buyNow);
  if (quick) quickView(quick.dataset.quickView);
  if (wish) toggleWishlist(wish.dataset.wishlistToggle);
  if ([els.offerModal, els.quickModal, els.locationModal, els.accountModal, els.cartDrawer, els.wishlistDrawer].includes(event.target)) {
    closeDrawers();
    setModal(els.offerModal, false);
    setModal(els.quickModal, false);
    setModal(els.locationModal, false);
    setModal(els.accountModal, false);
  }
}

function openAccountPortal(preferredMode = "login") {
  const safeMode = preferredMode === "register" || preferredMode === "account" ? preferredMode : "login";
  setAccountMode(safeMode, false);
  populateAccountForm();
  renderDashboard();
  setModal(els.accountModal, true);
}

async function saveAccount(event, mode) {
  event.preventDefault();
  const form = mode === "register" ? els.registerForm : els.loginForm;
  const data = new FormData(form);
  const username = String(data.get("username") || "").trim().toLowerCase();
  const email = String(data.get("email") || "").trim().toLowerCase();
  const password = String(data.get("password") || "").trim();
  if (!username || !password) return showToast("Username and password are required.");
  syncUsersFromBackend();
  const idx = state.users.findIndex((u) => u.username === username || u.email === username);

  if (mode === "login") {
    const remoteUser = await loginFromBackend(username, password);
    if (remoteUser.user) {
      const localIdx = state.users.findIndex((u) => u.username === remoteUser.user.username);
      if (localIdx >= 0) state.users[localIdx] = remoteUser.user;
      else state.users.push(remoteUser.user);
      state.user = remoteUser.user;
    } else {
      if (remoteUser.error && idx < 0) return showToast(remoteUser.error);
      if (idx < 0) return showToast("Account not found. Please register first.");
      if (state.users[idx].password !== password) return showToast("Incorrect password.");
      state.user = state.users[idx];
    }
  } else {
    const account = {
      username,
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      email,
      password,
      address: String(data.get("address") || "").trim(),
      city: String(data.get("city") || "").trim(),
      pincode: String(data.get("pincode") || "").trim(),
      wishlist: idx >= 0 ? state.users[idx].wishlist || [] : [],
    };
    if (!account.email) return showToast("Email is required for registration.");
    if (!account.name || !account.phone || !account.address || !account.city || !account.pincode) return showToast("Please complete full profile details.");
    if (idx >= 0 && state.users[idx].password && state.users[idx].password !== password) return showToast("Username already exists with different password.");
    if (idx >= 0) state.users[idx] = { ...state.users[idx], ...account };
    else state.users.push(account);
    saveCustomerToBackend(state.users[idx >= 0 ? idx : state.users.length - 1]);
    state.user = idx >= 0 ? state.users[idx] : account;
  }
  state.wishlist = state.user.wishlist || [];
  localStorage.setItem("kantiUsersDb", JSON.stringify(state.users));
  localStorage.setItem("kantiActiveUser", state.user.username || state.user.email);
  state.pincode = state.user.pincode || state.pincode;
  localStorage.setItem("kantiPincode", state.pincode);
  populateAccountForm();
  updateAccountUi();
  renderWishlist();
  renderDashboard();
  setAccountMode("account", false);
  showToast(mode === "register" ? "Registration saved successfully." : "Welcome back.");
}

function logoutAccount() {
  state.user = null;
  state.wishlist = [];
  localStorage.removeItem("kantiActiveUser");
  els.registerForm?.reset();
  els.loginForm?.reset();
  setAccountMode("login", false);
  updateAccountUi();
  renderWishlist();
  renderDashboard();
  showToast(state.lang === "mr" ? "Logout झाले." : "Logged out.");
}

function populateAccountForm() {
  if (!state.user) return;
  Object.entries(state.user).forEach(([key, value]) => {
    const registerField = els.registerForm?.elements[key];
    if (registerField) registerField.value = value || "";
    const loginField = els.loginForm?.elements[key];
    const field = loginField || registerField;
    if (field) field.value = value || "";
  });
}

function saveCustomerToBackend(customer) {
  const backendDb = JSON.parse(localStorage.getItem("kantiBackendCustomers") || "[]");
  const existing = backendDb.findIndex((entry) => entry.username === customer.username);
  if (existing >= 0) backendDb[existing] = customer;
  else backendDb.push(customer);
  localStorage.setItem("kantiBackendCustomers", JSON.stringify(backendDb));
  if (window.location.protocol.startsWith("http")) {
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    }).catch(() => null);
  }
}

function syncUsersFromBackend() {
  const backendUsers = JSON.parse(localStorage.getItem("kantiBackendCustomers") || "[]");
  if (!backendUsers.length) return;
  const merged = [...state.users];
  backendUsers.forEach((backendUser) => {
    const idx = merged.findIndex((user) => user.username === backendUser.username);
    if (idx >= 0) merged[idx] = { ...merged[idx], ...backendUser };
    else merged.push(backendUser);
  });
  state.users = merged;
  localStorage.setItem("kantiUsersDb", JSON.stringify(state.users));
  if (window.location.protocol.startsWith("http")) {
    fetch("/api/users")
      .then((response) => response.json())
      .then((payload) => {
        if (!payload?.users?.length) return;
        const users = [...state.users];
        payload.users.forEach((serverUser) => {
          const idx = users.findIndex((user) => user.username === serverUser.username);
          if (idx >= 0) users[idx] = { ...users[idx], ...serverUser };
          else users.push(serverUser);
        });
        state.users = users;
        localStorage.setItem("kantiUsersDb", JSON.stringify(state.users));
      })
      .catch(() => null);
  }
}

async function loginFromBackend(username, password) {
  if (!window.location.protocol.startsWith("http")) return { user: null };
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const payload = await response.json().catch(() => ({}));
    if (response.ok) return payload;
    return { error: payload.error || "Login failed." };
  } catch {
    return { user: null };
  }
}

function updateAccountUi() {
  if (!els.accountLabel) return;
  els.accountLabel.textContent = state.user?.name ? state.user.name.split(" ")[0] : "Login";
  $$("[data-account-guest]").forEach((button) => { button.hidden = Boolean(state.user); });
  $$("[data-account-user]").forEach((button) => { button.hidden = !state.user; });
}

function hasAddress() {
  return Boolean(state.user?.name && state.user?.phone && state.user?.address && state.user?.city && state.user?.pincode);
}

function ensureLoggedInWithAddress() {
  if (hasAddress()) return true;
  populateAccountForm();
  setModal(els.accountModal, true);
  showToast(state.lang === "mr" ? "Order करण्यासाठी login आणि address save करा." : "Please login and save your address to place the order.");
  return false;
}

function addToCart(sku, silent = false) {
  if (!getProduct(sku)) return;
  state.cart[sku] = (state.cart[sku] || 0) + 1;
  save("kantiCart", state.cart);
  renderCart();
  if (!silent) showToast(state.lang === "mr" ? "Product cart मध्ये add झाला." : "Product added to cart.");
}

function buyNow(sku) {
  const product = getProduct(sku);
  if (!product) return;
  if (!ensureLoggedInWithAddress()) return;
  addRecent(sku);
  const intro = state.lang === "mr" ? "नमस्कार Sree Kanti, मला हे product order करायचे आहे:" : "Hello Sree Kanti, I want to order this product:";
  openWhatsApp(`${intro}\n${product[state.lang].name}\nQty: 1\nTotal: ₹${product.price}${customerText()}${pinText()}`);
}

function renderCart() {
  const entries = cartEntries();
  const totalQty = entries.reduce((sum, [, qty]) => sum + qty, 0);
  const total = entries.reduce((sum, [sku, qty]) => sum + getProduct(sku).price * qty, 0);
  els.cartCount.textContent = totalQty;
  els.cartTotal.textContent = `₹${total}`;
  els.cartEmpty.classList.toggle("is-visible", entries.length === 0);
  els.cartItems.innerHTML = entries.map(([sku, qty]) => cartItem(getProduct(sku), qty)).join("");
}

function cartItem(product, qty) {
  return `
    <div class="cart-item">
      <img src="${product.image}" alt="${product[state.lang].name}">
      <div><h3>${product[state.lang].name}</h3><p>₹${product.price} × ${qty} = ₹${product.price * qty}</p></div>
      <div class="cart-qty">
        <button type="button" onclick="updateQty('${product.sku}', -1)">−</button>
        <strong>${qty}</strong>
        <button type="button" onclick="updateQty('${product.sku}', 1)">+</button>
      </div>
    </div>
  `;
}

window.updateQty = function updateQty(sku, delta) {
  state.cart[sku] = (state.cart[sku] || 0) + delta;
  if (state.cart[sku] <= 0) delete state.cart[sku];
  save("kantiCart", state.cart);
  renderCart();
};

function checkoutCart() {
  const entries = cartEntries();
  if (!entries.length) return showToast(state.lang === "mr" ? "Cart रिकामे आहे." : "Cart is empty.");
  if (!ensureLoggedInWithAddress()) return;
  const lines = entries.map(([sku, qty], index) => {
    const product = getProduct(sku);
    return `${index + 1}. ${product[state.lang].name} - Qty ${qty} - ₹${product.price * qty}`;
  });
  const total = entries.reduce((sum, [sku, qty]) => sum + getProduct(sku).price * qty, 0);
  const coupon = $("[data-coupon-input]")?.value.trim();
  const intro = state.lang === "mr" ? "नमस्कार Sree Kanti, मला खालील order करायचे आहे:" : "Hello Sree Kanti, I want to order:";
  const userKey = state.user?.email || "guest";
  state.ordersByUser[userKey] = state.ordersByUser[userKey] || [];
  state.ordersByUser[userKey].unshift({
    id: Date.now(),
    items: entries,
    total,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem("kantiOrdersDb", JSON.stringify(state.ordersByUser));
  renderDashboard();
  openWhatsApp(`${intro}\n\n${lines.join("\n")}\n\nTotal: ₹${total}${coupon ? `\nCoupon: ${coupon}` : ""}${customerText()}${pinText()}`);
}

function clearCart() {
  state.cart = {};
  save("kantiCart", state.cart);
  renderCart();
}

function toggleWishlist(sku) {
  if (state.wishlist.includes(sku)) state.wishlist = state.wishlist.filter((item) => item !== sku);
  else state.wishlist.push(sku);
  if (state.user) {
    state.user.wishlist = state.wishlist;
    const idx = state.users.findIndex((u) => u.email === state.user.email);
    if (idx >= 0) state.users[idx].wishlist = [...state.wishlist];
    localStorage.setItem("kantiUsersDb", JSON.stringify(state.users));
  }
  renderProducts();
  renderWishlist();
  renderDashboard();
}

function renderWishlist() {
  els.wishlistCount.textContent = state.wishlist.length;
  els.wishlistEmpty.classList.toggle("is-visible", state.wishlist.length === 0);
  els.wishlistItems.innerHTML = state.wishlist.map((sku) => {
    const product = getProduct(sku);
    if (!product) return "";
    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product[state.lang].name}">
        <div><h3>${product[state.lang].name}</h3><p>₹${product.price}</p></div>
        <div class="cart-qty"><button type="button" data-add-cart="${sku}">+</button></div>
      </div>
    `;
  }).join("");
}

function quickView(sku) {
  const product = getProduct(sku);
  if (!product) return;
  addRecent(sku);
  const copy = product[state.lang];
  els.quickModal.innerHTML = `
    <div class="quick-dialog" role="dialog" aria-modal="true" aria-label="${copy.name}">
      <button class="round-close" type="button" onclick="document.querySelector('[data-quick-modal]').classList.remove('is-open');document.body.classList.remove('menu-open')">×</button>
      <img src="${product.image}" alt="${copy.name}">
      <div>
        <p class="eyebrow">Quick View</p>
        <h2>${copy.name}</h2>
        <div class="stars">★ ${product.rating} (${product.reviews})</div>
        <div class="product-price"><strong>₹${product.price}</strong><del>₹${product.mrp}</del></div>
        <p>${copy.desc}</p>
        <ul>${copy.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
        <div class="hero-actions">
          <button class="button primary" type="button" data-add-cart="${sku}">${state.lang === "mr" ? "कार्टमध्ये टाका" : "Add to Cart"}</button>
          <button class="button secondary" type="button" data-buy-now="${sku}">Buy Now</button>
        </div>
      </div>
    </div>
  `;
  setModal(els.quickModal, true);
}

function addRecent(sku) {
  state.recent = [sku, ...state.recent.filter((item) => item !== sku)].slice(0, 4);
  save("kantiRecent", state.recent);
  renderRecent();
}

function renderRecent() {
  const items = state.recent.map(getProduct).filter(Boolean);
  els.recentSection.hidden = items.length === 0;
  els.recentGrid.innerHTML = items.map((product) => `
    <button class="mini-card" type="button" data-quick-view="${product.sku}">
      <img src="${product.image}" alt="${product[state.lang].name}">
      <span><strong>${product[state.lang].name}</strong><br>₹${product.price}</span>
    </button>
  `).join("");
}


function renderDashboard() {
  if (!els.dashboard) return;
  const loggedIn = Boolean(state.user?.email);
  els.dashboard.hidden = state.accountMode !== "account" || !loggedIn;
  if (!loggedIn) return;
  els.dashboardWelcome.textContent = `Welcome back, ${state.user.name || "Customer"}`;
  const orders = state.ordersByUser[state.user.email] || [];
  els.orderHistory.innerHTML = orders.length ? orders.slice(0, 6).map((order) => `<div class="dashboard-item"><span>${new Date(order.createdAt).toLocaleDateString()} • ₹${order.total}</span><span><button type="button" onclick="addToCart('ubtan')">Re-order Ubtan</button> <button type="button" onclick="addToCart('face-oil')">Re-order Face Oil</button></span></div>`).join("") : "<p>No orders yet.</p>";
  const wishSkus = ["bath-salt", "face-mask-offer"].filter((sku) => state.wishlist.includes(sku));
  els.dashboardWishlist.innerHTML = wishSkus.length ? wishSkus.map((sku) => `<div class="dashboard-item"><span>${getProduct(sku)[state.lang].name}</span><button type="button" data-add-cart="${sku}">Move to cart</button></div>`).join("") : "<p>Save Bath Salts or Face Mask for later.</p>";
  if (els.accountForm) {
    const mapping = {
      accountName: state.user.name || "",
      accountUsername: state.user.username || "",
      accountEmail: state.user.email || "",
      accountAddress: state.user.address || "",
      accountCity: state.user.city || "",
      accountPincode: state.user.pincode || "",
      accountPhone: state.user.phone || "",
    };
    Object.entries(mapping).forEach(([fieldName, fieldValue]) => {
      const field = els.accountForm.elements[fieldName];
      if (field) field.value = fieldValue;
    });
  }
}

function savePincode() {
  state.pincode = els.pincode.value.trim();
  localStorage.setItem("kantiPincode", state.pincode);
  setModal(els.locationModal, false);
  showToast(state.pincode ? `PIN ${state.pincode} saved.` : "PIN cleared.");
}

function openDrawer(type) {
  closeDrawers();
  const drawer = type === "wishlist" ? els.wishlistDrawer : els.cartDrawer;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("menu-open");
}

function closeDrawers() {
  [els.cartDrawer, els.wishlistDrawer].forEach((drawer) => {
    drawer?.classList.remove("is-open");
    drawer?.setAttribute("aria-hidden", "true");
  });
  document.body.classList.remove("menu-open");
}

function setModal(modal, isOpen) {
  if (!modal) return;
  modal.classList.toggle("is-open", isOpen);
  modal.setAttribute("aria-hidden", String(!isOpen));
  const anyOpen = [els.offerModal, els.quickModal, els.locationModal, els.accountModal, els.cartDrawer, els.wishlistDrawer]
    .some((item) => item?.classList.contains("is-open"));
  document.body.classList.toggle("menu-open", anyOpen);
}

function startCountdown() {
  const end = Date.now() + 1000 * 60 * 60 * 7 + 1000 * 60 * 24;
  setInterval(() => {
    const left = Math.max(0, end - Date.now());
    const hours = Math.floor(left / 36e5);
    const mins = Math.floor((left % 36e5) / 6e4);
    const secs = Math.floor((left % 6e4) / 1000);
    els.countdown.innerHTML = `<span>${hours}h</span><span>${mins}m</span><span>${secs}s</span>`;
  }, 1000);
}

function cartEntries() {
  return Object.entries(state.cart).filter(([sku, qty]) => getProduct(sku) && qty > 0);
}
function getProduct(sku) { return products.find((product) => product.sku === sku); }
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function pinText() { return state.pincode && state.pincode !== state.user?.pincode ? `\nPIN code: ${state.pincode}` : ""; }
function customerText() {
  if (!state.user) return "";
  return `\n\nCustomer Details:\nName: ${state.user.name}\nPhone: ${state.user.phone}${state.user.email ? `\nEmail: ${state.user.email}` : ""}\nAddress: ${state.user.address}, ${state.user.city} - ${state.user.pincode}`;
}
function openWhatsApp(message) { window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener"); }
function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("is-visible"), 2200);
}