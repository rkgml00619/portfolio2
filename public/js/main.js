const main = document.querySelector(".main");
const cont2 = document.querySelector(".main .cont2");
const cont3 = document.querySelector(".main .cont3");
let wheelmove = false;

function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();

    return false;
}

function disable(section){
    section.addEventListener('wheel', preventScroll);
}

function enable(section){
    section.removeEventListener('wheel', preventScroll);
}


let test = new fullpage('#fullpage', {
    navigation: true,
    responsiveWidth: 700,
    anchors: ['home', 'about-us', 'contact'],
    parallax: true,
    // onLeave: function(origin, destination, direction){
    //     console.log("Leaving section" + origin.index);
    // },
    afterLoad: function (origin, destination, direction, trigger){
        if(destination.index == 1) {
            sectionScrollEvent(cont2);
        }
        if(destination.index == 2) {
            sectionScrollEvent(cont3);
        }
    },
});

function sectionScrollEvent(section){
    disable(section);   
    section.addEventListener("wheel", function(e){                
        if(e.deltaY > 0){
            if(!section.classList.contains("show")){
                section.classList.add("show");
                section.addEventListener("wheel", (e2)=>{
                    setTimeout(function(item, idx){
                        enable(section);
                    }, 500)
                })
            }
        }
        else if (e.deltaY < 0){
            if(section.classList.contains("show")){
                disable(section);
                section.classList.remove("show");
                
                section.addEventListener("wheel", (e2)=>{
                    setTimeout(function(item, idx){
                        enable(section);
                    }, 500)
                })
            }
        }
    });
}



//내릴 때
                // if(e.deltaY > 1){
                //     if(cont2.classList.contains("show")){
                //         enable(cont2);  
                //     }
                //     else{
                //         cont2.classList.add("show");
                //         disable(cont2);
                //     } 
                // }

                // 올릴 때
                // else if(e.deltaY < 0){
                //     if(cont2.classList.contains("show")){
                        
                //         cont2.classList.remove("show");
                //         enable(cont2);
                       
                //     }
                //     else{
                //         disable(cont2);
                //     }
                // }
