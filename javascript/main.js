var clickableImage = document.getElementById("image");

var counter = 1;

clickableImage.addEventListener("click", function() {

    const clickableImageRect = clickableImage.getBoundingClientRect();
    const centerX = clickableImageRect.left + clickableImageRect.width / 2;

    if (event.clientX < centerX) {
        counter -= 1;
        var vere_counter = counter+1;
        var tempImage = new Image();
    
        tempImage.src = "/images/me" + counter + ".jpg";
        tempImage.onerror = function() {
            counter = 4;
            console.log("bar"+vere_counter)

            clickableImage.style.backgroundImage = "url(/images/me" + counter + ".jpg)";
            document.getElementById("bar"+vere_counter).style.backgroundColor = "#CFCFCF";
            document.getElementById("bar"+4).style.backgroundColor = "white";
        };

        document.getElementById("bar"+counter).style.backgroundColor = "white";
        document.getElementById("bar"+vere_counter).style.backgroundColor = "#CFCFCF";
        clickableImage.style.backgroundImage = "url(/images/me" + counter + ".jpg)";
    } 
    else {
        counter += 1;
        var vere_counter = counter-1;
        var tempImage = new Image();
    
        tempImage.src = "/images/me" + counter + ".jpg";
    
        tempImage.onerror = function() {
            counter = 1;
            clickableImage.style.backgroundImage = "url(/images/me" + counter + ".jpg)";
            document.getElementById("bar"+vere_counter).style.backgroundColor = "#CFCFCF";
            document.getElementById("bar"+1).style.backgroundColor = "white";
    
        };
        document.getElementById("bar"+counter).style.backgroundColor = "white";
        document.getElementById("bar"+vere_counter).style.backgroundColor = "#CFCFCF";
        clickableImage.style.backgroundImage = "url(/images/me" + counter + ".jpg)";
    }


});