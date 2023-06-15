// 이미지 슬라이드
const mainimg = document.querySelector(".cont1 .left .mainImg img");
const prevArrow = document.querySelector(".cont1 .left .mainImg .arrows .prev");
const nextArrow = document.querySelector(".cont1 .left .mainImg .arrows .next");
const subImgWrap = document.querySelector(".cont1 .left .subImg .subImgWrap");
const subImgs = document.querySelectorAll(".cont1 .left .subImg .imglist");
const subImgSelBox = document.querySelector(".left .subImg .subImgWrap .subImgselect");

let imgCount = 0;
let selBoxCount = 0;

// 각 이미지 주소들을 배열(imgHref) 안에 삽입
let imgHref = [];

for(let i = 0; i < subImgs.length; i++){
    imgHref[i] = subImgs[i].querySelector("img").src;
}   

// 삽입된 주소 중 이미지 이름만 추출하여 배열(imgHref) 재삽입
imgHref  = imgHref.map(url => url.split("upload/")[1]);
for(let i = 0; i < subImgs.length; i++){
    subImgs[i].onclick = function(){
        mainimg.src = `/upload/${imgHref[i]}`;
    }
}

// 메인이미지 이전버튼 클릭 시
prevArrow.onclick = function(){
    if(imgCount == 0){
        imgCount = subImgs.length - 1;
    }
    else {
        imgCount--;
    }
    
    mainimg.src = `/upload/${imgHref[imgCount]}`;

    selBoxMovePrev();
}
// 메인이미지 이후버튼 클릭 시
nextArrow.onclick = function(){
    if(imgCount == subImgs.length - 1){
        imgCount = 0;
    }
    else {
        imgCount++;
    }
    
    mainimg.src = `/upload/${imgHref[imgCount]}`;

    selBoxMoveNext();
}



// 서브 이미지들 제어를 위한 태그 선택
const subImgWholeWrap = document.querySelector(".cont1 .left .subImg");
const subArrowPrev = document.querySelector(".cont1 .left .subImgList .prev");
const subArrowNext = document.querySelector(".cont1 .left .subImgList .next");
const subImgsAttribute = [];

// 서브이미지 갯수에 따라 width값 조정하기 위한 변수 세팅
let viewcount = 5;
let subImgWrapNum = Math.ceil(subImgs.length / viewcount);

// 서브이미지 갯수에 따라 width값 조정
subImgWrap.style.width = subImgWrapNum * 100 + "%";
subImgSelBox.style.width = `calc((${100 / subImgWrapNum}% - ${(viewcount - 1) * 10}px) / ${viewcount})`;

for (let i = 0; i < subImgs.length; i++) {
  subImgs[i].style.width = `calc((${100 / subImgWrapNum}% - ${(viewcount - 1) * 10}px) / ${viewcount})`;

  // subImgs의 사용자정의 속성 index값을 배열안에 삽입
  subImgsAttribute[i] = subImgs[i].getAttribute("data-index");
}

// 캐러셀 이동을 위한 변수 세팅
let mainImgChangeCount = 0;

subArrowNext.onclick = function(){
    // if(mainImgChangeCount === 7){

    // }
    mainimg.src = `/upload/${imgHref[mainImgChangeCount]}`;
    selBoxMoveNext();
}
subArrowPrev.onclick = function(){
    selBoxMovePrev();
}



function selBoxMoveNext(){
    if(selBoxCount === 4){
        selBoxCount === 4;
        subImgSelBox.style.marginLeft = (selBoxCount * 20) + "%";
    }
    else {
        selBoxCount++;
        subImgSelBox.style.marginLeft = 
        `calc((${100 / subImgWrapNum}% - ${(viewcount - 1) * 10}px) / ${viewcount} * ${selBoxCount} + ${selBoxCount * 8}px)`;
    }
}
function selBoxMovePrev(){
    if(selBoxCount === 0){
        selBoxCount === 0;
        // subImgSelBox.style.marginLeft = (selBoxCount * (100/subImgs.length) - ) + "%";
        subImgSelBox.style.marginLeft = 
        `calc((${100 / subImgWrapNum}% - ${(viewcount - 1) * 10}px) / ${viewcount})`;
    }
    else {
        selBoxCount--;
        subImgSelBox.style.marginLeft = (selBoxCount * 20) + "%";
    }
}