// Main Application Module for OTO VIỆT

// Sample Car Data
const carsData = [
    {
        id: 'car-001',
        brand: 'Toyota',
        name: 'Toyota Camry 2.5Q 2024',
        price: 1395000000,
        oldPrice: 1450000000,
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Xăng',
        transmission: 'Tự động',
        seats: 5,
        type: 'Sedan',
        badges: ['new'],
        description: 'Toyota Camry 2024 - Sedan cao cấp với thiết kế sang trọng, động cơ 2.5L mạnh mẽ và tiết kiệm nhiên liệu.',
        specs: {
            engine: '2.5L 4 xi-lanh',
            power: '205 mã lực',
            torque: '250 Nm',
            fuelConsumption: '7.8L/100km'
        }
    },
    {
        id: 'car-002',
        brand: 'Honda',
        name: 'Honda CR-V L 2024',
        price: 1135000000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Xăng',
        transmission: 'Tự động',
        seats: 7,
        type: 'SUV',
        badges: ['hot'],
        description: 'Honda CR-V 2024 - SUV đa năng với không gian rộng rãi, nhiều tính năng an toàn tiên tiến.',
        specs: {
            engine: '1.5L Turbo',
            power: '188 mã lực',
            torque: '240 Nm',
            fuelConsumption: '7.5L/100km'
        }
    },
    {
        id: 'car-003',
        brand: 'Mercedes-Benz',
        name: 'Mercedes-Benz C300 AMG 2024',
        price: 2099000000,
        oldPrice: 2200000000,
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Xăng',
        transmission: 'Tự động',
        seats: 5,
        type: 'Sedan',
        badges: ['sale'],
        description: 'Mercedes-Benz C300 AMG - Sedan thể thao sang trọng với công nghệ hiện đại nhất từ Mercedes.',
        specs: {
            engine: '2.0L Turbo',
            power: '258 mã lực',
            torque: '400 Nm',
            fuelConsumption: '8.2L/100km'
        }
    },
    {
        id: 'car-004',
        brand: 'BMW',
        name: 'BMW X5 xDrive40i 2024',
        price: 4199000000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Xăng',
        transmission: 'Tự động',
        seats: 7,
        type: 'SUV',
        badges: ['new', 'hot'],
        description: 'BMW X5 2024 - SUV hạng sang với hiệu suất mạnh mẽ và nội thất đẳng cấp.',
        specs: {
            engine: '3.0L 6 xi-lanh Turbo',
            power: '340 mã lực',
            torque: '450 Nm',
            fuelConsumption: '9.5L/100km'
        }
    },
    {
        id: 'car-005',
        brand: 'Hyundai',
        name: 'Hyundai Tucson 2.0 Đặc Biệt 2024',
        price: 899000000,
        oldPrice: 950000000,
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Xăng',
        transmission: 'Tự động',
        seats: 5,
        type: 'SUV',
        badges: ['sale'],
        description: 'Hyundai Tucson 2024 - SUV gia đình với thiết kế đột phá và nhiều trang bị hiện đại.',
        specs: {
            engine: '2.0L MPI',
            power: '155 mã lực',
            torque: '192 Nm',
            fuelConsumption: '8.0L/100km'
        }
    },
    {
        id: 'car-006',
        brand: 'Mazda',
        name: 'Mazda CX-5 2.0 Premium 2024',
        price: 979000000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Xăng',
        transmission: 'Tự động',
        seats: 5,
        type: 'SUV',
        badges: [],
        description: 'Mazda CX-5 2024 - SUV phong cách với công nghệ SkyActiv tiết kiệm nhiên liệu.',
        specs: {
            engine: '2.0L SkyActiv-G',
            power: '154 mã lực',
            torque: '200 Nm',
            fuelConsumption: '7.0L/100km'
        }
    },
    {
        id: 'car-007',
        brand: 'VinFast',
        name: 'VinFast VF 8 Plus 2024',
        price: 1299000000,
        oldPrice: 1359000000,
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Điện',
        transmission: 'Tự động',
        seats: 5,
        type: 'SUV',
        badges: ['new', 'hot'],
        description: 'VinFast VF 8 2024 - SUV điện thông minh với công nghệ tự lái tiên tiến.',
        specs: {
            engine: 'Động cơ điện kép',
            power: '402 mã lực',
            torque: '620 Nm',
            fuelConsumption: '15.5 kWh/100km'
        }
    },
    {
        id: 'car-008',
        brand: 'Kia',
        name: 'Kia Sportage 2.0 Signature 2024',
        price: 999000000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Xăng',
        transmission: 'Tự động',
        seats: 5,
        type: 'SUV',
        badges: [],
        description: 'Kia Sportage 2024 - SUV thế hệ mới với thiết kế táo bạo và công nghệ tiên phong.',
        specs: {
            engine: '2.0L MPI',
            power: '155 mã lực',
            torque: '192 Nm',
            fuelConsumption: '8.2L/100km'
        }
    },
    {
        id: 'car-009',
        brand: 'Ford',
        name: 'Ford Everest Titanium+ 2024',
        price: 1399000000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Dầu',
        transmission: 'Tự động',
        seats: 7,
        type: 'SUV',
        badges: ['hot'],
        description: 'Ford Everest 2024 - SUV 7 chỗ mạnh mẽ với khả năng off-road vượt trội.',
        specs: {
            engine: '2.0L Bi-Turbo Diesel',
            power: '210 mã lực',
            torque: '500 Nm',
            fuelConsumption: '8.0L/100km'
        }
    },
    {
        id: 'car-010',
        brand: 'Lexus',
        name: 'Lexus RX 350h 2024',
        price: 3680000000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Hybrid',
        transmission: 'Tự động',
        seats: 5,
        type: 'SUV',
        badges: ['new'],
        description: 'Lexus RX 350h 2024 - SUV hybrid sang trọng với sự kết hợp hoàn hảo giữa hiệu suất và hiệu quả.',
        specs: {
            engine: '2.5L Hybrid',
            power: '246 mã lực tổng hợp',
            torque: '239 Nm',
            fuelConsumption: '6.0L/100km'
        }
    },
    {
        id: 'car-011',
        brand: 'Audi',
        name: 'Audi Q7 55 TFSI 2024',
        price: 4599000000,
        oldPrice: 4800000000,
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Xăng',
        transmission: 'Tự động',
        seats: 7,
        type: 'SUV',
        badges: ['sale'],
        description: 'Audi Q7 2024 - SUV full-size với công nghệ quattro và nội thất cao cấp.',
        specs: {
            engine: '3.0L V6 Turbo',
            power: '340 mã lực',
            torque: '500 Nm',
            fuelConsumption: '9.8L/100km'
        }
    },
    {
        id: 'car-012',
        brand: 'Toyota',
        name: 'Toyota Land Cruiser Prado 2024',
        price: 2649000000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Dầu',
        transmission: 'Tự động',
        seats: 7,
        type: 'SUV',
        badges: [],
        description: 'Toyota Land Cruiser Prado - SUV huyền thoại với độ bền bỉ và khả năng off-road tuyệt vời.',
        specs: {
            engine: '2.8L Diesel',
            power: '204 mã lực',
            torque: '500 Nm',
            fuelConsumption: '7.9L/100km'
        }
    }
];

// App Module
const App = {
    products: carsData,
    filteredProducts: carsData,

    // Initialize app
    init() {
        this.renderProducts();
        this.setupEventListeners();
        this.updateCartCount();
    },

    // Render products grid
    renderProducts(products = this.filteredProducts) {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        if (products.length === 0) {
            grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">🚗</div>
          <h3 class="empty-title">Không tìm thấy xe</h3>
          <p class="empty-description">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          <button class="btn btn-secondary" onclick="App.resetFilters()">Xóa bộ lọc</button>
        </div>
      `;
            return;
        }

        grid.innerHTML = products.map(car => this.createProductCard(car)).join('');
    },

    // Create product card HTML
    createProductCard(car) {
        const formattedPrice = this.formatPrice(car.price);
        const formattedOldPrice = car.oldPrice ? this.formatPrice(car.oldPrice) : '';

        const badgesHTML = car.badges.map(badge => {
            const badgeClass = badge === 'new' ? 'badge-new' : badge === 'hot' ? 'badge-hot' : 'badge-sale';
            const badgeText = badge === 'new' ? 'Mới' : badge === 'hot' ? 'Hot' : 'Giảm giá';
            return `<span class="product-badge ${badgeClass}">${badgeText}</span>`;
        }).join('');

        return `
      <div class="product-card" onclick="App.viewProduct('${car.id}')">
        <div class="product-image-wrapper">
          <img src="${car.image}" alt="${car.name}" class="product-image" loading="lazy">
          ${badgesHTML ? `<div class="product-badges">${badgesHTML}</div>` : ''}
          <button class="product-wishlist" onclick="event.stopPropagation(); App.toggleWishlist('${car.id}')">
            ♡
          </button>
        </div>
        <div class="product-content">
          <div class="product-brand">${car.brand}</div>
          <h3 class="product-title">${car.name}</h3>
          <div class="product-specs">
            <span class="spec-item">
              <span>📅</span> ${car.year}
            </span>
            <span class="spec-item">
              <span>⛽</span> ${car.fuel}
            </span>
            <span class="spec-item">
              <span>⚙️</span> ${car.transmission}
            </span>
            <span class="spec-item">
              <span>👥</span> ${car.seats} chỗ
            </span>
          </div>
          <div class="product-footer">
            <div class="product-price">
              <span class="price-current">${formattedPrice}</span>
              ${formattedOldPrice ? `<span class="price-old">${formattedOldPrice}</span>` : ''}
            </div>
            <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); Cart.addItem('${car.id}')">
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    `;
    },

    // Format price to VND
    formatPrice(price) {
        if (price >= 1000000000) {
            return (price / 1000000000).toFixed(2).replace('.', ',') + ' tỷ';
        }
        return (price / 1000000).toFixed(0) + ' triệu';
    },

    // Format price full
    formatPriceFull(price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    },

    // View product detail
    viewProduct(id) {
        window.location.href = `pages/product.html?id=${id}`;
    },

    // Get product by ID
    getProductById(id) {
        return this.products.find(p => p.id === id);
    },

    // Toggle wishlist
    toggleWishlist(id) {
        Toast.show('Đã thêm vào danh sách yêu thích!', 'success');
    },

    // Setup event listeners
    setupEventListeners() {
        // Search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterProducts();
            });
        }

        // Brand filter
        const brandFilter = document.getElementById('brandFilter');
        if (brandFilter) {
            brandFilter.addEventListener('change', () => {
                this.filterProducts();
            });
        }

        // Type filter
        const typeFilter = document.getElementById('typeFilter');
        if (typeFilter) {
            typeFilter.addEventListener('change', () => {
                this.filterProducts();
            });
        }

        // Price filter
        const priceFilter = document.getElementById('priceFilter');
        if (priceFilter) {
            priceFilter.addEventListener('change', () => {
                this.filterProducts();
            });
        }

        // Sort filter
        const sortFilter = document.getElementById('sortFilter');
        if (sortFilter) {
            sortFilter.addEventListener('change', () => {
                this.filterProducts();
            });
        }
    },

    // Filter products
    filterProducts() {
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const brand = document.getElementById('brandFilter')?.value || '';
        const type = document.getElementById('typeFilter')?.value || '';
        const priceRange = document.getElementById('priceFilter')?.value || '';
        const sortBy = document.getElementById('sortFilter')?.value || '';

        let filtered = [...this.products];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(car =>
                car.name.toLowerCase().includes(searchTerm) ||
                car.brand.toLowerCase().includes(searchTerm)
            );
        }

        // Brand filter
        if (brand) {
            filtered = filtered.filter(car => car.brand === brand);
        }

        // Type filter
        if (type) {
            filtered = filtered.filter(car => car.type === type);
        }

        // Price filter
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            filtered = filtered.filter(car => {
                if (max) {
                    return car.price >= min && car.price <= max;
                }
                return car.price >= min;
            });
        }

        // Sort
        if (sortBy) {
            switch (sortBy) {
                case 'price-asc':
                    filtered.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    filtered.sort((a, b) => b.price - a.price);
                    break;
                case 'name-asc':
                    filtered.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'newest':
                    filtered.sort((a, b) => b.year - a.year);
                    break;
            }
        }

        this.filteredProducts = filtered;
        this.renderProducts(filtered);
    },

    // Reset filters
    resetFilters() {
        const searchInput = document.getElementById('searchInput');
        const brandFilter = document.getElementById('brandFilter');
        const typeFilter = document.getElementById('typeFilter');
        const priceFilter = document.getElementById('priceFilter');
        const sortFilter = document.getElementById('sortFilter');

        if (searchInput) searchInput.value = '';
        if (brandFilter) brandFilter.value = '';
        if (typeFilter) typeFilter.value = '';
        if (priceFilter) priceFilter.value = '';
        if (sortFilter) sortFilter.value = '';

        this.filteredProducts = this.products;
        this.renderProducts();
    },

    // Update cart count in header
    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const count = Cart.getItemCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }
    }
};

// Toast Notifications
const Toast = {
    container: null,

    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    },

    show(message, type = 'success') {
        this.init();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
      <span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
      <span>${message}</span>
    `;

        this.container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export
window.App = App;
window.Toast = Toast;
window.carsData = carsData;
