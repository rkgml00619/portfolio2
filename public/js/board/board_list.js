// 메뉴 버튼 제어
const boardMenus = document.querySelectorAll(".cont2 .boardTop .boardMenus > li")

// 검색 옵션 버튼 제어
const searchOptionBtn = document.querySelector(".cont2 .boardTop .searchSelect");
const searchOptionBtnText = document.querySelector(".cont2 .boardTop .searchSelect .searchOptionValue");
const searchOption = document.querySelector(".cont2 .boardTop .searchOption");
const searchOptionList = document.querySelectorAll(".cont2 .boardTop .searchOption li");
const searchOptionSel = document.querySelector(".cont2 .boardTop #searchOptionSel");

// 검색결과 주소창에서 확인
let searchValue = window.location.href;

// 검색 인풋 태그 제어
const boardSearchForm = document.querySelector(".cont2 .boardTop #boardSearch");
const boardSearchInput = document.querySelector(".cont2 .boardTop #searchText");
const boardSearchBtn= document.querySelector(".cont2 .boardTop #searchBtn");

// 더보기 버튼 제어
const moreBtn = document.querySelector(".cont2 .moreWrap .moreBtn");
const boardLists = document.querySelectorAll(".cont2 .boardList .list");

// 목록 썸네일 이미지 제어
let boardListImgs = document.querySelectorAll(".cont2 .boardList .list .imgWrap img");

let startIndex;
let incNum;

window.addEventListener("load", function(){
  updateValues();
})
window.addEventListener("resize", function(){
  updateValues();
})

function updateValues(){
  // 리스트들 기본 카우트 변경
  if(pc.matches){
    startIndex = 8;
    incNum = 4;
  }
  else if (tablet.matches){
    startIndex = 6;
    incNum = 3;
  }

  // 리스트들 width값 변경
  boardLists.forEach(function(list){
    list.style.width = `calc((100% - ${(incNum * 10) * (incNum-1)}px) / ${incNum})`;
  })
  
  // 더보기 버튼 구현
  moreBtn.onclick = function(e) {
    e.preventDefault();
  
    for(let i = startIndex; i < startIndex + incNum; i++){
      if (boardLists[i]) {
        boardLists[i].classList.add("on");
        setTimeout(function(){
          boardLists[i].classList.add("show");
        }, 1)
      }
    }
  
    startIndex = startIndex + incNum;
  
    if (startIndex >= boardLists.length){
      moreBtn.style.display = "none";
    }
  
  };
}


// 검색 옵션 버튼 제어
searchOptionBtn.onclick = function(e){
  e.preventDefault();
  if(searchOption.classList.contains("on")){    
    searchOption.classList.remove("on");
  }
  else{    
    searchOption.classList.add("on");
  }
}

for(let i = 0; i < searchOptionList.length; i++){
  searchOptionList[i].onclick = function(){
    searchOptionBtnText.innerText = searchOptionList[i].innerText;
    searchOption.classList.remove("on");

    let selectedOption = searchOptionList[i].getAttribute('data-value');
    
    // 셀렉트 태그의 옵션 선택
    searchOptionSel.value = selectedOption;
  }
}

// 검색 인풋 태그 제어
boardSearchBtn.onclick = function(e){
  e.preventDefault();

  let searchData = boardSearchInput.value;  
  let searchResultData = searchData.trim();

  if(searchResultData === ""){
    e.preventDefault();
    alert("검색어를 입력하세요.")
  }
  else {
    boardSearchForm.submit();
  }
}


// 목록 썸네일 이미지 리사이징
// for(let i = 0; i < boardListImgs.length; i++){
//   boardListImgs[i].addEventListener("load", function(){
//     boardListImgs = document.querySelectorAll(".cont2 .boardList .list .imgWrap img")
    
//     boardListImgs.forEach(function(imgs){
//       boardImgResizing(imgs);
//     })
//   })
// }

// window.addEventListener("resize", function(){
//   boardListImgs[i] = document.querySelectorAll(".cont2 .boardList .list .imgWrap img")
  
//   for(let i = 0; i < boardListImgs.length; i++){
//     boardListImgs[i].forEach(function(imgs){
//       boardImgResizing(imgs);
//     })
//   }
// })

// // 목록 썸네일 이미지 리사이징 코드 리팩토링
// function boardImgResizing(img){
//   let width = img.naturalWidth;
//   let height = img.naturalHeight;

//   if (width > height) {
//     img.style.height = "100%";
//     img.style.width = "auto";
//   } else {
//     img.style.height = "auto";
//     img.style.width = "100%";
//   }
// }

// 이미지 리사이징 함수
function boardImgResizing(img) {
  let width = img.naturalWidth;
  let height = img.naturalHeight;

  if (width > height) {
    img.style.height = "100%";
    img.style.width = "auto";
  } else {
    img.style.height = "auto";
    img.style.width = "100%";
  }
}

// 이미지 리사이징 함수 호출
function resizeBoardListImages() {
  boardListImgs.forEach(function(img) {
    boardImgResizing(img);
  });
}

// 초기 실행
resizeBoardListImages();

// 윈도우 리사이즈 이벤트 핸들러
window.addEventListener("resize", function() {
  // 이미지를 다시 로드하여 리사이징 적용
  boardListImgs = document.querySelectorAll(".cont2 .boardList .list .imgWrap img");
  resizeBoardListImages();
});



// 게시판 상단 메뉴들 url 경로에 따라 클래스 제어
if(searchValue.includes("notice")){
  boardMensClass("Notice");
  if (startIndex >= boardLists.length) {
    moreBtn.style.display = "none";
  }
}
else if(searchValue.includes("press")){
  boardMensClass("Press");
  if (startIndex >= boardLists.length) {
    moreBtn.style.display = "none";
  }
}
else {
  if (startIndex >= boardLists.length) {
    moreBtn.style.display = "none";
  }
}

function boardMensClass(text){
  for (let i = 0; i < boardMenus.length; i++){
    if(boardMenus[i].innerText === text){
      boardMenus.forEach(function(menu){
        menu.classList.remove("on");
      })
      boardMenus[i].classList.add("on");
    }
  }
}

console.log(startIndex)

// 첫 화면에서 보여줄 리스트 세팅
if(boardLists.length > startIndex){
  for(let i = 0; i < startIndex; i++){
    boardLists.forEach(function(el){
      el.classList.remove("on");
    })
    boardLists[i].classList.add("on");
  }
}
else {
  for(let i = 0; i < boardLists.length; i++){
    boardLists.forEach(function(el){
      el.classList.remove("on");
    })
    boardLists[i].classList.add("on");
  }
}





// topMove 버튼 제어
const topPosition = document.querySelector(".board_list .cont1");

goTopBtnMove(topPosition);
