import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getDatabase, ref, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-9Qn2vcSYGZbLngJXB2ZFAapVQsj0LW0",
  authDomain: "mujdating.firebaseapp.com",
  projectId: "mujdating",
  storageBucket: "mujdating.appspot.com",
  messagingSenderId: "889381416201",
  appId: "1:889381416201:web:f78fef222a119ac01cb7d8",
  measurementId: "G-DNPCWREVLW",
  databaseURL: "https://mujdating-default-rtdb.asia-southeast1.firebasedatabase.app"
};

var move_next = 1;
var final_age = "";
var name;
var gender_identity = "";
var stream;
var year;
var date_of_birth;
var image_upload_count = 0;
var counter = 1;
var uid;

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const storage = getStorage();

onAuthStateChanged(auth, (user) => {
  if (user == null) {
      window.location = '/index.html';
  }
  else{
      uid = auth.currentUser.uid
  }
});

function dataURItoFile(dataURI, fileName) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const uint8Array = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  const file = new File([uint8Array], fileName, { type: mimeString });
  return file;
}

function handleEnterKey(event){
  if (event.key === 'Enter') {
    document.getElementById("next_container").click()
  }
}

function isOnlySpaces(input) {
    return /^\s*$/.test(input);
}

function calculateAgeAndFormat(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - dob.getFullYear();
  if (currentDate.getMonth() < dob.getMonth() || (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())) {
      age--;
  }
  final_age = age;
}


document.getElementById('name_entry').addEventListener('keydown', handleEnterKey)

document.getElementById("next_container").addEventListener("click", function () {
  if (move_next == 5){     
    if (image_upload_count < 2){
      document.getElementById("warning").textContent = "Please upload atleast 2 images";
      document.getElementById("warning").style.top = "600px";
      document.getElementById("warning").style.opacity = "1";
      return false
    }
    else{
      // document.getElementById('upper').onclick = null;
      // document.getElementById("upper").style.zIndex = 10;

      document.getElementById("container").style.opacity = "0"
      document.getElementById("all_elements").style.opacity = "0";
      document.getElementById("back-div").style.opacity = "0"

      var body = document.body;



      setTimeout(() => {
        document.getElementById("container").remove()
        document.getElementById("all_elements").remove()
        document.getElementById("back-div").remove()
        
        body.style.display = 'flex';
        body.style.alignContent = 'center';
        body.style.justifyContent = 'center';
        body.style.alignItems = 'center';
        body.style.flexWrap = 'wrap';
      }, 1000);

      body.style.height = '100vh';
      body.style.backgroundSize = '400% 400%';
      body.style.backgroundImage = 'linear-gradient(-45deg, #193046, #193046, #bf275a, #bf275a)';

      document.getElementById("background_container").style.zIndex = 11;
      document.getElementById("background_container").style.display = "flex";

      // document.getElementById("upper").style.display = "block";



      setTimeout(() => {
        document.getElementById("upper").style.backgroundColor = "#bf275a"
        document.getElementById("background_container").style.opacity = 1;

    }, 200);

      update(ref(database, "/" + '/users/'+gender_identity+"/" + uid ), {name: name})
      update(ref(database, "/" + '/users/'+gender_identity+"/" + uid ), {age: final_age})
      update(ref(database, "/" + '/users/'+gender_identity+"/" + uid ), {stream: stream})
      update(ref(database, "/" + '/users/'+gender_identity+"/" + uid ), {year: year})
      update(ref(database, "/" + '/users/'+gender_identity+"/" + uid ), {date_of_birth: date_of_birth})

      let promises = [];

      for (let i = 1; i < 5; i++) {
        var image_id = "image" + i;
        const element = document.getElementById(image_id);
        const backgroundImage = element.style.backgroundImage;

        if (backgroundImage != "") {
          try {
            const base64Data = backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            const file = dataURItoFile(base64Data, image_id);

            const storageRef = sRef(storage, `user-images/${uid}/${image_id}.jpg`);
            
            promises.push(
              uploadBytes(storageRef, file).then(() => {
                return getDownloadURL(storageRef);
              })
            );
          } catch (error) {
            console.log(error);
          }
        }
      }

      Promise.all(promises)
        .then(downloadURLs => {
          var length = downloadURLs.length;
          console.log(length);
          console.log(downloadURLs);

          update(ref(database, "/" + '/users/' + gender_identity + "/" + uid ), { images_count: length });

          for (let i = 0; i < length; i++) {
            update(ref(database, "/" + '/users/' + gender_identity + "/" + uid + "/images_links"), { ["image" + (i + 1)]: downloadURLs[i] });
          }
          setTimeout(() => {
            document.getElementById("background_container").style.display = "none";
            document.getElementById("terms-box").style.display = "flex";
            setTimeout(() => {
              document.getElementById("terms-box").style.opacity = "1";
            }, 100);

            document.getElementById('accept').addEventListener('click', function(event){
              document.getElementById('terms-box').style.opacity = "0";
              setTimeout(() => {
                document.getElementById('terms-box').style.display = "none";
                document.body.style.animation = "gradient 3s ease forwards 1"
                document.getElementById('wrapper').style.display = "flex";
                setTimeout(() => {
                  document.getElementById('wrapper').style.opacity = "1";
                }, 300);
              }, 500);
            });

          }, 2000);



        })
        .catch(error => {
          console.log(error);
        });



    }
  }
  if (move_next == 4){
    if (document.getElementById("holder_text_stream").textContent == "Choose stream"){
      document.getElementById("warning").innerText = "Please fill the options";
      setTimeout(() => {
        document.getElementById("warning").style.opacity = "1";
      }, 500);
      return false
    }
    if (document.getElementById("holder_text_year").textContent == "Choose year"){
      document.getElementById("warning").innerText = "Please fill the options";
      setTimeout(() => {
        document.getElementById("warning").style.opacity = "1";
      }, 500);
      return false
    }
    document.getElementById("back-div").onclick = move_next4;
    document.getElementById("year_stream_container").style.opacity = "0";

    stream = document.getElementById("holder_text_stream").textContent
    year = document.getElementById("holder_text_year").textContent
    document.getElementById("warning").style.opacity = "0";
    document.getElementById("name_container").style.opacity = "0";
    // document.getElementById("major_items").innerHTML = "";

    setTimeout(() => {
      document.getElementById("year_stream_container").style.display = "none";

      document.getElementById("label").innerText = "Upload your Images";
      document.getElementById("name_container").style.opacity = "1";
      var imagehtml = `
      <h1 class="instruction_label" id="instruction_label">Click to upload or drag your images to the block</h1>
      <div class="upload-container">
      <form id="imageUploadForm">
          <label for="imageInput">Choose an image:</label>
          <input type="file" id="imageInput" name="imageInput" accept="image/*">
          <img id="imagePreview" src="#" alt="Image Preview">
          <button type="submit">Upload</button>
      </form>
  </div>
      <div class="show_images" id="show_images">
      <div class="images" id="image1" >
        <div class="close_container" id="delete1">
          <span class="close_element">
            close
            </span>
        </div>

      </div>
      <div class="images" id="image2">
        <div class="close_container" id="delete2">
          <span class="close_element">
            close
            </span>
        </div>
      </div>
      <div class="images" id="image3">
        <div class="close_container" id="delete3">
          <span class="close_element">
            close
            </span>
        </div>
      </div>
      <div class="images" id="image4" >
        <div class="close_container" id="delete4">
          <span class="close_element">
            close
            </span>
        </div>
      </div>
    </div>
      `;
      
    document.getElementById("major_items").innerHTML += imagehtml;
    var fileInput = document.getElementById('imageInput');

    document.getElementById('imageUploadForm').addEventListener('submit', function (event) {
      event.preventDefault();
    });
    var dropZone = document.getElementById('image1');
    dropZone.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    dropZone.addEventListener('click', function(e) {
      e.preventDefault();
      fileInput.click();
      var files = document.getElementById("imageInput");
      counter = 1;
      handleDroppedFiles1(files);
    });

    dropZone.addEventListener('drop', function (e) {
      e.preventDefault();

      var files = e.dataTransfer.files;
      handleDroppedFiles(files, 1, false);
    });

    var dropZone1 = document.getElementById('image2');

    dropZone1.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    dropZone1.addEventListener('drop', function (e) {
      e.preventDefault();

      var files = e.dataTransfer.files;

      handleDroppedFiles(files, 2);
    });
    dropZone1.addEventListener('click', function(e) {
      e.preventDefault();
      fileInput.click();
      var files = document.getElementById("imageInput");
      counter = 2;
      handleDroppedFiles1(files);
    });

    var dropZone2 = document.getElementById('image3');
    dropZone2.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    dropZone2.addEventListener('drop', function (e) {
      e.preventDefault();
      var files = e.dataTransfer.files;
      handleDroppedFiles(files, 3);
    });
    dropZone2.addEventListener('click', function(e) {
      e.preventDefault();
      fileInput.click();
      var files = document.getElementById("imageInput");
      counter = 3;
      handleDroppedFiles1(files);
    });

    var dropZone3 = document.getElementById('image4');
    dropZone3.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    dropZone3.addEventListener('drop', function (e) {
      e.preventDefault();
      var files = e.dataTransfer.files;
      handleDroppedFiles(files, 4);
    });
    dropZone3.addEventListener('click', function(e) {
      e.preventDefault();
      fileInput.click();
      var files = document.getElementById("imageInput");
      counter = 4;
      handleDroppedFiles1(files, 4);
    });

    function handleDroppedFiles(files, counter) {
      if (files.length > 0) {
        var file = files[0];
        var reader = new FileReader();
    
        reader.onload = function (e) {
          var currentImage = document.getElementById("image" + counter).style.backgroundImage;
          if (currentImage.length === 0) {
            image_upload_count += 1;
          }
          else{
          }
          console.log(image_upload_count)
          document.getElementById("image" + counter).style.backgroundImage = 'url(' + e.target.result + ')';
          document.getElementById("image" + counter).style.backgroundSize = 'cover';
        };
    
        reader.readAsDataURL(file);
      }
    }
    fileInput.addEventListener('change', async function() {
      var files = document.getElementById("imageInput").files;
      await handleDroppedFiles1(files, counter);
    });
    
    async function handleDroppedFiles1(files, counter) {

      if (files.length > 0) {
        var file = files[0];
        const result = await readFileAsync(file);

        var currentImage = document.getElementById("image" + counter).style.backgroundImage;
        if (currentImage.length === 0) {
          image_upload_count += 1;
        }
        else{
        }
        console.log(image_upload_count)

        document.getElementById("image" + counter).style.backgroundImage = 'url(' + result + ')';
        document.getElementById("image" + counter).style.backgroundSize = 'cover';
      }
    }
    
    function readFileAsync(file) {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
    
        reader.onload = function (e) {
          resolve(e.target.result);
        };
    
        reader.onerror = function (e) {
          reject(e);
        };
    
        reader.readAsDataURL(file);
      });
    }
    

    document.getElementById('delete1').addEventListener('click', function (event) {
      event.stopPropagation();
      image_upload_count -= 1;
      document.getElementById("image"+1).style.backgroundSize = '';
      document.getElementById("image"+1).style.backgroundImage = 'url(images/image.png)';

    })  
    document.getElementById('delete2').addEventListener('click', function (event) {
      event.stopPropagation();
      image_upload_count -= 1;
      document.getElementById("image"+2).style.backgroundSize = '';
      document.getElementById("image"+2).style.backgroundImage = 'url(images/image.png)';

    })  
    document.getElementById('delete3').addEventListener('click', function (event) {
      event.stopPropagation();
      image_upload_count -= 1;
      document.getElementById("image"+3).style.backgroundSize = '';
      document.getElementById("image"+3).style.backgroundImage = 'url(images/image.png)';

    })  
    document.getElementById('delete4').addEventListener('click', function (event) {
      event.stopPropagation();
      image_upload_count -= 1;
      document.getElementById("image"+4).style.backgroundSize = '';
      document.getElementById("image"+4).style.backgroundImage = 'url(images/image.png)';

    })  

    }, 500);
    move_next += 1;
  }
  if (move_next == 3){     
    if (gender_identity.trim().length === 0){
      document.getElementById("warning").innerText = "Please select an option";
      setTimeout(() => {
        document.getElementById("warning").style.opacity = "1";
      }, 500);
    return false
    } 
    document.getElementById("warning").style.opacity = "0";
    document.getElementById("name_container").style.opacity = "0";
    document.getElementById("next_container").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("label").innerHTML = "Enter your stream and year";
      document.getElementById("genderList").style.display = "none"
      document.getElementById("name_container").style.opacity = "1";
      document.getElementById("next_container").style.opacity = "1";
      var majorItems = document.getElementById('major_items');
      var htmlCode= `<div class="year_stream_container" id="year_stream_container">
      <div class="option_container">
      <div class="hold" id="option_stream" onclick="dropmenu_stream();">
          <h1 id="holder_text_stream">Choose stream</h1>
          <span class="down_icon">
          expand_more
          </span>
          <div class="dropdown" id="dropdown_streams">
            <div class="dropdown_sub" onclick="read_stream(this)"><p class="first" onclick="read_stream(this)">B.Tech</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>BBA</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>LLB</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>BA</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>B.Arch</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>B.Sc</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>BBA</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>B.Com</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>BCA</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>BCA (Hons.)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>BHM</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>BBA HT</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>BA J&MC</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>LLB</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>BA-LLB (Hons.)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>BBA-LLB (Hons.)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>BDes (Fashion Design)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>BFA (Applied Arts)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>B.Des (Interior Design)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>B.Des (UX-ID)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>M.Arch (Landscape)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>M.Des (Interior Design)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>M.FA (Applied Arts)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>M.Plan</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>M.A (English)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>M.A (Economics)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>M.Sc (Clinical Psychology)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>M.Sc (Biotechnology)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>M.Sc (Chemistry)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>M.Sc (Mathematics)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>M.Sc (Physics)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>M.Com (Financial Analysis)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>M.Tech</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>MA (J&MC)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>LLM (Corporate Law)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>LLM (IP Law)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>LLM (Criminal Law)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>MBA</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>MBA (BA)</p></div>
            <div class="dropdown_sub" onclick="read_stream(this)"><p>PhD</p></div>
          </div>
      </div>
      <div class="hold" id="option_year" onclick="dropmenu_year();">
          <h1 id="holder_text_year">Choose year</h1>
          <span class="down_icon">
          expand_more
          </span>
          <div class="dropdown streams" id="dropdown_year">
            <div onclick="read_year(this)" class="dropdown_sub"><p class="first" onclick="read_year(this)">1st year</p></div>
            <div onclick="read_year(this)" class="dropdown_sub"><p onclick="read_year(this)">2nd year</p></div>
            <div onclick="read_year(this)" class="dropdown_sub"><p onclick="read_year(this)">3rd year</p></div>
            <div onclick="read_year(this)" class="dropdown_sub"><p onclick="read_year(this)">4th year</p></div>
            <div onclick="read_year(this)" class="dropdown_sub"><p onclick="read_year(this)">5th year</p></div>
          </div>
      </div>
      </div>
  </div>`
      majorItems.innerHTML += htmlCode
      document.getElementById("year_stream_container").style.display = "block";
      move_next += 1;
      document.getElementById("back-div").onclick = move_next3;
      
    }, 500);

  }
  if (move_next == 2) {
      var selectedDay = document.getElementById("day").value;
      var selectedMonth = document.getElementById("month").value;
      var selectedYear = document.getElementById("year").value;

      var final_dob = selectedDay+"/"+selectedMonth+"/"+selectedYear
      date_of_birth = final_dob;
      calculateAgeAndFormat(final_dob)

      document.getElementById("name_container").style.opacity = "0";
      document.getElementById("next_container").style.opacity = "0";
      document.getElementById("name_entry").style.opacity = "0";
      document.getElementById("date_container").style.opacity = "0";

      setTimeout(() => {

        document.getElementById('label').addEventListener('click', function (event) {
          move_next = 1;
          document.getElementById("name_container").style.opacity = "0";
          setTimeout(() => {
            
            document.getElementById("label").innerHTML = "Date of Birth";
            document.getElementById("major_items").innerHTML += `<h1 class="instruction_label" id="instruction_label">The name you enter will be displayed all over MUJ Dating</h1>`
            document.getElementById("instruction_label").innerHTML = "Hey " + name + ", enter your date of birth to continue";
            document.getElementById("date_container").style.display = "block";
            document.getElementById("date_container").style.opacity = "1";
            document.getElementById("next_container").style.opacity = "1";

          }, 500);
        })

        document.getElementById("label").innerHTML = "How do you identify yourself?";
        document.getElementById("instruction_label").remove();
        document.getElementById("back-div").onclick = move_next2;

        const div = document.getElementById("major_items");
        div.innerHTML += '<ul id="genderList" class="genderList"><li class="li_style">Male</li><li class="li_style">Female</li><li class="li_style">Others</li></ul>'
        document.getElementById("date_container").style.display = "none"
        document.getElementById("name_entry").style.display = "none"
        
        document.getElementById("name_container").style.opacity = "1";
  
        document.getElementById("next_container").style.opacity = "1";
        var elements = document.getElementsByClassName("li_style");

        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener("click", function() {
                const items = document.querySelectorAll('li');
                items.forEach((li) => li.classList.remove('selected'));
              
                this.classList.add('selected');
                gender_identity = this.textContent
            });
        }
      }, 500);


      move_next = 3;

  } 
  if (move_next == 1) {
    name = document.getElementById("name_entry").value;
    var warning_doc = document.getElementById("warning");
    warning_doc.style.opacity = "0";

    if (name == "") {
      warning_doc.style.display = "block";
      warning_doc.style.animation = "fadein 0.5s ease";
      warning_doc.style.opacity = "1";
      return false;
    }
    if (isOnlySpaces(name)) {
      warning_doc.style.display = "block";
      warning_doc.style.animation = "fadein 0.5s ease";
      warning_doc.style.opacity = "1";
      return false;
    } 
    else {
      document.getElementById("name_container").style.opacity = "0";
      document.getElementById("next_container").style.opacity = "0";
      document.getElementById("name_entry").style.opacity = "0";
      document.getElementById("back-div").style.opacity = "0";
      
      setTimeout(() => {
        console.log("HERE")
        document.getElementById('name_entry').removeEventListener('keydown', handleEnterKey);
        document.getElementById("date_container").style.display = "flex";
        document.getElementById("date_container").style.opacity = "1";
        document.getElementById("back-div").style.opacity = "1";
        // document.getElementById("back-div").id = "back-div1";
        document.getElementById("back-div").onclick = move_next1;
        document.getElementById("name_container").style.opacity = "1";
        document.getElementById("next_container").style.opacity = "1";
        document.getElementById("label").innerHTML = "Date of Birth";
        document.getElementById("instruction_label").innerHTML = "Hey " + name + ", enter your date of birth to continue";
        move_next = 2;
      }, 500);
    }
  }
})

function move_next1(){
  move_next = 1;
  document.getElementById("name_container").style.opacity = "0";
  document.getElementById("date_container").style.opacity = "0";
  document.getElementById("back-div").style.opacity = "0";
  
  setTimeout(() => {
    document.getElementById('name_entry').addEventListener('keydown', handleEnterKey);
    document.getElementById("label").innerHTML = "Enter your name";
    document.getElementById("name_container").style.opacity = "1";
    document.getElementById("name_entry").style.opacity = "1";
    document.getElementById("name_entry").style.display = "block";
    document.getElementById("date_container").style.display = "none";
    try{
      document.getElementById("instruction_label").innerHTML = "The name you enter will be displayed all over MUJ Dating"
    }
    catch{

    }
    document.getElementById("next_container").style.opacity = "1";
      }, 500);
}

function move_next2(){
    document.getElementById("name_container").style.opacity = "0";
    document.getElementById("date_container").style.opacity = "0";
    setTimeout(() => {
      move_next = 2;
      document.getElementById("back-div").onclick = move_next1;
      document.getElementById("label").innerHTML = "Date of Birth";
      document.getElementById("name_container").style.opacity = "1";
      document.getElementById("name_entry").style.opacity = "1";
      document.getElementById("date_container").style.opacity = "1";
      document.getElementById("date_container").style.display = "block";
      document.getElementById("genderList").remove();
      document.getElementById("major_items").innerHTML += '<h1 class="instruction_label" id="instruction_label">Hey ' + name + ', enter your date of birth to continue</h1>'
      document.getElementById("next_container").style.opacity = "1";
    }, 500);
}

function move_next3(){
  document.getElementById("name_container").style.opacity = "0";
  document.getElementById("date_container").style.opacity = "0";
  setTimeout(() => {
    move_next = 3;
    document.getElementById("back-div").onclick = move_next2;
    document.getElementById("label").innerHTML = "How do you identify yourself?";
    document.getElementById("name_container").style.opacity = "1";
    document.getElementById("name_entry").style.opacity = "1";
    document.getElementById("date_container").style.opacity = "1";
    document.getElementById("date_container").style.display = "none";
    document.getElementById("genderList").style.display = "flex ";
    document.getElementById("year_stream_container").style.display = "none";
    
    // document.getElementById("major_items").innerHTML += '<ul id="genderList" class="genderList"><li class="li_style">Male</li><li class="li_style">Female</li><li class="li_style">Others</li></ul>'

    // document.getElementById("instruction_label").innerHTML = "Hey " + name + ", enter your date of birth to continue";
    document.getElementById("next_container").style.opacity = "1";
    var elements = document.getElementsByClassName("li_style");

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", function() {
            const items = document.querySelectorAll('li');
            items.forEach((li) => li.classList.remove('selected'));
          
            this.classList.add('selected');
            gender_identity = this.textContent
        });
    }

  }, 500);
}

function move_next4(){
  document.getElementById("name_container").style.opacity = "0";
  document.getElementById("date_container").style.opacity = "0";
  document.getElementById("year_stream_container").style.display = "block";
  document.getElementById("instruction_label").style.opacity = "0";
  document.getElementById("show_images").style.opacity = "0";
  document.getElementById("warning").style.opacity = "0";
  
  
  setTimeout(() => {
    move_next = 4;
    document.getElementById("label").innerHTML = "Enter your stream and year";
    document.getElementById("show_images").style.display = "none";
    document.getElementById("instruction_label").remove();
    document.getElementById("show_images").remove();
    
    document.getElementById("back-div").onclick = move_next3;
    document.getElementById("name_container").style.opacity = "1";
    document.getElementById("year_stream_container").style.opacity = "1";

  }, 500);
}