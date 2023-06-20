// topMove 버튼 제어
const goTopBtn = document.querySelector(".goTop");

function goTopBtnMove(position){
    window.addEventListener("scroll", function(){
        let windowPosition = window.scrollY;
    
        if(windowPosition >= position.offsetTop){
            goTopBtn.classList.add("show");
        }
        else {
            goTopBtn.classList.remove("show");
        }
    
        goTopBtn.addEventListener("click", function(e){
            e.preventDefault();
    
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        })
    });
}

