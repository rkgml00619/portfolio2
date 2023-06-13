// 컬러 선택
const colorKind = ["black", "blue"];
const color = document.querySelectorAll(".subInfo .colorWrap label");
const colorInput = document.querySelectorAll(".subInfo .colorWrap input");
const colorSelect = document.querySelectorAll(".subInfo .colorWrap label .checkIcon");

// 사이즈 선택
const sizes = document.querySelectorAll(".subInfo .sizeWrap label");

// 가격 콤마
let priceNumber = [];
const priceText = document.querySelectorAll(".priceText");    

// 컬러 선택
for(let i = 0; i < color.length; i++){
    // 색상 라벨에 value값에 따라 배경색 부여
    if(color[i].classList.contains(colorKind[i])){
        color[i].style.background = colorKind[i];
    }
    // 색상 라벨에 value값에 따라 배경색 부여 및 클릭 시 체크아이콘 노출
    color[i].onclick = function(){
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
            colorSelect.forEach(function(color){
                color.classList.remove("select");
            });
            colorSelect[i].classList.add("select");
        }
    }   
}

// 사이즈 선택
for(let i = 0; i < sizes.length; i++){
    sizes[i].onclick = function(){
        
    }
}

// 가격 콤마
priceText.forEach(function(price, idx){
    priceNumber[idx] = Number(price.innerText).toLocaleString();

    price.innerText = priceNumber[idx];
});