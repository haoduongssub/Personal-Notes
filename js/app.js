/**
 * ============================================================================
 * OTO VIỆT - MODULE ỨNG DỤNG CHÍNH (app.js)
 * ============================================================================
 * 
 * File này chứa:
 * 1. Dữ liệu mẫu các dòng xe ô tô (carsData)
 * 2. Module App - Quản lý hiển thị và lọc sản phẩm
 * 3. Module Toast - Hiển thị thông báo
 * 
 * ============================================================================
 */


/* ============================================================================
   PHẦN 1: DỮ LIỆU XE Ô TÔ MẪU (SAMPLE CAR DATA)
   ============================================================================
   - Mảng chứa thông tin 12 dòng xe ô tô
   - Mỗi xe bao gồm: id, brand, name, price, specs...
   - Dữ liệu này được dùng để render trên trang chủ
   ============================================================================ */

const carsData = [
    // ----------------------------------------
    // Xe 1: Toyota Camry
    // ----------------------------------------
    {
        id: 'car-001',                          // ID duy nhất của xe
        brand: 'Toyota',                        // Hãng xe
        name: 'Toyota Camry 2.5Q 2024',         // Tên đầy đủ
        price: 1395000000,                      // Giá bán (VND) - 1.395 tỷ
        oldPrice: 1450000000,                   // Giá cũ (nếu có giảm giá)
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=533&fit=crop',  // Ảnh xe
        year: 2024,                             // Năm sản xuất
        fuel: 'Xăng',                           // Loại nhiên liệu
        transmission: 'Tự động',                // Hộp số
        seats: 5,                               // Số chỗ ngồi
        type: 'Sedan',                          // Loại xe (Sedan, SUV, Hatchback, Pickup)
        badges: ['new'],                        // Nhãn: 'new', 'hot', 'sale'
        description: 'Toyota Camry 2024 - Sedan cao cấp với thiết kế sang trọng, động cơ 2.5L mạnh mẽ và tiết kiệm nhiên liệu.',
        specs: {                                // Thông số kỹ thuật
            engine: '2.5L 4 xi-lanh',           // Động cơ
            power: '205 mã lực',                // Công suất
            torque: '250 Nm',                   // Mô-men xoắn
            fuelConsumption: '7.8L/100km'       // Tiêu hao nhiên liệu
        }
    },

    // ----------------------------------------
    // Xe 2: Honda CR-V
    // ----------------------------------------
    {
        id: 'car-002',
        brand: 'Honda',
        name: 'Honda CR-V L 2024',
        price: 1135000000,                      // 1.135 tỷ
        oldPrice: null,                         // Không giảm giá
        image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Xăng',
        transmission: 'Tự động',
        seats: 7,                               // SUV 7 chỗ
        type: 'SUV',
        badges: ['hot'],                        // Nhãn "Hot"
        description: 'Honda CR-V 2024 - SUV đa năng với không gian rộng rãi, nhiều tính năng an toàn tiên tiến.',
        specs: {
            engine: '1.5L Turbo',
            power: '188 mã lực',
            torque: '240 Nm',
            fuelConsumption: '7.5L/100km'
        }
    },

    // ----------------------------------------
    // Xe 3: Mercedes-Benz C300 AMG
    // ----------------------------------------
    {
        id: 'car-003',
        brand: 'Mercedes-Benz',
        name: 'Mercedes-Benz C300 AMG 2024',
        price: 2099000000,                      // 2.099 tỷ
        oldPrice: 2200000000,                   // Giảm từ 2.2 tỷ
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Xăng',
        transmission: 'Tự động',
        seats: 5,
        type: 'Sedan',
        badges: ['sale'],                       // Nhãn "Giảm giá"
        description: 'Mercedes-Benz C300 AMG - Sedan thể thao sang trọng với công nghệ hiện đại nhất từ Mercedes.',
        specs: {
            engine: '2.0L Turbo',
            power: '258 mã lực',
            torque: '400 Nm',
            fuelConsumption: '8.2L/100km'
        }
    },

    // ----------------------------------------
    // Xe 4: BMW X5
    // ----------------------------------------
    {
        id: 'car-004',
        brand: 'BMW',
        name: 'BMW X5 xDrive40i 2024',
        price: 4199000000,                      // 4.199 tỷ
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Xăng',
        transmission: 'Tự động',
        seats: 7,
        type: 'SUV',
        badges: ['new', 'hot'],                 // Có 2 nhãn
        description: 'BMW X5 2024 - SUV hạng sang với hiệu suất mạnh mẽ và nội thất đẳng cấp.',
        specs: {
            engine: '3.0L 6 xi-lanh Turbo',
            power: '340 mã lực',
            torque: '450 Nm',
            fuelConsumption: '9.5L/100km'
        }
    },

    // ----------------------------------------
    // Xe 5: Hyundai Tucson
    // ----------------------------------------
    {
        id: 'car-005',
        brand: 'Hyundai',
        name: 'Hyundai Tucson 2.0 Đặc Biệt 2024',
        price: 899000000,                       // 899 triệu
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

    // ----------------------------------------
    // Xe 6: Mazda CX-5
    // ----------------------------------------
    {
        id: 'car-006',
        brand: 'Mazda',
        name: 'Mazda CX-5 2.0 Premium 2024',
        price: 979000000,                       // 979 triệu
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Xăng',
        transmission: 'Tự động',
        seats: 5,
        type: 'SUV',
        badges: [],                             // Không có nhãn
        description: 'Mazda CX-5 2024 - SUV phong cách với công nghệ SkyActiv tiết kiệm nhiên liệu.',
        specs: {
            engine: '2.0L SkyActiv-G',
            power: '154 mã lực',
            torque: '200 Nm',
            fuelConsumption: '7.0L/100km'
        }
    },

    // ----------------------------------------
    // Xe 7: VinFast VF 8 (Xe điện)
    // ----------------------------------------
    {
        id: 'car-007',
        brand: 'VinFast',
        name: 'VinFast VF 8 Plus 2024',
        price: 1299000000,                      // 1.299 tỷ
        oldPrice: 1359000000,
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Điện',                           // Xe điện
        transmission: 'Tự động',
        seats: 5,
        type: 'SUV',
        badges: ['new', 'hot'],
        description: 'VinFast VF 8 2024 - SUV điện thông minh với công nghệ tự lái tiên tiến.',
        specs: {
            engine: 'Động cơ điện kép',         // Động cơ điện
            power: '402 mã lực',
            torque: '620 Nm',
            fuelConsumption: '15.5 kWh/100km'   // Tiêu hao điện
        }
    },

    // ----------------------------------------
    // Xe 8: Kia Sportage
    // ----------------------------------------
    {
        id: 'car-008',
        brand: 'Kia',
        name: 'Kia Sportage 2.0 Signature 2024',
        price: 999000000,                       // 999 triệu
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

    // ----------------------------------------
    // Xe 9: Ford Everest
    // ----------------------------------------
    {
        id: 'car-009',
        brand: 'Ford',
        name: 'Ford Everest Titanium+ 2024',
        price: 1399000000,                      // 1.399 tỷ
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Dầu',                            // Xe dầu Diesel
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

    // ----------------------------------------
    // Xe 10: Lexus RX 350h (Hybrid)
    // ----------------------------------------
    {
        id: 'car-010',
        brand: 'Lexus',
        name: 'Lexus RX 350h 2024',
        price: 3680000000,                      // 3.68 tỷ
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=533&fit=crop',
        year: 2024,
        fuel: 'Hybrid',                         // Xe Hybrid
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

    // ----------------------------------------
    // Xe 11: Audi Q7
    // ----------------------------------------
    {
        id: 'car-011',
        brand: 'Audi',
        name: 'Audi Q7 55 TFSI 2024',
        price: 4599000000,                      // 4.599 tỷ
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

    // ----------------------------------------
    // Xe 12: Toyota Land Cruiser Prado
    // ----------------------------------------
    {
        id: 'car-012',
        brand: 'Toyota',
        name: 'Toyota Land Cruiser Prado 2024',
        price: 2649000000,                      // 2.649 tỷ
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


/* ============================================================================
   PHẦN 2: MODULE APP - QUẢN LÝ SẢN PHẨM VÀ GIAO DIỆN
   ============================================================================
   - Khởi tạo ứng dụng
   - Render danh sách sản phẩm
   - Lọc và sắp xếp sản phẩm
   - Format giá tiền
   - Cập nhật giỏ hàng
   ============================================================================ */

const App = {
    // ----- Thuộc tính -----
    products: carsData,           // Danh sách tất cả sản phẩm
    filteredProducts: carsData,   // Danh sách sản phẩm sau khi lọc

    /* ----------------------------------------
       INIT - Khởi tạo ứng dụng
       ----------------------------------------
       Được gọi khi trang load xong (DOMContentLoaded)
       ---------------------------------------- */
    init() {
        this.renderProducts();        // Render danh sách xe lên trang
        this.setupEventListeners();   // Gắn sự kiện cho các bộ lọc
        this.updateCartCount();       // Cập nhật số lượng trên icon giỏ hàng
    },

    /* ----------------------------------------
       RENDER PRODUCTS - Hiển thị danh sách sản phẩm
       ----------------------------------------
       Tham số: products - Mảng sản phẩm cần hiển thị
       Mặc định: this.filteredProducts
       ---------------------------------------- */
    renderProducts(products = this.filteredProducts) {
        // Tìm container để chứa danh sách sản phẩm
        const grid = document.getElementById('productsGrid');
        if (!grid) return;  // Thoát nếu không tìm thấy

        // Trường hợp không có sản phẩm nào
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

        // Render từng sản phẩm thành card HTML
        grid.innerHTML = products.map(car => this.createProductCard(car)).join('');
    },

    /* ----------------------------------------
       CREATE PRODUCT CARD - Tạo HTML cho 1 card sản phẩm
       ----------------------------------------
       Tham số: car - Object chứa thông tin xe
       Return: String HTML của card
       ---------------------------------------- */
    createProductCard(car) {
        // Format giá tiền
        const formattedPrice = this.formatPrice(car.price);
        const formattedOldPrice = car.oldPrice ? this.formatPrice(car.oldPrice) : '';

        // Tạo HTML cho các badges (Mới, Hot, Giảm giá)
        const badgesHTML = car.badges.map(badge => {
            // Xác định class và text dựa trên loại badge
            const badgeClass = badge === 'new' ? 'badge-new' : badge === 'hot' ? 'badge-hot' : 'badge-sale';
            const badgeText = badge === 'new' ? 'Mới' : badge === 'hot' ? 'Hot' : 'Giảm giá';
            return `<span class="product-badge ${badgeClass}">${badgeText}</span>`;
        }).join('');

        // Return HTML của card
        return `
            <!-- Card sản phẩm - Click để xem chi tiết -->
            <div class="product-card" onclick="App.viewProduct('${car.id}')">
                
                <!-- Phần hình ảnh -->
                <div class="product-image-wrapper">
                    <img src="${car.image}" alt="${car.name}" class="product-image" loading="lazy">
                    
                    <!-- Badges (Mới, Hot, Giảm giá) - góc trên trái -->
                    ${badgesHTML ? `<div class="product-badges">${badgesHTML}</div>` : ''}
                    
                    <!-- Nút yêu thích - góc trên phải -->
                    <button class="product-wishlist" onclick="event.stopPropagation(); App.toggleWishlist('${car.id}')">
                        ♡
                    </button>
                </div>
                
                <!-- Phần nội dung -->
                <div class="product-content">
                    <!-- Tên hãng xe -->
                    <div class="product-brand">${car.brand}</div>
                    
                    <!-- Tên xe -->
                    <h3 class="product-title">${car.name}</h3>
                    
                    <!-- Thông số nhanh: Năm, Nhiên liệu, Hộp số, Số chỗ -->
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
                    
                    <!-- Footer: Giá + Nút thêm vào giỏ -->
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

    /* ----------------------------------------
       FORMAT PRICE - Format giá tiền dạng ngắn
       ----------------------------------------
       Ví dụ: 1395000000 → "1,40 tỷ"
              899000000  → "899 triệu"
       ---------------------------------------- */
    formatPrice(price) {
        if (price >= 1000000000) {
            // Giá từ 1 tỷ trở lên
            return (price / 1000000000).toFixed(2).replace('.', ',') + ' tỷ';
        }
        // Giá dưới 1 tỷ (hiển thị triệu)
        return (price / 1000000).toFixed(0) + ' triệu';
    },

    /* ----------------------------------------
       FORMAT PRICE FULL - Format giá tiền đầy đủ
       ----------------------------------------
       Ví dụ: 1395000000 → "1.395.000.000 ₫"
       Sử dụng Intl.NumberFormat chuẩn Việt Nam
       ---------------------------------------- */
    formatPriceFull(price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    },

    /* ----------------------------------------
       VIEW PRODUCT - Chuyển đến trang chi tiết sản phẩm
       ----------------------------------------
       Tham số: id - ID của sản phẩm
       ---------------------------------------- */
    viewProduct(id) {
        window.location.href = `pages/product.html?id=${id}`;
    },

    /* ----------------------------------------
       GET PRODUCT BY ID - Tìm sản phẩm theo ID
       ----------------------------------------
       Tham số: id - ID cần tìm
       Return: Object sản phẩm hoặc undefined
       ---------------------------------------- */
    getProductById(id) {
        return this.products.find(p => p.id === id);
    },

    /* ----------------------------------------
       TOGGLE WISHLIST - Thêm/Xóa khỏi danh sách yêu thích
       ----------------------------------------
       TODO: Chức năng wishlist chưa hoàn thiện
       ---------------------------------------- */
    toggleWishlist(id) {
        Toast.show('Đã thêm vào danh sách yêu thích!', 'success');
    },

    /* ----------------------------------------
       SETUP EVENT LISTENERS - Gắn sự kiện cho các bộ lọc
       ----------------------------------------
       Lắng nghe thay đổi trên:
       - Ô tìm kiếm (searchInput)
       - Dropdown hãng xe (brandFilter)
       - Dropdown loại xe (typeFilter)
       - Dropdown khoảng giá (priceFilter)
       - Dropdown sắp xếp (sortFilter)
       ---------------------------------------- */
    setupEventListeners() {
        // Ô tìm kiếm - lọc khi gõ
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterProducts();
            });
        }

        // Dropdown lọc theo hãng xe
        const brandFilter = document.getElementById('brandFilter');
        if (brandFilter) {
            brandFilter.addEventListener('change', () => {
                this.filterProducts();
            });
        }

        // Dropdown lọc theo loại xe
        const typeFilter = document.getElementById('typeFilter');
        if (typeFilter) {
            typeFilter.addEventListener('change', () => {
                this.filterProducts();
            });
        }

        // Dropdown lọc theo khoảng giá
        const priceFilter = document.getElementById('priceFilter');
        if (priceFilter) {
            priceFilter.addEventListener('change', () => {
                this.filterProducts();
            });
        }

        // Dropdown sắp xếp
        const sortFilter = document.getElementById('sortFilter');
        if (sortFilter) {
            sortFilter.addEventListener('change', () => {
                this.filterProducts();
            });
        }
    },

    /* ----------------------------------------
       FILTER PRODUCTS - Lọc và sắp xếp sản phẩm
       ----------------------------------------
       Đọc giá trị từ các bộ lọc, áp dụng lọc,
       và re-render danh sách sản phẩm
       ---------------------------------------- */
    filterProducts() {
        // Lấy giá trị từ các bộ lọc
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const brand = document.getElementById('brandFilter')?.value || '';
        const type = document.getElementById('typeFilter')?.value || '';
        const priceRange = document.getElementById('priceFilter')?.value || '';
        const sortBy = document.getElementById('sortFilter')?.value || '';

        // Bắt đầu với toàn bộ sản phẩm
        let filtered = [...this.products];

        // ----- Lọc theo từ khóa tìm kiếm -----
        if (searchTerm) {
            filtered = filtered.filter(car =>
                car.name.toLowerCase().includes(searchTerm) ||
                car.brand.toLowerCase().includes(searchTerm)
            );
        }

        // ----- Lọc theo hãng xe -----
        if (brand) {
            filtered = filtered.filter(car => car.brand === brand);
        }

        // ----- Lọc theo loại xe -----
        if (type) {
            filtered = filtered.filter(car => car.type === type);
        }

        // ----- Lọc theo khoảng giá -----
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            filtered = filtered.filter(car => {
                if (max) {
                    return car.price >= min && car.price <= max;
                }
                return car.price >= min;  // Trường hợp "Trên 3 tỷ"
            });
        }

        // ----- Sắp xếp -----
        if (sortBy) {
            switch (sortBy) {
                case 'price-asc':   // Giá tăng dần
                    filtered.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':  // Giá giảm dần
                    filtered.sort((a, b) => b.price - a.price);
                    break;
                case 'name-asc':    // Tên A-Z
                    filtered.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'newest':      // Mới nhất (theo năm)
                    filtered.sort((a, b) => b.year - a.year);
                    break;
            }
        }

        // Cập nhật và render kết quả
        this.filteredProducts = filtered;
        this.renderProducts(filtered);
    },

    /* ----------------------------------------
       RESET FILTERS - Xóa tất cả bộ lọc
       ----------------------------------------
       Reset về trạng thái ban đầu
       ---------------------------------------- */
    resetFilters() {
        // Reset giá trị các bộ lọc
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

        // Reset danh sách sản phẩm
        this.filteredProducts = this.products;
        this.renderProducts();
    },

    /* ----------------------------------------
       UPDATE CART COUNT - Cập nhật số lượng giỏ hàng
       ----------------------------------------
       Hiển thị số lượng sản phẩm trên icon giỏ hàng
       Ẩn nếu giỏ hàng trống
       ---------------------------------------- */
    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const count = Cart.getItemCount();
            cartCount.textContent = count;
            // Hiện badge nếu có sản phẩm, ẩn nếu không
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }
    }
};


/* ============================================================================
   PHẦN 3: MODULE TOAST - THÔNG BÁO
   ============================================================================
   - Hiển thị thông báo popup ở góc màn hình
   - Tự động ẩn sau 3 giây
   - Hỗ trợ 3 loại: success, error, info
   ============================================================================ */

const Toast = {
    container: null,  // Container chứa các toast

    /* ----------------------------------------
       INIT - Khởi tạo container
       ----------------------------------------
       Tạo div container nếu chưa có
       ---------------------------------------- */
    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    },

    /* ----------------------------------------
       SHOW - Hiển thị thông báo
       ----------------------------------------
       Tham số:
       - message: Nội dung thông báo
       - type: Loại thông báo ('success', 'error', 'info')
       ---------------------------------------- */
    show(message, type = 'success') {
        this.init();  // Đảm bảo container đã tồn tại

        // Tạo element toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <span>${message}</span>
        `;

        // Thêm vào container
        this.container.appendChild(toast);

        // Tự động ẩn sau 3 giây
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100px)';
            // Xóa khỏi DOM sau khi animation kết thúc
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};


/* ============================================================================
   PHẦN 4: KHỞI TẠO ỨNG DỤNG
   ============================================================================
   Chạy khi DOM đã load xong
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    App.init();  // Khởi tạo ứng dụng
});


/* ============================================================================
   PHẦN 5: EXPORT GLOBAL
   ============================================================================
   Gán các module vào window để các file khác có thể sử dụng
   ============================================================================ */

window.App = App;
window.Toast = Toast;
window.carsData = carsData;
