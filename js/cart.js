/**
 * ============================================================================
 * OTO VIỆT - MODULE GIỎ HÀNG (cart.js)
 * ============================================================================
 * 
 * File này quản lý tất cả chức năng liên quan đến giỏ hàng:
 * - Thêm sản phẩm vào giỏ
 * - Xóa sản phẩm khỏi giỏ
 * - Tăng/Giảm số lượng
 * - Tính tổng tiền
 * - Lưu/Đọc từ LocalStorage
 * - Render giao diện trang giỏ hàng
 * 
 * Dữ liệu giỏ hàng được lưu trong LocalStorage của trình duyệt
 * 
 * ============================================================================
 */


/* ============================================================================
   MODULE CART - QUẢN LÝ GIỎ HÀNG
   ============================================================================ */

const Cart = {

    /* ----------------------------------------
       THUỘC TÍNH
       ---------------------------------------- */
    STORAGE_KEY: 'oto_viet_cart',  // Key lưu trong LocalStorage

    /* ----------------------------------------
       GET ITEMS - Lấy danh sách sản phẩm trong giỏ
       ----------------------------------------
       Đọc dữ liệu từ LocalStorage và parse JSON
       Return: Mảng các sản phẩm trong giỏ
       ---------------------------------------- */
    getItems() {
        const cart = localStorage.getItem(this.STORAGE_KEY);
        // Nếu có dữ liệu thì parse JSON, không thì trả về mảng rỗng
        return cart ? JSON.parse(cart) : [];
    },

    /* ----------------------------------------
       SAVE ITEMS - Lưu giỏ hàng vào LocalStorage
       ----------------------------------------
       Tham số: items - Mảng sản phẩm cần lưu
       ---------------------------------------- */
    saveItems(items) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
        App.updateCartCount();  // Cập nhật badge số lượng trên header
    },

    /* ----------------------------------------
       ADD ITEM - Thêm sản phẩm vào giỏ hàng
       ----------------------------------------
       Tham số:
       - productId: ID của sản phẩm cần thêm
       - quantity: Số lượng (mặc định = 1)
       
       Logic:
       - Nếu sản phẩm đã có trong giỏ → tăng số lượng
       - Nếu chưa có → thêm mới vào giỏ
       ---------------------------------------- */
    addItem(productId, quantity = 1) {
        // Tìm thông tin sản phẩm từ danh sách xe
        const product = App.getProductById(productId);
        if (!product) {
            Toast.show('Không tìm thấy sản phẩm!', 'error');
            return;
        }

        // Lấy giỏ hàng hiện tại
        const items = this.getItems();

        // Kiểm tra sản phẩm đã có trong giỏ chưa
        const existingItem = items.find(item => item.id === productId);

        if (existingItem) {
            // ===== ĐÃ CÓ TRONG GIỎ → TĂNG SỐ LƯỢNG =====
            existingItem.quantity += quantity;
        } else {
            // ===== CHƯA CÓ → THÊM MỚI =====
            items.push({
                id: productId,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        // Lưu lại giỏ hàng
        this.saveItems(items);

        // Hiển thị thông báo thành công
        Toast.show(`Đã thêm ${product.name} vào giỏ hàng!`, 'success');
    },

    /* ----------------------------------------
       REMOVE ITEM - Xóa sản phẩm khỏi giỏ hàng
       ----------------------------------------
       Tham số: productId - ID sản phẩm cần xóa
       ---------------------------------------- */
    removeItem(productId) {
        // Lọc bỏ sản phẩm có ID tương ứng
        const items = this.getItems().filter(item => item.id !== productId);

        this.saveItems(items);
        Toast.show('Đã xóa sản phẩm khỏi giỏ hàng!', 'success');

        // Re-render trang giỏ hàng (nếu đang ở trang cart)
        this.renderCartPage();
    },

    /* ----------------------------------------
       UPDATE QUANTITY - Cập nhật số lượng sản phẩm
       ----------------------------------------
       Tham số:
       - productId: ID sản phẩm
       - quantity: Số lượng mới
       
       Nếu quantity < 1 → xóa sản phẩm khỏi giỏ
       ---------------------------------------- */
    updateQuantity(productId, quantity) {
        // Nếu số lượng < 1, xóa sản phẩm
        if (quantity < 1) {
            this.removeItem(productId);
            return;
        }

        // Cập nhật số lượng
        const items = this.getItems();
        const item = items.find(item => item.id === productId);

        if (item) {
            item.quantity = quantity;
            this.saveItems(items);
            this.renderCartPage();  // Re-render
        }
    },

    /* ----------------------------------------
       GET ITEM COUNT - Đếm tổng số sản phẩm trong giỏ
       ----------------------------------------
       Return: Tổng số lượng (tính cả quantity)
       VD: 2 xe Camry + 1 xe CRV = 3
       ---------------------------------------- */
    getItemCount() {
        return this.getItems().reduce((total, item) => total + item.quantity, 0);
    },

    /* ----------------------------------------
       GET TOTAL PRICE - Tính tổng tiền giỏ hàng
       ----------------------------------------
       Return: Tổng tiền (VND)
       ---------------------------------------- */
    getTotalPrice() {
        return this.getItems().reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    /* ----------------------------------------
       CLEAR - Xóa toàn bộ giỏ hàng
       ----------------------------------------
       Sử dụng sau khi đặt hàng thành công
       ---------------------------------------- */
    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
        App.updateCartCount();
    },

    /* ----------------------------------------
       RENDER CART PAGE - Hiển thị trang giỏ hàng
       ----------------------------------------
       Render danh sách sản phẩm và tổng tiền
       Chỉ được gọi khi ở trang cart.html
       ---------------------------------------- */
    renderCartPage() {
        // Lấy các container trên trang
        const cartItemsContainer = document.getElementById('cartItems');    // Chứa danh sách SP
        const cartSummary = document.getElementById('cartSummary');         // Phần tổng tiền
        const emptyCart = document.getElementById('emptyCart');             // Thông báo giỏ trống

        // Thoát nếu không phải trang cart
        if (!cartItemsContainer) return;

        const items = this.getItems();

        // ===== GIỎ HÀNG TRỐNG =====
        if (items.length === 0) {
            if (cartItemsContainer) cartItemsContainer.style.display = 'none';
            if (cartSummary) cartSummary.style.display = 'none';
            if (emptyCart) emptyCart.style.display = 'block';
            return;
        }

        // ===== CÓ SẢN PHẨM TRONG GIỎ =====
        if (emptyCart) emptyCart.style.display = 'none';
        if (cartItemsContainer) cartItemsContainer.style.display = 'flex';
        if (cartSummary) cartSummary.style.display = 'block';

        // Render từng sản phẩm
        cartItemsContainer.innerHTML = items.map(item => `
            <!-- Card sản phẩm trong giỏ -->
            <div class="cart-item">
                <!-- Hình ảnh -->
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                
                <!-- Thông tin sản phẩm -->
                <div class="cart-item-info">
                    <span class="cart-item-brand">${item.brand}</span>
                    <h4 class="cart-item-title">${item.name}</h4>
                    <span class="cart-item-price">${App.formatPriceFull(item.price)}</span>
                </div>
                
                <!-- Nút tăng/giảm số lượng + Xóa -->
                <div class="cart-item-actions">
                    <!-- Điều chỉnh số lượng -->
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                    
                    <!-- Nút xóa -->
                    <button class="remove-btn" onclick="Cart.removeItem('${item.id}')">Xóa</button>
                </div>
            </div>
        `).join('');

        // Cập nhật phần tổng tiền
        this.updateSummary();
    },

    /* ----------------------------------------
       UPDATE SUMMARY - Cập nhật phần tổng tiền
       ----------------------------------------
       Hiển thị: Tạm tính, Phí vận chuyển, Tổng cộng
       ---------------------------------------- */
    updateSummary() {
        const items = this.getItems();
        const subtotal = this.getTotalPrice();
        const shipping = 0;  // Miễn phí vận chuyển cho xe ô tô
        const total = subtotal + shipping;

        // Lấy các element hiển thị
        const subtotalEl = document.getElementById('subtotal');
        const shippingEl = document.getElementById('shipping');
        const totalEl = document.getElementById('total');
        const itemCountEl = document.getElementById('itemCount');

        // Cập nhật giá trị
        if (subtotalEl) subtotalEl.textContent = App.formatPriceFull(subtotal);
        if (shippingEl) shippingEl.textContent = 'Miễn phí';
        if (totalEl) totalEl.textContent = App.formatPriceFull(total);
        if (itemCountEl) itemCountEl.textContent = `${items.length} sản phẩm`;
    }
};


/* ============================================================================
   KHỞI TẠO TRANG GIỎ HÀNG
   ============================================================================
   Tự động render khi vào trang cart.html
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra nếu đang ở trang cart (có element cartItems)
    if (document.getElementById('cartItems')) {
        Cart.renderCartPage();
    }
});


/* ============================================================================
   EXPORT GLOBAL
   ============================================================================ */

window.Cart = Cart;
