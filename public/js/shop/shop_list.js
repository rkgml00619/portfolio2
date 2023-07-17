const mainTitle = document.querySelector(".cont1 .titleWrap .mainTitle");
const subTitle = document.querySelector(".cont1 .titleWrap .subTitle");
const prdList = document.querySelectorAll(".cont2 .lists .list");
const accList = document.querySelectorAll(".cont2 .lists .acc");
const clothesList = document.querySelectorAll(".cont2 .lists .clothes");
const hrefText = window.location.pathname;

const listPriceTxt = document.querySelectorAll(".shop_list .cont2 .center .lists .list .textWrap .price span");

// 클래스에 acc 또는 clothes가 없는 목록은 지움
prdList.forEach(function(list){
    if(!list.classList.contains("clothes") && !list.classList.contains("acc")){
        list.remove();
    }
});

// 카테고리가 acc 일 때 리스트 및 텍스트 변경
if(hrefText.includes("acc")){
    mainTitle.innerText = "Acc";
    subTitle.innerText = "Petshoinsta Must-have Items";
    clothesList.forEach(function(clothes){
        clothes.remove();
    })
    accList.forEach(function(acc){
        acc.classList.add("show");
    })
}
// 카테고리가 clothes일 때 리스트 및 텍스트 변경
else if(hrefText.includes("clothes")){
    mainTitle.innerText = "Clothes";
    subTitle.innerText = "We are Soulmate Fashion, too";
    accList.forEach(function(acc){
        acc.remove();
    })
    clothesList.forEach(function(clothes){
        clothes.classList.add("show");
    })
}

// 리스트의 가격 콤마
for(let i = 0; i < listPriceTxt.length; i++){
    listPriceTxt[i].innerText = Number(listPriceTxt[i].innerText).toLocaleString();
}