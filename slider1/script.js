var leftBtn = document.querySelector('.left');
var rightBtn = document.querySelector('.right');
var sliderImgConteiner = document.querySelector('.sliderImgContainer');
var sliderContainer = document.querySelector('.sliderContainer');
var sliderPos = 0;
var imgCont = document.querySelectorAll('.sliderImgContainer img').length;
var sliderContainerNodes = Array.prototype.slice.call(document.querySelectorAll('.smallSliderImg'));


leftBtn.addEventListener('click', moveLeft);
rightBtn.addEventListener('click', moveRight);

sliderImgConteiner.addEventListener('mouseover', showRighttBtn);

leftBtn.addEventListener('mouseover', showLeftBtn);
rightBtn.addEventListener('mouseover', showRighttBtn);

sliderImgConteiner.addEventListener('mouseout', unShowLeftBtn);
sliderImgConteiner.addEventListener('mouseout', unShowRightBtn);

leftBtn.addEventListener('mouseout', unShowLeftBtn);
rightBtn.addEventListener('mouseout', unShowRightBtn);

for (var i = 0; i < sliderContainerNodes.length; i++) {
    sliderContainerNodes[i].addEventListener('click', showNecessarySlide);
}

function showLeftBtn() {
    leftBtn.style.display = 'block';
}
function showRighttBtn() {
    rightBtn.style.display = 'block';
}


function unShowLeftBtn() {
    leftBtn.style.display = 'none';
}
function unShowRightBtn() {
    rightBtn.style.display = 'none';
}


function moveRight() {
    sliderPos++;

    if (imgCont - 1 == sliderPos) {
        rightBtn.style.display = 'none';
        sliderImgConteiner.removeEventListener('mouseover', showRighttBtn);
    }

    sliderImgConteiner.addEventListener('mouseover', showLeftBtn);
    rightBtn.addEventListener('mouseout', unShowRightBtn);
    sliderImgConteiner.style = ('right:' + sliderPos * 500 + "px");
}

function moveLeft() {
    sliderPos--;
    if (sliderPos == 0) {
        leftBtn.style.display = 'none';
        sliderImgConteiner.removeEventListener('mouseover', showLeftBtn);
    }

    sliderImgConteiner.addEventListener('mouseover', showRighttBtn);
    leftBtn.addEventListener('mouseout', unShowLeftBtn);
    sliderImgConteiner.style = ('right:' + sliderPos * 500 + "px");
}

function showNecessarySlide() {
    var imgPos = sliderContainerNodes.indexOf(this);
    sliderImgConteiner.style = ('right:' + imgPos * 500 + "px");
    sliderPos = imgPos;
    console.log(imgPos)
    console.log(imgCont - 1)

    if (sliderPos == 0) {
        leftBtn.style.display = 'none';
        sliderImgConteiner.removeEventListener('mouseover', showLeftBtn);
        sliderImgConteiner.addEventListener('mouseover', showRighttBtn);
    } else if (imgCont - 1 == sliderPos) {
        rightBtn.style.display = 'none';
        sliderImgConteiner.removeEventListener('mouseover', showRighttBtn);
        sliderImgConteiner.addEventListener('mouseover', showLeftBtn);
    } else {
        sliderImgConteiner.addEventListener('mouseover', showLeftBtn);
        sliderImgConteiner.addEventListener('mouseover', showRighttBtn);
    }
}