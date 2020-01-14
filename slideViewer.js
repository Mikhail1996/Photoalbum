// Настройка отображения картинки
function showPicture(){
    photoSpace.src = 'photo/' + placeNumber + '/slides/img (' + imageNumber + ').jpg';
    photoSpace.height = document.documentElement.clientHeight;
    photoSpace.onload = function(item){
        photoSpace.style.marginTop = 0;
        //console.log(photoSpace);
        if (photoSpace.width > document.documentElement.clientWidth*0.7){
            var scale = photoSpace.height / photoSpace.width;
            photoSpace.height = document.documentElement.clientWidth*0.7*scale;
            photoSpace.style.marginTop = Math.floor((document.documentElement.clientHeight - photoSpace.height) / 2) + 'px';
        }
    }
}

// Смена картинки
function changePicture(){    
    imageNumber++;
    if(imageNumber > slideShowNumberOfPictures){
        console.log('the end');
        clearInterval(timer1);
    } else {
        console.log(imageNumber);
        showPicture();
    }
}

addEventListener("keydown", function(event) {
    if (event.keyCode == 27)
      history.go(-1);
});

var imageNumber = 1;
var placeNumber = localStorage.getItem('placeNumber');
var photoSpace = document.getElementById('photoViewerImage');
var slideShowNumberOfPictures = localStorage.getItem('slideShowNumberOfPictures');
var slideShowInterval = localStorage.getItem('slideShowInterval');

showPicture();
var timer1 = window.setInterval(function(){changePicture()}, slideShowInterval);
$("body").after('<iframe hidden src="music/' + placeNumber + '.mp3" allow="autoplay" type="audio/mpeg">');




