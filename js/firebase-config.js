// Firebase Configuration for OTO VIỆT
const firebaseConfig = window.FIREBASE_CONFIG || {};

if (!window.FIREBASE_CONFIG) {
    console.error('CRITICAL: Firebase Configuration missing. Please ensure js/config.js is present and loaded.');
    alert('Lỗi cấu hình: Không tìm thấy file js/config.js. Vui lòng liên hệ quản trị viên.');
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Export for use in other files
window.auth = auth;
window.db = db;

console.log('Firebase initialized successfully!');
