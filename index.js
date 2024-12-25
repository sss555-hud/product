let cart = []; 
const cartPopup = document.getElementById('cart-popup');
const cartIcon = document.getElementById('cart-icon');
const cartItems = document.getElementById('cart-items');
const clearCartButton = document.getElementById('clear-cart');
const closeCartButton = document.getElementById('close-cart');


cartIcon.addEventListener('click', () => {
    cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
});

closeCartButton.addEventListener('click', () => {
    cartPopup.style.display = 'none';
});


async function fetchProducts() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    displayProducts(data.products);
    console.log(data);
    
}


function displayProducts(products) {
    const container = document.getElementById('product-container');
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <img src="${product.thumbnail}" alt="">
        <button onclick="addToCart(${product.id}, '${product.brand}', '${product.thumbnail}', ${product.price})">Add to Cart</button>
        <p>${product.brand}</p>
        <h3>${product.category}</h3>
            <p>$${product.price}</p>
        `;
        container.appendChild(card);
    });
}


function addToCart(id, brand, thumbnail, price) {
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, brand, thumbnail, price, quantity: 1 });
        updateCount()
    }
    updateCart();
}


function updateCart() {
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.thumbnail}" alt="">
            <span>${item.brand} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItems.appendChild(li);
    });
}


clearCartButton.addEventListener('click', () => {
    cart = [];
    updateCart();
});


fetchProducts();

 let count = document.querySelector(".count")

 function updateCount() {
    count.innerHTML = cart.length; 
 }