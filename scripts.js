document.addEventListener('DOMContentLoaded', () => {
    updateCart();

    if (document.getElementById('cart-items')) {
        displayCartItems();
    }
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, productPrice) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    if (cartItemsElement) {
        cartItemsElement.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity}`;
            cartItemsElement.appendChild(li);
            total += item.price * item.quantity;
        });
        document.getElementById('total').textContent = total.toFixed(2);
    }

    
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = `Cart (${cartCount})`;
    }
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function displayCartItems() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity}`;
        cartItemsElement.appendChild(li);
        total += item.price * item.quantity;
    });
    document.getElementById('total').textContent = total.toFixed(2);
}
function placeOrder() {
    
    window.location.href = 'order.html';
}

function confirmOrder() {

    clearCart();
    alert('Order confirmed! Thank you for your purchase.');
    window.location.href = 'index.html';
}

