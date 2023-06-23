const detailConts = document.querySelector(".cont2 .content p");
const detailImg = document.querySelectorAll(".cont2 .content img");

let imgLink = [];

// 콘텐츠값 가져왔을 때 앞 뒤 공백 제거
detailConts.innerText = detailConts.innerText.trim();

detailImg.forEach(function(img, idx){
    imgLink[idx] = img.src;
})

imgLink.forEach(function(link, idx){
    imgLink[idx] = link.substring(21)
})

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
})


// 게시물 삭제 버튼 눌렀을 때 확인 후 삭제
const removeBtn = document.querySelector(".board_detail .cont2 .center .btnWrap .adminBtn a");

removeBtn.onclick = function(e) {
    e.preventDefault();

    let removeCheck = window.confirm("게시물을 삭제하시겠습니까?");

    if (removeCheck) {
        window.location = removeBtn.getAttribute("href");
    }
};

// function getImageDataUrl(imageUrl) {
//     return axios
//     .get(imageUrl, { responseType: "arraybuffer" })
//     .then((response) => {
//     const base64 = btoa(
//         new Uint8Array(response.data).reduce(
//         (data, byte) => data + String.fromCharCode(byte),
//         ""
//         )
//     );
//     return `data:${response.headers["content-type"]};base64,${base64}`;
//     });
// }

// 이미지 데이터 URL 가져오기
// getImageDataUrl(imgLink[0])
//   .then((dataUrl) => {
//     // 이미지 데이터 URL 사용
//     const imgElement = document.createElement("img");
//     imgElement.src = dataUrl;

//     // 이미지를 원하는 곳에 추가 또는 처리
//     // 예: document.body.appendChild(imgElement);
//   })
//   .catch((error) => {
//     console.error("이미지 로드 중 오류 발생:", error);
//   });