const menuBtn = document.querySelector("#header .menuBtn");
const menuDetail = document.querySelector("#header_detail");
const cleseBtn = document.querySelector("#header_detail .menuBtn");

const menuBtnLine = document.querySelectorAll("#header .menuBtn > span");

const header = document.querySelector("#header");
const headerLogo = document.querySelectorAll("#header .t_logo img");
const headerBtn = document.querySelectorAll("#header .menuBtn span");
const headerLoginBtn = document.querySelector("#header .headerBtns > div #loginId");
const headerMemberBtns = document.querySelectorAll("#header .headerBtns > div a");

const headerDetailCircle = document.querySelector("#header_detail .hdetail_bot .center .circleText");

// 반응형 화면 사이즈 확인
const pc = matchMedia("screen and (min-width: 1201px)");
const tablet = matchMedia("screen and (max-width: 1200px)");
const mobile = matchMedia("screen and (max-width: 768px)");

// 접속 페이지 확인
const mainLink = window.location.pathname;

if(mainLink.includes("mypage") && headerLoginBtn.value === "none"){
    alert("회원이 아니시면 접속하실 수 없습니다.");
    window.location.href = history.back();
}


if(mainLink !== "/" && mainLink !== "/m"){
    header.classList.add("sub");
    headerLogo.forEach(function(logo){
        logo.classList.remove("opac1");
    })                    
    headerLogo[1].classList.add("opac1");
    headerBtn.forEach(function(menu){
        menu.style.background = "#000"
    })
    headerMemberBtns.forEach(function(menu){
        menu.style.color = "#000"
        menu.style.fontWeight = "400"
    })
}

// 메뉴버튼 클릭 시 gnb 풀화면 제어
menuBtn.onclick = function(){
    menuDetail.style.height = "100vh";
    menuDetail.style.opacity = "1";
    headerDetailCircle.style.opacity = "1";

}
cleseBtn.onclick = function(){
    menuDetail.style.height = "0";
    menuDetail.style.opacity = "0";
    headerDetailCircle.style.opacity = "0";
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