const detailConts = document.querySelector(".cont2 .content p");
const detailImg = document.querySelectorAll(".cont2 .content img");

let imgLink = [];

// 콘텐츠값 가져왔을 때 앞 뒤 공백 제거
detailConts.innerText = detailConts.innerText.trim();

detailImg.forEach(function(img, idx){
    imgLink[idx] = img.src;
});

// console.log(imgLink[0].lastIndexOf("/upload"))

imgLink.forEach(function(link, idx){
    imgLink[idx] = link.substring(link.lastIndexOf("/upload"));
});

// div 내부의 텍스트 가져오기
const detailText = detailConts.innerHTML;

const searchText = "img";
const searchRegex = new RegExp(searchText, "g");

let match;
let updatedText = "";
let lastIndex = 0;
let imageIndex = 0;

while ((match = searchRegex.exec(detailText)) !== null) {
  const matchIndex = match.index;

  updatedText += detailText.slice(lastIndex, matchIndex);
  updatedText += `<img src="${imgLink[imageIndex]}">`;

  lastIndex = matchIndex + searchText.length;
  imageIndex++; // 이미지 경로 배열의 인덱스 증가
}

updatedText += detailText.slice(lastIndex);
detailConts.innerHTML = updatedText;

detailImg.forEach(function(img){
    img.remove();
});


// 게시물 삭제 버튼 눌렀을 때 확인 후 삭제
const removeBtn = document.querySelector(".board_detail .cont2 .center .btnWrap .adminBtn a.remove");

if(removeBtn.parentElement.classList.contains("not")){
    removeBtn.parentElement.style.display = "none";
}
else {
    removeBtn.onclick = function(e) {
        e.preventDefault();
    
        let removeCheck = window.confirm("게시물을 삭제하시겠습니까?");
    
        if (removeCheck) {
            window.location = removeBtn.getAttribute("href");
        }
    };
}