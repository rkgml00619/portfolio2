// Form 태그
const joinForm = document.querySelector("#join");
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
// 아이디 중복체크
const memberId = document.querySelector(".joinInfo .joinInfoWrap #memberId");
const idCheckBtn = document.querySelector(".joinInfo .joinInfoWrap .idCheck");
// 비밀번호 체크
const memberPass = document.querySelector(".joinInfo .joinInfoWrap #memberPass");
const passCheck = document.querySelector(".joinInfo .joinInfoWrap #memberPassCheck");
const passCheckBtn = document.querySelector(".joinInfo .joinInfoWrap .passCheck");
// 이용약관 동의 체크박스
const agreementCheck = document.querySelectorAll(".agreementWrap .inputWrap label");
const agreementInput = document.querySelectorAll(".agreementWrap .inputWrap input");

// 오류 메세지들
const errText = document.querySelectorAll(".inputWrap .errText");

let checkValues = [];
let checkCount = 0;

let idCrossCheck = false;
let idCondition = false;
let passCrossCheck = false;

// 아이디 중복체크 버튼 클릭 시
idCheckBtn.onclick = function(e){
    e.preventDefault();
    const memberIdValue = memberId.value;
    const checkId = /^[\w]{6,12}$/;

    axios.post('/idcheck', {
        memberId: memberId.value
    })
    .then(function (response) {
        //요청이 성공했을 때 > 중복된 값이 있을 때
        alert(response.data.member.memberId + "는 중복된 아이디 입니다.");
        idCrossCheck = false;
        checkFail(memberId);
    })
    .catch(function (error) {
        //요청이 실패했을 때 > 중복된 값이 없을 때 (data는 null로 뜸)
        if(checkId.test(memberIdValue)){
            checkOk(memberId);
            errTextOk("idErr");
            alert(memberId.value + "은 사용 가능한 아이디 입니다");
            idCheckBtn.classList.add("ok");
            idCheckBtn.innerText = "사용가능";
        }
        else {
            alert(memberId.value + "은 사용 불가능한 아이디 입니다");
            errTextFail("idErr", "아이디는 영문과 _ 기호를 조합한 6~12글자만 가능합니다.");
            idCheckBtn.classList.remove("ok");
            checkFail(memberId);
        }
        idCrossCheck = true;
    });

    console.log(idCrossCheck);
}

// 비밀번호 확인 버튼 클릭 시
passCheckBtn.onclick = function(e){
    e.preventDefault();

    const memberPassValue = memberPass.value;
    const checkPass = /^[\w\.!@#$%^&*-]{8,16}$/;

    if(checkPass.test(memberPassValue)){
        checkOk(memberPass);
        errTextOk("passErr");
        if(memberPass.value === passCheck.value){
            alert("비밀번호가 동일합니다.");
            passCrossCheck = true;
            passCheckBtn.classList.add("ok");
            passCheckBtn.innerText = "비밀번호 일치";
            errTextOk("passCheckErr");
            checkOk(passCheck);
        }
        else {
            passCrossCheck = false;
            errTextFail("passCheckErr", "비밀번호가 일치하지 않습니다.");
        }
    }
    else {
        checkFail(memberPass);
        passCrossCheck = false;
        errTextFail("passErr", "영문과 숫자, 특수기호를 조합한 8~16자리 글자만 가능합니다.");
    }
}


joinForm.onsubmit = function(e){

    // input value 값들
    const memberNameValue = memberName.value;
    const memberTel1Value = memberTel1.value;
    const memberTel2Value = memberTel2.value;
    const memberTel3Value = memberTel3.value;
    const memberEmailValue = memberEmail.value;
    const emailTextValue = emailText.value;
    

    // 정규표현식 체크 조건들
    const checkName = /^[가-힣]{2,4}$/;
    const checkTel1 = /^(010){3}$/;
    const checkTel2 = /^\d{4}$/;
    const checkTel3 = /^\d{4}$/;
    const checkEmail = /^[\w]{2,}$/;
    const checkEmailText = /^[a-z]+\.[a-z\.]{2,5}$/;
    

    // 이름 체크
    if(checkName.test(memberNameValue)){
        checkOk(memberName);
        checkValueArray(checkName, memberNameValue, 0);
        errTextOk("nameErr");
    }
    else{
        checkFail(memberName);
        errTextFail("nameErr", "2~4 글자의 한글만 입력 가능합니다.");
    }
    // 전화번호 체크
    if(checkTel2.test(memberTel2Value)){
        checkOk(memberTel2);
        checkValueArray(checkTel2, memberTel2Value, 1);
        errTextOk("telErr");
    }
    else {
        checkFail(memberTel2);
        errTextFail("telErr", "4자리 숫자만 가능합니다.");
    }
    if(checkTel3.test(memberTel3Value)){
        checkOk(memberTel3);
        checkValueArray(checkTel3, memberTel3Value, 2);
        errTextOk("telErr");
    }
    else {
        checkFail(memberTel3);
        errTextFail("telErr", "4자리 숫자만 가능합니다.");
    }
    // 이메일 체크
    if(checkEmail.test(memberEmailValue)){
        checkOk(memberEmail);
        checkValueArray(checkEmail, memberEmailValue, 3);
        errTextOk("emailErr");
    }
    else {
        checkFail(memberEmail);
        errTextFail("emailErr", "영문, 숫자와 _ 기호만 가능합니다.");
    }
    if(checkEmailText.test(emailTextValue)){
        checkOk(emailText);
        checkValueArray(checkEmailText, emailTextValue, 4);
        errTextOk("emailErr");
    }
    else {
        checkFail(emailText);
        errTextFail("emailErr", "올바른 이메일 주소를 입력해주세요.");
    }
    // 아이디 체크
    if(idCrossCheck){
        checkOk(memberId);
        checkValues[5] = idCrossCheck;
    }
    else {
        checkFail(memberId);
        errTextFail("idErr", "아이디 중복체크를 해주세요.");
    }
    // 비밀번호 체크
    if(passCrossCheck){
        checkValues[6] = passCrossCheck;
    }
    else {
        checkFail(passCheck);
        checkFail(memberPass);
        errTextFail("passErr", "영문과 숫자, 특수기호를 조합한 8~16자리 글자만 가능합니다.");
        errTextFail("passCheckErr", "비밀번호 확인을 진행해주세요");
    }
    // 이용약관 동의
    if(agreementInput[0].checked){
        checkValues[7] = true;
        errTextOk("privacyCheckErr");
    }
    else{
        errTextFail("privacyCheckErr", "필수 약관에 동의해주세요.");
    }
    if(agreementInput[1].checked){
        checkValues[8] = true;
        errTextOk("serviceCheckErr");
    }
    else{
        errTextFail("serviceCheckErr", "필수 약관에 동의해주세요.");
    }

    console.log("checkValues : " + checkValues.length);
    console.log("checkCount : " + checkCount);

    if(checkValues.length === 9){
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
function checkValueArray(check, value, num){    
    checkValues[num] = check.test(value);
}
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

// 이용약관 라벨 클릭 시 디자인 변경
for(let i = 0; i < agreementCheck.length; i++){
    agreementCheck[i].onclick = function(){
        agreementCheck[i].querySelector("span.checkIcon").classList.toggle("checked");

        console.log(agreementInput[i].checked);
    }
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