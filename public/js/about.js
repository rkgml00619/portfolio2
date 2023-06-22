// 최상단 페이지 메인 서브 타이틀
const mainSubTitle = document.querySelector(".about .cont1 .titleWrap .subTitle");
// 최상단 이미지
const topImg = document.querySelector(".cont2 .bigImg");
// 미디어룸 이미지 제어
const mediaListWrap = document.querySelectorAll(".cont3 .mediaConts .mediaRight")
const mediaLists = document.querySelectorAll(".cont3 .mediaConts .mediaRight .mediaList")
const mediaImgs = document.querySelectorAll(".cont3 .mediaConts .mediaRight .mediaList img");
// const mediaMainImgWrap = document.querySelector(".cont3 .mediaConts .mediaLeft");
const mediaMainImg = document.querySelector(".cont3 .mediaConts .mediaLeft img");
// 미디어룸 이미지 경로 변수
const images = Array.from(mediaImgs).map(img => img.src);
let mediaListsWidth = [];
let width;
let height;

// 미디어룸 동영상 제어
const playBtn = document.querySelector(".cont4 .videoWrap .playBtn");
const playBtnIcon = document.querySelector(".cont4 .videoWrap .playIcon");
const videoOverlay = document.querySelector(".cont4 .videoWrap .overlay");
const mediaVideo = document.querySelector(".cont4 .videoWrap video");


// 이미지 경로에서 이미지명만 따로 빼서 배열에 담음
let imageName = [];
images.forEach(function(imgLink, idx){
    imageName[idx] = imgLink.substring(38)
});
    
// 서브이미지들 클릭 시 메인 이미지 경로 변경
for(let i = 0; i < mediaLists.length; i++){
    mediaLists[i].onclick = function(){
        mediaMainImg.src = `/img/about/media/${imageName[i]}`;

        mediaMainImg.onload = function() {
            imgResizing(mediaMainImg)
        };
        mediaImgs.forEach(function(img){
            img.style.filter = "grayscale(1)";
        })
        mediaImgs[i].style.filter = "grayscale(0)";
    }
}

// 이미지들의 가로 사이즈와 세로 사이즈를 확인하고 가로형인지 세로형인지 구별하여 width값과 height값이 별도로 지정될 수 있도록 구현
mediaImgs.forEach((img, index) => {
    imgResizing(img);
});

// 모바일 일 때 페이지 상단 텍스트 변경 및 상단 이미지 변경
if(!mobile.matches){
    topImg.src = "/img/about/about_2.jpg";
    mainSubTitle.innerHTML = mainSubTitle.innerHTML.replace("<br>서로 닮아가는 PREMIUM PET LIFE", " 서로 닮아가는 PET LIFE")
}
else {
    topImg.src = "/img/about/about_m.png";
    mainSubTitle.innerHTML = mainSubTitle.innerHTML.replace(" 서로 닮아가는 PET LIFE", "<br>서로 닮아가는 PREMIUM PET LIFE")
}

// 
mediaImgs.forEach((img, index) => {
    imgResizing(img);
});
updateImgWrapHeight();

window.addEventListener("resize", function(){
    if(!mobile.matches){
        topImg.src = "/img/about/about_2.jpg";

        mainSubTitle.innerHTML = mainSubTitle.innerHTML.replace("<br>서로 닮아가는 PREMIUM PET LIFE", " 서로 닮아가는 PET LIFE")
    }
    else {
        topImg.src = "/img/about/about_m.png";

        mainSubTitle.innerHTML = mainSubTitle.innerHTML.replace(" 서로 닮아가는 PET LIFE", "<br>서로 닮아가는 PREMIUM PET LIFE")
    }

    mediaImgs.forEach((img, index) => {
        imgResizing(img);
    });
    updateImgWrapHeight();
});

// 초기화 시 이미지와 div 요소의 높이 업데이트
updateImgWrapHeight();

// 이미지와 div 요소의 높이를 업데이트하는 함수
function updateImgWrapHeight() {
    // 이미지들을 감싸고 있는 div 태그들의 높이를 width값과 동일하게 설정하여 정사각형 모양을 유지할 수 있도록
    mediaLists.forEach(function(list, idx) {
      width = list.offsetWidth;
      list.style.height = width + "px";
    });

    mediaMainImg.parentElement.style.height = mediaMainImg.offsetWidth + "px";

    if(!mobile.matches){
        mediaLists[0].parentElement.style.height = mediaMainImg.offsetWidth + "px";
    }
    else{        
        let mediaListsHeight = mediaLists[0].offsetWidth;
        mediaLists[0].parentElement.style.height = mediaListsHeight * 2 + "px";
    }
}

// 이미지 리사이징 코드 리팩토링
function imgResizing(img){
    width = img.naturalWidth;
    height = img.naturalHeight;

    if (width > height) {
    img.style.height = "100%";
    img.style.width = "auto";
    } else {
    img.style.height = "auto";
    img.style.width = "100%";
    }
}


// 동영상 플레이버튼 제어
playBtn.onmouseenter = function(){
    videoOverlay.style.background = "rgba(0,0,0,0.5)";
}
playBtn.onmouseleave = function(){
    videoOverlay.style.background = "rgba(0,0,0,0.2)";
}
playBtn.onclick = function(){
    mediaVideo.play();
    mediaVideo.setAttribute("controls", "controls");
    videoOverlay.style.display = "none";
    playBtn.style.display = "none";
    playBtnIcon.style.display = "none";
}





// topMove 버튼 제어
const topPosition = document.querySelector(".about .cont1");

goTopBtnMove(topPosition);
