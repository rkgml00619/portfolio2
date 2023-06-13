let wheel = false;
let indexNum = [1, 2];

const mainTitFull = document.querySelector(".main .cont4 .mainTitle .full");
const mainTitLine = document.querySelector(".main .cont4 .mainTitle .line");
const fixMenu = document.querySelectorAll(".fixMenu ul > li");

const headerImg = document.querySelectorAll("#header .t_logo img");
const headerMenuBtn = document.querySelectorAll("#header .menuBtn span");

let downNum = 120;

let fullPageScroll = new fullpage('#fullpage', {
    navigation: false,
    responsiveWidth: 820, // 700px 이하의 화면에서 적용
    anchors: ['main', 'pet-clothes', 'pet-acc','about-us'],
    autoScrolling: true, // autoScrolling 해제
    touchSensitivity: 1,
    scrollBar: false,
    onLeave: function(origin, destination, direction){ 
        // 두번째 섹션 스크롤에 따라 화면변화
        if(origin.index === 1 && direction === "down" ){
            if(!origin.item.classList.contains("show")){
                origin.item.classList.add("show");
                headerColorBK();
                fixMenu.forEach(function(menus){
                    menus.classList.add('dark');
                });
                wheel = false;
                return wheel
            }
            else if(origin.item.classList.contains("show")){
                origin.item.onwheel = function(e){
                    if(e.deltaY > 0){
                        setTimeout(()=>{
                            wheel = true;
                        }, 100)
                    }
                }
                return wheel;
            }
        }
        else if(origin.index === 1 && direction === "up"){
            if(origin.item.classList.contains("show")){
                headerColorBK()
                origin.item.classList.remove("show");
                headerColorWH();
                wheel = false;
                return wheel
            }
            else if(!origin.item.classList.contains("show")){
                fixMenu.forEach(function(menus){
                    menus.classList.remove('dark');
                });
                origin.item.onwheel = function(e){
                    if(e.deltaY < 0){
                        setTimeout(()=>{
                            wheel = true
                        }, 100)
                    }
                }
                return wheel;
            }
        }
        // 세번째 섹션 스크롤에 따라 화면변화
        if(origin.index === 2 && direction === "down" ){
            if(!origin.item.classList.contains("show")){
                origin.item.classList.add("show");
                headerColorBK();
                fixMenu.forEach(function(menus){
                    menus.classList.add('dark');
                });
                wheel = false;
                return wheel
            }
            else if(origin.item.classList.contains("show")){
                fixMenu.forEach(function(menus){
                    menus.classList.remove('dark');
                });
                origin.item.onwheel = function(e){
                    if(e.deltaY > 0){
                        setTimeout(()=>{
                            wheel = true
                        }, 100)
                    }
                }
                return wheel;
            }
        }
        else if(origin.index === 2 && direction === "up"){
            fixMenu.forEach(function(menus){
                menus.classList.add('dark');
            });
            if(origin.item.classList.contains("show")){ 
                headerColorBK()               
                origin.item.classList.remove("show");
                headerColorWH();
                wheel = false;
                return wheel
            }
            else if(!origin.item.classList.contains("show")){
                fixMenu.forEach(function(menus){
                    menus.classList.remove('dark');
                });
                origin.item.onwheel = function(e){
                    if(e.deltaY < 0){
                        setTimeout(()=>{
                            wheel = true
                        }, 100)
                    }
                }
                return wheel;
            }
        }
    },
    afterLoad: function(origin, destination, direction){
        // 헤더 화면에 따라 컬러 변경
        if(destination.index === destination.index && direction === "down"){
            headerColorWH();
            // fix 메뉴 액티브
            fixMenuControl(destination.index);
        }
        else if(destination.index === destination.index && direction === "up"){
            if(destination.item.classList.contains("show")){
                headerColorBK();
            }
            else {
                headerColorWH();
            }
            // fix 메뉴 액티브
            fixMenuControl(destination.index);
        }
        else if(destination.index === 2 && direction === "up"){
            headerColorBK();
        }
        else if(destination.index === 1 && direction === "up"){
            headerColorBK();
        }
        else if(destination.index === 0 && direction === "up"){
            headerColorWH();
        }
        
        // 네번째 섹션 애니메이션 적용
        if(destination.index === 3 && direction === "down"){ 
            mainTitLine.style.transition = "all 0.6s";
            mainTitLine.classList.add("show");
            setTimeout(function(){
                mainTitFull.style.transition = "all 2s";
                mainTitFull.classList.add("show");
            }, 600)
        }
        else if(destination.index === 2 && direction === "up"){
            mainTitLine.classList.remove("show");
            mainTitLine.style.transition = "all 0s";
            mainTitFull.classList.remove("show");
            mainTitFull.style.transition = "all 0s";
        }
    }
});

// 모바일에 대응한 추가 코드
if (window.innerWidth <= 820) {
    // fullPage.js 초기화
    fullPageScroll.destroy('all');
    
    // 모바일에서 터치 스와이프로 페이지 이동 처리
    let startY = 0;
    let endY = 0;

    document.addEventListener('touchstart', function(event) {
        startY = event.touches[0].clientY;
    });

    document.addEventListener('touchmove', function(event) {
        endY = event.touches[0].clientY;
    });

    document.addEventListener('touchend', function(event) {
        if (endY - startY > 50) {
            // 스와이프 업
            fullpage_api.moveSectionUp();
        } else if (startY - endY > 50) {
            // 스와이프 다운
            fullpage_api.moveSectionDown();
        }
    });
    
    fullPageScroll = new fullpage('#fullpage', {
        autoScrolling: false,
        afterLoad: function(origin, destination, direction){
            if(destination === 1 && direction === "down"){
                if(destination.item.classList.contains("show")){
                    fullpage_api.setAllowScrolling(true);
                }
                else{
                    fullpage_api.setAllowScrolling(false);
                }
            }
        }
    });
}


/*헤더 컬러변화 리팩토링*****************************************************************/

function headerColorBK(){
    headerImg.forEach(function(logo){
        logo.classList.remove("opac1");
    })                    
    headerImg[1].classList.add("opac1");
    headerMenuBtn.forEach(function(menu){
        menu.style.background = "#000"
    })
}
function headerColorWH(){
    headerImg.forEach(function(logo){
        logo.classList.remove("opac1");
    })                    
    headerImg[0].classList.add("opac1");
    headerMenuBtn.forEach(function(menu){
        menu.style.background = "#fff"
    })         
}

function fixMenuControl(index){
    fixMenu.forEach(function(fix){
        fix.classList.remove("active");
    })
    fixMenu[index].classList.add("active");
}