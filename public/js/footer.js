const container = document.querySelector("#container");
const footerLeft = document.querySelector(".footer .left");
const fMenuBtn = document.querySelector(".footer .siteMap .fMenuBtn");
const fMenu = document.querySelector(".footer .siteMap .fMenu");
const fMenuList = document.querySelectorAll(".footer .siteMap .fMenu > li");

let link = window.location.pathname;
let finalHtml = `</body></html>`;

if(link === "/"){
    fMenuBtn.querySelector(".btnText").innerText = "Home";
}
else if(link.includes("about")){
    fMenuBtn.querySelector(".btnText").innerText = "About Us";
}
else if(link.includes("clothes")){
    fMenuBtn.querySelector(".btnText").innerText = "Clothes";
}
else if(link.includes("acc")){
    fMenuBtn.querySelector(".btnText").innerText = "Acc";
}
else if(link.includes("board")){
    fMenuBtn.querySelector(".btnText").innerText = "Board";
}

fMenuBtn.onclick = function(e){
    e.preventDefault();

    if(fMenu.classList.contains("on")){
        fMenuBtn.querySelector("span.arrowIcon").innerText = "expand_more";
        fMenu.classList.remove("on");
    }
    else {
        fMenuBtn.querySelector("span.arrowIcon").innerText = "expand_less";
        fMenu.classList.add("on");
    }
}

footerLeft.onclick = function(){
    if(fMenu.classList.contains("on")){
        fMenuBtn.querySelector("span.arrowIcon").innerText = "expand_more";
        fMenu.classList.remove("on");
    }
}