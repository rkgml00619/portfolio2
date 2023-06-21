const mediaLists = document.querySelectorAll(".cont3 .mediaConts .mediaRight .mediaList")
const mediaImgs = document.querySelectorAll(".cont3 .mediaConts .mediaRight .mediaList img");

const images = Array.from(mediaImgs).map(img => img.src);

window.addEventListener("load", function(){
    // 이미지들의 가로 사이즈와 세로 사이즈를 확인하고 스타일을 적용
    mediaImgs.forEach((img, index) => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
    
        if (width > height) {
        img.style.height = "100%";
        img.style.width = "auto";
        } else {
        img.style.height = "auto";
        img.style.width = "100%";
        }
    });
})
