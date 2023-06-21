// Form 태그
const mypageEditForm = document.querySelector("#mypageUpdate");
// 버튼 태그들
const joinBtn = document.querySelector(".formRight .join");
const cancel = document.querySelector(".formRight .cancel");
// 이름 태그
const memberName = document.querySelector(".privacyInfoWrap #memberName");
// 전화번호 태그
const memberTel1 = document.querySelector(".privacyInfoWrap #memberTel_one");
const memberTel2 = document.querySelector(".privacyInfoWrap #memberTel");
const memberTel3 = document.querySelector(".privacyInfoWrap #memberTel_three");

// 이메일 선택 입력 시 value값 삽입
const memberEmail = document.querySelector("#memberEmail");
const emailText = document.querySelector("#emailTextSel");
const emailSel = document.querySelector("#emailSel");
// 비밀번호 체크
const originPass = document.querySelector(".joinInfo .joinInfoWrap #originPass");
const memberPass = document.querySelector(".joinInfo .joinInfoWrap #changePass");
const passCheck = document.querySelector(".joinInfo .joinInfoWrap #changePassCheck");
const passCheckBtn = document.querySelector(".joinInfo .joinInfoWrap .passCheck");

let memberPassValue;
const checkPass = /^[\w\.!@#$%^&*-]{8,16}$/;

// 오류 메세지들
const errText = document.querySelectorAll(".inputWrap .errText");

let checkValues = {
    nameCheck: false,
    passCheck: false,
    telCheck: false,
    tel_threeCheck: false,
    emailCheck: false,
    emailTextCheck: false,
};

let passCrossCheck = false;

// 기존 비밀번호(originPass) 숨김처리
window.addEventListener('DOMContentLoaded', function() {
    originPass.parentNode.removeChild(originPass);
});

// 비밀번호 확인 버튼 클릭 시
passCheckBtn.onclick = function(e){
    e.preventDefault();

    memberPassValue = memberPass.value;

    if(originPass.value === memberPassValue){
        checkFail(memberPass);
        passCrossCheck = false;
        errTextFail("passErr", "기존과 같은 비밀변호는 사용이 불가능합니다.");
    }
    else if (memberPassValue === ""){
        checkFail(memberPass);
        alert("변경할 비밀번호를 입력하세요.");
    }
    else {
        if(checkPass.test(memberPassValue)){
            if(memberPassValue === passCheck.value){
                alert("비밀번호 변경이 가능합니다.");
                passCrossCheck = true;
                passCheckBtn.classList.add("ok");
                passCheckBtn.innerText = "비밀번호 일치";
                errTextOk("passErr");
                errTextOk("passCheckErr");
                checkOk(passCheck);
                checkOk(memberPass);
            }
            else {
                checkFail(passCheck);
                passCrossCheck = false;
                errTextFail("passCheckErr", "비밀번호가 일치하지 않습니다.");
            }
        }
        else {
            checkFail(memberPass);
            checkFail(passCheck);
            passCrossCheck = false;
            errTextFail("passErr", "영문과 숫자, 특수기호를 조합한 8~16자리 글자만 가능합니다.");
            errTextFail("passCheckErr", "영문과 숫자, 특수기호를 조합한 8~16자리 글자만 가능합니다.");
        }
    }
}


mypageEditForm.onsubmit = function(e){
    // input value 값들
    const memberNameValue = memberName.value;
    const memberTel2Value = memberTel2.value;
    const memberTel3Value = memberTel3.value;
    const memberEmailValue = memberEmail.value;
    const emailTextValue = emailText.value;
    

    // 정규표현식 체크 조건들
    const checkName = /^[가-힣]{2,4}$/;
    const checkTel2 = /^\d{4}$/;
    const checkTel3 = /^\d{4}$/;
    const checkEmail = /^[\w]{2,}$/;
    const checkEmailText = /^[a-z]+\.[a-z\.]{2,5}$/;
    

    // 이름 체크
    if(checkName.test(memberNameValue)){
        checkOk(memberName);
        checkValues.nameCheck = true;
        errTextOk("nameErr");
    }
    else{
        checkFail(memberName);
        errTextFail("nameErr", "2~4 글자의 한글만 입력 가능합니다.");
    }
    // 전화번호 체크
    if(checkTel2.test(memberTel2Value)){
        checkOk(memberTel2);
        checkValues.telCheck = true;
        errTextOk("telErr");
    }
    else {
        checkFail(memberTel2);
        errTextFail("telErr", "4자리 숫자만 가능합니다.");
    }
    if(checkTel3.test(memberTel3Value)){
        checkOk(memberTel3);
        checkValues.tel_threeCheck = true;
        errTextOk("telErr");
    }
    else {
        checkFail(memberTel3);
        errTextFail("telErr", "4자리 숫자만 가능합니다.");
    }
    // 이메일 체크
    if(checkEmail.test(memberEmailValue)){
        checkOk(memberEmail);
        checkValues.emailCheck = true;
        errTextOk("emailErr");
    }
    else {
        checkFail(memberEmail);
        errTextFail("emailErr", "영문, 숫자와 _ 기호만 가능합니다.");
    }
    if(checkEmailText.test(emailTextValue)){
        checkOk(emailText);
        checkValues.emailTextCheck = true;
        errTextOk("emailErr");
    }
    else {
        checkFail(emailText);
        errTextFail("emailErr", "올바른 이메일 주소를 입력해주세요.");
    }
    // 비밀번호 체크
    if(memberPass.value === ""){
        checkValues.passCheck = true;
    }
    else {
        if(passCrossCheck){
            checkValues.passCheck = true;
        }
        else {
            checkValues.passCheck = false;
            checkFail(passCheck);
            errTextFail("passCheckErr", "비밀번호 확인을 진행해주세요");
        }
    }

    console.log(checkValues);

    if(checkValues.nameCheck && checkValues.passCheck && checkValues.emailCheck && checkValues.emailTextCheck && checkValues.telCheck && checkValues.tel_threeCheck){
        if(memberPass.value === ""){
            memberPass.value = originPass.value;
        }
        else{
            memberPass.value = memberPass.value;
        }
        // e.preventDefault();
        e.submit();
    }
    else {
        e.preventDefault();
    }
}

// 정규식이 맞았을 때
function checkOk(item){
    item.classList.remove("err");
}
// function checkValueArray(check, value, num){    
//     changeCheckValues[num] = check.test(value);
// }
function errTextOk(itemText){    
    for(let i = 0; i < errText.length; i++){
        if(errText[i].classList.contains(itemText)){
            errText[i].classList.remove("err");
        }
    }
}
// 정규식이 맞지 않았을 때
function checkFail(item){
    item.classList.add("err");
}
function errTextFail(itemText, errInnerText){
    for(let i = 0; i < errText.length; i++){
        if(errText[i].classList.contains(itemText)){
            errText[i].classList.add("err");
            errText[i].innerText = errInnerText;
        }
    }
}

// 이메일 셀렉트 태그 선택 시 input 태그에 value 적용
emailSel.onclick = function(){
    emailText.value = emailSel.value;
}

// 취소 버튼 클릭 시
cancel.onclick = function(e){
    e.preventDefault();

    let cancelCheck = window.confirm("회원가입을 취소하시겠습니까?");

    if(cancelCheck){
        alert("회원가입이 취소되었습니다.");
        history.back();
    }
    else {
        alert("회원가입을 계속 진행해주세요.")
    }
}