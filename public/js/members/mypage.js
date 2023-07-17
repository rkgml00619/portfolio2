const mypageUpdateBtn = document.querySelector(".members_mypage #mypage .formRight .mypageBtn");

const mypageCheckPassView = document.querySelector(".members_mypage .mypagePassCheck");

const mypageOriginPass = document.querySelector(".members_mypage #mypage #memberPass");
const mypageCheckPass = document.querySelector(".members_mypage .mypagePassCheck .center .passCheckInputWrap input");

const mypageCheckPassBtn = document.querySelector(".members_mypage .mypagePassCheck .passCheckBtns .checkBtn");
const mypageCheckPassCancelBtn = document.querySelector(".members_mypage .mypagePassCheck .passCheckBtns .cancel");
const cancel = document.querySelector(".members_mypage .cont1 .center form .formRight .cancel");

mypageUpdateBtn.onclick = function(e){
    e.preventDefault();

    mypageCheckPassView.classList.add("show");
}
mypageCheckPassCancelBtn.onclick = function(e){
    e.preventDefault();

    mypageCheckPassView.classList.remove("show");
}

mypageCheckPassBtn.onclick = function(e){
    e.preventDefault();

    if(mypageOriginPass.value === mypageCheckPass.value){
        location = "/members/mypage/edit";
    }
    else {
        alert("비밀번호를 다시 확인해주세요.")
    }
}

mypageCheckPass.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 Enter 동작 방지
      mypageCheckPassBtn.click(); // 특정 링크 클릭
    }
});

// 취소 버튼 클릭 시
cancel.onclick = function(e){
    e.preventDefault();
    history.back();
}