const products = [
  {
    id: 1,
    name: "iPhone 14 Pro Max",
    price: 600,
    image: "https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2022%2F09%2FiPhone-14-pro-Max.jpg&w=1200&q=75"
  },
  {
    id: 2,
    name: "iPhone 15 pro",
    price: 550,
    image: "https://static.digit.in/default/c306804d486583bda49e35ff3d4392269be52cbd.jpeg"
  },
  {
    id: 3,
    name: "Phone 16 pro max",
    price: 800,
    image: "https://www.apple.com/v/iphone/home/cc/images/meta/iphone__kqge21l9n26q_og.png"
  },
  {
    id: 4,
    name: "Samsung s22 ultra",
    price: 600,
    image: "https://m.media-amazon.com/images/I/71VMwY5MfGL.jpg"
  }
];


// Utility functions
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Render product cards
if (document.getElementById("product-list")) {
  const container = document.getElementById("product-list");
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  }); 
}

// Add to cart
function addToCart(id) {
  let cart = getCart();
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty += 1;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  alert("Added to cart!");
}

// Render cart
if (document.getElementById("cart-container")) {
  const cart = getCart();
  const container = document.getElementById("cart-container");
  let total = 0;
  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";
    const subTotal = item.price * item.qty;
    total += subTotal;
    row.innerHTML = `
      <h3>${item.name}</h3>
      <p>Qty: ${item.qty}</p>
      <p>Subtotal: $${subTotal}</p>
    `;
    container.appendChild(row);
  });

  const totalElem = document.createElement("h2");
  totalElem.textContent = `Total: $${total}`;
  container.appendChild(totalElem);
}

// Place order
const placeOrderBtn = document.getElementById("place-order");
if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    alert("Order placed successfully!");
    location.href = "index.html";
  });
}
