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
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="이미지 미리보기" class="insert-img"/>`;
        };
        reader.readAsDataURL(file); 
    } else {
        imagePreview.innerHTML = `<span>+</span>`;
    }
}

$(document).off("click", ".write-btn").on("click", ".write-btn", function(){
	const reviewScore = $(".star_rating .on").length;
	const reviewContent = $("#reviewTextarea").val();
	const reviewImage = $("#image-input")[0].files[0];
	const productId = $(this).data("productid");
	const orderId = $(this).data("orderid");
	let chagedImg = false; 
	
	const imgSrc = $(".insert-img").attr("src");
	
	const formData = new FormData();

	if(!reviewImage){
		if(imgSrc !== undefined)
			chagedImg = true;
	} else {
		formData.append('reviewImage', reviewImage);
	}
	
	formData.append('orderId', orderId);
	formData.append('productId', productId);
	formData.append('reviewContent', reviewContent);
	formData.append('reviewScore', reviewScore);
	formData.append('chagedImg', chagedImg);
	
	
	$.ajax({
		url:"updateReview",
		method:"POST",
		data: formData,
		processData: false,
		contentType: false,
		success: function() {
			$(".modal-title").html("리뷰 등록");
			$(".modal-body").html("리뷰 등록에 성공하였습니다.");
			$(".header-modal").trigger("click");
			$(".btn-close").trigger("click"); 
			$(".order-list-btn").trigger("click");
		},
		error: function(data){
			$(".modal-title").html("등록 실패");
			$(".modal-body").html("리뷰 등록에 실패하였습니다.");
			$(".header-modal").trigger("click");
		}
	})
})

