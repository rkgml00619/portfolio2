const menuBtn = document.querySelector("#header .menuBtn");
const menuDetail = document.querySelector("#header_detail");
const cleseBtn = document.querySelector("#header_detail .menuBtn");

const menuBtnLine = document.querySelectorAll("#header .menuBtn > span");

menuBtn.onclick = function(){
    menuDetail.style.height = "100vh";
    menuDetail.style.opacity = "1";

}
cleseBtn.onclick = function(){
    menuDetail.style.height = "0";
    menuDetail.style.opacity = "0";
}

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