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
            const length = $("#reviewTextarea").val().length;
            $('#charCount').html(length+" / 1,000");
            
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
$(document).on("click", ".liked-products-page", function(){
    const page = $(this).html();
    if (page === "이전" || page === "다음") {
        $.ajax({
            url: "likedProducts?pageNo=" + $(this).data("start"),
            method: "get",
            success: function (data) {
                $(".mypage-content").empty();
                $(".mypage-content").append(data);
            }
        });
    } else {
        $.ajax({
            url: "likedProducts?pageNo=" + page,
            method: "get",
            success: function (data) {
                $(".mypage-content").empty();
                $(".mypage-content").append(data);
            }
        });
    }
});


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
                	$(".modal-title").html("찜 해제");
        			$(".modal-body").html("찜 해제 성공");
        			$("#headerModal").modal("show");
                    heartIcon.attr("src", "resources/images/noFill_heart.png");
                    likeButton.removeClass("active"); // likeButton을 사용하여 active 클래스 제거
                    location.reload() // 페이지 리로드시켜서 상품 찜 해제를 하는 순간 리스트에서 뺌
                },
                error: function (jqXHR, textStatus, errorThrown) {
                	$(".modal-title").html("찜 해제");
        			$(".modal-body").html("찜 해제 실패");
        			$("#headerModal").modal("show");
                }
            });
        }
    });
});

let pwCheckSuccess = false
let validCheck;

function checkPassword(){
	const password = $('#inputPassword').val();
	validCheck=true;
	
	$.ajax({
		url: getContextPath() + "/mypage/checkedPassword",
		method: 'POST',
		data: {password : password},
		success: function() {
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
