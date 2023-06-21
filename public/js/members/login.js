// login.js (클라이언트 측 JavaScript 파일)

if(document.referrer.includes("login")){    
    document.addEventListener('DOMContentLoaded', () => {
        const loginError = '아이디 또는 비밀번호를 다시 확인해주세요'; 
    
        if (loginError) {
        alert(loginError);
        }
    });
}