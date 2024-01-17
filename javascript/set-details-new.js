var userName = ""
var selectedGender = ""
var counter = 0

const dobEntryHTML = `
    <div class="dob-entry">
        <div contenteditable="true" class="date-entry dob" placeholder="DD"></div>
        <div contenteditable="true" class="month-entry dob" placeholder="MM"></div>
        <div contenteditable="true" class="year-entry dob" placeholder="YYYY"></div>
    </div>
    <h3>Enter your DOB in the format of DD/MM/YYYY</h3>
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
    <div class="stream-year-selection">
        <div class="male-class stream-year-selection-children">Stream</div>
        <div class="others-class stream-year-selection-children" >Year</div>
    </div>
    <h3 id="stream-year-warning-text">Make sure you enter the correct stream and year for better matches</h3>
`;
const HeightHTML = `
    <div class="slidecontainer">
        <input type="range" min="96" max="217" value="155" class="slider" id="myRange" oninput="updateSliderValue(this.value)">
        <div class="height-container">
            <h4 id="height-value">181 cm</h4>
        </div>
    </div>
`;

document.getElementById("next-button").addEventListener("click", function () {
    const userNameIcon = document.getElementById("user-name-icon");
    const cakeIcon = document.getElementById("cake-icon");
    const genderIcon = document.getElementById("gender-icon");
    const StreamYearIcon = document.getElementById("year-stream-icon");
    const moveableItems = document.getElementById("moveable-items");
    const mainText = document.getElementById("main-text");
    const genderText = document.getElementById("gender-h2");
    const progess1 = document.getElementById("progress-1");
    const progess2 = document.getElementById("progress-2");
    const dataEntryContainer = document.getElementById("data-entry-container");
    const nextButtonContainer = document.getElementById("next-button-container");

    counter += 1;

    if (counter == 1){
    userNameIcon.style.transform = "translateX(-200px)";
    cakeIcon.style.transform = "translateX(0px)";
    moveableItems.style.transform = "translateX(70px)";
    moveableItems.style.opacity = "0";
    mainText.style.transform = "translateX(70px)";
    mainText.style.opacity = "0";

    progess1.style.backgroundColor = "#d9d9d984"

    setTimeout(() => {
        moveableItems.style.marginTop = "60px"
        nextButtonContainer.style.marginTop = "3px"
        dataEntryContainer.style.bottom = "15px"
        dataEntryContainer.innerHTML = ""
        dataEntryContainer.innerHTML = dobEntryHTML;
        mainText.textContent = "When were you born?";
        moveableItems.style.transform = "translateX(0px)";
        mainText.style.transform = "translateX(0px)";
        moveableItems.style.opacity = "1";
        mainText.style.opacity = "1";
        progess2.style.backgroundColor = "#F8C537"

    }, 300);

    cakeIcon.style.opacity = "1";
    userNameIcon.style.opacity = "0";

    userName = textArea.value
    }

    if (counter == 2){
        cakeIcon.style.transform = "translateX(-200px)";
        genderIcon.style.transform = "translateX(0px)";
        moveableItems.style.transform = "translateX(70px)";
        moveableItems.style.opacity = "0";
        mainText.style.transform = "translateX(70px)";
        mainText.style.opacity = "0";
        
        progess1.style.backgroundColor = "#d9d9d984";
        
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
            progess2.style.backgroundColor = "#F8C537";
        
            var genderChildren = document.querySelectorAll('.gender-children');
            genderChildren.forEach(function (element) {
                element.addEventListener('click', function () {
                    genderChildren.forEach(function (el) {
                        el.style.backgroundColor = "";
                    });
                    element.style.backgroundColor = "#F8C537";
                    selectedGender = element.innerText;
                    console.log(selectedGender);
                });
            });
        }, 300);
        
        genderIcon.style.opacity = "1";
        cakeIcon.style.opacity = "0";
        
    }
    if (counter == 3){
        
    genderIcon.style.transform = "translateX(-200px)";
    StreamYearIcon.style.transform = "translateX(0px)";
    moveableItems.style.transform = "translateX(70px)";
    moveableItems.style.opacity = "0";
    mainText.style.transform = "translateX(70px)";
    mainText.style.opacity = "0";

    progess1.style.backgroundColor = "#d9d9d984"

    setTimeout(() => {
        nextButtonContainer.style.marginTop = "3px"
        dataEntryContainer.style.bottom = "15px"
        dataEntryContainer.innerHTML = ""
        dataEntryContainer.innerHTML = streamYearEntryHTML;
        const StreamYearWarningText = document.getElementById("stream-year-warning-text");
        mainText.textContent = "Enter your stream and course";
        moveableItems.style.transform = "translateX(0px)";
        mainText.style.transform = "translateX(0px)";
        StreamYearWarningText.style.width = "80%"
        moveableItems.style.opacity = "1";
        mainText.style.opacity = "1";
        progess2.style.backgroundColor = "#F8C537"

    }, 300);
    StreamYearIcon.style.opacity = "1";
    genderIcon.style.opacity = "0";
    }
});

const textArea = document.getElementById("userName")

textArea.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
})

