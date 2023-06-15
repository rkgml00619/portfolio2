// 컬러 선택
const color = document.querySelectorAll(".subInfo .colorWrap label");
const colorInput = document.querySelectorAll(".subInfo .colorWrap input");
const colorSelect = document.querySelectorAll(".subInfo .colorWrap label .checkIcon");
let colorKind = [];

colorInput.forEach(function(color, i){
    colorKind[i] = color.value;
})

// 사이즈 선택
const sizes = document.querySelectorAll(".subInfo .sizeWrap label");
const sizesInput = document.querySelectorAll(".subInfo .sizeWrap input");
let sizeKind = [];

sizesInput.forEach(function(color, i){
    sizeKind[i] = color.value;
})

// 가격 콤마
const priceText = document.querySelector(".right .price .priceText");
priceText.innerText = Number(priceText.innerText).toLocaleString();

// 제품 선택 시 선택한 정보값 노출
const selResult = document.querySelector(".selInfoForm .selResult");
const selInfo = document.querySelector(".selInfoForm .selResult .selInfo");
const prdName = document.querySelector(".right .prdName");
const totalPrice = document.querySelector(".selResult .totalPrice");
let totalPriceTxt = totalPrice.querySelector(".priceText");

// 제품 선택 시 선택한 정보값 중 수량값을 변경하기 위한 코드를 위한 세팅
let selAmountAll;
let selAmountPlusAll;
let selAmountMinusAll;

let amountNum; // 수량 변경될 기준 값
let arrayAmountNum = []; // 변경된 수량 값 배열로 삽입
let totalAmountNum; // 배열로 삽입된 수량값들의 전체 합계

totalPriceTxt.value = Number(priceText.value).toLocaleString();

// 옵션 선택 시 나타날 태그들을 위한 선택대상
const selInfoHtml = document.querySelector(".selInfoForm .selResult .selInfo");
const testHtml = selInfoHtml.innerHTML;

// 이벤트 핸들러 등록
colorInput.forEach(input => {
    input.addEventListener("change", checkSelection);
});

sizesInput.forEach(input => {
    input.addEventListener("change", checkSelection);
});

// 컬러와 사이즈 선택값 배열에 담기
let colorValue = [];
let sizeValue = [];

// 이벤트 발생시 실행할 함수
function checkSelection() {
    const selectedColors = [...colorInput].filter(input => input.checked).map(input => input.value);
    const selectedSizes = [...sizesInput].filter(input => input.checked).map(input => input.value);

    if (selectedColors.length > 0) {
        if (selectedSizes.length > 0){
            // 컬러와 사이즈 선택값 배열에 추가
            // 선택한 색상 값을 colorValue 배열에 추가
            colorValue.push(selectedColors[selectedColors.length - 1]); 
            // 선택한 색상 값을 sizeValue 배열에 추가
            sizeValue.push(selectedSizes[selectedSizes.length - 1]); 
            
            // 총 금액 노출
            totalPrice.classList.add("show");

            // 옵션을 선택할 때마다 결과값 정보를 바로 노출
            let selInfoWrap= document.createElement("div");
            selInfoWrap.setAttribute("class", "selInfo");
            selResult.insertBefore(selInfoWrap, totalPrice);
            selInfoWrap.innerHTML = testHtml;
            
            selResult.style.display = "block";
            selInfoHtml.remove();
            
            // 신규로 생성된 선택옵션정보들
            const selInfo = document.querySelectorAll(".selInfo");
            const removeBtn = document.querySelectorAll(".selInfo .remove");
            // 컬러 결과값
            const selColorInput = document.querySelectorAll(".selInfo .selColorSizeWrap .selColor input");
            const selSizeInput = document.querySelectorAll(".selResult .selColorSizeWrap .selSize input");

            // 컬러와 사이즈 선택값을 선택정보가 노출되는 input에 추가
            for(let i = 0; i < selInfo.length; i++){
                // 선택한 첫번째 색상의 value값을 대문자로 변경
                colorValue.forEach((value, i) => {
                    colorValue[i] = value.charAt(0).toUpperCase() + value.slice(1);
                });
                  
                selInfo[i].querySelector(".selColor input").value = colorValue[i];
                selInfo[i].querySelector(".selSize input").value = sizeValue[i];
            }            

            // 선택한 결과값이 나오는 input 태그의 width값을 결과값의 길이로 변경
            selColorInput.forEach(input => {
                input.style.width = input.value.length + 1 +"ch";
            });
            selSizeInput.forEach(input => {
                input.style.width = input.value.length + 1 +"ch";
            });            

            // 수량값을 변경하기 위한 코드
            selAmountAll = document.querySelectorAll(".selAmoutWrap input");
            selAmountPlusAll = document.querySelectorAll(".selAmoutWrap .selAmountPlus");
            selAmountMinusAll = document.querySelectorAll(".selAmoutWrap .selAmountMinus"); 
            // 기준 가격(화면 내 상단 가격) 전체 콤마 제거
            const priceNumber = priceText.innerText.replace(/,/g, "");

            // 총 금액 값 수량에 따라 변경
            for(let i = 0; i < selAmountAll.length; i++){
                arrayAmountNum[i] = Number(selAmountAll[i].value);                
                
                finalTotalPrice(priceNumber);
            }
            
            // 수량 플러스 버튼 클릭 시
            for(let i = 0; i < selAmountAll.length; i++){
                selAmountPlusAll[i].onclick = function(){
                    amountNum = selAmountAll[i].value;

                    if(amountNum < 10){
                        amountNum++;
                    }
                    else if (amountNum >= 10){
                        amountNum = 10;
                        alert("최대 구매 수량은 10개입니다.");
                    }
                    selAmountAll[i].value = amountNum;
                    arrayAmountNum[i] = Number(selAmountAll[i].value);

                    finalTotalPrice(priceNumber);
                }
            
                // 수량 마이너스 버튼 클릭 시            
                selAmountMinusAll[i].onclick = function(){
                    amountNum = selAmountAll[i].value;
    
                    if(amountNum <= 1){        
                        amountNum = 1;
                        alert("최소 구매 수량은 1개입니다.");
                    }
                    else if (amountNum >= 1){
                        amountNum--;
                    }
                    selAmountAll[i].value = amountNum;
                    arrayAmountNum[i] = Number(selAmountAll[i].value);
                    
                    finalTotalPrice(priceNumber);
                }

                removeBtn[i].onclick = function(){
                    selInfo[i].remove();
                    selAmountAll[i].value = 0;
                    arrayAmountNum[i] = 0;

                    finalTotalPrice(priceNumber);
                }
            }  
        }
    }
}

// 최종 총 가격 리팩토링
function finalTotalPrice(price){
    totalAmountNum = arrayAmountNum.reduce(function(a, b) {
        return a + b;
    }, 0);

    totalPriceTxt.value = price * totalAmountNum;
    // 총 결제금액 콤마
    totalPriceTxt.value = Number(totalPriceTxt.value).toLocaleString();

    // 총 결제금액이 노출되는 input의 width값 자동 조절
    totalPriceTxt.style.width = (totalPriceTxt.value.length + 0.2) + "ch";
}

// 컬러 선택
for(let i = 0; i < color.length; i++){
    color[i].onclick = function(){
        // 컬러 결과값
        const selColorInput = document.querySelectorAll(".selInfo .selColorSizeWrap .selColor input");
        const selSizeInput = document.querySelectorAll(".selResult .selColorSizeWrap .selSize input");

        // 컬러 선택 시 사이즈 리셋
        sizes.forEach(function(sizes, i){
            sizes.classList.remove("select");
            sizesInput[i].checked = false;
        });

        // 색상 라벨 배경색에 따라 체크아이콘 컬러 변경
        const computedStyle = getComputedStyle(this);
        const backgroundColor = computedStyle.backgroundColor;

        // 배경색상의 어두움 정도를 계산 (RGB 평균값 사용)
        const rgbValues = backgroundColor.match(/\d+/g); // 배경색상의 RGB 값을 추출
        const brightness = (Number(rgbValues[0]) + Number(rgbValues[1]) + Number(rgbValues[2])) / 5;

        // 배경색상 어두움 정도에 따라 색상을 변경
        const selectColor = brightness < 128 ? "#ffffff" : "#000000";
        colorSelect[i].style.color = selectColor;

        // 색상 라벨 클릭 시 체크아이콘 노출
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
        if(sizes[i].classList.contains("select")){
            sizes[i].classList.remove("select");
        }
        else{
            sizes.forEach(function(size){
                size.classList.remove("select");
            });
            sizes[i].classList.add("select");
        }
    }
}
