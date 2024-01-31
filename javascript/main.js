import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import { getAuth, onAuthStateChanged, OAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getStorage, ref as sRef, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";
import * as faceapi from 'https://cdn.jsdelivr.net/npm/face-api.js';

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
const storage = getStorage();

const client = new window.Appwrite.Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65b008483418c13c2e82'); // Replace this with your project ID

const functions = new window.Appwrite.Functions(client);

var uid;
var Is_Exapanded = false;
var counter = 1;

onAuthStateChanged(auth, (user) => {
    if (user == null) {
        // window.location = '/index.html';
    }
    else{
        uid = auth.currentUser.uid

        getUserImages(uid)
    }
});

var container = document.getElementById('match-candidate-container');
var scrollHeight = container.scrollHeight;
var ScrollHeightScroller = scrollHeight/560;
document.getElementById('scroll').style.height = 100/ScrollHeightScroller

function handleScroll() {
    var scrollPosition = container.scrollTop;

    var scrollPositionPercentage = (scrollPosition/scrollHeight)*100;
    document.getElementById('scroll').style.top = scrollPositionPercentage

}

document.getElementById('match-candidate-container').addEventListener('scroll', handleScroll);

const clickableDiv = document.getElementById('profile')

clickableDiv.addEventListener('click', function() {
    if (Is_Exapanded == false){
        document.getElementById('name1').style.opacity = 0;
        document.getElementById('empty-matches').style.opacity = 0;
        document.getElementById('match-candidate-container').style.opacity = 0;
        setTimeout(() => {
            document.getElementById('settings').style.display = "flex";
            document.getElementById('match-candidate-container').style.display = "none";
            document.getElementById('header').style.display = "flex";
            document.getElementById('half').style.justifyContent = "flex-start";
            document.getElementById('header').style.opacity = "1";
        }, 500)
        
        setTimeout(() => {
            document.getElementById('name1').style.display = "none";
            document.getElementById('back-icon').style.display = "block";
            setTimeout(() => {
                document.getElementById('back-icon').style.opacity = "1";
            }, 300);
            
            document.getElementById('profile-picture-div').style.animation = "center 0.3s ease-in"
            setTimeout(() => {
                document.getElementById('profile-picture-div').style.left = "calc((50%) - 50px)";
                document.getElementById("main-details-container").style.display = "flex"
            }, 300);
        setTimeout(() => {
            document.getElementById('settings').style.opacity = "1";
            document.getElementById("main-details-container").style.opacity = "1"
            
        }, 500);
        }, 300);

        Is_Exapanded = true;
    }
    else{
        document.getElementById('name1').style.display = "block";
        document.getElementById('header').style.opacity = "0";
        document.getElementById("main-details-container").style.opacity = "0"

        setTimeout(() => {
            document.getElementById('profile-picture-div').style.animation = "back 0.3s ease-in"
            document.getElementById('back-icon').style.opacity = "0";
            document.getElementById('settings').style.opacity = "0";
            document.getElementById('header').style.display = "none";
            document.getElementById('half').style.justifyContent = "center";
            document.getElementById('match-candidate-container').style.display = "flex";


            setTimeout(() => {
                document.getElementById("main-details-container").style.display = "none"
                document.getElementById('settings').style.display = "none";
                document.getElementById('match-candidate-container').style.opacity = "1";
                document.getElementById('empty-matches').style.opacity = 1;
                
            }, 400);

            setTimeout(() => {
                document.getElementById('back-icon').style.display = "none";

                document.getElementById('name1').style.opacity = 1;
                document.getElementById('profile-picture-div').style.left = "0";
            }, 300);
        }, 300);
        Is_Exapanded = false;
    }
});
var about_me_container_clicked = false;

document.getElementById('about-me-container').addEventListener('click', function(event) {
    if (event.target.id === 'about-me-text') {
        return;
    }
    if (about_me_container_clicked == false){
        about_me_container_clicked = true;
        document.getElementById('about-me-container').style.height = "176px"
        document.getElementById('about-me-container').style.backgroundColor = "#FAFAFA"
        document.getElementById("about-me-text").style.display = 'block'
    }
    else{
        about_me_container_clicked = false;
        document.getElementById('about-me-container').style.height = "72px"
        document.getElementById('about-me-container').style.backgroundColor = "white"
        document.getElementById("about-me-text").style.display = 'none'

    }
})

document.getElementById('basics-container').addEventListener('click', function(event) {

    if (about_me_container_clicked == false){
        about_me_container_clicked = true;
        document.getElementById('basics-container').style.height = "350px"
        document.getElementById('basics-container').style.backgroundColor = "#FAFAFA"
        document.getElementById("basics-2").style.display = 'flex'
    }
    else{
        about_me_container_clicked = false;
        document.getElementById('basics-container').style.height = "72px"
        document.getElementById('basics-container').style.backgroundColor = "white"
        document.getElementById("basics-2").style.display = 'none'
    }
})
async function getUserImages(uid) {
    const folderRef = sRef(storage, `/UserImages/${uid}`);
    const CookiePath = ref(database, '/UsersMetaData/' + uid);

    onValue(CookiePath, async (snapshot) => {
        const CookieSnapshot = snapshot.val();
        console.log(CookieSnapshot);

        var heightValue = document.getElementById("height-value");
        var drinkingStatus = document.getElementById("drinking-status");
        var smokingStatus = document.getElementById("smoking-status");
        var datingStatus = document.getElementById("dating-status");
        var religionStatus = document.getElementById("religion-status");
        var userName = document.getElementById("name1");

        heightValue.textContent = CookieSnapshot.height;
        drinkingStatus.textContent = CookieSnapshot.drinkingStatus;
        smokingStatus.textContent = CookieSnapshot.smokingStatus;
        datingStatus.textContent = CookieSnapshot.lookingFor;
        religionStatus.textContent = CookieSnapshot.religionStatus;
        userName.textContent = CookieSnapshot.name;

        var elements = document.getElementsByClassName("basics-children-text-details");

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.color = "#7E7E7E";
        }
    });

    try {
        const res = await listAll(folderRef);
        for (const itemRef of res.items) {
            const downloadURL = await getDownloadURL(itemRef);
            const response = await fetch(downloadURL);
            const blob = await response.blob();

            // Display the original image
            document.getElementById(`image${counter}`).style.backgroundImage = `url(${URL.createObjectURL(blob)})`;
            document.getElementById(`image${counter}-profile`).style.backgroundImage = `url(${URL.createObjectURL(blob)})`;

            // Perform face detection
            const image = document.getElementById(`image${counter}`);
            const face = await faceapi.detectSingleFace(image);
            
            if (face) {
                // Crop the image to include only the face region
                const canvas = faceapi.createCanvasFromMedia(image);
                const faceCanvas = faceapi.createCanvasFromMedia(image);
                const displaySize = { width: image.width, height: image.height };
                faceapi.matchDimensions(canvas, displaySize);
                faceapi.matchDimensions(faceCanvas, displaySize);

                // Draw the face on the faceCanvas
                faceapi.draw.drawDetections(faceCanvas, face);

                // Crop the image to the face region
                const faceRegion = faceapi.resizeResults(face, displaySize);
                const croppedImage = faceapi.extractFaces(image, [faceRegion]);

                // Display the cropped image
                document.getElementById(`image${counter}`).style.backgroundImage = `url(${URL.createObjectURL(croppedImage[0])})`;
                document.getElementById(`image${counter}-profile`).style.backgroundImage = `url(${URL.createObjectURL(croppedImage[0])})`;
            }
        }
    } catch (error) {
        console.error("Error listing items:", error);
    }
}
