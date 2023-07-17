// 메뉴 버튼 제어
const boardMenus = document.querySelectorAll(".cont2 .boardTop .boardMenus > li")

// 검색 옵션 버튼 제어
const searchOptionBtn = document.querySelector(".cont2 .boardTop .searchSelect");
const searchOptionBtnText = document.querySelector(".cont2 .boardTop .searchSelect .searchOptionValue");
const searchOption = document.querySelector(".cont2 .boardTop .searchOption");
const searchOptionList = document.querySelectorAll(".cont2 .boardTop .searchOption li");
const searchOptionSel = document.querySelector(".cont2 .boardTop #searchOptionSel");

// 검색결과 주소창에서 확인
// let searchValue = window.location.href;
let currentUrl = document.querySelector(".cont2 .boardTop #boardSearch #currentUrl");
let currentUrlValue = currentUrl.value;

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
  // 이미지를 다시 로드하여 리사이징 적용
  boardListImgs = document.querySelectorAll(".cont2 .boardList .list .imgWrap img");
  boardListImgs.forEach(function(img) {
    boardImgResizing(img);
  });

  updateValues(); // 이미지 리스트 갯수 업데이트 및 더보기 버튼 제어
});

window.addEventListener("resize", function(){
  // 이미지를 다시 로드하여 리사이징 적용
  boardListImgs = document.querySelectorAll(".cont2 .boardList .list .imgWrap img");
  
  boardListImgs.forEach(function(img) {
    boardImgResizing(img);
  });

  updateValues(); // 이미지 리스트 갯수 업데이트 및 더보기 버튼 제어
});

// function test(i){
//   let imgWrap = boardListImgs[i].parentElement;
//   let width = boardListImgs[i].offsetWidth;
//   let height = boardListImgs[i].offsetHeight;
  
//   console.log(boardListImgs)
//   console.log("부모넓이 " + imgWrap.offsetWidth)
//   console.log("자식넓이 " + width)
//   console.log("부모높이 " + imgWrap.offsetHeight)
//   console.log("자식높이 " + height)
  
//   console.log(width - height)
// }

// test(0)



// 이미지 리사이징 함수

function boardImgResizing(img) {
  let imgWrap = img.parentElement;
  let width = img.offsetWidth;
  let height = img.offsetHeight;

  // 부모요소가 가로형일 때
  if (imgWrap.offsetWidth > imgWrap.offsetHeight){
    // 자식요소가 가로형일 때
    if(width > height){
      if(imgWrap.offsetWidth === width){
        img.style.height = "100%";
        img.style.width = "auto";
      }
      else if (imgWrap.offsetHeight === height){
        if(imgWrap.offsetWidth < width){
          img.style.height = "100%";
          img.style.width = "auto";
        }
        else {
          img.style.height = "auto";
          img.style.width = "100%";
        }
      }
    }
    // 자식요소가 세로형일 때
    else if(width < height){      
      if(imgWrap.offsetHeight === height){
        if (imgWrap.offsetWidth < width){
          img.style.height = "100%";
          img.style.width = "auto";
        }
        else {
          img.style.height = "auto";
          img.style.width = "100%";
        }
      }
    }
  }
  else if(imgWrap.offsetWidth < imgWrap.offsetHeight){
    // 자식요소가 가로형일 때
    if(width > height){
      if(imgWrap.offsetWidth === width){
        img.style.height = "100%";
        img.style.width = "auto";
      }
      else if (imgWrap.offsetHeight === height){
        if(imgWrap.offsetWidth < width){
          img.style.height = "100%";
          img.style.width = "auto";
        }
        else {
          img.style.height = "auto";
          img.style.width = "100%";
        }
      }
    }
    // 자식요소가 세로형일 때
    else if(width < height){      
      if(imgWrap.offsetHeight === height){
        if (imgWrap.offsetWidth < width){
          img.style.height = "auto";
          img.style.width = "100%";
        }
        else {
          img.style.height = "100%";
          img.style.width = "auto";
        }
      }
      else if(imgWrap.offsetWidth === width){
        if (imgWrap.offsetHeight > height){
          img.style.height = "100%";
          img.style.width = "auto";
        }
      }
    }
  }
  else {
    img.style.height = "auto";
    img.style.width = "100%";
  }
}

function updateValues(){
  // 리스트들 기본 카운트 변경
  if(pc.matches){
    startIndex = 8;
    incNum = 4;
  }
  else if (tablet.matches && !mobile.matches){
    startIndex = 6;
    incNum = 3;
  }
  else if (tablet.matches && mobile.matches){
    startIndex = 8;
    incNum = 2;
  }

  // 처음 보여지고자 하는 갯수보다 게시물이 적으면 더보기 버튼 숨김
  if (startIndex >= boardLists.length) {
    moreBtn.style.display = "none";
  }

  // 리스트들 width값 변경
  if(incNum === 2){
    boardLists.forEach(function(list){
      list.style.width = `100%`;
    })
  }
  else {    
    boardLists.forEach(function(list){
      list.style.width = `calc((100% - ${(incNum * 10) * (incNum-1)}px) / ${incNum})`;
    })
  }
  
  // 더보기 버튼 구현
  moreBtn.onclick = function(e) {
    e.preventDefault();
    for(let i = startIndex; i < startIndex + incNum; i++){
      if (boardLists[i]) {
        boardLists[i].classList.add("on");

        setTimeout(function(){
          boardLists[i].classList.add("show");
        }, 1);

        // 새로 보여지는 리스트 이미지 리사이징
        boardImgResizing(boardLists[i].querySelector("img"));
      }
    }
  
    startIndex = startIndex + incNum;
  
    if (startIndex >= boardLists.length){
      moreBtn.style.display = "none";
    }
  
  };
}

// 이미지 리사이징 최종 출력
boardListImgs.forEach(function(img) {
  boardImgResizing(img);
});


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


// 게시판 상단 메뉴들 url 경로에 따라 클래스 제

if(currentUrlValue === "notice"){
    boardMensClass();
    if (startIndex >= boardLists.length) {
      moreBtn.style.display = "none";
    }
  }
  else if(currentUrlValue === "press"){
    boardMensClass();
    if (startIndex >= boardLists.length) {
      moreBtn.style.display = "none";
    }
  }
else {
  boardMensClass();
  if (startIndex >= boardLists.length) {
    moreBtn.style.display = "none";
  }
}

function boardMensClass(){
  for (let i = 0; i < boardMenus.length; i++){
    if(boardMenus[i].innerText.toLowerCase() === currentUrlValue){
      boardMenus.forEach(function(menu){
        menu.classList.remove("on");
      });
      boardMenus[i].classList.add("on");
    }
    else if (boardMenus[i].innerText.toLowerCase() === "all"){
      boardMenus.forEach(function(menu){
        menu.classList.remove("on");
      });
      boardMenus[i].classList.add("on");
    }
  }
}