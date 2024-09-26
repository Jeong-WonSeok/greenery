let isValid
const onlyNum = /^[0-9]+$/;

$(document).ready(function() {
	isValid = true;
});

/* 사진 업로드 */
function previewImage(event, previewId) {
    const file = event.target.files[0]; 
    const imagePreview = document.getElementById(previewId);
    
    if (file) {
        const reader = new FileReader(); 
        reader.onload = function (e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" />`;
        };
        reader.readAsDataURL(file);
        if(previewId === "image-preview5"){
        	$(".product-detail-image").empty();
        }else{
        	$(".product-image").empty();
        }
    } else {
        imagePreview.innerHTML = `<span>+</span>`;
        if(previewId === "image-preview5"){
        	$(".product-detail-image").html("이미지를 등록해 주세요");
        }else{
        	$(".product-image").html("이미지를 등록해 주세요");
        }
    }
}

$("#product-form").on('submit', function(e){
	
	const productImg= $(".product-image").val();
	const deatilImg= $(".product-detail-image").val();
	console.log(isValid);
	
	if(productImg !== "" && productImg !== null && productImg !== undefined) 
		isValid = false;
	if(deatilImg !== "" && deatilImg !== null && deatilImg !==undefined) 
		isValid = false;
	
	if(!isValid){
		$("modal-body").html("형식을등록해 주세요.");
		$("#productModal").modal('show');
		return false;
	}
	return true;
})


$('#product-name').on('input', function () {
    var currentLength = $(this).val().length;

    var maxLength = 250;
    if (currentLength > maxLength) {
        $(this).val($(this).val().substring(0, maxLength)); // 최대 길이 초과 시 자르기
        currentLength = maxLength; // 현재 길이 업데이트
    }

    $('#charCount').text(currentLength + " / " + maxLength);
});

$("#productPrice").on('input', function () {
	isValid = true;
	const val = $(this).val();
	
	if(!onlyNum.test(val)){
		$(".product-price").html("숫자만 입력해 주세요.");
		$(this).focus();
		isValid = false;
	}else if(val.length < 4) {
		$(".product-price").html("1000원 이상 입력해 주세요.");
		$(this).focus();
		isValid = false;
	}else{
		$(".product-price").empty();
	}
});

$("#productStock").on('input', function () {
	isValid = true;
	const val = $(this).val();
	
	if(!onlyNum.test(val)){
		$(".product-stock").html("숫자만 입력해 주세요.");
		$(this).focus();
		isValid = false;
	}else if(val <= 0) {
		$(".product-stock").html("1개 이상 입력해주세요.");
		$(this).focus();
		isValid = false;
	}else{
		$(".product-stock").empty();
	}
});

/*// 이미지 클릭 시 이미지 제거
function removeImage(previewId, inputId) {
    // 미리보기 요소 찾음
    const $preview = $('#' + previewId); // 전달된 미리보기 영역
    const $input = $('#' + inputId);	 // 파일 선택 input의 id

    const $img = $preview.find('img');	// 이미지(img)가 있으면 그 이미지 없앰
    if ($img.length) {
        $img.remove();
    }
    if (!$preview.find('span').legnth){
    	$preview.append('<span>+</span>');	// +(이미지 추가)버튼 다시 생성
    }

    $input.val(''); // 이미지 파일 input 초기화(이전에 선택했던 파일 값을 없애주기 위해서 함)
    
    $preview.off('click').on('click', function(){
    	$input.click();
    })
}*/


