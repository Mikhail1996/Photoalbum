// Настройка отображения картинки
function showPicture(){
    photoSpace.src = 'photo/' + placeNumber + '/img (' + imageNumber + ').jpg';
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
    if (this.alt == 'go next'){
        imageNumber++;
        /*if(imageNumber > kolvoImagesThisPlace){
            imageNumber = 1;
        }*/
        showPicture();
    } else{
        imageNumber--;
        if(imageNumber < 1){
            imageNumber = 1;
        }
        showPicture();
    }
}

addEventListener("keydown", function(event) {
    if (event.keyCode == 27)
      history.go(-1);
});

var imageNumber = localStorage.getItem('imgNumber');
var placeNumber = localStorage.getItem('placeNumber');
var photoSpace = document.getElementById('photoViewerImage');
var kolvoImagesThisPlace = localStorage.getItem('kolvoImagesThisPlace');

showPicture();

var arrows = document.getElementsByClassName('photoViewerImageChanger');
var arrow;
for (var i=0; i<2; i++){
    arrow = arrows[i].getElementsByTagName('img')[0];
    arrow.onclick = changePicture;
    console.log(arrow.height);
    arrow.style.marginTop = Math.floor((document.documentElement.clientHeight - arrow.height) / 2) + 'px';
}
$("body").after('<iframe hidden src="music/' + placeNumber + '.mp3" allow="autoplay" type="audio/mpeg">');