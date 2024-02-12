import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import { getAuth, onAuthStateChanged, OAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getStorage, ref as sRef, listAll, getDownloadURL, deleteObject  } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";
import confetti from "https://cdn.skypack.dev/canvas-confetti";

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
var currentUserCookie;
var currentUserAge;
var Is_Exapannumber = false;
var matchCounter = 0;
var matchUserImageCounter = 1;
var dataFetched = false;
var data;
var matchUID;
var matchUIDImage1;
var allMatchUsersDetails
var userGender;
var currentUserData;
var uniquePath;

onAuthStateChanged(auth, async (user) => {
    if (user == null) {
        // window.location = '/index.html';
    } else {
        uid = auth.currentUser.uid;

        await getCurrentUserDetails(uid);
        ManageUserData();
    }
});

var container = document.getElementById('match-candidate-container');
var chatParentElement = document.getElementById("user-messages")

var scrollHeight = container.scrollHeight;
var ScrollHeightScroller = scrollHeight/560;
document.getElementById('scroll').style.height = 100/ScrollHeightScroller

document.getElementById('match-candidate-container').addEventListener('scroll', handleScroll);
document.getElementById('user-preview-container').addEventListener('scroll', handleScrollUserPreview);

const clickableDiv = document.getElementById('profile')

var about_me_container_clicked = false;

clickableDiv.addEventListener('click', function() { 
    if (Is_Exapannumber == false){
        document.getElementById('name1').style.opacity = 0;
        document.getElementById('empty-matches').style.opacity = 0;
        document.getElementById('matches').style.opacity = 0;
        document.getElementById('match-candidate-container').style.opacity = 0;
        document.getElementById('user-message-container').style.opacity = 0;
        
        setTimeout(() => {
            document.getElementById('settings').style.display = "flex";
            document.getElementById('matches').style.display = "none";
            document.getElementById('user-message-container').style.display = "none";
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

        Is_Exapannumber = true;
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
                document.getElementById('matches').style.display = "block";
                document.getElementById("main-details-container").style.display = "none"
                document.getElementById('settings').style.display = "none";
                document.getElementById('match-candidate-container').style.opacity = "1";
                document.getElementById('empty-matches').style.opacity = 1;
            }, 400);

            setTimeout(() => {
                document.getElementById('back-icon').style.display = "none";
                document.getElementById('matches').style.opacity = 1;
                document.getElementById('name1').style.opacity = 1;
                document.getElementById('profile-picture-div').style.left = "0";
            }, 300);
        }, 300);
        Is_Exapannumber = false;
    }
});

function handleScroll() {
    var scrollPosition = container.scrollTop;
    var scrollPositionPercentage = (scrollPosition/scrollHeight)*100;
    document.getElementById('scroll').style.top = scrollPositionPercentage

}

function handleScrollUserPreview() {
    var scrollPosition = document.getElementById('user-preview-container').scrollTop;
    var scrollPositionPercentage = (scrollPosition/scrollHeight)*100;
    document.getElementById('scroll-preview').style.top = scrollPositionPercentage
}


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

document.getElementById('like').addEventListener('click', function(event) {
    document.getElementById("like-reaction").style.zIndex = "1"
    document.getElementById("like-reaction").style.backgroundColor = "#ebcab08d"
    document.getElementById("icon-container1").style.opacity = "1"
    document.getElementById("icon-container1").style.transform = "translateY(0px)"
    setTimeout(() => {
        document.getElementById("like-reaction").style.backgroundColor = "transparent"
        document.getElementById("icon-container1").style.opacity = "0.8"
        setTimeout(() => {
            document.getElementById("like-reaction").style.zIndex = "-3"
        }, 100);

        document.getElementById("icon-container1").style.transform = "translateY(40px)"  
        const matchName = allMatchUsersDetails.find(user => user.uid === matchUID).name;

        userActionUpdate("LikedUser", matchName);
        ManageUserData()
    }, 500);
})

document.getElementById('dislike').addEventListener('click', function(event) {
    document.getElementById("dislike-reaction").style.zIndex = "1"
    document.getElementById("dislike-reaction").style.backgroundColor = "#ebcab08d"
    document.getElementById("icon-container2").style.opacity = "1"
    document.getElementById("icon-container2").style.transform = "translateY(0px)"
    setTimeout(() => {
        document.getElementById("dislike-reaction").style.backgroundColor = "transparent"
        document.getElementById("icon-container2").style.opacity = "0.8"
        setTimeout(() => {
            document.getElementById("dislike-reaction").style.zIndex = "-3"
        }, 100);

        document.getElementById("icon-container2").style.transform = "translateY(40px)"  
        userActionUpdate("DislikedUser");
        ManageUserData()
    }, 500);
})

async function getCurrentUserImages(uid, imageCount) {
    const folderRef = sRef(storage, `/UserImages/${uid}/`);
    let promises = [];

    try {
        const res = await listAll(folderRef);
        res.items.forEach(async (itemRef) => {
            const fileName = itemRef.name;
            const downloadURL = await getDownloadURL(itemRef);

            promises.push(
                fetch(downloadURL)
                    .then(response => response.text())
                    .then(blob => {
                        if (fileName == "profilepicture") {
                            document.getElementById("profile-picture").style.backgroundImage = `url(${blob})`;
                        }
                        if (fileName.includes("image1")) {
                            document.getElementById(`image1-profile`).style.backgroundImage = `url(${blob})`;
                            document.getElementById(`image1-preview`).style.backgroundImage = `url(${blob})`;
                            document.getElementById("subject1-image").style.backgroundImage = `url(${blob})`;
                        }
                        if (fileName.includes("image2")) {
                            document.getElementById(`image2-profile`).style.backgroundImage = `url(${blob})`;
                            document.getElementById(`image2-preview`).style.backgroundImage = `url(${blob})`;
                        }
                        if (fileName.includes("image3")) {
                            document.getElementById(`image3-profile`).style.backgroundImage = `url(${blob})`;
                            document.getElementById(`image3-preview`).style.backgroundImage = `url(${blob})`;
                        }
                        if (fileName.includes("image4")) {
                            document.getElementById(`image4-profile`).style.backgroundImage = `url(${blob})`;
                            document.getElementById(`image4-preview`).style.backgroundImage = `url(${blob})`;
                        }
                    })
            );
        });

        await Promise.all(promises);
    } catch (error) {
        console.error("Error listing items:", error);
    }
}

async function getCurrentUserDetails(uid){
    onValue(ref(database, 'UsersCookies/' + uid), (snapshot) => {
        currentUserCookie = snapshot.val().userCookie
        getUserMatchedList();
    })

    onValue(ref(database, 'UsersMetaData/' + uid), (snapshot) => {
    currentUserData = snapshot.val();
    
    currentUserAge = currentUserData.age
    userGender = currentUserData.gender
    var yearWithSuffix = addSuffix(currentUserData.year);

    document.getElementById('name1').innerText = currentUserData.name
    document.getElementById('height-value').innerText = currentUserData.height
    document.getElementById('drinking-status').innerText = currentUserData.drinkingStatus
    document.getElementById('smoking-status').innerText = currentUserData.smokingStatus
    document.getElementById('dating-status').innerText = currentUserData.lookingFor
    document.getElementById('religion-status').innerText = currentUserData.religionStatus

    document.getElementById("about-me-name-preview").innerText = "💬 About "+ currentUserData.name 
    document.getElementById("from-name-preview").innerText = "📍 " + currentUserData.name  + "'s from" 
    document.getElementById("name-age-preview").innerText = currentUserData.name + ", " + currentUserData.age

    document.getElementById("stream-year-preview").innerText = currentUserData.stream + ", " + yearWithSuffix + " year"

    getCurrentUserImages(uid, currentUserData.imageCount)

    var elements = document.getElementsByClassName("basics-children-text-details");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.color = "#828282";
    }
    });
}

async function ManageUserData() {
    if (!dataFetched){
        data = await GetMatchUsersData()
    }

    if (matchCounter >= 10){
        return false
    }

    var year = data[matchCounter].year
    var imageCount = data[matchCounter].imageCount
    matchUID = data[matchCounter].uid
    var yearWithSuffix = addSuffix(year);

    getUserImages(matchUID, imageCount)

    document.getElementById("about-me-name").innerText = "💬 About "+ data[matchCounter].name 
    document.getElementById("from-name").innerText = "📍 " + data[matchCounter].name  + "'s from" 
    document.getElementById("name-age").innerText = data[matchCounter].name + ", " + data[matchCounter].age

    document.getElementById("stream-year").innerText = data[matchCounter].stream + ", " + yearWithSuffix + " year"
    matchCounter += 1
    matchUserImageCounter = 1;
    document.getElementById("match-candidate-container").scrollTop = 0
}

async function GetMatchUsersData() {
    const data = {
        uid: uid,
        type: "GetUIDs",
        age: currentUserAge,
        gender: "Female" /// Testing Var Change in Production
    };

    try {
        const execution = await functions.createExecution(
            '65b00908e06de2a69aa9', // Replace this with your function ID
            JSON.stringify(data)
        );

        allMatchUsersDetails = JSON.parse(JSON.parse(execution.responseBody));
        dataFetched = true
        return allMatchUsersDetails
    } catch (err) {
        console.log("An error occurred:");
        console.error(err.message);
    }
}

async function userActionUpdate(status, name) {
    if (status == "LikedUser"){
        const data = {
            uid: uid,
            type: status,
            matchUID: matchUID,
            key: currentUserCookie,
            matchName: name,
            userName: currentUserData.name
        };
        const execution = await functions.createExecution(
            '65b00908e06de2a69aa9', // Replace this with your function ID
            JSON.stringify(data)
        );

        const parsedData = execution

        if (parsedData.responseBody == "\"Match Found\""){
            matchBannershow(matchUIDImage1)
        }
    }
    else{
        const data = {
            uid: uid,
            type: status,
            matchUID: matchUID,
            key: currentUserCookie
        };
        const execution = await functions.createExecution(
            '65b00908e06de2a69aa9', // Replace this with your function ID
            JSON.stringify(data)
        );

        const parsedData = execution

        if (parsedData.responseBody == "\"Match Found\""){
            matchBannershow(matchUIDImage1)
        }
    }


}

async function getUserImages(uid, imageCount){
    const folderRef = sRef(storage, `/UserImages/${uid}/`);
    let promises = [];

    try {
        const res = await listAll(folderRef);
        if (imageCount === 1 || imageCount === 2) {
            document.getElementById("scroll").style.height = "50px"
            document.getElementById("third-row").style.display = "none"
        }
        else{
            document.getElementById("scroll").style.height = "25px"
            document.getElementById("third-row").style.display = "flex"
        }
        
        res.items.forEach(async (itemRef) => {
            const fileName = itemRef.name;
            const downloadURL = await getDownloadURL(itemRef);
            promises.push(
                fetch(downloadURL)
                    .then(response => response.text())
                    .then(blob => {
                        if (fileName.includes("image1")) {
                            document.getElementById(`image1`).style.backgroundImage = `url(${blob})`;
                            matchUIDImage1 = `url(${blob})`;
                        }
                        if (fileName.includes("image2")) {
                            document.getElementById(`image2`).style.backgroundImage = `url(${blob})`;
                        }
                        if (fileName.includes("image3")) {
                            document.getElementById(`image3`).style.backgroundImage = `url(${blob})`;
                        }
                        if (fileName.includes("image4")) {
                            document.getElementById(`image4`).style.backgroundImage = `url(${blob})`;
                        }
                        matchUserImageCounter += 1
                    })
            );
        });

        await Promise.all(promises);
    } catch (error) {
        console.error("Error listing items:", error);
    }
}

async function getUserMatchedList() {
    const data = {
        uid: uid,
        type: "GetMatchedUID",
        key: currentUserCookie
    };

    const execution = await functions.createExecution(
        '65b00908e06de2a69aa9',
        JSON.stringify(data)
    );

    const parsedData = JSON.parse(JSON.parse(execution.responseBody));
    var userUIDKeys = [];

    for (const key in parsedData) {
        if (parsedData.hasOwnProperty(key)) {
            const user = parsedData[key]; 

            
            const folderRef = sRef(storage, `/UserImages/${key}/`);
            let promises = [];
            const res = await listAll(folderRef);

            if (res) {
                res.items.forEach(async (itemRef) => {
                    const fileName = itemRef.name;
                    const downloadURL = await getDownloadURL(itemRef);

                    promises.push(
                        fetch(downloadURL)
                            .then(response => response.text())
                            .then(blob => {
                                if (fileName.includes("image1")) {
                                    const matchesContainer = document.getElementById("available-matches");
                                    const newMatchElement = document.createElement("div");
                                    newMatchElement.className = "current-matches-children";
                                    newMatchElement.style.backgroundImage = `url(${blob})`;
                                    userUIDKeys.push(key);
                                    matchesContainer.appendChild(newMatchElement);

                                    newMatchElement.addEventListener("click", function() {
                                        const index = Array.from(this.parentNode.children).indexOf(this);
                                        chatParentElement.innerHTML = ""
                                        getUserChats(key)
                                        document.getElementById('match-candidate-container').style.opacity = 0;
                                        document.getElementById('user-name-chat').innerText = parsedData[key].name;
                                        document.getElementById('user-image-chat').style.backgroundImage = this.style.backgroundImage
                                        setTimeout(() => {
                                            document.getElementById('match-candidate-container').style.display = "none";
                                            document.getElementById('user-message-container').style.display = "flex";
                                            setTimeout(() => {
                                                document.getElementById('user-message-container').style.opacity = "1";
                                            }, 100);
                                            
                                        }, 500);
                                    });
                                }
                            })
                    );
                });
                await Promise.all(promises);
            }
        }
    }
}

function addSuffix(number) {
    if (number >= 11 && number <= 13) {
        return number + 'th';
    } else {
        var lastDigit = number % 10;
        switch (lastDigit) {
            case 1:
                return number + 'st';
            case 2:
                return number + 'nd';
            case 3:
                return number + 'rd';
            default:
                return number + 'th';
        }
    }
}

document.querySelectorAll('.delete-rectangle').forEach(function(element, index) {
    element.addEventListener('click', function() {
        event.stopPropagation()
        document.getElementById("outer-blur").style.display = "block"
        document.getElementById("delete-confirmation-box-container").style.display = "flex"
        console.log('Element clicked:', index+1);
        // deleteObject(sRef(storage, `/UserImages/${uid}/image${index+1}`))
    });
});

document.querySelectorAll('.image-profile').forEach(function(element, index) {
    element.addEventListener('click', function() {
        var backgroundImage = element.style.backgroundImage;
        document.getElementById("outer-blur").style.display = "block";
        var viewImageContainer = document.getElementById("view-image-container");
        viewImageContainer.style.display = "block";
        viewImageContainer.style.backgroundImage = backgroundImage;
    });
});

document.querySelectorAll('.candidate_image').forEach(function(element, index) {
    element.addEventListener('click', function() {
        var backgroundImage = element.style.backgroundImage;

        document.getElementById("outer-blur").style.display = "block";
        var viewImageContainer = document.getElementById("view-image-container");
        viewImageContainer.style.display = "block";

        viewImageContainer.style.backgroundImage = backgroundImage;
    });
}); 

document.getElementById("outer-blur").addEventListener("click", function(){
    document.getElementById("outer-blur").style.display = "none"
    document.getElementById("delete-confirmation-box-container").style.display = "none"
    document.getElementById("user-preview-container").style.display = "none"
    document.getElementById("view-image-container").style.display = "none"
})

document.getElementById("preview").addEventListener("click", function(){
    document.getElementById("outer-blur").style.display = "block";
    document.getElementById("user-preview-container").style.display = "flex"
})

function matchBannershow(matchUIDImage){
    function matchAnimation(){
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        var data = {
            angle: 50,
            spread: randomInRange(50, 70),
            particleCount: randomInRange(50, 100),
            origin: { y: 0.8, x: 0.38 }
        }
        
        var data1 = {
            angle: 140,
            spread: randomInRange(50, 70),
            particleCount: randomInRange(50, 100),
            origin: { y: 0.8, x: 0.9 }
        }

        
        setTimeout(() => {
            confetti(data);
            confetti(data1);

        }, 500)
    }
    document.getElementById("matched-animation-container").style.display = "flex";
    document.getElementById("subject2-image").style.backgroundImage = 7
    matchAnimation()
}

document.getElementById("keep-swiping-button").addEventListener("click", function(){
    document.getElementById("matched-animation-container").style.display = "none";
})

async function getUserChats(chatMatchUID) {
    return new Promise((resolve, reject) => {
        onValue(ref(database, 'UserMatchingDetails/' + uid + '/MatchUID/' + chatMatchUID), async (snapshot) => {
            uniquePath = snapshot.val().uniqueID;
            console.log(uniquePath);

            onValue(ref(database, 'UserChats/' + uniquePath), async (snapshot) => {
                const chatData = snapshot.val();
                chatParentElement.innerHTML = '';
                ManageChats(chatData, chatMatchUID);
            });

            resolve();
        });
    });
}

function ManageChats(chatData, chatMatchUID) {
    const UserMessages = chatData["Messages"];
    const MessageCounter = chatData["ChatDetails"].messageCounter;

    console.log(UserMessages)

    for (let i = 1; i < MessageCounter + 1; i++) {
        var userChatContent = UserMessages[i].content;
        var chatWalaUser = UserMessages[i].uid;
        var chatTimeStamp = UserMessages[i].timeStamp;

        if (chatWalaUser !== uid) {
            chatParentElement.innerHTML += `<div class="message-container"><div class="they message">${userChatContent}</div></div>`;
        } else {
            chatParentElement.innerHTML += `<div class="message-container"><div class="me message">${userChatContent}</div></div>`;
        }
    }
}

document.getElementById('send-message-box').addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); 

        const messageContent = event.target.value;
        writeUserChat(messageContent)
        event.target.value = ""
    }
});


async function writeUserChat(content){
    const data = {
        uid: uid,
        type: "WriteChats",
        key: currentUserCookie,
        uniquePath: uniquePath,
        content: content,
    };

    const execution = await functions.createExecution(
        '65ca1944268018f357b2',
        JSON.stringify(data)
    );
}