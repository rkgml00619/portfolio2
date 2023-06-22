const categoryLabel = document.querySelectorAll(".cont2 .categoryWrap .categoryLabel");
const categoryInput = document.querySelectorAll(".cont2 .categoryWrap .categoryInput");
const brdDate = document.querySelector(".cont2 .twoWrap #boardDate");

brdDate.value = new Date().toISOString().substring(0, 10);

for(let i = 0; i < categoryLabel.length; i++){
    categoryLabel[i].onclick = function(){
        categoryLabel.forEach(function(label){
            label.classList.remove("select");
        })
        categoryLabel[i].classList.add("select");
    }
}