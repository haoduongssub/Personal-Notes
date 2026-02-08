/**
 * ============================================================================
 * OTO VIỆT - CẤU HÌNH FIREBASE (firebase-config.js)
 * ============================================================================
 * 
 * File này thực hiện:
 * 1. Lấy cấu hình Firebase từ config.js
 * 2. Khởi tạo Firebase App
 * 3. Khởi tạo các services: Authentication và Firestore
 * 4. Export các services ra global (window) để file khác sử dụng
 * 
 * THỨ TỰ LOAD:
 * config.js → firebase-config.js → auth.js → app.js → cart.js → orders.js
 * 
 * ============================================================================
 */


/* ============================================================================
   BƯỚC 1: LẤY CẤU HÌNH FIREBASE
   ============================================================================
   Cấu hình được khai báo trong file config.js
   và gán vào window.FIREBASE_CONFIG
   ============================================================================ */

const firebaseConfig = window.FIREBASE_CONFIG || {};

// Kiểm tra xem config có tồn tại không
if (!window.FIREBASE_CONFIG) {
    // Hiển thị lỗi nếu thiếu config
    console.error('CRITICAL: Firebase Configuration missing. Please ensure js/config.js is present and loaded.');
    alert('Lỗi cấu hình: Không tìm thấy file js/config.js. Vui lòng liên hệ quản trị viên.');
}


/* ============================================================================
   BƯỚC 2: KHỞI TẠO FIREBASE APP
   ============================================================================
   Gọi firebase.initializeApp() với config
   Phải gọi trước khi sử dụng bất kỳ service nào
   ============================================================================ */

firebase.initializeApp(firebaseConfig);


/* ============================================================================
   BƯỚC 3: KHỞI TẠO FIREBASE SERVICES
   ============================================================================
   - auth: Firebase Authentication (đăng nhập, đăng ký)
   - db: Cloud Firestore (database)
   ============================================================================ */

const auth = firebase.auth();       // Service xác thực
const db = firebase.firestore();    // Service database


/* ============================================================================
   BƯỚC 4: EXPORT SERVICES RA GLOBAL
   ============================================================================
   Gán vào window để các file khác có thể sử dụng
   VD: auth.onAuthStateChanged() trong auth.js
       db.collection('orders') trong orders.js
   ============================================================================ */

window.auth = auth;
window.db = db;

// Log để biết Firebase đã khởi tạo thành công
console.log('Firebase initialized successfully!');
