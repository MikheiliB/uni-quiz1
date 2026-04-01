let products = [
  { productId: 0, name: "Headphones", price: 200, image: "headphones.jpg" },
  { productId: 1, name: "Phone", price: 600, image: "phone.jpeg" },
  { productId: 2, name: "Laptop", price: 1000, image: "lapto.avif" },
  { productId: 3, name: "Laptop", price: 1000, image: "laptop.jpg" },
  { productId: 4, name: "Laptop", price: 1000, image: "laptop.jpg" }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const totalItemsEl = document.getElementById("total-items");
const totalPriceEl = document.getElementById("total-price");
const searchInput = document.getElementById("search");

function renderProducts(products) {
  productList.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";

    const img = document.createElement("img");
    img.src = product.image;
    img.style.width = "200px";

    const title = document.createElement("h4");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = `$${product.price}`;

    const button = document.createElement("button");
    button.textContent = "Add to Cart";

    button.addEventListener("click", () => addToCart(product));

    div.append(img, title, price, button);
    productList.appendChild(div);
  });
}

function addToCart(product) {
  const existing = cart.find(item => item.productId === product.productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";

    const img = document.createElement("img");
    img.src = item.image;
    img.style.width = "200px";

    const title = document.createElement("h4");
    title.textContent = item.name;

    const price = document.createElement("p");
    price.textContent = `Price: $${item.price}`;

    const quantity = document.createElement("p");
    quantity.textContent = `Qty: ${item.quantity}`;

    const total = document.createElement("p");
    total.textContent = `Total: $${item.price * item.quantity}`;

    const removeOne = document.createElement("button");
    removeOne.textContent = "Remove One";
    removeOne.onclick = () => removeOneItem(item.productId);

    const removeAll = document.createElement("button");
    removeAll.textContent = "Remove All";
    removeAll.onclick = () => removeAllItems(item.productId);

    div.append(img, title, price, quantity, total, removeOne, removeAll);
    cartList.appendChild(div);
  });

  updateTotals();
}

function removeOneItem(id) {
  const item = cart.find(i => i.productId === id);

  if (!item) return;

  item.quantity--;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.productId !== id);
  }

  renderCart();
}

function removeAllItems(id) {
  cart = cart.filter(i => i.productId !== id);
  renderCart();
}

function updateTotals() {
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  totalItemsEl.textContent = `Total Items: ${totalItems}`;
  totalPriceEl.textContent = `$${totalPrice}`;
}

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  renderProducts(filtered);
});



renderProducts(products);