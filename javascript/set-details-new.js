import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getDatabase, ref, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

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
    .setProject('65b008483418c13c2e82');

const functions = new window.Appwrite.Functions(client);

var uid;
var cookieValue;
var userName;
var selectedDate;
var age;
var selectedGender ;
var selectedStream;
var selectedYear;
var height;
var drinkingStatus;
var smokingStatus;
var dateStatus;
var religionStatus;

var data_to_update;

function verifyUserMetaData(uid){
    const usersRef = ref(database, '/UsersMetaData/' + uid);

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        window.location = '/select.html';
      }
    });
}





onAuthStateChanged(auth, (user) => {
    if (user == null) {
        window.location = '/index.html';
    }
    else{
        uid = auth.currentUser.uid
        const CookiePath = ref(database, '/UsersCookies/' + uid +'/userCookie');

        onValue(CookiePath, (snapshot) => {
          const CookieSnapshot = snapshot.val();
          
          if (CookieSnapshot) {
            cookieValue =  CookieSnapshot
          }
          else{
            console.log("Failed Code Error")
          }
        });
        verifyUserMetaData(uid)
    }
  });

var counter = 0
var parentContainer = document.getElementById('data-entry-container');

const dobEntryHTML = `
    <div class="dob-entry" id="dob-entry">
        <div class="date-entry dob" id="date">DD</div>
        <div class="month-entry dob" id="month">MM</div>
        <div class="year-entry dob" id="year">YYYY</div>
    </div>
    <input type="hidden" id="dobInput" placeholder="Select Date of Birth" class="flatpickr-input">
    <h3 id="warning-text-dob">Type your DOB in the format of DD/MM/YYYY</h3>
`;
const genderEntryHTML = `
    <div class="gender-selection">
        <div class="male-class gender-children">Male</div>
        <div class="gender-children">Female</div>
        <div class="others-class gender-children" >Others</div>
    </div>
    <h3 id="gender-h2">Confirm your gender</h3>
`;
const streamYearEntryHTML = `
    <div class="stream-year-selection" id="stream-year-selection">
        <div class="male-class stream-year-selection-children" id="stream">Stream
        </div>
        <div class="others-class stream-year-selection-children" id="year">Year</div>
    </div>
    <div class="dropdown" id="dropdown">
        <div class="stream-selection" id="stream-selection">
            <div class="dropdown_sub" onclick="readStream(this)"><p class="first">B.Tech</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>BBA</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>LLB</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>BA</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>B.Arch</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>B.Sc</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>BBA</p></div>  
            <div class="dropdown_sub" onclick="readStream(this)"><p>B.Com</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>BCA</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>BHM</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>LLB</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>B.Des</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>BFA</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>M.Arch</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>M.Des</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>M.FA</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>M.Plan</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>M.A</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>M.Sc</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>M.Tech</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>LLM</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>MBA</p></div>
            <div class="dropdown_sub" onclick="readStream(this)"><p>PhD</p></div>
        </div>
    </div>
    <h3 id="stream-year-warning-text">Make sure you enter the correct stream and year for better matches</h3>
`;
const HeightHTML = `
    <div class="slidecontainer">
        <input type="range" min="96" max="217" value="155" class="slider" id="myRange" oninput="updateSliderValue(this.value)">
        <div class="height-container">
            <h4 id="height-value">157 cm</h4>
        </div>
    </div>
`;
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
const imageUploadHTML = `
    <div id="image-upload-container" class="image-upload-container">Drag and upload photos here</div>
    <div class="image-new-uploaded" id="image-new-uploaded">
        <div class="image1 imageupload" id="image1">
            <span id="add-image-icon1" class="add-image-icon">add</span>
        </div>
        <div class="image2 imageupload" id="image2">
            <span id="add-image-icon2" class="add-image-icon">add</span>

        </div>
        <div class="image3 imageupload" id="image3">
            <span id="add-image-icon3" class="add-image-icon">add</span>

        </div>
        <div class="image4 imageupload" id="image4">
            <span id="add-image-icon4" class="add-image-icon">add</span>
        </div>
    </div>
    <input type="file" class="imageUploadListener" id="imageInput" name="imageInput" accept="image/*">
    <input type="file" class="imageUploadListener" id="imageInput2" name="imageInput" accept="image/*">
    <input type="file" class="imageUploadListener" id="imageInput3" name="imageInput" accept="image/*">
    <input type="file" class="imageUploadListener" id="imageInput4" name="imageInput" accept="image/*">
`;



document.getElementById("next-button").addEventListener("click", function () {
    const userNameIcon = document.getElementById("user-name-icon");
    const cakeIcon = document.getElementById("cake-icon");
    const genderIcon = document.getElementById("gender-icon");
    const StreamYearIcon = document.getElementById("year-stream-icon");
    const HeightIcon = document.getElementById("height-icon");
    const wineIcon = document.getElementById("wine-icon");
    const smokingIcon = document.getElementById("smoking-icon");
    const searchingForIcon = document.getElementById("searching-icon");
    const religionIcon = document.getElementById("religion-icon");
    const imageIcon = document.getElementById("image-icon");
    
    const moveableItems = document.getElementById("moveable-items");
    const mainText = document.getElementById("main-text");
    const dataEntryContainer = document.getElementById("data-entry-container");
    const nextButtonContainer = document.getElementById("next-button-container");
    const mainContainer = document.getElementById("name-container");
    const progressBar = document.getElementById("progress-3");
    const warningName = document.getElementById("warning-text-name");
    

    userName = textArea.value
    
    if (counter === 0) {
        var trimmedName = userName.trim();
    
        if (trimmedName === "" || !/^[a-zA-Z\s]+$/.test(trimmedName)) {
            warningName.style.opacity = "1";
            return false;
        }
    }
    if (counter == 1){
        if (age == undefined || age < 18 ){
            const warningDOB = document.getElementById("warning-text-dob");
            warningDOB.textContent = "Enter a valid DOB. You must be over 18 for compliance."
            return false
        }
    }
    if (counter == 2){
        if (selectedGender.trim() == ""){
            const warningGender = document.getElementById("gender-h2");
            warningGender.textContent = "Select a gender"            
            return false
        }
    }
    if (counter == 3){
        if (stream.innerText == "Stream" || year.innerText == "Year"){
            const warningStreamYear = document.getElementById("stream-year-warning-text");
            warningStreamYear.textContent = "Please enter both year and stream for better matches"            
            return false
        }
        else{
            selectedStream = stream.innerText
            selectedYear = year.innerText
        }
    }

    counter += 1

    if (counter == 1){
    userNameIcon.style.transform = "translateX(-180px)";
    cakeIcon.style.transform = "translateX(0px)";
    moveableItems.style.transform = "translateX(70px)";
    moveableItems.style.opacity = "0";
    mainText.style.transform = "translateX(70px)";
    mainText.style.opacity = "0";
    progressBar.style.width = "25%"
    setTimeout(() => {
        moveableItems.style.marginTop = "60px"
        nextButtonContainer.style.marginTop = "3px"
        dataEntryContainer.style.bottom = "15px"
        dataEntryContainer.innerHTML = ""
        dataEntryContainer.innerHTML = dobEntryHTML;
        progressBar.style.width = "20%"

        document.getElementById("dob-entry").addEventListener('click', function (event) {
            
            const flatpickrInput = document.querySelector('.flatpickr-input.form-control.input');
            
            flatpickrInput.click();

            const selectedDayElement = document.querySelector('.flatpickr-day.selected');
            const selectedDayElement1 = document.querySelector('.flatpickr-day.today');

            selectedDayElement.style.background = '#F8C537';  
            selectedDayElement.style.borderColor = '#F8C537';

            selectedDayElement1.style.background = '#F8C537'; 
            selectedDayElement1.style.borderColor = '#F8C537';
        });
        
        
        flatpickr('#dobInput', {
            dateFormat: 'd/m/Y',
            disable: [
                function(date) {
                  // Disable dates before January 1, 1990
                  return date < new Date("1990-01-01");
                },
            ],
            altInput: true,
            altFormat: 'F j, Y',
            onClose: function(selectedDates, dateStr, instance) {
                if (selectedDates.length > 0) {
                    selectedDate = selectedDates[0];
        
                    const day = String(selectedDate.getDate()).padStart(2, '0');
                    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                    const year = selectedDate.getFullYear();
        
                    document.getElementById('date').textContent = day;
                    document.getElementById('month').textContent = month;
                    document.getElementById('year').textContent = year;

                    const currentDate = new Date();
                    age = currentDate.getFullYear() - selectedDate.getFullYear();
        
                }
                
            }
        });
        
        

        mainText.textContent = "When were you born?";
        moveableItems.style.transform = "translateX(0px)";
        mainText.style.transform = "translateX(0px)";
        moveableItems.style.opacity = "1";
        mainText.style.opacity = "1";
    }, 300);

    cakeIcon.style.opacity = "1";
    userNameIcon.style.opacity = "0";
    }

    if (counter == 2){
        cakeIcon.style.transform = "translateX(-180px)";
        genderIcon.style.transform = "translateX(0px)";
        moveableItems.style.transform = "translateX(70px)";
        moveableItems.style.opacity = "0";
        mainText.style.transform = "translateX(70px)";
        mainText.style.opacity = "0";
        progressBar.style.width = "35%"
        
        
        setTimeout(() => {
            nextButtonContainer.style.marginTop = "25px";
            dataEntryContainer.style.bottom = "15px";
            dataEntryContainer.innerHTML = "";
            dataEntryContainer.innerHTML = genderEntryHTML;
            mainText.textContent = "What is your gender?";
            moveableItems.style.transform = "translateX(0px)";
            mainText.style.transform = "translateX(0px)";
            moveableItems.style.opacity = "1";
            mainText.style.opacity = "1";
            progressBar.style.width = "30%"
        
            var genderChildren = document.querySelectorAll('.gender-children');
            genderChildren.forEach(function (element) {
                element.addEventListener('click', function () {
                    genderChildren.forEach(function (el) {
                        el.style.backgroundColor = "";
                    });
                    element.style.backgroundColor = "#F8C537";
                    selectedGender = element.innerText;
                });
            });
        }, 300);
        
        genderIcon.style.opacity = "1";
        cakeIcon.style.opacity = "0";
        
    }
    if (counter == 3){
    genderIcon.style.transform = "translateX(-180px)";
    StreamYearIcon.style.transform = "translateX(0px)";
    moveableItems.style.transform = "translateX(70px)";
    moveableItems.style.opacity = "0";
    mainText.style.transform = "translateX(70px)";
    mainText.style.opacity = "0";
    progressBar.style.width = "45%"

    setTimeout(() => {
        nextButtonContainer.style.marginTop = "3px"
        dataEntryContainer.style.bottom = "15px"
        dataEntryContainer.innerHTML = ""
        dataEntryContainer.innerHTML = streamYearEntryHTML;
        const StreamYearWarningText = document.getElementById("stream-year-warning-text");
        mainText.textContent = "Enter your stream and course";
        moveableItems.style.transform = "translateX(0px)";
        mainText.style.transform = "translateX(0px)";
        StreamYearWarningText.style.width = "60%"
        StreamYearWarningText.style.bottom = "12px"
        moveableItems.style.opacity = "1";
        mainText.style.opacity = "1";
        progressBar.style.width = "40%"
        document.getElementById("stream-year-selection").addEventListener('click', function(event) {
            document.getElementById("dropdown").style.display = "flex"
        })

        document.addEventListener('click', function (event) {
            var dropdown = document.getElementById('dropdown');
            var streamYearSelection = document.getElementById('stream-year-selection');
    
            try{
                if (!dropdown.contains(event.target) && !streamYearSelection.contains(event.target)) {
                    dropdown.style.display = 'none';
                }
            }
            catch{
                
            }
        });
    }, 300);
    StreamYearIcon.style.opacity = "1";
    genderIcon.style.opacity = "0";
    }

    if (counter == 4){
        StreamYearIcon.style.transform = "translateX(-180px)";
        HeightIcon.style.transform = "translateX(0px)";
        moveableItems.style.transform = "translateX(70px)";
        moveableItems.style.opacity = "0";
        mainText.style.transform = "translateX(70px)";
        mainText.style.opacity = "0";
        progressBar.style.width = "55%"
    
        setTimeout(() => {
            moveableItems.style.marginTop = "20px"
            nextButtonContainer.style.marginTop = "22px"
            dataEntryContainer.style.bottom = "15px"
            dataEntryContainer.innerHTML = ""
            dataEntryContainer.innerHTML = HeightHTML;
            mainText.textContent = "Enter your height";
            moveableItems.style.transform = "translateX(0px)";
            mainText.style.transform = "translateX(0px)";
            moveableItems.style.opacity = "1";
            mainText.style.opacity = "1";
            progressBar.style.width = "50%"
            
    
        }, 300);
        HeightIcon.style.opacity = "1";
        StreamYearIcon.style.opacity = "0";
    }
    if (counter == 5){
        HeightIcon.style.transform = "translateX(-180px)";
        wineIcon.style.transform = "translateX(0px)";
        moveableItems.style.transform = "translateX(70px)";
        moveableItems.style.opacity = "0";
        mainText.style.transform = "translateX(70px)";
        mainText.style.opacity = "0";
        progressBar.style.width = "65%"
        height = document.getElementById("height-value").innerText
    
        setTimeout(() => {
            nextButtonContainer.style.display = "none"
            nextButtonContainer.style.marginTop = "22px"
            dataEntryContainer.style.bottom = "15px"
            moveableItems.style.overflowY = "hidden"
            dataEntryContainer.innerHTML = ""
            dataEntryContainer.innerHTML = drinkingHTML;
            mainText.textContent = "Do you drink?";
            moveableItems.style.transform = "translateX(0px)";
            mainText.style.transform = "translateX(0px)";
            progressBar.style.width = "60%"

            setTimeout(() => {
                moveableItems.style.overflowY = "scroll"
            }, 200);
            moveableItems.style.opacity = "1";
            mainText.style.opacity = "1";
            
    
        }, 300);
        wineIcon.style.opacity = "1";
        HeightIcon.style.opacity = "0";
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
                progressBar.style.width = "75%"
            
                setTimeout(() => {
                    nextButtonContainer.style.display = "none"
                    nextButtonContainer.style.marginTop = "22px"
                    dataEntryContainer.style.bottom = "15px"
                    dataEntryContainer.innerHTML = ""
                    dataEntryContainer.innerHTML = smokingHTML;
                    mainText.textContent = "Do you smoke?";
                    moveableItems.style.transform = "translateX(0px)";
                    mainText.style.transform = "translateX(0px)";
                    progressBar.style.width = "70%"

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
                progressBar.style.width = "85%"
            
                
            
                setTimeout(() => {
                    nextButtonContainer.style.display = "none"
                    nextButtonContainer.style.marginTop = "22px"
                    dataEntryContainer.style.bottom = "15px"
                    dataEntryContainer.innerHTML = ""
                    dataEntryContainer.innerHTML = searchingForHTML;
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
                progressBar.style.width = "95%"
            
                
            
                setTimeout(() => {
                    nextButtonContainer.style.display = "none"
                    nextButtonContainer.style.marginTop = "22px"
                    dataEntryContainer.style.bottom = "15px"
                    dataEntryContainer.innerHTML = ""
                    dataEntryContainer.innerHTML = religionHTML;
                    mainText.textContent = "Do you identify with a religion?";
                    moveableItems.style.transform = "translateX(0px)";
                    mainText.style.transform = "translateX(0px)";
                    progressBar.style.width = "90%"

                    setTimeout(() => {
                        moveableItems.style.overflowY = "scroll"
                    }, 200);
                    moveableItems.style.opacity = "1";
                    mainText.style.opacity = "1";
                    
            
                }, 300);
                religionIcon.style.opacity = "1";
                searchingForIcon.style.opacity = "0";
            }
            if (mainText.textContent == "Do you identify with a religion?"){
                religionStatus = event.target.textContent


                religionIcon.style.transform = "translateX(-180px)";
                imageIcon.style.transform = "translateX(0px)";
                moveableItems.style.overflowY = "hidden"
                moveableItems.style.transform = "translateX(70px)";
                moveableItems.style.opacity = "0";
                mainText.style.transform = "translateX(70px)";
                mainText.style.opacity = "0";
                progressBar.style.width = "100%"
            
                
            
                setTimeout(() => {
                    nextButtonContainer.style.display = "none"
                    nextButtonContainer.style.marginTop = "22px"
                    dataEntryContainer.style.bottom = "15px"
                    dataEntryContainer.innerHTML = ""
                    moveableItems.style.overflowY = "unset"
                    dataEntryContainer.innerHTML = imageUploadHTML;
                    mainText.textContent = "Upload your photos";
                    moveableItems.style.transform = "translateX(0px)";
                    mainText.style.transform = "translateX(0px)";
                    moveableItems.style.opacity = "1";
                    mainText.style.opacity = "1";
                    
                    const dropZone = document.getElementById("image-upload-container");
                    const imagesHolder = document.getElementById("image-new-uploaded");
                    const image1Holder = document.getElementById("image1");
                    const image2Holder = document.getElementById("image2");
                    const image3Holder = document.getElementById("image3");
                    const image4Holder = document.getElementById("image4");
                    const fileInput = document.getElementById("imageInput");
                    const fileInput2 = document.getElementById("imageInput2");
                    const fileInput3 = document.getElementById("imageInput3");
                    const fileInput4 = document.getElementById("imageInput4");

                    var imageUploadCounter;

                    const addImageIcon1 = document.getElementById("add-image-icon1");
                    const addImageIcon2 = document.getElementById("add-image-icon2");
                    const addImageIcon3 = document.getElementById("add-image-icon3");
                    const addImageIcon4 = document.getElementById("add-image-icon4");
                    
                    dropZone.addEventListener('click', function(e) {
                        e.preventDefault();
                        imageUploadCounter = 1;
                        fileInput.click();
                    });
                    image2Holder.addEventListener('click', function(e) {
                        e.preventDefault();
                        imageUploadCounter = 2;
                        fileInput.click();
                    });
                    image3Holder.addEventListener('click', function(e) {
                        e.preventDefault();
                        imageUploadCounter = 3;
                        fileInput.click();
                    });
                    image4Holder.addEventListener('click', function(e) {
                        e.preventDefault();
                        imageUploadCounter = 4;
                        fileInput.click();
                    });
                    
                    fileInput.addEventListener('change', function() {
                        handleDroppedFiles1(this.files);
                    });
                    fileInput2.addEventListener('change', function() {
                        handleDroppedFiles1(this.files);
                    });
                    fileInput3.addEventListener('change', function() {
                        handleDroppedFiles1(this.files);
                    });
                    fileInput4.addEventListener('change', function() {
                        handleDroppedFiles1(this.files);
                    });
                    
                    function handleDroppedFiles1(files) {
                        if (files.length > 0) {
                            const reader = new FileReader();
                    
                            reader.onload = function(e) {
                                const selectedImage = `url('${e.target.result}')`;
                                
                                if (imageUploadCounter == 1) {
                                    dropZone.style.display = "none"
                                    addImageIcon1.style.display = "none"
                                    mainContainer.style.width = "520px"
                                    nextButtonContainer.style.display = "flex"
                                    imagesHolder.style.display = "flex"
                                    image1Holder.style.backgroundImage = selectedImage;
                                }
                                if (imageUploadCounter == 2) {
                                    addImageIcon2.style.display = "none"
                                    image2Holder.style.backgroundImage = selectedImage;
                                }
                                if (imageUploadCounter == 3) {
                                    addImageIcon3.style.display = "none"
                                    image3Holder.style.backgroundImage = selectedImage;
                                }
                                if (imageUploadCounter == 4) {
                                    addImageIcon4.style.display = "none"
                                    image4Holder.style.backgroundImage = selectedImage;
                                }
                            };
                    
                            reader.readAsDataURL(files[0]);
                        }
                    }
                    
            
                }, 300);
                imageIcon.style.opacity = "1";
                religionIcon.style.opacity = "0";
                executeFunction();
            }
            }
        
    });
    
});



const textArea = document.getElementById("userName")

textArea.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("next-button").click()
      
    }
})

async function executeFunction() {
    const data = {
        'uid': uid,
        'key': cookieValue,
        'type': 'CreateUserMetaDetails',
        "name": userName,
        "age": age,
        "stream": selectedStream,
        "year": selectedYear,
        "height": height,
        "drinkingStatus": drinkingStatus,
        "smokingStatus": smokingStatus,
        "lookingFor": dateStatus,
        "religion": religionStatus,
        "gender": selectedGender
    };

    try {
        const execution = await functions.createExecution(
            '65b14d8eef7777411400',
            JSON.stringify(data)
        );

        const responseBody = JSON.parse(execution.responseBody);

        console.log(responseBody);
    } catch (err) {
        console.log("An error occurred:");
        console.error(err.message);
    }
}

flatpickr('#dobInput', {
    dateFormat: 'dd/mm/YYYY', // Set your desired date format
    altInput: true,
    altFormat: 'F j, Y',
    // onClose: function(selectedDates, dateStr, instance) {
    //     // Perform any additional logic on date selection
    // }
});

