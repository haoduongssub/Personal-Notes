/**
 * ============================================================================
 * OTO VIỆT - MODULE ĐƠN HÀNG (orders.js)
 * ============================================================================
 * 
 * File này quản lý tất cả chức năng liên quan đến đơn hàng:
 * - Tạo đơn hàng mới (lưu vào Firestore)
 * - Lấy lịch sử đơn hàng của user
 * - Hiển thị đơn hàng trên trang profile
 * - Xử lý trạng thái đơn hàng
 * 
 * Dữ liệu đơn hàng được lưu trong Firebase Firestore
 * Collection: 'orders'
 * 
 * ============================================================================
 */


/* ============================================================================
   MODULE ORDERS - QUẢN LÝ ĐƠN HÀNG
   ============================================================================ */

const Orders = {

    /* ----------------------------------------
       CREATE ORDER - Tạo đơn hàng mới
       ----------------------------------------
       Tham số:
       - customerInfo: Object chứa thông tin khách hàng
         {
           fullName: "Họ tên",
           phone: "Số điện thoại",
           address: "Địa chỉ",
           note: "Ghi chú"
         }
       - paymentMethod: Phương thức thanh toán ('cash' hoặc 'bank')
       
       Return: { success: true/false, orderId, order, error }
       ---------------------------------------- */
    async createOrder(customerInfo, paymentMethod = 'cash') {

        // ===== KIỂM TRA ĐĂNG NHẬP =====
        if (!Auth.isLoggedIn()) {
            Toast.show('Vui lòng đăng nhập để đặt hàng!', 'error');
            window.location.href = '/pages/login.html';
            return { success: false, error: 'Chưa đăng nhập' };
        }

        // Lấy thông tin user và giỏ hàng
        const user = Auth.getUser();
        const cartItems = Cart.getItems();

        // ===== KIỂM TRA GIỎ HÀNG =====
        if (cartItems.length === 0) {
            Toast.show('Giỏ hàng trống!', 'error');
            return { success: false, error: 'Giỏ hàng trống' };
        }

        try {
            // ===== TẠO DỮ LIỆU ĐƠN HÀNG =====
            const orderData = {
                // Thông tin user
                userId: user.uid,               // ID user trong Firebase
                userEmail: user.email,          // Email user

                // Thông tin khách hàng nhận xe
                customerInfo: {
                    fullName: customerInfo.fullName,
                    phone: customerInfo.phone,
                    address: customerInfo.address,
                    note: customerInfo.note || ''
                },

                // Danh sách sản phẩm đặt mua
                items: cartItems.map(item => ({
                    productId: item.id,
                    name: item.name,
                    brand: item.brand,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),

                // Tổng tiền
                totalAmount: Cart.getTotalPrice(),

                // Trạng thái đơn hàng
                // pending → confirmed → shipping → delivered
                status: 'pending',

                // Phương thức thanh toán
                paymentMethod: paymentMethod,  // 'cash' hoặc 'bank'

                // Thời gian tạo và cập nhật
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            // ===== LƯU VÀO FIRESTORE =====
            // Collection 'orders', tự động tạo document ID
            const docRef = await db.collection('orders').add(orderData);

            // ===== XÓA GIỎ HÀNG SAU KHI ĐẶT HÀNG THÀNH CÔNG =====
            Cart.clear();

            Toast.show('Đặt hàng thành công!', 'success');

            return {
                success: true,
                orderId: docRef.id,                         // ID của đơn hàng
                order: { id: docRef.id, ...orderData }      // Dữ liệu đơn hàng
            };
        } catch (error) {
            console.error('Error creating order:', error);
            Toast.show('Có lỗi xảy ra khi đặt hàng!', 'error');
            return { success: false, error: error.message };
        }
    },

    /* ----------------------------------------
       GET USER ORDERS - Lấy danh sách đơn hàng của user
       ----------------------------------------
       Query Firestore lấy tất cả đơn hàng của user hiện tại
       Sắp xếp theo thời gian mới nhất trước
       
       Return: Mảng các đơn hàng
       ---------------------------------------- */
    async getUserOrders() {
        // Kiểm tra đăng nhập
        if (!Auth.isLoggedIn()) {
            return [];
        }

        try {
            const user = Auth.getUser();

            // Query: Lấy orders của user, sắp xếp theo createdAt giảm dần
            const snapshot = await db.collection('orders')
                .where('userId', '==', user.uid)        // Chỉ lấy đơn của user này
                .orderBy('createdAt', 'desc')           // Mới nhất trước
                .get();

            // Chuyển snapshot thành mảng
            const orders = [];
            snapshot.forEach(doc => {
                orders.push({
                    id: doc.id,         // Document ID
                    ...doc.data()       // Dữ liệu đơn hàng
                });
            });

            return orders;
        } catch (error) {
            console.error('Error fetching orders:', error);
            return [];
        }
    },

    /* ----------------------------------------
       GET ORDER BY ID - Lấy thông tin 1 đơn hàng theo ID
       ----------------------------------------
       Tham số: orderId - ID của đơn hàng
       Return: Object đơn hàng hoặc null
       ---------------------------------------- */
    async getOrderById(orderId) {
        try {
            const doc = await db.collection('orders').doc(orderId).get();

            if (doc.exists) {
                return { id: doc.id, ...doc.data() };
            }
            return null;
        } catch (error) {
            console.error('Error fetching order:', error);
            return null;
        }
    },

    /* ----------------------------------------
       RENDER ORDERS HISTORY - Hiển thị lịch sử đơn hàng
       ----------------------------------------
       Render trên trang profile.html
       ---------------------------------------- */
    async renderOrdersHistory() {
        // Tìm container
        const container = document.getElementById('ordersHistory');
        if (!container) return;

        // Hiển thị loading
        container.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';

        // Lấy danh sách đơn hàng
        const orders = await this.getUserOrders();

        // ===== CHƯA CÓ ĐƠN HÀNG NÀO =====
        if (orders.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📦</div>
                    <h3 class="empty-title">Chưa có đơn hàng nào</h3>
                    <p class="empty-description">Hãy khám phá và đặt hàng chiếc xe mơ ước của bạn!</p>
                    <a href="/" class="btn btn-primary">Xem xe ngay</a>
                </div>
            `;
            return;
        }

        // ===== RENDER DANH SÁCH ĐƠN HÀNG =====
        container.innerHTML = orders.map(order => {
            // Lấy class và text cho trạng thái
            const statusClass = this.getStatusClass(order.status);
            const statusText = this.getStatusText(order.status);

            // Format ngày tạo đơn
            const orderDate = order.createdAt?.toDate?.()
                ? order.createdAt.toDate().toLocaleDateString('vi-VN')
                : 'N/A';

            return `
                <!-- Card đơn hàng -->
                <div class="order-card">
                    <!-- Header: Mã đơn + Ngày + Trạng thái -->
                    <div class="order-header">
                        <div>
                            <span class="order-id">Đơn hàng #${order.id.slice(-8).toUpperCase()}</span>
                            <span class="order-date">${orderDate}</span>
                        </div>
                        <span class="order-status ${statusClass}">${statusText}</span>
                    </div>
                    
                    <!-- Body: Danh sách sản phẩm -->
                    <div class="order-body">
                        <div class="order-items">
                            ${order.items.map(item => `
                                <div class="order-item">
                                    <img src="${item.image}" alt="${item.name}" class="order-item-image">
                                    <span class="order-item-name">${item.name}</span>
                                    <span class="order-item-qty">x${item.quantity}</span>
                                    <span class="order-item-price">${App.formatPriceFull(item.price)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Footer: Tổng tiền -->
                    <div class="order-footer">
                        <span class="order-total-label">Tổng tiền:</span>
                        <span class="order-total-value">${App.formatPriceFull(order.totalAmount)}</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    /* ----------------------------------------
       GET STATUS CLASS - Lấy CSS class cho trạng thái
       ----------------------------------------
       Tham số: status - Trạng thái đơn hàng
       Return: Tên class CSS
       ---------------------------------------- */
    getStatusClass(status) {
        const classes = {
            'pending': 'status-pending',      // Màu vàng
            'confirmed': 'status-confirmed',  // Màu xanh dương
            'shipping': 'status-shipping',    // Màu tím
            'delivered': 'status-delivered'   // Màu xanh lá
        };
        return classes[status] || 'status-pending';
    },

    /* ----------------------------------------
       GET STATUS TEXT - Lấy text hiển thị cho trạng thái
       ----------------------------------------
       Tham số: status - Trạng thái đơn hàng
       Return: Text tiếng Việt
       ---------------------------------------- */
    getStatusText(status) {
        const texts = {
            'pending': 'Chờ xác nhận',
            'confirmed': 'Đã xác nhận',
            'shipping': 'Đang giao hàng',
            'delivered': 'Đã giao hàng'
        };
        return texts[status] || 'Đang xử lý';
    }
};


/* ============================================================================
   EXPORT GLOBAL
   ============================================================================ */

window.Orders = Orders;
