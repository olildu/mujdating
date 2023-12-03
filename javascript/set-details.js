var move_next = 1;
var final_age = "";
var name;
var gender_identity = "";
var stream;
var year;
var image_upload_count = 0;
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

  document.getElementById("next_container").addEventListener("click", function () {
    if (move_next == 5){     
      if (image_upload_count < 2){
        document.getElementById("warning").textContent = "Please upload atleast 2 images";
        document.getElementById("warning").style.top = "600px";
        document.getElementById("warning").style.opacity = "1";

        console.log("Not enough images")
        return false
      }
      console.log("final reached")
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
      stream = document.getElementById("holder_text_stream").textContent
      year = document.getElementById("holder_text_year").textContent
      document.getElementById("warning").style.opacity = "0";
      document.getElementById("name_container").style.opacity = "0";
      // document.getElementById("major_items").innerHTML = "";

      setTimeout(() => {
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
        <div class="show_images">
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
      document.getElementById("major_items").innerHTML = imagehtml;

      document.getElementById('imageUploadForm').addEventListener('submit', function (event) {
        event.preventDefault();
      });
      var dropZone = document.getElementById('image1');

      dropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
      });

      dropZone.addEventListener('drop', function (e) {
        e.preventDefault();

        var files = e.dataTransfer.files;

        handleDroppedFiles(files, 1);
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

      var dropZone2 = document.getElementById('image3');

      dropZone2.addEventListener('dragover', function (e) {
        e.preventDefault();
      });

      dropZone2.addEventListener('drop', function (e) {
        e.preventDefault();

        var files = e.dataTransfer.files;

        handleDroppedFiles(files, 3);
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

      function handleDroppedFiles(files, counter) {
        if (files.length > 0) {
          var file = files[0];
          var reader = new FileReader();
          
          reader.onload = function (e) {
            image_upload_count += 1;
            document.getElementById("image"+counter).style.backgroundImage = 'url(' + e.target.result + ')';
            document.getElementById("image"+counter).style.backgroundSize = 'cover';
          };

          reader.readAsDataURL(file);
        }
      }
      document.getElementById('delete1').addEventListener('click', function (event) {
        image_upload_count -= 1;
        document.getElementById("image"+1).style.backgroundSize = '';
        document.getElementById("image"+1).style.backgroundImage = 'url(images/image.png)';

      })  
      document.getElementById('delete2').addEventListener('click', function (event) {
        image_upload_count -= 1;
        document.getElementById("image"+2).style.backgroundSize = '';
        document.getElementById("image"+2).style.backgroundImage = 'url(images/image.png)';

      })  
      document.getElementById('delete3').addEventListener('click', function (event) {
            image_upload_count -= 1;
            document.getElementById("image"+3).style.backgroundSize = '';
        document.getElementById("image"+3).style.backgroundImage = 'url(images/image.png)';

      })  
      document.getElementById('delete4').addEventListener('click', function (event) {
        image_upload_count -= 1;
        document.getElementById("image"+4).style.backgroundSize = '';
        document.getElementById("image"+4).style.backgroundImage = 'url(images/image.png)';

      })  

      }, 500);
      move_next += 1;
    }
    if (move_next == 3){     
      console.log(typeof(gender_identity))
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
        document.getElementById("genderList").remove()
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
            <p class="first" onclick="read_stream(this)">B.Tech</p>
            <p onclick="read_stream(this)">BBA</p>
            <p onclick="read_stream(this)">LLB</p>
            <p onclick="read_stream(this)">BA</p>
            <p onclick="read_stream(this)">B.Arch</p>
            <p onclick="read_stream(this)">B.Sc</p>
            <p onclick="read_stream(this)">BBA</p>
            <p onclick="read_stream(this)">B.Com</p>
            <p onclick="read_stream(this)">BCA</p>
            <p onclick="read_stream(this)">BCA (Hons.)</p>
            <p onclick="read_stream(this)">BHM</p>
            <p onclick="read_stream(this)">BBA HT</p>
            <p onclick="read_stream(this)">BA J&MC</p>
            <p onclick="read_stream(this)">LLB</p>
            <p onclick="read_stream(this)">BA-LLB (Hons.)</p>
            <p onclick="read_stream(this)">BBA-LLB (Hons.)</p>
            <p onclick="read_stream(this)">BDes (Fashion Design)</p>
            <p onclick="read_stream(this)">BFA (Applied Arts)</p>
            <p onclick="read_stream(this)">B.Des (Interior Design)</p>
            <p onclick="read_stream(this)">B.Des (UX-ID)</p>
            <p onclick="read_stream(this)">M.Arch (Landscape)</p>
            <p onclick="read_stream(this)">M.Des (Interior Design)</p>
            <p onclick="read_stream(this)">M.FA (Applied Arts)</p>
            <p onclick="read_stream(this)">M.Plan</p>
            <p onclick="read_stream(this)">M.A (English)</p>
            <p onclick="read_stream(this)">M.A (Economics)</p>
            <p onclick="read_stream(this)">M.Sc (Clinical Psychology)</p>
            <p onclick="read_stream(this)">M.Sc (Biotechnology)</p>
            <p onclick="read_stream(this)">M.Sc (Chemistry)</p>
            <p onclick="read_stream(this)">M.Sc (Mathematics)</p>
            <p onclick="read_stream(this)">M.Sc (Physics)</p>
            <p onclick="read_stream(this)">M.Com (Financial Analysis)</p>
            <p onclick="read_stream(this)">M.Tech</p>
            <p onclick="read_stream(this)">MA (J&MC)</p>
            <p onclick="read_stream(this)">LLM (Corporate Law)</p>
            <p onclick="read_stream(this)">LLM (IP Law)</p>
            <p onclick="read_stream(this)">LLM (Criminal Law)</p>
            <p onclick="read_stream(this)">MBA</p>
            <p onclick="read_stream(this)">MBA (BA)</p>
            <p onclick="read_stream(this)">PhD</p>
            </div>
        </div>
        <div class="hold" id="option_year" onclick="dropmenu_year();">
            <h1 id="holder_text_year">Choose year</h1>
            <span class="down_icon">
            expand_more
            </span>
            <div class="dropdown streams" id="dropdown_year">
            <p class="first" onclick="read_year(this)">1st year</p>
            <p onclick="read_year(this)">2nd year</p>
            <p onclick="read_year(this)">3rd year</p>
            <p onclick="read_year(this)">4th year</p>
            <p onclick="read_year(this)">5th year</p>
            </div>
        </div>
        </div>
    </div>`
        majorItems.innerHTML = htmlCode
        document.getElementById("year_stream_container").style.display = "block";
        move_next += 1;
        
      }, 500);

    }
    if (move_next == 2) {
        var selectedDay = document.getElementById("day").value;
        var selectedMonth = document.getElementById("month").value;
        var selectedYear = document.getElementById("year").value;

        var final_dob = selectedDay+"/"+selectedMonth+"/"+selectedYear
        calculateAgeAndFormat(final_dob)

        console.log(final_age);
        document.getElementById("name_container").style.opacity = "0";
        document.getElementById("next_container").style.opacity = "0";
        document.getElementById("name_entry").style.opacity = "0";
        document.getElementById("date_container").style.opacity = "0";

        setTimeout(() => {
          document.getElementById("label").innerHTML = "How do you identify yourself?";
          document.getElementById("instruction_label").remove();

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
                  console.log(gender_identity)
              });
          }
        }, 500);


        move_next = 3;

    } if (move_next == 1) {
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
      } else {
        document.getElementById("name_container").style.opacity = "0";
        document.getElementById("next_container").style.opacity = "0";
        document.getElementById("name_entry").style.opacity = "0";
  
        setTimeout(() => {
          document.getElementById("label").innerHTML = "Date of Birth";
          document.getElementById("instruction_label").innerHTML =
            "Hey " + name + ", enter your date of birth to continue";
          setTimeout(() => {
            document.getElementById("date_container").style.display = "flex";
            document.getElementById("date_container").style.opacity = "1";
            document.getElementById("name_container").style.opacity = "1";
            document.getElementById("next_container").style.opacity = "1";
            move_next = 2;
          }, 200);
        }, 400);
      }
    }
  });

// function selectItem(item) {
//   const items = document.querySelectorAll('li');
//   items.forEach((li) => li.classList.remove('selected'));

//   item.classList.add('selected');
//   gender_identity = item.textContent
// }

export function selectItem(item) {
  const items = document.querySelectorAll('li');
  items.forEach((li) => li.classList.remove('selected'));

  item.classList.add('selected');
  gender_identity = item.textContent
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('#genderList li').forEach(li => {
    li.addEventListener('click', function () {
      selectItem(this);
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Get all elements with the class name "li_style"
  var elements = document.getElementsByClassName("li_style");

  // Add click event listener to each element
  for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", function() {
          // Your click event handling code goes here
          console.log("Element clicked: " + this.textContent);
      });
  }
});