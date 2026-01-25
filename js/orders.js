// Orders Module for OTO VIỆT - Firestore Integration

const Orders = {
    // Create new order
    async createOrder(customerInfo, paymentMethod = 'cash') {
        // Check if user is logged in
        if (!Auth.isLoggedIn()) {
            Toast.show('Vui lòng đăng nhập để đặt hàng!', 'error');
            window.location.href = '/pages/login.html';
            return { success: false, error: 'Chưa đăng nhập' };
        }

        const user = Auth.getUser();
        const cartItems = Cart.getItems();

        if (cartItems.length === 0) {
            Toast.show('Giỏ hàng trống!', 'error');
            return { success: false, error: 'Giỏ hàng trống' };
        }

        try {
            // Create order data
            const orderData = {
                userId: user.uid,
                userEmail: user.email,
                customerInfo: {
                    fullName: customerInfo.fullName,
                    phone: customerInfo.phone,
                    address: customerInfo.address,
                    note: customerInfo.note || ''
                },
                items: cartItems.map(item => ({
                    productId: item.id,
                    name: item.name,
                    brand: item.brand,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                totalAmount: Cart.getTotalPrice(),
                status: 'pending',
                paymentMethod: paymentMethod,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            // Add order to Firestore
            const docRef = await db.collection('orders').add(orderData);

            // Clear cart after successful order
            Cart.clear();

            Toast.show('Đặt hàng thành công!', 'success');

            return {
                success: true,
                orderId: docRef.id,
                order: { id: docRef.id, ...orderData }
            };
        } catch (error) {
            console.error('Error creating order:', error);
            Toast.show('Có lỗi xảy ra khi đặt hàng!', 'error');
            return { success: false, error: error.message };
        }
    },

    // Get user's orders
    async getUserOrders() {
        if (!Auth.isLoggedIn()) {
            return [];
        }

        try {
            const user = Auth.getUser();
            const snapshot = await db.collection('orders')
                .where('userId', '==', user.uid)
                .orderBy('createdAt', 'desc')
                .get();

            const orders = [];
            snapshot.forEach(doc => {
                orders.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return orders;
        } catch (error) {
            console.error('Error fetching orders:', error);
            return [];
        }
    },

    // Get single order by ID
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

    // Render orders on profile page
    async renderOrdersHistory() {
        const container = document.getElementById('ordersHistory');
        if (!container) return;

        container.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';

        const orders = await this.getUserOrders();

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

        container.innerHTML = orders.map(order => {
            const statusClass = this.getStatusClass(order.status);
            const statusText = this.getStatusText(order.status);
            const orderDate = order.createdAt?.toDate?.()
                ? order.createdAt.toDate().toLocaleDateString('vi-VN')
                : 'N/A';

            return `
        <div class="order-card">
          <div class="order-header">
            <div>
              <span class="order-id">Đơn hàng #${order.id.slice(-8).toUpperCase()}</span>
              <span class="order-date">${orderDate}</span>
            </div>
            <span class="order-status ${statusClass}">${statusText}</span>
          </div>
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
          <div class="order-footer">
            <span class="order-total-label">Tổng tiền:</span>
            <span class="order-total-value">${App.formatPriceFull(order.totalAmount)}</span>
          </div>
        </div>
      `;
        }).join('');
    },

    // Get status CSS class
    getStatusClass(status) {
        const classes = {
            'pending': 'status-pending',
            'confirmed': 'status-confirmed',
            'shipping': 'status-shipping',
            'delivered': 'status-delivered'
        };
        return classes[status] || 'status-pending';
    },

    // Get status display text
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

// Export
window.Orders = Orders;
