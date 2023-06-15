// 컬러 선택
const color = document.querySelectorAll(".subInfo .colorWrap label");
const colorInput = document.querySelectorAll(".subInfo .colorWrap input");
const colorSelect = document.querySelectorAll(".subInfo .colorWrap label .checkIcon");

// 사이즈 선택
const sizes = document.querySelectorAll(".subInfo .sizeWrap label");
const sizesInput = document.querySelectorAll(".subInfo .sizeWrap input");

// 가격 콤마
const priceText = document.querySelector(".right .price .priceText");
priceComma(priceText);

// 제품 선택 시 선택한 정보값 노출
const selInfo = document.querySelector(".subInfo .selResult .selInfo");
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

priceComma(totalPriceTxt);

// priceComma(totalPriceTxt);

// 이벤트 핸들러 등록
colorInput.forEach(input => {
    input.addEventListener("change", checkSelection);
});

sizesInput.forEach(input => {
    input.addEventListener("change", checkSelection);
});

const selResultTest = document.querySelector(".selResult");
const selInfoTest = document.querySelector(".selInfo");
const testHtml = selInfoTest.innerHTML;

// console.log(testHtml);
  
// 이벤트 발생시 실행할 함수
function checkSelection() {
    const selectedColors = [...colorInput].filter(input => input.checked).map(input => input.value);
    const selectedSizes = [...sizesInput].filter(input => input.checked).map(input => input.value);

    if (selectedColors.length > 0) {        
        if (selectedSizes.length > 0){
            // 총 금액 노출
            totalPrice.classList.add("show");

            // 선택한 결과값들을 전체로 묶어주는 태그 생성
            let selInfoWrap= document.createElement("div");
            selInfoWrap.setAttribute("class", "selInfo");
            selResultTest.insertBefore(selInfoWrap, totalPrice);
            selInfoWrap.innerHTML = testHtml;
            
            selResultTest.style.display = "block";
            selInfoTest.remove();
            
            const selInfo = document.querySelectorAll(".selInfo");
            const removeBtn = document.querySelectorAll(".selInfo .remove");
            
            for(let i = 0; i < removeBtn.length; i++){
                removeBtn[i].onclick = function(){
                    selInfo[i].remove();
                }
            }

            // 제품 제목 가져와서 신규 생성
            // let selPrdName = document.createElement("h5");
            // selPrdName.setAttribute("class", "selPrdName");
            // selInfo.appendChild(selPrdName);
            // selPrdName.innerText = prdName.innerText;

            // 선택한 결과값들을 전체로 묶어주는 태그 생성
            // let selInfoWrap= document.createElement("div");
            // selInfoWrap.setAttribute("class", "selInfoWrap");
            // selInfo.appendChild(selInfoWrap);

            // 선택한 색상과 사이즈만 묶어주는 태그 생성
            // let selColorSizeWrap= document.createElement("div");
            // selColorSizeWrap.setAttribute("class", "selColorSizeWrap");
            // selInfoWrap.appendChild(selColorSizeWrap);

            // 선택한 제품의 색상값 가져와서 신규 생성
            // let selColor= document.createElement("p");
            // selColor.setAttribute("class", "selColor");
            // selColorSizeWrap.appendChild(selColor);
            // selColor.innerHTML = `색상 : <span>${selectedColors}</span>`;

            // 선택한 제품의 사이즈값 가져와서 신규 생성
            // let selSize= document.createElement("p");
            // selSize.setAttribute("class", "selSize");
            // selColorSizeWrap.appendChild(selSize);
            // selSize.innerHTML = `사이즈 : <span>${selectedSizes}</span>`;

            // 수량값을 묶어주는 태그 생성
            // let selAmoutWrap= document.createElement("div");
            // selAmoutWrap.setAttribute("class", "selAmoutWrap");
            // selInfoWrap.appendChild(selAmoutWrap);
            
            // 선택한 수량값을 변경할 수 있는 마이너스 버튼 생성
            // let selAmountMinus= document.createElement("div");
            // selAmountMinus.setAttribute("class", "selAmountMinus subAmountIcon");
            // selAmountMinus.innerHTML = '<span class="material-symbols-outlined amountIcon">remove</span>';
            // selAmoutWrap.appendChild(selAmountMinus);

            // 선택한 제품의 수량값 가져와서 신규 생성
            // let selAmount= document.createElement("input");
            // selAmount.setAttribute("type", "text");
            // selAmount.setAttribute("value", 1);
            // selAmoutWrap.appendChild(selAmount);
            // selAmount.innerText = selAmount.value;

            // 수량값을 변경할 수 있는 플러스 버튼 생성
            // let selAmountPlus = document.createElement("div");
            // selAmountPlus.setAttribute("class", "selAmountPlus subAmountIcon");
            // selAmountPlus.innerHTML = '<span class="material-symbols-outlined amountIcon">add</span>';
            // selAmoutWrap.appendChild(selAmountPlus);

            // 수량값을 변경하기 위한 코드
            selAmountAll = document.querySelectorAll(".selAmoutWrap input");
            selAmountPlusAll = document.querySelectorAll(".selAmoutWrap .selAmountPlus");
            selAmountMinusAll = document.querySelectorAll(".selAmoutWrap .selAmountMinus");            

            // 전체 콤마 제거
            const priceNumber = priceText.innerText.replace(/,/g, "");
            // 총 금액 값 수량에 따라 변경
            for(let i = 0; i < selAmountAll.length; i++){
                arrayAmountNum[i] = Number(selAmountAll[i].value);

                totalAmountNum = arrayAmountNum.reduce(function(a, b) {
                return a + b;
                }, 0);

                totalPriceTxt.innerText = priceNumber * totalAmountNum;
                priceComma(totalPriceTxt);

                console.log(priceNumber);
            }
            
            // 수량 플러스 버튼 클릭 시
            for(let i = 0; i < selAmountPlusAll.length; i++){
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
                    console.log(arrayAmountNum);

                    totalAmountNum = arrayAmountNum.reduce(function(a, b) {
                    return a + b;
                    }, 0);

                    totalPriceTxt.innerText = priceNumber * totalAmountNum;
                    priceComma(totalPriceTxt);

                    console.log(priceNumber);
                }
            }
            // 수량 마이너스 버튼 클릭 시
            for(let i = 0; i < selAmountMinusAll.length; i++){
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
                    console.log(arrayAmountNum);

                    totalAmountNum = arrayAmountNum.reduce(function(a, b) {
                    return a + b;
                    }, 0);

                    totalPriceTxt.innerText = priceNumber * totalAmountNum;
                    priceComma(totalPriceTxt);
                }
            }
        }
    }
}

// 컬러 선택
for(let i = 0; i < color.length; i++){
    color[i].onclick = function(){
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

// 가격 콤마
function priceComma(priceItem){
    priceItem.innerText = Number(priceItem.innerText).toLocaleString();
}