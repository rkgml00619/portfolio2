const categoryLabel = document.querySelectorAll(".cont2 .categoryWrap .categoryLabel");
const categoryInput = document.querySelectorAll(".cont2 .categoryWrap .categoryInput");
const brdDate = document.querySelector(".cont2 .twoWrap #boardDate");
const boardConts = document.querySelector(".cont2 .inputWrap #boardConts");

brdDate.value = new Date().toISOString().substring(0, 10);

boardConts.value = boardConts.value.trim();

for(let i = 0; i < categoryLabel.length; i++){
    categoryLabel[i].onclick = function(){
        categoryLabel.forEach(function(label){
            label.classList.remove("select");
        })
        categoryLabel[i].classList.add("select");
    }
}