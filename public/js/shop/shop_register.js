// 카테고리 선택
const categoryLabel = document.querySelectorAll(".categoryCheck .categoryLabel");
// 사이즈 선택
const sizeLabel = document.querySelectorAll(".sizeChkWrap .sizeLabel");
// 컬러 선택
const colorLabel = document.querySelectorAll(".colorChkWrap .colorLabel");
const colorSelect = document.querySelectorAll(".colorChkWrap .colorLabel .selectColor");

// 폼태그 및 버튼 태그 선택
const registerForm = document.querySelector("#prdRegister");
const resetBtn = document.querySelector(".reset"); 
const registerBtn = document.querySelector(".register");

// 대표이미지 input 태그
const prdImg = document.querySelector(".imgWrap #prdImg");
const checkImgFiles = [".jpg", ".jpeg", ".png", ".gif", ".jfif"];

let imgCheckCount = 0;
let imgCheckResult = false;



// 제품 등록 시 등록여부 확인 및 이미지 파일 확장자 확인
registerBtn.onclick = function(e){
    // 등록여부 확인
    // let regisetCheck = window.confirm("등록하시겠습니까?");

    for(let i = 0; i < prdImg.files.length; i++){
        let fileName = prdImg.files[i].name;
        let fileLength = fileName.length;
        let fileDots = fileName.lastIndexOf(".");
        let fileExts = fileName.substring(fileDots, fileLength);
        let fileExtsChange  = fileExts.toLowerCase();
        let fileExtsInclude = checkImgFiles.includes(fileExtsChange);

        if(fileExtsInclude){
            imgCheckCount++;

            if(imgCheckCount === prdImg.files.length){
                imgCheckResult = true;
            }
        }
    }

    if(imgCheckResult){
        // 등록여부 확인
        let regisetCheck = window.confirm("등록하시겠습니까?");

        if(regisetCheck){
            registerForm.submit();
        }
        else {
            e.preventDefault();
            alert("제품 등록이 취소되었습니다.");
        }
    }
    else {
        imgCheckCount = 0;

        e.preventDefault();
        alert("이미지 파일만 등록 가능합니다.");
    }
}


// input 태그 클릭 시 디자인 변경
// 카테고리 선택        
for(let i = 0; i < categoryLabel.length; i++){    
    categoryLabel[i].onclick = function(){
        categoryLabel.forEach(function(label){
            label.classList.remove("select");
        })
        categoryLabel[i].classList.add("select");
    }
}
// 사이즈 선택
for(let i = 0; i < sizeLabel.length; i++){
    sizeLabel[i].onclick = function(){
        if(sizeLabel[i].classList.contains("select")){
            sizeLabel[i].classList.remove("select");
        }
        else{
            sizeLabel[i].classList.add("select");
        }
    }
}
// 컬러 선택
for (let i = 0; i < colorLabel.length; i++) {
    colorLabel[i].onclick = function() {
        const computedStyle = getComputedStyle(this);
        const backgroundColor = computedStyle.backgroundColor;
  
        // 배경색상의 어두움 정도를 계산 (RGB 평균값 사용)
        const rgbValues = backgroundColor.match(/\d+/g); // 배경색상의 RGB 값을 추출
        const brightness = (Number(rgbValues[0]) + Number(rgbValues[1]) + Number(rgbValues[2])) / 5;
  
        // 배경색상 어두움 정도에 따라 색상을 변경
        const selectColor = brightness < 128 ? "#ffffff" : "#000000";
        colorSelect[i].style.color = selectColor;
        
        if(colorSelect[i].classList.contains("select")){
            colorSelect[i].classList.remove("select");
        }
        else{
            colorSelect[i].classList.add("select");
        }
    };
}

// 제품등록 리셋 시 여부 확인
resetBtn.onclick = function(){
    let resetCheck = window.confirm("등록된 내용을 모두 지우시겠습니까?");

    if(resetCheck){
        registerForm.reset();
        alert("등록된 내용을 모두 삭제하였습니다.");
    }
    else {
        alert("등록된 내용을 유지하였습니다.");
    }
}

