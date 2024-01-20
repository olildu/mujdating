var userName = ""
var selectedGender = ""
var drinkingStatus = ""
var smokingStatus = ""
var dateStatus = ""
var religionStatus = ""

var didIncrement = false
var counter = 0
var parentContainer = document.getElementById('data-entry-container');

const dobEntryHTML = `
    <div class="dob-entry" id="dob-entry">
        <div class="date-entry dob" id="date">DD</div>
        <div class="month-entry dob" id="month">MM</div>
        <div class="year-entry dob" id="year">YYYY</div>
    </div>
    <input type="hidden" id="dobInput" placeholder="Select Date of Birth" class="flatpickr-input">
    <h3>Type your DOB in the format of DD/MM/YYYY</h3>
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
const aboutMeHTML = `
    <textarea class="about-me-entry" spellcheck="false"></textarea>
    <h3 id="stream-year-warning-text">You can always change this in your profile settings</h3>
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
    const aboutMeIcon = document.getElementById("about-me-icon");
    
    const moveableItems = document.getElementById("moveable-items");
    const mainText = document.getElementById("main-text");
    const dataEntryContainer = document.getElementById("data-entry-container");
    const nextButtonContainer = document.getElementById("next-button-container");
    const progressBar = document.getElementById("progress-3");


    userName = textArea.value
    
    // if (counter == 0){
    //     if (userName.trim() == ""){
    //         return false
    //     }
    // }

    // if (counter == 2){
    //     if (selectedGender.trim() == ""){
    //         return false
    //     }
    // }
    // if (counter == 4){
    //     if (.trim() == ""){
    //         return false
    //     }
    // }
    counter += 1
    console.log(counter)




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
            altInput: true,
            altFormat: 'F j, Y',
            onClose: function(selectedDates, dateStr, instance) {
                if (selectedDates.length > 0) {
                    const selectedDate = selectedDates[0];
        
                    const day = String(selectedDate.getDate()).padStart(2, '0');
                    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                    const year = selectedDate.getFullYear();
        
                    document.getElementById('date').textContent = day;
                    document.getElementById('month').textContent = month;
                    document.getElementById('year').textContent = year;

                    const currentDate = new Date();
                    const age = currentDate.getFullYear() - selectedDate.getFullYear();
        
                    if (age < 18) {
                        console.log('You must be at least 18 years old.');
                    }
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
                    console.log(selectedGender);
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
        StreamYearWarningText.style.width = "80%"
        moveableItems.style.opacity = "1";
        mainText.style.opacity = "1";
        progressBar.style.width = "40%"

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
                aboutMeIcon.style.transform = "translateX(0px)";
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
                    dataEntryContainer.innerHTML = aboutMeHTML;
                    mainText.textContent = "About Me";
                    moveableItems.style.transform = "translateX(0px)";
                    mainText.style.transform = "translateX(0px)";
                    moveableItems.style.opacity = "1";
                    mainText.style.opacity = "1";
                    
            
                }, 300);
                aboutMeIcon.style.opacity = "1";
                religionIcon.style.opacity = "0";
                console.log("Name: ", userName, " Gender: ", selectedGender, " Drinking: ", drinkingStatus, " Smoking: ", smokingStatus," Looking For: ", dateStatus, " Religion: ", religionStatus)
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




flatpickr('#dobInput', {
    dateFormat: 'dd/mm/YYYY', // Set your desired date format
    altInput: true,
    altFormat: 'F j, Y',
    // onClose: function(selectedDates, dateStr, instance) {
    //     // Perform any additional logic on date selection
    // }
});

