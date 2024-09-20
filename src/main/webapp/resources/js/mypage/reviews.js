// 글자 수 1,000자 제한 
$(document).ready(function () {
    $('#reviewTextarea').on('input', function () {
        var currentLength = $(this).val().length;

        var maxLength = 1000;
        if (currentLength > maxLength) {
            $(this).val($(this).val().substring(0, maxLength)); // 최대 길이 초과 시 자르기
            currentLength = maxLength; // 현재 길이 업데이트
        }

        $('#charCount').text(currentLength + " / " + maxLength);
    });
});


// 별점 기능 
$(document).ready(function () {
    $('.star_rating > .star').click(function () {
        $(this).siblings().removeClass('on');      
        $(this).addClass('on').prevAll('.star').addClass('on');     
    });
});

/* 사진 업로드 */
function previewImage(event) {
    const file = event.target.files[0]; 
    const imagePreview = document.getElementById('image-preview');

    if (file) {
        const reader = new FileReader(); 
        reader.onload = function (e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="이미지 미리보기" />`;
        };
        reader.readAsDataURL(file); 
    } else {
        imagePreview.innerHTML = `<span>+</span>`;
    }
}