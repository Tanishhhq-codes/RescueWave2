// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0bU492ba9GVKidEcvoTJheQ8lTFdrjlk",
    authDomain: "test-a5598.firebaseapp.com",
    projectId: "test-a5598",
    storageBucket: "test-a5598.firebasestorage.app",
    messagingSenderId: "237359025933",
    appId: "1:237359025933:web:30e118ce4a6dca264a2a44"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Auth providers
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();