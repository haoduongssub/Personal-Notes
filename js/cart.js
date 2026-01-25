// Cart Module for OTO VIỆT

const Cart = {
    STORAGE_KEY: 'oto_viet_cart',

    // Get cart items from localStorage
    getItems() {
        const cart = localStorage.getItem(this.STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    },

    // Save cart items to localStorage
    saveItems(items) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
        App.updateCartCount();
    },

    // Add item to cart
    addItem(productId, quantity = 1) {
        const product = App.getProductById(productId);
        if (!product) {
            Toast.show('Không tìm thấy sản phẩm!', 'error');
            return;
        }

        const items = this.getItems();
        const existingItem = items.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            items.push({
                id: productId,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveItems(items);
        Toast.show(`Đã thêm ${product.name} vào giỏ hàng!`, 'success');
    },

    // Remove item from cart
    removeItem(productId) {
        const items = this.getItems().filter(item => item.id !== productId);
        this.saveItems(items);
        Toast.show('Đã xóa sản phẩm khỏi giỏ hàng!', 'success');
        this.renderCartPage();
    },

    // Update item quantity
    updateQuantity(productId, quantity) {
        if (quantity < 1) {
            this.removeItem(productId);
            return;
        }

        const items = this.getItems();
        const item = items.find(item => item.id === productId);

        if (item) {
            item.quantity = quantity;
            this.saveItems(items);
            this.renderCartPage();
        }
    },

    // Get total items count
    getItemCount() {
        return this.getItems().reduce((total, item) => total + item.quantity, 0);
    },

    // Get total price
    getTotalPrice() {
        return this.getItems().reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Clear cart
    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
        App.updateCartCount();
    },

    // Render cart page
    renderCartPage() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartSummary = document.getElementById('cartSummary');
        const emptyCart = document.getElementById('emptyCart');

        if (!cartItemsContainer) return;

        const items = this.getItems();

        if (items.length === 0) {
            if (cartItemsContainer) cartItemsContainer.style.display = 'none';
            if (cartSummary) cartSummary.style.display = 'none';
            if (emptyCart) emptyCart.style.display = 'block';
            return;
        }

        if (emptyCart) emptyCart.style.display = 'none';
        if (cartItemsContainer) cartItemsContainer.style.display = 'flex';
        if (cartSummary) cartSummary.style.display = 'block';

        // Render cart items
        cartItemsContainer.innerHTML = items.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
          <span class="cart-item-brand">${item.brand}</span>
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-price">${App.formatPriceFull(item.price)}</span>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-control">
            <button class="quantity-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
          </div>
          <button class="remove-btn" onclick="Cart.removeItem('${item.id}')">Xóa</button>
        </div>
      </div>
    `).join('');

        // Update summary
        this.updateSummary();
    },

    // Update cart summary
    updateSummary() {
        const items = this.getItems();
        const subtotal = this.getTotalPrice();
        const shipping = 0; // Free shipping for cars
        const total = subtotal + shipping;

        const subtotalEl = document.getElementById('subtotal');
        const shippingEl = document.getElementById('shipping');
        const totalEl = document.getElementById('total');
        const itemCountEl = document.getElementById('itemCount');

        if (subtotalEl) subtotalEl.textContent = App.formatPriceFull(subtotal);
        if (shippingEl) shippingEl.textContent = 'Miễn phí';
        if (totalEl) totalEl.textContent = App.formatPriceFull(total);
        if (itemCountEl) itemCountEl.textContent = `${items.length} sản phẩm`;
    }
};

// Initialize cart page if on cart page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cartItems')) {
        Cart.renderCartPage();
    }
});

// Export
window.Cart = Cart;
