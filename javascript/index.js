import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
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

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

var login = document.getElementById("login");

login.addEventListener("click", function() {
    document.getElementById("loginbox").style.display = "block"
    document.getElementById("blur_shade").style.display = "block"

})
document.getElementById("create").addEventListener("click", function() {
    document.getElementById("register_box").style.display = "block"
    document.getElementById("blur_shade").style.display = "block"

})

document.getElementById("blur_shade").addEventListener("click", function() {
    document.getElementById("loginbox").style.display = "none"
    document.getElementById("register_box").style.display = "none"
    document.getElementById("blur_shade").style.animation = "fadeout1 0.4s ease"
    setTimeout(() => {
        document.getElementById("blur_shade").style = ""
    }, 400);

})

function emailverify(email) {
    const regex = /^[\w\.-]+@muj\.manipal\.edu$/;
    if (regex.test(email)) {
        return true;
    } else {
        console.log(email)
        document.getElementById("wrongmail").textContent = "Make sure you are using MUJ IDs";
        document.getElementById("wrongmail").style.color = "#FC6868";
        return false;
    }
}

function passwordverify(password) {
    if (password.length < 6 ){
        document.getElementById("wrongpassword_register").style.display = "block";
        return false
    }
    else{
        return true
    }
}

function verifyUserMetaData(uid){
    const usersRef = ref(database, '/UsersMetaData/' + uid);

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        window.location = '/select.html';
      } else {
        window.location = '/set-details-new.html';
      }
    });
}

document.getElementById("login-button").addEventListener("click", function() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    document.getElementById("wrongmail").style.color = "#000000";

    if (emailverify(email)){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          
          if (auth.currentUser.emailVerified == false){
            document.getElementById("wrongmail").textContent = "Email not verified";
            document.getElementById("wrongmail").style.color = "#FC6868";
            return (false)
          }
          else{
            verifyUserMetaData(auth.currentUser.uid)
          }
// ebin.23fe10ite00050@muj.manipal.edu
        })
        .catch((error) => {
            console.log(error.code)
            if(error.code == "auth/invalid-credential"){
                document.getElementById('wrongpassword').innerHTML = 'Wrong Email ID or Password.'
                document.getElementById("wrongpassword").style.display = "block";
        }
            if(error.code == "auth/user-not-found"){
                document.getElementById("wrongmail").textContent = "Email not registered";
                document.getElementById("wrongmail").style.color = "#FC6868";
            }
        });
    }
})

document.getElementById("register_button").addEventListener("click", function() {
    var email = document.getElementById('email_register').value
    var password = document.getElementById('password_register').value
    document.getElementById("wrongmail_register").style.color = "#000000";

    if (!emailverify(email) || !passwordverify(password)){
        console.log("Failed")
        return false
    }
    else{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            sendEmailVerification(auth.currentUser)
        })
        .catch((error) => {
            console.log(error.code)
            if (error.code === "auth/email-already-in-use") {
                document.getElementById("wrongmail_register").textContent = "This email is already in use";
                document.getElementById("wrongmail_register").style.color = "#FC6868";
            }
        });
    }
})