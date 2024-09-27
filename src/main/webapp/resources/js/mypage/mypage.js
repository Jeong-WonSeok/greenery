$(document).on("click",".review-btn", function() {
	
	const orderId = $(this).data("orderid");
	const productId = $(this).data("productid");
	
    $("#image-input").val(""); 
    $("#reviewTextarea").val("");  
    $(".star").removeClass('on');  

    $(".write-btn").data("productid", productId).data("orderid", orderId);

	
	$.ajax({
		url:"reviewDetail",
		method:"GET",
		data:{
			"productId" : productId,
			"orderId" : orderId
		},
		success: function(data){
			const review = data.review;
			const product = data.product;
			$("#review_img").attr("src", '/miniproject/imageDown?productId='+productId+'&usecase=1')
			$("#reviewTextarea").val(review.reviewContent);
			$(".product-name").html("<span><strong>"+product.productName + "</strong></span>")
			$(".product-description").html("<span>"+product.summaryDescription+"</span>")
			$(".star").removeClass('on');
			
            for (let i = 1; i <= review.reviewScore; i++) {
                $(".star_rating .star:nth-child(" + i + ")").addClass('on');
            }
            
            $(".write-btn").data("productid", product.productId);
            $(".write-btn").data("orderid", review.orderId);
            
            if (review.reviewImageData) {
                $("#image-preview").html('<img src="imageDown?productId=' + review.productId + '&orderId=' + review.orderId + '" alt="이미지 미리보기" class="insert-img"/>');
            } else {
                $("#image-preview").html('+');
            }

            
            $('#exampleModal').modal('show');
		}
	})
})

$(document).on("click", ".order-page", function(){
	const page = $(this).html();
	if(page === "이전" || page === "다음"){
		$.ajax({
			url:"orderList?pageNo=" + $(this).data("start"),
			method:"get",
			success: function (data) {
	        	$(".mypage-content").empty();
	            $(".mypage-content").append(data);
			}
		})
	}
	
	$.ajax({
		url:"orderList?pageNo=" + page,
		method:"get",
		success: function (data) {
        	$(".mypage-content").empty();
            $(".mypage-content").append(data);
		}
	})
})

function getContent(url) {
    $.ajax({
        url: url,  // 절대 경로로 수정
        method: "GET",
        success: function (data) {
        	$(".mypage-content").empty();
            $(".mypage-content").append(data);  // 가져온 JSP를 mypage-content에 추가
        },
        error: function (err) {
            console.error("Error fetching content:", err);
        }
    });
}

$(document).ready(function () {
	
	// 페이지 로딩 시 기본적으로 찜한 상품 탭 보여줌 
    getContent("likedProducts");

    // 마이페이지 로딩 시 찜한 상품 탭을 진하게
    $('.mypage-menu').each(function () {
        if ($(this).data('url') === 'likedProducts') {
            $(this).html('<strong>' + $(this).text() + '</strong>');
        }
    });

    // 메뉴 탭 클릭 시
    $(".mypage-menu").click(function () {
    	$('.mypage-title').nextAll().remove();
    	if($(this).data("url") === 'editMyInfo'){
    		$('#pwCheckModal').modal('show');
    	}
    	else{
	        getContent($(this).data("url"));  // 클릭한 탭의 URL을 기반으로 Ajax 호출
    	}
    	$('.mypage-menu').html(function () {
    		return $(this).text();  // 기존 텍스트로 복구
    	});
    	$(this).html('<strong>' + $(this).text() + '</strong>');  // 선택한 탭 텍스트 진하게
    });

    // like 아이콘 이벤트 처리
    $(document).on('click', '.icon.like-icon', function () {
        let heartIcon = $(this).find("img");
        let productId = heartIcon.data("productid");
        let likeButton = $(this); // this를 likeButton 변수에 저장(이래야 Ajax 요청 내부에서 사용할 수 있음)
        
        if (likeButton.hasClass("active")) {
            // 찜 해제 
            $.ajax({
                url: getContextPath() + "/mypage/likeRemove?productId=" + productId,
                method: 'GET',
                success: function (response) {
                    alert(response);
                    heartIcon.attr("src", "resources/images/noFill_heart.png");
                    likeButton.removeClass("active"); // likeButton을 사용하여 active 클래스 제거
                    location.reload() // 페이지 리로드시켜서 상품 찜 해제를 하는 순간 리스트에서 뺌
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText);
                }
            });
        } else {
            // 찜 추가 
            $.ajax({
                url: getContextPath() + "/mypage/likeAdd?productId=" + productId,
                method: 'GET',
                success: function (response) {
                    alert(response);
                    heartIcon.attr("src", "resources/images/fill_heart.png");
                    likeButton.addClass("active"); // likeButton을 사용하여 active 클래스 추가
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText);
                }
            });
        }
    });
    
    
});

/*$(document).on('click', '.product-image', function () {
    window.location.href = 'detailpage';
});*/
/*$(document).on('click', '.order-img', function () {
    window.location.href = 'detailpage';
});*/


//================================== 개인 정보 수정 =========================================
let pwCheckSuccess = false
let validCheck;

function checkPassword(){
	const password = $('#inputPassword').val();
	console.log(password);
	
	$.ajax({
		url: getContextPath() + "/mypage/checkedPassword",
		method: 'POST',
		data: {password : password},
		success: function() {
			validCheck = true;
			pwCheckSuccess = true;
			$("#pwCheckModal").modal('hide');
			getContent('editMyInfo');
		},
		error: function () {
			pwCheckSuccess = false;
			$("#pwCheckModal").modal('hide');
			$(".header-modal-title").html("비밀번호 확인");
			$(".header-modal-body").html("비밀번호가 다릅니다.");
			$("#headerModal").modal("show");
		}
	})
}

$('#pwCheckModal').on('shown.bs.modal', function () {
    $('#inputPassword').focus(); // 모달이 열릴 때 패스워드 입력란에 포커스

    // 엔터 키가 눌리면 확인 버튼이 클릭되도록 처리
    $(document).on('keydown', function(e) {
        if (e.key === "Enter") { // 엔터 키가 눌렸을 때
            $('.pw-check').trigger('click'); // 확인 버튼 클릭
        }
    });
});

$('#pwCheckModal').on('hidden.bs.modal', function (e) {
	if (!pwCheckSuccess) {
		getContent("likedProducts");
		const likeProduct = $('.mypage-menu[data-url="likedProducts"]');
		
		$('.mypage-menu').html(function () {
    		return $(this).text();  // 기존 텍스트로 복구
    	});
    	likeProduct.html('<strong>' + likeProduct.text() + '</strong>');
	}
});

/*$(".pw-close").on("click", function(){
	pwCheckSuccess = false;
})*/


document.addEventListener('input', function() {
	if(event.target.matches("#userPw") || event.target.matches("#userPwCheck")){
		console.log("password check")
		inputPasswordCheck();
	}
	if(event.target.matches("#userName")){
		console.log("name check")
		inputNameCheck();
	}
	if(event.target.matches("#userTel")){
		console.log("tel check")
		inputPhoneCheck();
	}
	if(event.target.matches("#userEmail")){
		console.log("email check")
		inputEmailCheck();
	}
})
//inputPassword1.addEventListener('input', inputPasswordCheck);
//inputPassword2.addEventListener('input', inputPasswordCheck);

function inputPasswordCheck() {
	let inputPassword1 = document.querySelector('#userPw');
	let inputPassword2 = document.querySelector('#userPwCheck');
	let inputPasswordMessage1 = document.querySelector('#inputPasswordMessage1');
	let inputPasswordMessage2 = document.querySelector('#inputPasswordMessage2');
	
	let regExp = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/);
	if (regExp.test(inputPassword1.value) || inputPassword1.value === '') {
		inputPasswordMessage1.style.display = 'none';
	} else {
	    inputPasswordMessage1.innerHTML = 
	    "<span style='color:#F03F40; font-size:11px;'>6자 이상 20자 이하의 대소문자, 숫자, 특수문자를 조합해주세요</span>";
	    inputPasswordMessage1.styledisplay = 'block';
	    validCheck = false;
	}
	 
	if (document.activeElement === inputPassword2) {
		if (inputPassword1.value === inputPassword2.value || inputPassword2.value === '') {
	        inputPasswordMessage2.style.display = 'none';
	    } else {
	        inputPasswordMessage2.innerHTML =
	        "<span style='color:#F03F40; font-size:11px;'>비밀번호를 확인해주세요</span>";
	        inputPasswordMessage2.styledisplay = 'block';
	        validCheck = false;
	    }
	}
}

//우편번호 API
document.addEventListener('click', () => {
	if(event.target.matches('#btnZipcode')){
	    new daum.Postcode({
	        oncomplete: function(data) {
	            console.log(data);
	            let fullAddr = '';
	            let extraAddr = '';
	
	            if (data.userSelectedType === 'R') {
	                fullAddr = data.roadAddress;
	            } else {
	                fullAddr = data.jibunAddress;
	            }
	
	            if (data.userSelectedType = 'R') {
	                if (data.bname !== '') {
	                    extraAddr += data.bname;
	                }
	                if (data.buildingName !== '') {
	                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	                }
	                fullAddr += (extraAddr !== '' ? '(' + extraAddr + ')' : '');
	            }
	
	            document.formInfo.userPostal.value = data.zonecode;
	            document.formInfo.userLoadAddress.value = fullAddr;
	            
	        }
	    }).open();
	}
});

function inputNameCheck() {
    let inputNameMessage = document.querySelector('.name-message');
    let inputName = $('#userName').val();
    console.log(inputName.length);
    let regExp = RegExp(/^[가-힣a-zA-Z]+$/);
    if (!regExp.test(inputName)) {
    	inputNameMessage.innerHTML= "<span style='color:#F03F40; font-size:12px;'>영문 또는 한글로 입력해주세요</span>";
    	inputNameMessage.style.display = 'block';
    	validCheck = false;
    } else if(inputName.length > 20){
    	inputNameMessage.innerHTML= "<span style='color:#F03F40; font-size:12px;'>20자 이내로 작성해 주세요 입력해주세요</span>";
    	inputNameMessage.style.display = 'block'; 
    	validCheck = false;
    } else {
    	inputNameMessage.style.display = 'none';
    }
}

function inputPhoneCheck() {
    let inputPhoneMessage = document.querySelector('.tel-message');
    let inputPhone = document.querySelector("#userTel");
    console.log(inputPhone.value);
    
    let regExp = RegExp(/^[0-9]{1,11}$/);
    if (!regExp.test(inputPhone.value)){
    	inputPhoneMessage.innerHTML = 
    		"<span style='color:#F03F40; font-size:12px;'>숫자만을 사용하여 핸드폰 번호를 입력해주세요</span>";
    	inputPhoneMessage.style.display = 'block';
    	validCheck = false;
    } else {
    	inputPhoneMessage.style.display = 'none';
    	validCheck = false;
    }
}

//function inputAdrressCheck

function inputEmailCheck() {
    // 입력값 가져오기
    let emailAddress = $('#userEmail').val();
    let inputEmailMessage = $('.email-message');
    

    // 이메일 형식을 검증하는 정규 표현식
    let regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 전체 이메일 형식 검사
    if (regExp.test(emailAddress) || emailAddress === '') {
        // 이메일 형식이 올바르거나 입력이 비어있으면 메시지 지우기
    	inputEmailMessage.css('display', 'none');
    } else {
        // 이메일 형식이 올바르지 않으면 오류 메시지 표시
        inputEmailMessage.html("<span style='color:#F03F40; font-size:12px;'>이메일 형식을 확인해주세요</span>");
        inputEmailMessage.css('display', 'block');
        validCheck = false;
    }
}
