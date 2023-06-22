// const elem = document.querySelector('.grid');
// const iso = new Isotope( elem, {
//   // options
//   itemSelector: '.grid-item',
//   layoutMode: 'fitRows'
// });

const searchOptionBtn = document.querySelector(".cont2 .boardTop .searchSelect");
const searchOption = document.querySelector(".cont2 .boardTop .searchOption");

searchOptionBtn.onclick = function(e){
  e.preventDefault();
  searchOption.classList.add("on");
}
