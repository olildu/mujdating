import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
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

export var uid;
export var currentUserCookie;
var currentUserAge;
var Is_Exapannumber = false;
var userWroteMessage = false;
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
var messageCounterTracker = [];
var ChatUsersList = [];
var currentChatUser;
var currentUserAboutMe;

export async function initializeUid() {
    return new Promise((resolve) => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user == null) {
                window.location = '/index.html';
            } else {
                uid = auth.currentUser.uid;

                const userCookieSnapshot = await get(ref(database, 'UsersCookies/' + uid));
                currentUserCookie = userCookieSnapshot.val().userCookie;

                unsubscribeAuth();

                await getCurrentUserDetails(uid);
                ManageUserData();
                
                resolve(); 
            }
        });
    });
}

initializeUid();


var container = document.getElementById('match-candidate-container');
var chatParentElement = document.getElementById("user-messages")
const messagesCounter = document.getElementById("match-messages-counter");

var scrollHeight = container.scrollHeight;
var ScrollHeightScroller = scrollHeight/560;
document.getElementById('scroll').style.height = 100/ScrollHeightScroller

document.getElementById('match-candidate-container').addEventListener('scroll', handleScroll);
document.getElementById('user-preview-container').addEventListener('scroll', handleScrollUserPreview);

const clickableDiv = document.getElementById('profile')

var about_me_container_clicked = false;
var from_container_clicked = false;

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

async function aboutMeLogicHandler(event){
    if (event.target.className === 'cancel-button'){
        event.stopPropagation()
        document.getElementById("action-buttons-about-me").style.display = "none"
        document.getElementById('about-me-container').style.height = "176px"
        console.log(currentUserAboutMe)
        if (currentUserAboutMe != undefined){
            document.getElementById("about-me-text").value = currentUserAboutMe;
        }
    }
    if (event.target.className === 'save-button'){
        event.stopPropagation()
        document.getElementById("action-buttons-about-me").style.display = "none"
        document.getElementById('about-me-container').style.height = "176px"

        const data = {
            uid: uid,
            type: "uploadAboutMe",
            key: currentUserCookie,
            aboutMe: document.getElementById("about-me-text").value
        };
    

        const execution = await functions.createExecution(
            '65b14d8eef7777411400', // Replace this with your function ID
            JSON.stringify(data)
        );

        console.log(execution.responseBody)
    }
}

document.getElementById("action-buttons-about-me").addEventListener("click", function(event){
    aboutMeLogicHandler(event)
})

document.getElementById('about-me-container').addEventListener('click', function(event) {
    if (event.target.className === 'about-me-text') {
        event.stopPropagation()
        document.getElementById('about-me-container').style.height = "225px"
        document.getElementById("action-buttons-about-me").style.display = "flex"
    }
    else{
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
            document.getElementById("action-buttons-about-me").style.display = "none"
        }
    }
})

document.getElementById('display-state-city-container').addEventListener('click', function (event) {
    event.stopPropagation();
});

export function myFunction() {
    console.log('Hello from myFunction in main.js');
}

document.getElementById('from-container').addEventListener('click', function(event) {
    if (event.target.className == 'from-text') {
        document.getElementById("from-text").value = ""
        document.getElementById("from-text").addEventListener("input", function () {
            document.getElementById('display-state-city-container').style.display = 'flex';
        });
        event.stopPropagation()
    }
    else{
        if (from_container_clicked == false){
            from_container_clicked = true;
            document.getElementById('from-container').style.height = "140px"
            document.getElementById('from-container').style.backgroundColor = "#FAFAFA"
            document.getElementById("from-text").style.display = 'block'
        }
        else{
            from_container_clicked = false;
            document.getElementById('from-container').style.height = "72px"
            document.getElementById('from-container').style.backgroundColor = "white"
            document.getElementById("from-text").style.display = 'none'
            document.getElementById("display-state-city-container").style.display = 'none'
        }
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
    onValue(ref(database, 'UsersMetaData/' + uid), (snapshot) => {
    currentUserData = snapshot.val();
    currentUserAboutMe = currentUserData.aboutMe;
    currentUserAge = currentUserData.age
    userGender = currentUserData.gender
    var yearWithSuffix = addSuffix(currentUserData.year);

    document.getElementById('name1').innerText = currentUserData.name
    document.getElementById('height-value-user').innerText = currentUserData.height
    document.getElementById('drinking-status').innerText = currentUserData.drinkingStatus
    document.getElementById('smoking-status').innerText = currentUserData.smokingStatus
    document.getElementById('dating-status').innerText = currentUserData.datingStatus
    document.getElementById('religion-status').innerText = currentUserData.religionStatus
    document.getElementById("from-text").value = currentUserData.fromPlace

    document.getElementById("about-me-name-preview").innerText = "💬 About "+ currentUserData.name 
    document.getElementById("from-name-preview").innerText = "📍 " + currentUserData.name  + "'s from" 
    document.getElementById("name-age-preview").innerText = currentUserData.name + ", " + currentUserData.age

    document.getElementById("stream-year-preview").innerText = currentUserData.stream + ", " + yearWithSuffix + " year"
    if (currentUserAboutMe != undefined){
        document.getElementById("about-me-text").value = currentUserAboutMe;
    }

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

    var iconsContainer = document.getElementById("user-details-icon-container")

    iconsContainer.innerHTML = ""

    var heightIconContainer = document.createElement('div');
    heightIconContainer.classList.add('height-icon-container', 'icon-container-details');
    
    var iconSpanHeight = document.createElement('span');
    iconSpanHeight.classList.add('straight-icon', 'user-details-icons');
    iconSpanHeight.textContent = 'straighten'; 
    
    var heightParagraph = document.createElement('p');
    heightParagraph.textContent = data[matchCounter].height;
    
    heightIconContainer.appendChild(iconSpanHeight);
    heightIconContainer.appendChild(heightParagraph);
    
    iconsContainer.append(heightIconContainer);
    var aboutMe = data[matchCounter].aboutMe

    if (data[matchCounter].drinkingStatus != "Skip"){
        var drinkingIconContainer = document.createElement('div');
        drinkingIconContainer.classList.add('drinking-icon-container', 'icon-container-details');

        var iconSpan = document.createElement('span');
        iconSpan.classList.add('basic-children-icons', 'user-details-icons');
        iconSpan.textContent = 'wine_bar';

        var drinkingParagraph = document.createElement('p');
        drinkingParagraph.textContent = data[matchCounter].drinkingStatus;

        drinkingIconContainer.appendChild(iconSpan);
        drinkingIconContainer.appendChild(drinkingParagraph);

        iconsContainer.append(drinkingIconContainer)
    }
    if (data[matchCounter].smokingStatus != "Skip"){
        var smokingIconContainer = document.createElement('div');
        smokingIconContainer.classList.add('drinking-icon-container', 'icon-container-details');

        var iconSpan = document.createElement('span');
        iconSpan.classList.add('basic-children-icons', 'user-details-icons');
        iconSpan.textContent = 'smoking_rooms';

        var smokingParagraph = document.createElement('p');
        smokingParagraph.textContent = data[matchCounter].smokingStatus;

        smokingIconContainer.appendChild(iconSpan);
        smokingIconContainer.appendChild(smokingParagraph);

        iconsContainer.append(smokingIconContainer)
    }
    if (data[matchCounter].datingStatus !== "Skip") {
        var datingIconContainer = document.createElement('div');
        datingIconContainer.classList.add('dating-icon-container', 'icon-container-details');
    
        var iconSpanDating = document.createElement('span');
        iconSpanDating.classList.add('basic-children-icons', 'user-details-icons');
        iconSpanDating.textContent = 'search'; // You can replace 'dating_icon' with the appropriate icon content
    
        var datingParagraph = document.createElement('p');
        datingParagraph.textContent = data[matchCounter].datingStatus;
    
        datingIconContainer.appendChild(iconSpanDating);
        datingIconContainer.appendChild(datingParagraph);
    
        iconsContainer.append(datingIconContainer);
    }
    if (data[matchCounter].religionStatus !== "Skip") {
        var religionIconContainer = document.createElement('div');
        religionIconContainer.classList.add('religion-icon-container', 'icon-container-details');
    
        var iconSpanReligion = document.createElement('span');
        iconSpanReligion.classList.add('basic-children-icons', 'user-details-icons');
        iconSpanReligion.textContent = 'folded_hands'; // You can replace 'religion_icon' with the appropriate icon content
    
        var religionParagraph = document.createElement('p');
        religionParagraph.textContent = data[matchCounter].religionStatus;
    
        religionIconContainer.appendChild(iconSpanReligion);
        religionIconContainer.appendChild(religionParagraph);
    
        iconsContainer.append(religionIconContainer);
    }

    document.getElementById("about-me-name").innerText = "💬 About "+ data[matchCounter].name 
    if (data[matchCounter].fromPlace != undefined){
        document.getElementById("from-name").innerText = "📍 " + data[matchCounter].name  + "'s from" 
        document.getElementById("user-from-place").innerText = data[matchCounter].fromPlace 
    }
    else{
        document.getElementById("from-name").innerText = data[matchCounter].name  + "'s doing" 
        document.getElementById("user-from-place").innerText = data[matchCounter].stream + ", " + yearWithSuffix + " year"
    }

    document.getElementById("name-age").innerText = data[matchCounter].name + ", " + data[matchCounter].age

    document.getElementById("stream-year").innerText = data[matchCounter].stream + ", " + yearWithSuffix + " year"
    matchCounter += 1
    matchUserImageCounter = 1;
    document.getElementById("match-candidate-container").scrollTop = 0
    if (aboutMe != undefined){
        document.getElementById('about-me-candidate-text').innerText = aboutMe;
    }
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
                        var expandImageContainers = document.getElementsByClassName('expand-image-container');

                        for (var i = 0; i < expandImageContainers.length; i++) {
                            expandImageContainers[i].style.opacity = 1;
                        }
                    })
            );
        });

        await Promise.all(promises);
    } catch (error) {
        console.error("Error listing items:", error);
    }
}

export async function getUserMatchedList() {
    var userUIDKeys = [];

    // Attach a new listener, which will replace the existing one
    onValue(ref(database, 'UserMatchingDetails/' + uid + '/MatchUID/'), async (snapshot) => {
        var parsedData = snapshot.val();
        userUIDKeys = []
        for (const key in parsedData) {
            const folderRef = sRef(storage, `/UserImages/${key}/`);
            let promises = [];
            const res = await listAll(folderRef);
            document.getElementById("available-matches").innerHTML = "";

            if (userUIDKeys.includes(key)) {
                console.log("Yes")
            }
            else{
                userUIDKeys.push(key);
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
    
                                        matchesContainer.appendChild(newMatchElement);
    
                                        newMatchElement.addEventListener("click", function() {
                                            const index = Array.from(this.parentNode.children).indexOf(this);
                                            chatParentElement.innerHTML = "";
                                            currentChatUser = key;
                                            getUserChatsFromMatches(key);
                                            document.getElementById('match-candidate-container').style.opacity = 0;
                                            document.getElementById('user-name-chat').innerText = parsedData[key].uniqueIDandName.split(",")[1];
                                            document.getElementById('user-image-chat').style.backgroundImage = this.style.backgroundImage;
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
    });

    getUserChatList();
}

async function getUserChatList() {
    onValue(ref(database, 'UserMatchingDetails/' + uid + '/ChatUID/'), async (snapshot) => {
        const chatDataList = snapshot.val();
        document.getElementById("match-messages-counter").innerHTML = ""
        for (const userId in chatDataList) {
            if (chatDataList.hasOwnProperty(userId)) {
                const user = chatDataList[userId];
                const folderRef = sRef(storage, `/UserImages/${userId}/`);
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
                                        const newMatchElement = document.createElement("div");
                                        newMatchElement.className = "match-children";
                                        var lastMessageContent;
                                        onValue(ref(database, 'UserChats/' + chatDataList[userId].uniqueIDandName.split(",")[0]), async (lastMessage) => {
                                            lastMessageContent = lastMessage.val()["ChatDetails"].lastMessage
                                            document.getElementById(`${userId}-last-message`).textContent = lastMessageContent
                                        });
                                        newMatchElement.innerHTML += `
                                        <div class="match-image" style="background-image: url('${blob}')"></div>
                                        <div class="match-details">
                                            <div class="match-name">${chatDataList[userId].uniqueIDandName.split(",")[1]}</div>
                                            <div class="match-previous-message" id=${userId}-last-message>${lastMessageContent}</div>
                                        </div>
                                    `;
                                        messagesCounter.appendChild(newMatchElement);
                                        ChatUsersList.push(userId)
                                    }
                                })
                        );
                    });
                    await Promise.all(promises);
                }
            }
        }
    });

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

messagesCounter.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.match-children');
    
    if (clickedElement) {
        const index = Array.from(clickedElement.parentElement.children).indexOf(clickedElement);
        currentChatUser = ChatUsersList[index]
        chatParentElement.innerHTML = '';

        document.getElementById('match-candidate-container').style.opacity = 0;
        document.getElementById('user-name-chat').innerText = clickedElement.querySelector('.match-name').innerText
        document.getElementById('user-image-chat').style.backgroundImage = clickedElement.querySelector('.match-image').style.backgroundImage
        setTimeout(() => {
            document.getElementById('match-candidate-container').style.display = "none";
            document.getElementById('user-message-container').style.display = "flex";
            setTimeout(() => {
                document.getElementById('user-message-container').style.opacity = "1";
            }, 100);
            
        }, 500);
        getUserChatsFromChats(ChatUsersList[index])
    }
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

document.querySelectorAll('.expand-image-container').forEach(function(element, index) {
    element.addEventListener('click', function() {
        console.log(element);
        var parentElement = element.parentNode;
        var parentBackgroundImage = window.getComputedStyle(parentElement).getPropertyValue('background-image');

        document.getElementById("outer-blur").style.display = "block";
        var viewImageContainer = document.getElementById("view-image-container");
        viewImageContainer.style.display = "block";

        viewImageContainer.style.backgroundImage = parentBackgroundImage;
    });
});

document.getElementById("outer-blur").addEventListener("click", function(){
    document.getElementById("outer-blur").style.display = "none"
    document.getElementById("delete-confirmation-box-container").style.display = "none"
    document.getElementById("user-preview-container").style.display = "none"
    document.getElementById("view-image-container").style.display = "none"
    document.getElementById("edit-user-tags").style.display = "none";

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
    document.getElementById("subject2-image").style.backgroundImage = matchUIDImage
    matchAnimation()
}

document.getElementById("keep-swiping-button").addEventListener("click", function(){
    document.getElementById("matched-animation-container").style.display = "none";
})

async function getUserChatsFromMatches(chatMatchUID) {
    return new Promise((resolve, reject) => {
        messageCounterTracker = []
        onValue(ref(database, 'UserMatchingDetails/' + uid + '/MatchUID/' + chatMatchUID), async (snapshot) => {
            uniquePath = snapshot.val().uniqueIDandName.split(",")[0];
            console.log(uniquePath)
            onValue(ref(database, 'UserChats/' + uniquePath), async (snapshot) => {
                const chatData = snapshot.val();
                // chatParentElement.innerHTML = '';
                ManageChats(chatData, chatMatchUID);
            });

            resolve();
        });
    });
}

async function getUserChatsFromChats(chatMatchUID) {
    return new Promise((resolve, reject) => {
        messageCounterTracker = []
        onValue(ref(database, 'UserMatchingDetails/' + uid + '/ChatUID/' + chatMatchUID), async (snapshot) => {
            uniquePath = snapshot.val().uniqueIDandName.split(",")[0];
            console.log(uniquePath)
            onValue(ref(database, 'UserChats/' + uniquePath), async (snapshot) => {
                const chatData = snapshot.val();
                // chatParentElement.innerHTML = '';
                ManageChats(chatData, chatMatchUID);
            });

            resolve();
        });
    });
}

function ManageChats(chatData, chatMatchUID) {
    const UserMessages = chatData["Messages"];
    const MessageCounter = chatData["ChatDetails"].messageCounter;

    for (let i = 1; i < MessageCounter + 1; i++) {
        var userChatContent = UserMessages[i].content;
        var chatWalaUser = UserMessages[i].uid;
        var chatTimeStamp = UserMessages[i].timeStamp;
        var messageID = UserMessages[i].messageID;

        if (!messageCounterTracker.includes(messageID)) {
            if (chatWalaUser !== uid) {
                chatParentElement.innerHTML += `<div class="message-container"><div class="they message">${userChatContent}</div></div>`;
            } else {
                chatParentElement.innerHTML += `<div class="message-container"><div class="me message">${userChatContent}</div></div>`;
            }
            messageCounterTracker.push(messageID);
        }
        console.log(messageCounterTracker);

    }

}

async function writeUserChat(content){
    const data = {
        uid: uid,
        matchUID: currentChatUser,
        type: "WriteChats",
        key: currentUserCookie,
        uniquePath: uniquePath,
        content: content,
    };
    chatParentElement.innerHTML += `<div class="message-container"><div class="me message">${content}</div></div>`;
    if (messageCounterTracker.length == 0){
        messageCounterTracker.push(1);
    }
    else{
        messageCounterTracker.push(messageCounterTracker[messageCounterTracker.length - 1]+1);
        console.log(messageCounterTracker[messageCounterTracker.length - 1]+1)
    }
    
    userWroteMessage = true;
    
    const execution = await functions.createExecution(
        '65ca1944268018f357b2',
        JSON.stringify(data)
    );
    console.log(execution)
}

document.getElementById('send-message-box').addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); 

        const messageContent = event.target.value;
        writeUserChat(messageContent)
        event.target.value = ""
    }
});

document.getElementById("close-icon-header").addEventListener("click", function(event){
    document.getElementById('user-message-container').style.opacity = 0;

    setTimeout(() => {
        document.getElementById('user-message-container').style.display = "none";
        document.getElementById('match-candidate-container').style.display = "flex";
        setTimeout(() => {
            document.getElementById('match-candidate-container').style.opacity = 1;
        }, 100);
    }, 500);
})

async function uploadTagData(mainOption, value){

    data = {
        type: "uploadTagData",
        keyToUpdate: mainOption,
        value: value,
        uid: uid,
        key: currentUserCookie,
    }

    const execution = await functions.createExecution(
        '65b14d8eef7777411400',
        JSON.stringify(data)
    );

    console.log(execution)
}

function clickHandler(mainOption) {
    if (mainOption == "height"){
        uploadTagData(mainOption, document.getElementById("height-value").innerText)
    }
    return function(event) {
        const clickedOptionText = event.target.textContent.trim();

        uploadTagData(mainOption, clickedOptionText)

        Array.from(document.querySelectorAll('.options-children')).forEach(element => element.removeEventListener('click', clickHandler));
    };
}

function editTags(counter){
    const HeightIcon = document.getElementById("height-icon");
    const wineIcon = document.getElementById("wine-icon");
    const smokingIcon = document.getElementById("smoking-icon");
    const searchingForIcon = document.getElementById("searching-icon");
    const religionIcon = document.getElementById("religion-icon");
    
    const elementsToSetOpacityToOne = [HeightIcon, wineIcon, smokingIcon, searchingForIcon, religionIcon];

    const moveableItems = document.getElementById("moveable-items");
    const mainText = document.getElementById("main-text");
    const dataEntryContainer = document.getElementById("data-entry-container");
    const nextButtonContainer = document.getElementById("next-button-container");
    const progressBar = document.getElementById("progress-3");
    var parentContainer = document.getElementById('data-entry-container');

    const drinkingHTML = `
    <div class="options">
        <div class="options-children">Skip</div>
        <div class="options-children">Frequently</div>
        <div class="options-children">Socially</div>
        <div class="options-children">Rarely</div>
        <div class="options-children">Never</div>
        <div class="options-children">Sober</div>
    </div>
    `;
    const smokingHTML = `
    <div class="options">
        <div class="options-children">Skip</div>
        <div class="options-children">Socially</div>
        <div class="options-children">Regularly</div>
        <div class="options-children">Never</div>
    </div>
    `;
    const searchingForHTML = `
        <div class="options">
            <div class="options-children">Skip</div>
            <div class="options-children">Relationship</div>
            <div class="options-children">Something Casual</div>
            <div class="options-children">Don't know yet</div>
        </div>
    `;
    const religionHTML = `
        <div class="options">
            <div class="options-children">Skip</div>
            <div class="options-children">Agnostic</div>
            <div class="options-children">Atheist</div>
            <div class="options-children">Buddhist</div>
            <div class="options-children">Catholic</div>
            <div class="options-children">Christian</div>
            <div class="options-children">Hindu</div>
            <div class="options-children">Jain</div>
            <div class="options-children">Jewish</div>
            <div class="options-children">Mormon</div>
            <div class="options-children">Muslim</div>
            <div class="options-children">Sikh</div>
            <div class="options-children">Other</div>
        </div>
    `;

    var height;
    var drinkingStatus;
    var smokingStatus;
    var dateStatus;
    var religionStatus ;

    var smth = {}

    if (counter === 0) {
        elementsToSetOpacityToOne.forEach(element => {
            element.style.opacity = 0;
        });

        progressBar.style.width = "10%"
        setTimeout(() => {
            progressBar.style.width = "20%"
        }, 300)

        HeightIcon.style.opacity = "1";
        HeightIcon.style.transform = "translateX(0px)";

        moveableItems.innerHTML = `
            <div class="data-entry-container" id="data-entry-container">
                <div class="slidecontainer">
                    <input type="range" min="96" max="217" value="155" class="slider" id="myRange" oninput="updateSliderValue(this.value)">
                    <div class="height-container">
                        <h4 id="height-value">157 cm</h4>
                    </div>
                </div>
            </div>
            <div class="next-button-container" id="next-button-container">
                <div class="next-button" id="next-button">Next</div>
            </div>
        `;
        document.getElementById("height-value").value = currentUserData.height
    
        document.getElementById("next-button").addEventListener("click", function() {
            clickHandler("height")
            editTags(1);
        });
    }
    if (counter == 1){
        HeightIcon.style.transform = "translateX(-180px)";
        wineIcon.style.transform = "translateX(0px)";
        moveableItems.style.transform = "translateX(70px)";
        moveableItems.style.opacity = "0";
        mainText.style.transform = "translateX(70px)";
        mainText.style.opacity = "0";
        progressBar.style.width = "30%"

        elementsToSetOpacityToOne.forEach(element => {
            element.style.opacity = 0;
        });

        // height = document.getElementById("height-value").innerText
    
        setTimeout(() => {
            nextButtonContainer.style.display = "none"
            nextButtonContainer.style.marginTop = "22px"
            dataEntryContainer.style.bottom = "15px"
            moveableItems.style.overflowY = "hidden"
            dataEntryContainer.innerHTML = ""
            dataEntryContainer.innerHTML = drinkingHTML;
            Array.from(document.querySelectorAll('.options-children')).forEach(element => element.addEventListener('click', clickHandler("drinkingStatus")));
            mainText.textContent = "Do you drink?";
            moveableItems.style.transform = "translateX(0px)";
            mainText.style.transform = "translateX(0px)";
            progressBar.style.width = "40%"

            setTimeout(() => {
                moveableItems.style.overflowY = "scroll"
            }, 200);
            moveableItems.style.opacity = "1";
            mainText.style.opacity = "1";

        }, 300);
        
        wineIcon.style.opacity = "1";
        HeightIcon.style.opacity = "0";
    }
    if (counter == 2){
        drinkingStatus = event.target.textContent

        elementsToSetOpacityToOne.forEach(element => {
            element.style.opacity = 0;
        });

        wineIcon.style.transform = "translateX(-180px)";
        smokingIcon.style.transform = "translateX(0px)";
        moveableItems.style.overflowY = "hidden"
        moveableItems.style.transform = "translateX(70px)";
        moveableItems.style.opacity = "0";
        mainText.style.transform = "translateX(70px)";
        mainText.style.opacity = "0";
        progressBar.style.width = "50%"
    
        setTimeout(() => {
            nextButtonContainer.style.display = "none"
            nextButtonContainer.style.marginTop = "22px"
            dataEntryContainer.style.bottom = "15px"
            dataEntryContainer.innerHTML = ""
            dataEntryContainer.innerHTML = smokingHTML;
            Array.from(document.querySelectorAll('.options-children')).forEach(element => element.addEventListener('click', clickHandler("smokingStatus")));
            mainText.textContent = "Do you smoke?";
            moveableItems.style.transform = "translateX(0px)";
            mainText.style.transform = "translateX(0px)";
            progressBar.style.width = "60%"

            setTimeout(() => {
                moveableItems.style.overflowY = "scroll"
            }, 200);
            moveableItems.style.opacity = "1";
            mainText.style.opacity = "1";
            
    
        }, 300);
        smokingIcon.style.opacity = "1";
        wineIcon.style.opacity = "0";
    }
    if (counter == 3){
        smokingStatus = event.target.textContent

        elementsToSetOpacityToOne.forEach(element => {
            element.style.opacity = 0;
        });

        smokingIcon.style.transform = "translateX(-180px)";
        searchingForIcon.style.transform = "translateX(0px)";
        moveableItems.style.overflowY = "hidden"
        moveableItems.style.transform = "translateX(70px)";
        moveableItems.style.opacity = "0";
        mainText.style.transform = "translateX(70px)";
        mainText.style.opacity = "0";
        progressBar.style.width = "70%"
    
        
    
        setTimeout(() => {
            nextButtonContainer.style.display = "none"
            nextButtonContainer.style.marginTop = "22px"
            dataEntryContainer.style.bottom = "15px"
            dataEntryContainer.innerHTML = ""
            dataEntryContainer.innerHTML = searchingForHTML;
            Array.from(document.querySelectorAll('.options-children')).forEach(element => element.addEventListener('click', clickHandler("lookingFor")));
            mainText.textContent = "What do you want from your dates?";
            moveableItems.style.transform = "translateX(0px)";
            mainText.style.transform = "translateX(0px)";
            setTimeout(() => {
                moveableItems.style.overflowY = "scroll"
            }, 200);
            moveableItems.style.opacity = "1";
            mainText.style.opacity = "1";
            progressBar.style.width = "80%"
            
    
        }, 300);
        searchingForIcon.style.opacity = "1";
        smokingIcon.style.opacity = "0";
    }
    if (counter == 4){
        dateStatus = event.target.textContent

        elementsToSetOpacityToOne.forEach(element => {
            element.style.opacity = 0;
        });

        searchingForIcon.style.transform = "translateX(-180px)";
        religionIcon.style.transform = "translateX(0px)";
        moveableItems.style.overflowY = "hidden"
        moveableItems.style.transform = "translateX(70px)";
        moveableItems.style.opacity = "0";
        mainText.style.transform = "translateX(70px)";
        mainText.style.opacity = "0";
        progressBar.style.width = "90%"
    
        
    
        setTimeout(() => {
            nextButtonContainer.style.display = "none"
            nextButtonContainer.style.marginTop = "22px"
            dataEntryContainer.style.bottom = "15px"
            dataEntryContainer.innerHTML = ""
            dataEntryContainer.innerHTML = religionHTML;
            Array.from(document.querySelectorAll('.options-children')).forEach(element => element.addEventListener('click', clickHandler("religionStatus")));
            mainText.textContent = "Do you identify with a religion?";
            moveableItems.style.transform = "translateX(0px)";
            mainText.style.transform = "translateX(0px)";
            progressBar.style.width = "100%"

            setTimeout(() => {
                moveableItems.style.overflowY = "scroll"
            }, 200);
            moveableItems.style.opacity = "1";
            mainText.style.opacity = "1";
            
    
        }, 300);
        religionIcon.style.opacity = "1";
        searchingForIcon.style.opacity = "0";
    }
    parentContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('options-children')) {   
            if (mainText.textContent == "Do you drink?"){
                drinkingStatus = event.target.textContent
                wineIcon.style.transform = "translateX(-180px)";
                smokingIcon.style.transform = "translateX(0px)";
                moveableItems.style.overflowY = "hidden"
                moveableItems.style.transform = "translateX(70px)";
                moveableItems.style.opacity = "0";
                mainText.style.transform = "translateX(70px)";
                mainText.style.opacity = "0";
                progressBar.style.width = "50%"
            
                setTimeout(() => {
                    nextButtonContainer.style.display = "none"
                    nextButtonContainer.style.marginTop = "22px"
                    dataEntryContainer.style.bottom = "15px"
                    dataEntryContainer.innerHTML = ""
                    dataEntryContainer.innerHTML = smokingHTML;
                    Array.from(document.querySelectorAll('.options-children')).forEach(element => element.addEventListener('click', clickHandler("smokingStatus")));
                    mainText.textContent = "Do you smoke?";
                    moveableItems.style.transform = "translateX(0px)";
                    mainText.style.transform = "translateX(0px)";
                    progressBar.style.width = "60%"

                    setTimeout(() => {
                        moveableItems.style.overflowY = "scroll"
                    }, 200);
                    moveableItems.style.opacity = "1";
                    mainText.style.opacity = "1";
                    
            
                }, 300);
                smokingIcon.style.opacity = "1";
                wineIcon.style.opacity = "0";
            }
            if (mainText.textContent == "Do you smoke?"){
                smokingStatus = event.target.textContent

                smokingIcon.style.transform = "translateX(-180px)";
                searchingForIcon.style.transform = "translateX(0px)";
                moveableItems.style.overflowY = "hidden"
                moveableItems.style.transform = "translateX(70px)";
                moveableItems.style.opacity = "0";
                mainText.style.transform = "translateX(70px)";
                mainText.style.opacity = "0";
                progressBar.style.width = "70%"
            
                
            
                setTimeout(() => {
                    nextButtonContainer.style.display = "none"
                    nextButtonContainer.style.marginTop = "22px"
                    dataEntryContainer.style.bottom = "15px"
                    dataEntryContainer.innerHTML = ""
                    dataEntryContainer.innerHTML = searchingForHTML;
                    Array.from(document.querySelectorAll('.options-children')).forEach(element => element.addEventListener('click', clickHandler("lookingFor")));
                    mainText.textContent = "What do you want from your dates?";
                    moveableItems.style.transform = "translateX(0px)";
                    mainText.style.transform = "translateX(0px)";
                    setTimeout(() => {
                        moveableItems.style.overflowY = "scroll"
                    }, 200);
                    moveableItems.style.opacity = "1";
                    mainText.style.opacity = "1";
                    progressBar.style.width = "80%"
                    
            
                }, 300);
                searchingForIcon.style.opacity = "1";
                smokingIcon.style.opacity = "0";
            }
            if (mainText.textContent == "What do you want from your dates?"){
                dateStatus = event.target.textContent

                searchingForIcon.style.transform = "translateX(-180px)";
                religionIcon.style.transform = "translateX(0px)";
                moveableItems.style.overflowY = "hidden"
                moveableItems.style.transform = "translateX(70px)";
                moveableItems.style.opacity = "0";
                mainText.style.transform = "translateX(70px)";
                mainText.style.opacity = "0";
                progressBar.style.width = "90%"
            
                
            
                setTimeout(() => {
                    nextButtonContainer.style.display = "none"
                    nextButtonContainer.style.marginTop = "22px"
                    dataEntryContainer.style.bottom = "15px"
                    dataEntryContainer.innerHTML = ""
                    dataEntryContainer.innerHTML = religionHTML;
                    Array.from(document.querySelectorAll('.options-children')).forEach(element => element.addEventListener('click', clickHandler("religionStatus")));
                    mainText.textContent = "Do you identify with a religion?";
                    moveableItems.style.transform = "translateX(0px)";
                    mainText.style.transform = "translateX(0px)";
                    progressBar.style.width = "100%"

                    setTimeout(() => {
                        moveableItems.style.overflowY = "scroll"
                    }, 200);
                    moveableItems.style.opacity = "1";
                    mainText.style.opacity = "1";
                    
            
                }, 300);
                religionIcon.style.opacity = "1";
                searchingForIcon.style.opacity = "0";
            }
        }
    })
}

document.querySelectorAll('.basics-children').forEach(function(element, index) {
    element.addEventListener('click', function(event) {
        event.stopPropagation();

        var elmentIdentifier = element.className.split(" ")[0]
        if (elmentIdentifier == "height-container"){
            editTags(0)
        }
        if (elmentIdentifier == "drinking-container"){
            editTags(1)
        }
        if (elmentIdentifier == "smoking-container"){
            editTags(2)
        }
        if (elmentIdentifier == "looking-container"){
            editTags(3)
        }
        if (elmentIdentifier == "religion-container"){
            editTags(4)
        }
        setTimeout(() => {
            document.getElementById("edit-user-tags").style.display = "flex";
            document.getElementById("outer-blur").style.display = "block"
        }, 100);
    });
});

document.getElementById("log-out").addEventListener("click", function(){
    signOut(auth)
})