// 이미지 슬라이드
const mainimg = document.querySelector(".cont1 .left .mainImg img");
const prevArrow = document.querySelector(".cont1 .left .mainImg .arrows .prev");
const nextArrow = document.querySelector(".cont1 .left .mainImg .arrows .next");
const subImgWrap = document.querySelector(".cont1 .left .subImg .subImgWrap");
const subImgs = document.querySelectorAll(".cont1 .left .subImg .imglist");
const subImgSelBox = document.querySelector(".left .subImg .subImgWrap .subImgselect");

// 서브 이미지들 제어를 위한 태그 선택
const subImgWholeWrap = document.querySelector(".cont1 .left .subImg");
const subArrowPrev = document.querySelector(".cont1 .left .subImgList .prev");
const subArrowNext = document.querySelector(".cont1 .left .subImgList .next");
const subImgsAttribute = [];

// 서브이미지 갯수에 따라 width값 조정하기 위한 변수 세팅
let viewcount = 5;
let subImgWrapNum = Math.ceil(subImgs.length / viewcount);

// 이미지 주소 변경을 위한 변수
let imgCount = 0;
// 셀렉트 박스 이동을 위한 변수
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

    selBoxMovePrev(); // subImgSelBox 위치 이동
}
// 메인이미지 이후버튼 클릭 시
nextArrow.onclick = function(){
    if(imgCount == subImgs.length - 1){
        imgCount = 0;
    }
    else {
        imgCount++;
    }

    if(imgCount == subImgsAttribute[5]){
        subImgWrap.style.transform = `translateX(${imgCount * -11}%)`;
    }
    
    mainimg.src = `/upload/${imgHref[imgCount]}`;

    selBoxMoveNext(); // subImgSelBox 위치 이동
}



// 서브이미지 갯수에 따라 subImgWrap 박스를 width값 조정
subImgWrap.style.width = subImgWrapNum * 100 + "%";
// 서브이미지 갯수에 따라 subImgSelBox 박스를 width값 조정
subImgSelBox.style.width = `calc((${100 / subImgWrapNum}% - ${(viewcount - 1) * 10}px) / ${viewcount})`;

// 서브이미지 갯수에 따라 subImgs 박스들의 width값 조정
for (let i = 0; i < subImgs.length; i++) {
  subImgs[i].style.width = `calc((${100 / subImgWrapNum}% - ${(viewcount - 1) * 10}px) / ${viewcount})`;

  // subImgs의 사용자정의 속성 index값을 배열안에 삽입
  subImgsAttribute[i] = Number(subImgs[i].getAttribute("data-index"));
}

// 캐러셀 이동을 위한 변수 세팅
let mainImgChangeCount = 0;

// 서브 이미지 이후 버튼 클릭 시
subArrowNext.onclick = function(){
    if(mainImgChangeCount === subImgs.length - 1){
        mainImgChangeCount === 0;
    }
    else {
        mainImgChangeCount++;
    }
    mainimg.src = `/upload/${imgHref[mainImgChangeCount]}`;

    selBoxMoveNext(); // subImgSelBox 위치 이동
}
// 서브 이미지 이전 버튼 클릭 시
subArrowPrev.onclick = function(){

    if(mainImgChangeCount === 0){
        mainImgChangeCount === subImgs.length - 1;
    }
    else {
        mainImgChangeCount--;
    }
    mainimg.src = `/upload/${imgHref[mainImgChangeCount]}`;

    selBoxMovePrev(); // subImgSelBox 위치 이동
}


// 서브이미지 리스트들의 left 값을 계산하여 subImgSelBox의 위치를 조정함
let leftPosition = 0; // 초기 left 값 설정

// div 리스트들의 left 위치를 계산하여 변수에 할당합니다.
const positions = [];

for (let i = 0; i < subImgs.length; i++) {
  const subImgWrap = subImgs[i];

  // div 요소의 width 값을 가져옵니다.
  const width = subImgWrap.offsetWidth;

  // div 요소의 margin-right 값을 가져옵니다.
  const marginRight = parseInt(getComputedStyle(subImgWrap).marginRight);

  // 현재 div 요소의 left 위치 값을 계산합니다.
  const currentLeft = leftPosition;

  // left 값을 업데이트합니다.
  leftPosition += width + marginRight;

  // 현재 div 요소의 left 위치를 변수에 저장합니다.
  positions.push(currentLeft);
}

function selBoxMoveNext(){
    if(selBoxCount === 5){
        selBoxCount === 5;
        subImgSelBox.style.marginLeft = positions[selBoxCount] + "px";
    }
    else {
        selBoxCount++;
        subImgSelBox.style.marginLeft = positions[selBoxCount] + "px";
    }
}
function selBoxMovePrev(){
    if(selBoxCount === 0){
        selBoxCount === 0;
        subImgSelBox.style.marginLeft = positions[selBoxCount] + "px";
    }
    else {
        selBoxCount--;
        subImgSelBox.style.marginLeft = positions[selBoxCount] + "px";
    }
}