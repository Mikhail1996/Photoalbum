// Код внутри main страницы редактирования
function configDescription(){
    var code = '<main><div class="photofield-redact">\
    <h3 class = "config-inf">1. Добавляем папки с фотографиями</h3>\
    <video controls="controls"><source  src="tutorial/vid (1).mp4" type="video/mp4">\
      <source src="tutorial/vid (1).webm" type="video/webm">\
      <source src="tutorial/vid (1).ogv" type="video/ogg"></video>\
    <h3 class = "config-inf">2. Редактируем конфигурацию</h3>\
    <video controls="controls"><source  src="tutorial/vid (2).mp4" type="video/mp4">\
      <source src="tutorial/vid (2).webm" type="video/webm">\
      <source src="tutorial/vid (2).ogv" type="video/ogg"></video>\
    <h3 class = "config-inf">3. Монтируем слайд-шоу</h3>\
    <video controls="controls"><source  src="tutorial/vid (3).mp4" type="video/mp4">\
      <source src="tutorial/vid (3).webm" type="video/webm">\
      <source src="tutorial/vid (3).ogv" type="video/ogg"></video>\
    <h3 class = "config-inf">4. Добавляем музыку</h3>\
    <video controls="controls"><source  src="tutorial/vid (4).mp4" type="video/mp4">\
      <source src="tutorial/vid (4).webm" type="video/webm">\
      <source src="tutorial/vid (4).ogv" type="video/ogg"></video>\
    <h3 class = "config-inf">5. Меняем фото на главной странице</h3>\
    <video controls="controls"><source  src="tutorial/vid (5).mp4" type="video/mp4">\
      <source src="tutorial/vid (5).webm" type="video/webm">\
      <source src="tutorial/vid (5).ogv" type="video/ogg"></video>\
    <h3 class = "config-inf">6. Что делать, если фото неправильно повёрнуты</h3>\
    <video controls="controls"><source  src="tutorial/vid (6).mp4" type="video/mp4">\
      <source src="tutorial/vid (6).webm" type="video/webm">\
      <source src="tutorial/vid (6).ogv" type="video/ogg"></video>\
    <h3 class = "config-inf">7. Редактируем карту</h3>\
    <video controls="controls"><source  src="tutorial/vid (7).mp4" type="video/mp4">\
      <source src="tutorial/vid (7).webm" type="video/webm">\
      <source src="tutorial/vid (7).ogv" type="video/ogg"></video>\
    </div></main>'
    return code;
}

// Перевод описания из скрипта config.js в html
function getConfig(photoAlbomConfig){
    photoAlbomConfig = photoAlbomConfig.replace(/god = /g, '</div><div class = "year"><p>');
    photoAlbomConfig = photoAlbomConfig.replace(/mesto = /g, '<div class="photoblock"><div class="photo"></div><p class="h3">');
    photoAlbomConfig = photoAlbomConfig.replace(/opisanie = /g, '<p>');
    photoAlbomConfig = photoAlbomConfig.replace(/,/g, '</p>');
    photoAlbomConfig = photoAlbomConfig.replace(/;/g, '</p></div>');
    photoAlbomConfig = photoAlbomConfig.replace('</div>', '');
    
    photoAlbomConfig += '</div>';
    
    photoAlbomConfig = '<main><div class="photofield">' +              photoAlbomConfig + '</div></main>';
    //console.log(photoAlbomConfig);
    
    return(photoAlbomConfig);
}

// Привязываем каждой картинке обработчик нажатия
function setImagesLinks(){
    // Кнопка показа слайд-шоу
    slideButton = document.getElementsByClassName('watchSlideShow')[0];
    slideButton.onclick = goToSlideViewer;
    // Кнопка "далее" - загружает следующие 30 картинок
    nextButton = document.getElementsByClassName('nextPictures')[0];
    nextButton.onclick = countNumberOfImages;
    allPictures = document.getElementsByClassName('photoblock_place');
    for (var ii=0; ii < (col-1); ii++){
        allPictures[ii].onclick = goToPhotoViewer;
    }
}

// Обработчик нажатия на кнопку старта слайд-шоу
function goToSlideViewer(){
    document.location.href = "slideViewer.html";
}

// Обработчик нажатия на картинку
function goToPhotoViewer(){
    //console.log('ok');
    localStorage.setItem('imgNumber', this.childNodes[0].id);
    document.location.href = "photoViewer.html";
    //window.open('photoViewer.html', 'photoViewer');
}

// Подсчёт количесвта картинок в выбранном месте и их вывод на экран
function countNumberOfImages(){
    picture.innerHTML += '<div class="photoblock_place"><img src="photo/' + placeNumber + '/img (' + col + ').jpg" height=150px alt="" id="'+col+'"></div>'; //Добавляем изображение на страницу
    var loadingImage = document.getElementById(col);
    loadingImage.onload = function(item) //Если изображение будет загружено, то цикл возобновляется и в переменную col прибавляется 1.
    {
        col++;
        if (col % numberOfPicturesOnPage != 1){
            //loadingImage.parentNode.onclick = goToPhotoViewer;
            //console.log(loadingImage.parentNode);
            countNumberOfImages();
        } else {
            setImagesLinks();
        }
    }
    loadingImage.onerror = function(item){
        localStorage.setItem('kolvoImagesThisPlace', col-1);
        setImagesLinks();
    }

    //col++;
    //countNumberOfImages(col);
}

// Загрузка картинок выбранного места
function setPlace(){   
    col = 1;
    picture = document.getElementById('place_photofield');
    countNumberOfImages();
}

// Обработка нажатия на блок места
function changePlace(){
    placeNumber = this.id;
    localStorage.setItem('placeNumber', this.id);
    $("main").replaceWith(mainInnnerCodePlace);
    setPlace();
}

// Возвращение на главную страницу
function toMain(){ 
    $("main").replaceWith(mainInnerCodeIndex);
    setBlocks();
}

// Переход на страницу карты
function toMap(){ 
    $("main").replaceWith(mainInnnerCodeMap);
    setBlocks();
}

// Переход на страницу редактирования
function toConfig(){
    $("iframe").replaceWith('<iframe hidden src="music/nomusic.mp3" allow="autoplay" type="audio/mpeg" loop></iframe>');
    $("main").replaceWith(mainInnnerCodeConfig);
    setBlocks();
}

// Привязка функции onClick к каждому месту
function setBlocks(){
    blocks = document.getElementsByClassName('photoblock');
    var mainPhoto = document.getElementsByClassName('photo');
    for (var i = 0; i < blocks.length; i++){
        blocks[i].id = blocks.length - i;
        blocks[i].onclick = changePlace; 
        mainPhoto[i].style.backgroundImage = 'url("photo/' + blocks[i].id + '/main.jpg")';
    };
}

// Массив для хранения блоков мест на главной странице
var blocks;
var placeNumber;
var picture;
var allPictures;
var slideButton;
var nextButton;
var col;

// Задание значений для программы
localStorage.setItem('slideShowNumberOfPictures', 150); //количество слайдов в слайд-шоу
localStorage.setItem('slideShowInterval', 4500); //время между переключением слайдов (мс)
var numberOfPicturesOnPage = 30; // количество изображений на одной странице до нажатия кнопки "далее"

// Получение данных о местах, карте и конфигурации главной страницы от скрипта config.js
var photoAlbomConfig = localStorage.getItem('photoAlbomConfig');
var linkToGoogleMap = localStorage.getItem('linkToGoogleMap');

console.log(linkToGoogleMap);

// Запись кода внутри main стартвовй страницы, чтобы по возвращении на неё восстановить первоначальный облик
var mainInnerCodeIndex = getConfig(photoAlbomConfig);/*"<main>" + document.getElementsByTagName('main')[0].innerHTML + "</main>";*/

// Кнопка "Главная"
var returnButton = document.getElementById('returnToMainButton');
returnButton.onclick = toMain;

// Кнопка "Карта"
var goToMap = document.getElementById('toMapButton');
goToMap.onclick = toMap;

// Кнопка "Карта"
var gotoConfig = document.getElementById('toConfigButton');
gotoConfig.onclick = toConfig;

// Код внутри main для места
var mainInnnerCodePlace = "<main><div class='photofield' id='place_photofield'><div class = 'watchSlideShow'>Смотреть слайд-шоу</div></div><div class = 'nextPictures'>Дальше</div></main>"

// Код внутри main для страницы карт
var mainInnnerCodeMap = "<main><div class='mapfield'><div class = 'map'><iframe src='" + linkToGoogleMap + /*https://www.google.com/maps/d/embed?mid=14WwjQH7Zek3luntam0Qx5FQ2AB-dduuM*/"' width='100%' height='100%'></iframe></div> </div>        </main>";

// Код внутри main для страницы редактирования
var mainInnnerCodeConfig = configDescription();

toMain();
setBlocks();

