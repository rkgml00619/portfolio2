let wheel = false;
let indexNum = [1, 2];

const mainTitFull = document.querySelector(".main .cont4 .mainTitle .full");
const mainTitLine = document.querySelector(".main .cont4 .mainTitle .line");
const fixMenu = document.querySelectorAll(".fixMenu ul > li");

const headerBG = document.querySelector("#header");
const headerImg = document.querySelectorAll("#header .t_logo img");
const headerMenuBtn = document.querySelectorAll("#header .menuBtn span");
const headerMemberBtn= document.querySelectorAll("#header .headerBtns > div a");

let downNum = 120;

let browserWidth;
let browserHeight;


window.addEventListener("resize",()=>{
    browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    console.log()
});

window.addEventListener("load",()=>{
    browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
});



let fullPageScroll = new fullpage('#fullpage', {
    navigation: false,
    // anchors: ['main', 'pet-clothes', 'pet-acc', 'about-us', 'footer'],
    autoScrolling: true,
    touchSensitivity: 1,
    scrollBar: false,
    // normalScrollElements: '.footer',
    onLeave: function(origin, destination, direction) {
        // PC에서의 동작 처리
        if (origin.index === 1 && direction === "down") {
            if (!origin.item.classList.contains("show")) {
                origin.item.classList.add("show");
                headerColorBK();
                fixMenu.forEach(function(menus) {
                    menus.classList.add('dark');
                });
                wheel = false;
                return wheel;
            } else if (origin.item.classList.contains("show")) {
                origin.item.onwheel = function(e) {
                    if (e.deltaY > 0) {
                        setTimeout(() => {
                            wheel = true;
                        }, 10);
                    }
                };
                let getStart;
                let getEnd;
                origin.item.addEventListener("touchstart", function(e){
                    getStart = e.changedTouches[0].clientY + " start";
                });
                origin.item.addEventListener("touchend", function(e){
                    getEnd = e.changedTouches[0].clientY + " end";                    

                    if(getStart > getEnd){
                        setTimeout(() => {
                            wheel = true;
                        }, 10);
                    }
                    else {
                        wheel = false;
                        setTimeout(() => {
                            wheel = true;
                        }, 10);
                    }
                });
                return wheel;
            }
        } else if (origin.index === 1 && direction === "up") {
            if (origin.item.classList.contains("show")) {
                headerColorBK();
                origin.item.classList.remove("show");
                headerColorWH();
                wheel = false;
                return wheel;
            } else if (!origin.item.classList.contains("show")) {
                fixMenu.forEach(function(menus) {
                    menus.classList.remove('dark');
                });
                origin.item.onwheel = function(e) {
                    if (e.deltaY < 0) {
                        setTimeout(() => {
                            wheel = true;
                        }, 10);
                    }
                };
                
                let getStart;
                let getEnd;
                origin.item.addEventListener("touchstart", function(e){
                    getStart = e.changedTouches[0].clientY + " start";
                });
                origin.item.addEventListener("touchend", function(e){
                    getEnd = e.changedTouches[0].clientY + " end";                    

                    if(getStart > getEnd){
                        wheel = false;
                        setTimeout(() => {
                            wheel = true;
                        }, 10);
                    }
                    else {
                        setTimeout(() => {
                            wheel = true;
                        }, 10);
                    }
                });
                return wheel;
            }
        }

        if (origin.index === 2 && direction === "down") {
            if (!origin.item.classList.contains("show")) {
                origin.item.classList.add("show");
                headerColorBK();
                fixMenu.forEach(function(menus) {
                    menus.classList.add('dark');
                });
                wheel = false;
                return wheel;
            } else if (origin.item.classList.contains("show")) {
                fixMenu.forEach(function(menus) {
                    menus.classList.remove('dark');
                });
                origin.item.onwheel = function(e) {
                    if (e.deltaY > 0) {
                        setTimeout(() => {
                            wheel = true;
                        }, 10);
                    }
                };
                
                let getStart;
                let getEnd;
                origin.item.addEventListener("touchstart", function(e){
                    getStart = e.changedTouches[0].clientY + " start";
                });
                origin.item.addEventListener("touchend", function(e){
                    getEnd = e.changedTouches[0].clientY + " end";                    

                    if(getStart > getEnd){
                        setTimeout(() => {
                            wheel = true;
                        }, 10);
                    }
                    else {
                        wheel = false;
                        setTimeout(() => {
                            wheel = true;
                        }, 10);
                    }
                });
                return wheel;
            }
        } else if (origin.index === 2 && direction === "up") {
            fixMenu.forEach(function(menus) {
                menus.classList.add('dark');
            });
            if (origin.item.classList.contains("show")) {
                headerColorBK();
                origin.item.classList.remove("show");
                headerColorWH();
                wheel = false;
                return wheel;
            } else if (!origin.item.classList.contains("show")) {
                fixMenu.forEach(function(menus) {
                    menus.classList.remove('dark');
                });
                origin.item.onwheel = function(e) {
                    if (e.deltaY < 0) {
                        setTimeout(() => {
                            wheel = true;
                        }, 10);
                    }
                };
                
                let getStart;
                let getEnd;
                origin.item.addEventListener("touchstart", function(e){
                    getStart = e.changedTouches[0].clientY + " start";
                });
                origin.item.addEventListener("touchend", function(e){
                    getEnd = e.changedTouches[0].clientY + " end";                    

                    if(getStart > getEnd){
                        wheel = false;
                        setTimeout(() => {
                            wheel = true;
                        }, 10);
                    }
                    else {
                        setTimeout(() => {
                            wheel = true;
                        }, 10);
                    }
                });
                return wheel;
            }
        }
    },
    afterLoad: function(origin, destination, direction) {
        // PC에서의 동작 처리
        if (destination.index === destination.index && direction === "down") {
            headerColorWH();
        } else if (destination.index === destination.index && direction === "up") {
            if (destination.item.classList.contains("show")) {
                headerColorBK();
            } else {
                headerColorWH();
            }
        } else if (destination.index === 2 && direction === "up") {
            headerColorBK();
        } else if (destination.index === 1 && direction === "up") {
            headerColorBK();
        } else if (destination.index === 0 && direction === "up") {
            headerColorWH();
        }

        if (destination.index === 3 && direction === "down") {
            mainTitLine.style.transition = "all 0.6s";
            mainTitLine.classList.add("show");
            setTimeout(function() {
                mainTitFull.style.transition = "all 2s";
                mainTitFull.classList.add("show");
            }, 600);
        } else if (destination.index === 2 && direction === "up") {
            mainTitLine.classList.remove("show");
            mainTitLine.style.transition = "all 0s";
            mainTitFull.classList.remove("show");
            mainTitFull.style.transition = "all 0s";
        } else if (destination.index === 4 && direction === "down") {
            headerColorBK();
            headerBG.style.borderBottom = "1px solid #ccc";
        } else if (destination.index === 3 && direction === "up") {
            headerColorWH();
            headerBG.style.borderBottom = "1px solid transparent";
        }
    }
});

// window.addEventListener('resize', function() {
//     responsiveWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//     responsiveHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//     fullPageScroll.responsiveHeight = responsiveHeight;
//     fullPageScroll.reBuild();
// });




// 모바일에 대응한 추가 코드
// if (window.innerWidth <= 820) {
//     // fullPage.js 초기화
//     fullPageScroll.destroy('all');
    
//     // 모바일에서 터치 스와이프로 페이지 이동 처리
//     let startY = 0;
//     let endY = 0;

//     document.addEventListener('touchstart', function(event) {
//         startY = event.touches[0].clientY;
//     });

//     document.addEventListener('touchmove', function(event) {
//         endY = event.touches[0].clientY;
//     });

//     document.addEventListener('touchend', function(event) {
//         if (endY - startY > 50) {
//             // 스와이프 업
//             fullpage_api.moveSectionUp();
//         } else if (startY - endY > 50) {
//             // 스와이프 다운
//             fullpage_api.moveSectionDown();
//         }
//     });
    
//     fullPageScroll = new fullpage('#fullpage', {
//         autoScrolling: false,
//         afterLoad: function(origin, destination, direction){
//             if(destination === 1 && direction === "down"){
//                 if(destination.item.classList.contains("show")){
//                     fullpage_api.setAllowScrolling(true);
//                 }
//                 else{
//                     fullpage_api.setAllowScrolling(false);
//                 }
//             }
//         }
//     });
// }


/*헤더 컬러변화 리팩토링*****************************************************************/

function headerColorBK(){
    headerImg.forEach(function(logo){
        logo.classList.remove("opac1");
    });                  
    headerImg[1].classList.add("opac1");
    headerMenuBtn.forEach(function(menu){
        menu.style.background = "#000";
    });
    headerMemberBtn.forEach(function(menu){
        menu.style.color = "#000";
    });
    headerBG.classList.add("on");
}
function headerColorWH(){
    headerImg.forEach(function(logo){
        logo.classList.remove("opac1");
    });                  
    headerImg[0].classList.add("opac1");
    headerMenuBtn.forEach(function(menu){
        menu.style.background = "#fff"
    });  
    headerMemberBtn.forEach(function(menu){
        menu.style.color = "#fff";
    });
    headerBG.classList.remove("on");
}

// function fixMenuControl(index){
//     fixMenu.forEach(function(fix){
//         fix.classList.remove("active");
//     })
//     fixMenu[index].classList.add("active");
// }