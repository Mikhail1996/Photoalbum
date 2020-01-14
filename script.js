function setPlace(number){
    var picture = document.getElementById('place_photofield');
    picture.innerHTML += '<a class="photoblock-place" ><img src="photo/' + placeNumber + '/' + number + '.jpg" height=150px alt="No picture"></a>';
}

function setPhotoField(){
    var arrayImg = new Array();
    var img = new Image();
    for(var i=1; i<=12; i++){
        img.onload = function(){alert('картинка существует')};
        img.onerror = function(){alert('картинка не существует')};
        //img.src = 'photo/0/1.jpg';
        arrayImg.push(img);
    };
    for(var i=0; i<=11; i++){
        arrayImg[i].src = 'photo/0/'+i+'.jpg';
    };


        //img.onload = function(){setPlace(i)};
        //img.onerror = function(){alert('картинка не существует')};
        //img.onerror = function(){return true};
        //if (img.onerror){return}
        //setPlace(i);
    
}

/*if (block == undefined){
    var block = document.getElementById('photoblock_1');
    //setPhotoField();
    block.onclick = setPhotoField;
}*/
var placeNumber = localStorage['placeNumber'];
setPhotoField();