// 이미지 슬라이드
const mainimg = document.querySelector(".cont1 .left .mainImg img");
const prevArrow = document.querySelector(".cont1 .left .mainImg .prev");
const nextArrow = document.querySelector(".cont1 .left .mainImg .next");
const subImgWrap = document.querySelector(".cont1 .left .subImg .subImgWrap");
const subImgs = document.querySelectorAll(".cont1 .left .subImg .imglist");

subImgs[0].classList.add("select");

// 서브 이미지들 제어를 위한 태그 선택
const subImgWholeWrap = document.querySelector(".cont1 .left .subImg");
const subArrowPrev = document.querySelector(".cont1 .left .subImgList .prev");
const subArrowNext = document.querySelector(".cont1 .left .subImgList .next");
const subImgsAttribute = [];

// 서브이미지 갯수에 따라 width값 조정하기 위한 변수 세팅
let viewcount = 5;
let subImgWrapNum = Math.ceil(subImgs.length / viewcount);

// 서브이미지 갯수에 따라 subImgWrap 박스를 width값 조정
subImgWrap.style.width = subImgWrapNum * 100 + "%";

// 서브이미지 갯수에 따라 subImgs 박스들의 width값 조정
for (let i = 0; i < subImgs.length; i++) {
  subImgs[i].style.width = `calc((${100 / subImgWrapNum}% - ${(viewcount - 1) * 10}px) / ${viewcount})`;

  // subImgs의 사용자정의 속성 index값을 배열안에 삽입
  subImgsAttribute[i] = Number(subImgs[i].getAttribute("data-index"));
}


// 이미지 슬라이드 변경을 위한 변수
let imgCount = 0;
// 셀렉트 박스 이동을 위한 변수
let selBoxCount = 0;
// 이미지 주소를 변경하기 위한 변수
let imgHref;

// 메인이미지 이전버튼 클릭 시
prevArrow.onclick = function(){

    // 이전 버튼 클릭 시 imgCount 숫자 변경 및 marginLeft값 변경
    prevClickImgCountChange(prevArrow); 
    
    changeImgHref(); // 메인이미지 주소 변경
    subImgsSelect(); // 서브이미지 리스트 셀렉트 클래스 추가/제거
}
// 메인이미지 이후버튼 클릭 시
nextArrow.onclick = function(){

    nextClickImgCountChange(nextArrow);
    
    changeImgHref(); // 메인이미지 주소 변경
    subImgsSelect(); // 서브이미지 리스트 셀렉트 클래스 추가/제거
}


// 서브 이미지 이후 버튼 클릭 시
subArrowNext.onclick = function(){
    nextClickImgCountChange(subArrowNext);

    changeImgHref(); // 메인이미지 주소 변경
    subImgsSelect(); // 서브이미지 리스트 셀렉트 클래스 추가/제거
}
// 서브 이미지 이전 버튼 클릭 시
subArrowPrev.onclick = function(){
    
    // 이전 버튼 클릭 시 imgCount 숫자 변경 및 marginLeft값 변경
    prevClickImgCountChange(subArrowPrev); 

    mainimg.src = `/upload/${imgHref[imgCount]}`;

    changeImgHref(); // 메인이미지 주소 변경
    subImgsSelect(); // 서브이미지 리스트 셀렉트 클래스 추가/제거
}


// 서브이미지들을 클릭 했을 때 변경
for(let i = 0; i < subImgs.length; i++){
    subImgs[i].onclick = function(){
        imgCount = i;

        changeImgHref(); // 이미지 주소 변경
        subImgsSelect(); // 이미지 선택 태그 변경
    }
}







// Prev 버튼 클릭 시
function prevClickImgCountChange(arrow){
    if(imgCount == 0){
        imgCount = 0;
    }
    else {
        imgCount--;

        if (imgCount === 4){
            subImgWrap.style.marginLeft = "0%";
        }
    }
}
// Next 버튼 클릭 시
function nextClickImgCountChange(arrow){
    if(imgCount === subImgs.length - 1){
        imgCount === subImgs.length - 1;
    }
    else {
        imgCount++;

        if (imgCount === 5){
            subImgWrap.style.marginLeft = "-100%";
        }
    }
}


// 서브이미지 리스트들이 선택되었을 때 표시할 클래스 추가/제거
function subImgsSelect(){
    subImgs.forEach(function(subImgs){
        subImgs.classList.remove("select");
    })
    subImgs[imgCount].classList.add("select");
}

// 메인이미지를 서브이미지 경로와 동일하게 변경하기 위한 코드
function changeImgHref(){
    // 선택된 이미지 주소를 imgHref에 삽입하고
    imgHref = subImgs[imgCount].querySelector("img").src;
    // 삽입된 이미지 주소를 upload/를 기준으로 잘라내고,
    imgHref = imgHref.split("upload/");
    // 잘라낸 이미지 파일명으로 경로를 변곃함
    mainimg.src = `/upload/${imgHref[1]}`;
}
