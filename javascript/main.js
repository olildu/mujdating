var Is_Exapanded = false;

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
            }, 300);
        setTimeout(() => {
            document.getElementById('settings').style.opacity = "1";
            
        }, 500);
        }, 300);

        Is_Exapanded = true;
    }
    else{
        document.getElementById('name1').style.display = "block";
        document.getElementById('header').style.opacity = "0";
        document.getElementById('match-candidate-container').style.display = "flex";
        setTimeout(() => {
            document.getElementById('profile-picture-div').style.animation = "back 0.3s ease-in"
            document.getElementById('back-icon').style.opacity = "0";
            document.getElementById('settings').style.opacity = "0";
            document.getElementById('header').style.display = "none";
            document.getElementById('half').style.justifyContent = "center";


            setTimeout(() => {
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

