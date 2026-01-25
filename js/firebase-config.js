// Firebase Configuration for OTO VIỆT
const firebaseConfig = {
    apiKey: "AIzaSyBrDwOIaq5E6fN-A0prhZI6rY81CDi-vJk",
    authDomain: "oto-viet.firebaseapp.com",
    projectId: "oto-viet",
    storageBucket: "oto-viet.firebasestorage.app",
    messagingSenderId: "985342728635",
    appId: "1:985342728635:web:23375385d42e07b2f74c9e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Export for use in other files
window.auth = auth;
window.db = db;

console.log('Firebase initialized successfully!');
