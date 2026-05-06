const products = [
    { id: 1, name: "Vintage Felt Hat", price: 45, category: "Hats", img: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=800" },
    { id: 2, name: "Canvas Market Bag", price: 35, category: "Bags", img: "https://images.unsplash.com/photo-1544816153-151512189169?q=80&w=800" },
    { id: 3, name: "Distressed Leather Belt", price: 28, category: "Belts", img: "https://images.unsplash.com/photo-1624222247344-550fb8ec970d?q=80&w=800" },
    { id: 4, name: "Pro Noise-Canceling Buds", price: 129, category: "Electronics", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800" }
];

let cart = JSON.parse(localStorage.getItem('pitsiCart')) || [];

function updateCartUI() {
    const countLabel = document.getElementById('cart-num');
    if (countLabel) {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        countLabel.innerText = totalItems;
    }
    localStorage.setItem('pitsiCart', JSON.stringify(cart));
}

function addToCart(id) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        if (existingItem.quantity < 10) existingItem.quantity++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    if (typeof renderCheckout === "function") renderCheckout();
}

function minusFromCart(id) {
    const item = cart.find(i => i.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
    if (typeof renderCheckout === "function") renderCheckout();
}

function changeQuantity(id, newQty) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity = parseInt(newQty);
        updateCartUI();
        if (typeof renderCheckout === "function") renderCheckout();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    if (typeof renderCheckout === "function") renderCheckout();
}

// Initial Load logic
function init() {
    const list = document.getElementById('product-list');
    if (list) {
        products.forEach(p => {
            list.innerHTML += `
                <div class="product-card">
                    <img src="${p.img}" alt="${p.name}">
                    <small>${p.category}</small>
                    <h3>${p.name}</h3>
                    <p>$${p.price}</p>
                    <button class="btn-add" onclick="addToCart(${p.id})">+ Add to Bag</button>
                </div>
            `;
        });
    }
    updateCartUI();
}

function init() {
    const list = document.getElementById('product-list');
    if (list) {
        list.innerHTML = ""; 
        
        // If we are on index.html, maybe just show the first 3 items
        // If we are on products.html, show everything
        const isHomePage = window.location.pathname.includes("index.html") || window.location.pathname === "/";
        const displayProducts = isHomePage ? products.slice(0, 3) : products;

        displayProducts.forEach(p => {
            list.innerHTML += `
                <div class="product-card">
                    <div class="product-image-wrapper">
                        <img src="${p.img}" alt="${p.name}">
                    </div>
                    <div class="product-info">
                        <small>${p.category}</small>
                        <h3>${p.name}</h3>
                        <p>$${p.price}</p>
                        <button class="btn-add" onclick="addToCart(${p.id})">Add to Bag</button>
                    </div>
                </div>
            `;
        });
    }
    updateCartUI();
}

init();