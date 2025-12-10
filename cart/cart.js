let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = document.querySelector('.cart-count');
    if (count) count.textContent = cart.length;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function openCart() {
    const modal = document.getElementById('cart-modal');
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total-price');
    
    itemsEl.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        itemsEl.innerHTML += `<div class="cart-item">${item.name} - ${item.price}</div>`;
        total += parseInt(item.price.replace(/\D/g, ''));
    });
    
    totalEl.textContent = total + ' ₽';
    modal.showModal();
}

function closeCart() {
    document.getElementById('cart-modal').close();
}

function openCheckout() {
    if (cart.length === 0) return;
    
    const checkoutModal = document.getElementById('checkout-modal');
    const orderTotal = document.getElementById('order-total');
    
    let total = 0;
    cart.forEach(item => {
        total += parseInt(item.price.replace(/\D/g, ''));
    });
    
    orderTotal.textContent = total + ' ₽';
    checkoutModal.showModal();
}

function closeCheckout() {
    document.getElementById('checkout-modal').close();
}

function submitOrder() {
    alert('Заказ оформлен! Спасибо!');
    cart = [];
    saveCart();
    updateCartCount();
    closeCheckout();
    closeCart();
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('button') && e.target.textContent === 'В корзину') {
            const card = e.target.closest('.info_food');
            cart.push({
                name: card.querySelector('.item-text').textContent,
                price: card.querySelector('.price p').textContent
            });
            saveCart();
            updateCartCount();
        }
    });
    
    document.getElementById('open-cart').addEventListener('click', openCart);
    
    document.getElementById('close-cart').addEventListener('click', closeCart);
    
    document.getElementById('clear-cart').addEventListener('click', function() {
        cart = [];
        saveCart();
        updateCartCount();
        closeCart();
    });
    
    document.getElementById('checkout-btn').addEventListener('click', openCheckout);
    
    document.getElementById('close-checkout').addEventListener('click', closeCheckout);
    
    document.getElementById('order-form').addEventListener('submit', function(e) {
        e.preventDefault();
        submitOrder();
    });
});