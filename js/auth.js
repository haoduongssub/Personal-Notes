// Authentication Module for OTO VIỆT

const Auth = {
    // Current user state
    currentUser: null,

    // Initialize auth state listener
    init() {
        auth.onAuthStateChanged((user) => {
            this.currentUser = user;
            this.updateUI(user);

            // Dispatch custom event for other modules
            window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user } }));
        });
    },

    // Update UI based on auth state
    updateUI(user) {
        const userMenuGuest = document.getElementById('userMenuGuest');
        const userMenuLoggedIn = document.getElementById('userMenuLoggedIn');
        const userNameDisplay = document.getElementById('userNameDisplay');
        const userAvatarInitial = document.getElementById('userAvatarInitial');

        if (user) {
            // User is logged in
            if (userMenuGuest) userMenuGuest.style.display = 'none';
            if (userMenuLoggedIn) userMenuLoggedIn.style.display = 'block';

            // Display user info
            const displayName = user.displayName || user.email.split('@')[0];
            if (userNameDisplay) userNameDisplay.textContent = displayName;
            if (userAvatarInitial) userAvatarInitial.textContent = displayName.charAt(0).toUpperCase();
        } else {
            // User is not logged in
            if (userMenuGuest) userMenuGuest.style.display = 'flex';
            if (userMenuLoggedIn) userMenuLoggedIn.style.display = 'none';
        }
    },

    // Register new user
    async register(email, password, displayName) {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);

            // Update display name
            await userCredential.user.updateProfile({
                displayName: displayName
            });

            // Create user document in Firestore
            await db.collection('users').doc(userCredential.user.uid).set({
                uid: userCredential.user.uid,
                email: email,
                displayName: displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    },

    // Login user
    async login(email, password) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    },

    // Logout user
    async logout() {
        try {
            await auth.signOut();
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    },

    // Reset password
    async resetPassword(email) {
        try {
            await auth.sendPasswordResetEmail(email);
            return { success: true };
        } catch (error) {
            console.error('Password reset error:', error);
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    },

    // Get user-friendly error messages
    getErrorMessage(errorCode) {
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
        return errorMessages[errorCode] || 'Đã xảy ra lỗi. Vui lòng thử lại.';
    },

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    },

    // Get current user
    getUser() {
        return this.currentUser;
    },

    // Require authentication (redirect if not logged in)
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = '/pages/login.html';
            return false;
        }
        return true;
    }
};

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});

// Export
window.Auth = Auth;
