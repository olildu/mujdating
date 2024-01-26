import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged, OAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getDatabase, ref, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC-9Qn2vcSYGZbLngJXB2ZFAapVQsj0LW0",
    authDomain: "mujdating.firebaseapp.com",
    databaseURL: "https://mujdating-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mujdating",
    storageBucket: "mujdating.appspot.com",
    messagingSenderId: "889381416201",
    appId: "1:889381416201:web:f78fef222a119ac01cb7d8",
    measurementId: "G-DNPCWREVLW"
};

const client = new window.Appwrite.Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65b008483418c13c2e82');

const functions = new window.Appwrite.Functions(client);

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const provider = new OAuthProvider('microsoft.com');

var uid;

var blueShade = document.getElementById("blur_shade")
var registerContainer = document.getElementById("register-container")

document.getElementById("sign-up").addEventListener("click", function() {
    blueShade.style.display = "block"
    registerContainer.style.display = "flex"

    setTimeout(() => {
        blueShade.style.opacity = "0.4"
        registerContainer.style.opacity = "1"
    }, 100);
})

document.getElementById("microsoft-login").addEventListener("click", function() {
    signInWithPopup(auth, provider)
})

document.getElementById("login").addEventListener("click", function() {
    signInWithPopup(auth, provider)
})

document.getElementById("back-icon").addEventListener("click", function() {
    blueShade.style.display = "none"
    registerContainer.style.display = "none"
})
