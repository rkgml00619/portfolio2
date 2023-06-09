const menuBtn = document.querySelector("#header .menuBtn");
const menuDetail = document.querySelector("#header_detail");
const cleseBtn = document.querySelector("#header_detail .menuBtn");

const menuBtnLine = document.querySelectorAll("#header .menuBtn > span");

const header = document.querySelector("#header");
const headerLogo = document.querySelectorAll("#header .t_logo img");
const headerBtn = document.querySelectorAll("#header .menuBtn span");

// 반응형 화면 사이즈 확인
const pc = matchMedia("screen and (min-width: 1201px)");
const tablet = matchMedia("screen and (max-width: 1200px)");
const mobile = matchMedia("screen and (max-width: 768px)");
// 접속 페이지 확인
const mainLink = window.location.pathname;

console.log(headerLogo)
console.log(headerBtn)

if(mainLink !== "/"){
    header.classList.add("sub");
    headerLogo.forEach(function(logo){
        logo.classList.remove("opac1");
    })                    
    headerLogo[1].classList.add("opac1");
    headerBtn.forEach(function(menu){
        menu.style.background = "#000"
    })
}

// 메뉴버튼 클릭 시 gnb 풀화면 제어
menuBtn.onclick = function(){
    menuDetail.style.height = "100vh";
    menuDetail.style.opacity = "1";

}
cleseBtn.onclick = function(){
    menuDetail.style.height = "0";
    menuDetail.style.opacity = "0";
}

// gnb 풀화면 내 마우스 호버 시 디자인 제어
const gnbMenus = document.querySelectorAll("#header_detail .gnb li a");

for(let i = 0; i < gnbMenus.length; i++){
    gnbMenus[i].onmouseenter = function(){
        gnbMenus.forEach(function(menu){
            menu.classList.add("liner");
        })
        gnbMenus[i].classList.remove("liner");
    }
    gnbMenus[i].onmouseleave = function(){
        gnbMenus.forEach(function(menu){
            menu.classList.remove("liner");
        })
    }
}