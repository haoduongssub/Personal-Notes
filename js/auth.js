/**
 * ============================================================================
 * OTO VIỆT - MODULE XÁC THỰC NGƯỜI DÙNG (auth.js)
 * ============================================================================
 * 
 * File này chứa tất cả chức năng liên quan đến xác thực:
 * - Đăng ký tài khoản mới (register)
 * - Đăng nhập (login)
 * - Đăng xuất (logout)
 * - Khôi phục mật khẩu (resetPassword)
 * - Cập nhật giao diện theo trạng thái đăng nhập
 * 
 * Sử dụng Firebase Authentication
 * 
 * ============================================================================
 */


/* ============================================================================
   MODULE AUTH - QUẢN LÝ XÁC THỰC
   ============================================================================ */

const Auth = {

    /* ----------------------------------------
       THUỘC TÍNH
       ---------------------------------------- */
    currentUser: null,  // Lưu thông tin user đang đăng nhập (null nếu chưa đăng nhập)

    /* ----------------------------------------
       INIT - Khởi tạo module xác thực
       ----------------------------------------
       Lắng nghe thay đổi trạng thái đăng nhập từ Firebase
       Được gọi tự động khi trang load
       ---------------------------------------- */
    init() {
        // onAuthStateChanged: Callback được gọi mỗi khi trạng thái auth thay đổi
        // - user có giá trị: đã đăng nhập
        // - user là null: chưa đăng nhập
        auth.onAuthStateChanged((user) => {
            this.currentUser = user;  // Lưu user hiện tại
            this.updateUI(user);       // Cập nhật giao diện

            // Phát sự kiện cho các module khác biết trạng thái auth đã thay đổi
            window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user } }));
        });
    },

    /* ----------------------------------------
       UPDATE UI - Cập nhật giao diện theo trạng thái đăng nhập
       ----------------------------------------
       Tham số: user - Object user từ Firebase (null nếu chưa đăng nhập)
       
       Khi đã đăng nhập:
       - Ẩn menu Guest (Đăng nhập/Đăng ký)
       - Hiện menu Logged In (Avatar + Dropdown)
       
       Khi chưa đăng nhập:
       - Hiện menu Guest
       - Ẩn menu Logged In
       ---------------------------------------- */
    updateUI(user) {
        // Lấy các element trong header
        const userMenuGuest = document.getElementById('userMenuGuest');         // Menu cho khách
        const userMenuLoggedIn = document.getElementById('userMenuLoggedIn');   // Menu cho user đã đăng nhập
        const userNameDisplay = document.getElementById('userNameDisplay');     // Hiển thị tên user
        const userAvatarInitial = document.getElementById('userAvatarInitial'); // Avatar (chữ cái đầu)

        if (user) {
            // ===== ĐÃ ĐĂNG NHẬP =====

            // Ẩn menu Guest, hiện menu Logged In
            if (userMenuGuest) userMenuGuest.style.display = 'none';
            if (userMenuLoggedIn) userMenuLoggedIn.style.display = 'block';

            // Lấy tên hiển thị (displayName hoặc phần trước @ của email)
            const displayName = user.displayName || user.email.split('@')[0];

            // Hiển thị tên và avatar
            if (userNameDisplay) userNameDisplay.textContent = displayName;
            if (userAvatarInitial) userAvatarInitial.textContent = displayName.charAt(0).toUpperCase();
        } else {
            // ===== CHƯA ĐĂNG NHẬP =====

            // Hiện menu Guest, ẩn menu Logged In
            if (userMenuGuest) userMenuGuest.style.display = 'flex';
            if (userMenuLoggedIn) userMenuLoggedIn.style.display = 'none';
        }
    },

    /* ----------------------------------------
       REGISTER - Đăng ký tài khoản mới
       ----------------------------------------
       Tham số:
       - email: Email đăng ký
       - password: Mật khẩu
       - displayName: Tên hiển thị
       
       Return: { success: true/false, user/error }
       ---------------------------------------- */
    async register(email, password, displayName) {
        try {
            // Bước 1: Tạo user trên Firebase Authentication
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);

            // Bước 2: Cập nhật displayName cho user
            await userCredential.user.updateProfile({
                displayName: displayName
            });

            // Bước 3: Lưu thông tin user vào Firestore (collection 'users')
            await db.collection('users').doc(userCredential.user.uid).set({
                uid: userCredential.user.uid,
                email: email,
                displayName: displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()  // Thời gian server
            });

            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    },

    /* ----------------------------------------
       LOGIN - Đăng nhập
       ----------------------------------------
       Tham số:
       - email: Email
       - password: Mật khẩu
       
       Return: { success: true/false, user/error }
       ---------------------------------------- */
    async login(email, password) {
        try {
            // Đăng nhập bằng email và password
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    },

    /* ----------------------------------------
       LOGOUT - Đăng xuất
       ----------------------------------------
       Return: { success: true/false, error }
       ---------------------------------------- */
    async logout() {
        try {
            await auth.signOut();  // Gọi Firebase signOut
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    },

    /* ----------------------------------------
       RESET PASSWORD - Gửi email khôi phục mật khẩu
       ----------------------------------------
       Tham số: email - Email cần khôi phục
       Return: { success: true/false, error }
       ---------------------------------------- */
    async resetPassword(email) {
        try {
            await auth.sendPasswordResetEmail(email);  // Firebase gửi email reset
            return { success: true };
        } catch (error) {
            console.error('Password reset error:', error);
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    },

    /* ----------------------------------------
       GET ERROR MESSAGE - Chuyển mã lỗi thành thông báo tiếng Việt
       ----------------------------------------
       Tham số: errorCode - Mã lỗi từ Firebase (VD: 'auth/email-already-in-use')
       Return: Thông báo lỗi tiếng Việt
       ---------------------------------------- */
    getErrorMessage(errorCode) {
        // Mapping mã lỗi Firebase sang tiếng Việt
        const errorMessages = {
            'auth/email-already-in-use': 'Email này đã được sử dụng. Vui lòng sử dụng email khác.',
            'auth/invalid-email': 'Email không hợp lệ. Vui lòng kiểm tra lại.',
            'auth/operation-not-allowed': 'Đăng ký bằng email/password chưa được kích hoạt.',
            'auth/weak-password': 'Mật khẩu quá yếu. Vui lòng sử dụng mật khẩu mạnh hơn.',
            'auth/user-disabled': 'Tài khoản này đã bị vô hiệu hóa.',
            'auth/user-not-found': 'Không tìm thấy tài khoản với email này.',
            'auth/wrong-password': 'Mật khẩu không chính xác.',
            'auth/too-many-requests': 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
            'auth/network-request-failed': 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.'
        };

        // Trả về thông báo tương ứng hoặc thông báo mặc định
        return errorMessages[errorCode] || 'Đã xảy ra lỗi. Vui lòng thử lại.';
    },

    /* ----------------------------------------
       IS LOGGED IN - Kiểm tra đã đăng nhập chưa
       ----------------------------------------
       Return: true nếu đã đăng nhập, false nếu chưa
       ---------------------------------------- */
    isLoggedIn() {
        return this.currentUser !== null;
    },

    /* ----------------------------------------
       GET USER - Lấy thông tin user hiện tại
       ----------------------------------------
       Return: Object user từ Firebase hoặc null
       ---------------------------------------- */
    getUser() {
        return this.currentUser;
    },

    /* ----------------------------------------
       REQUIRE AUTH - Yêu cầu đăng nhập
       ----------------------------------------
       Nếu chưa đăng nhập, chuyển hướng đến trang login
       Sử dụng cho các trang cần đăng nhập (checkout, profile...)
       
       Return: true nếu đã đăng nhập, false nếu redirect
       ---------------------------------------- */
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = '/pages/login.html';
            return false;
        }
        return true;
    }
};


/* ============================================================================
   KHỞI TẠO MODULE KHI DOM READY
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    Auth.init();  // Bắt đầu lắng nghe trạng thái auth
});


/* ============================================================================
   EXPORT GLOBAL
   ============================================================================
   Gán vào window để các file khác sử dụng
   ============================================================================ */

window.Auth = Auth;
