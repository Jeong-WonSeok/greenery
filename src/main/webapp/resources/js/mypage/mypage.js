/*function getContent(url) {
	
    $.ajax({
        url: url,
        method: "GET",
        success: function (data) {
            $(".mypage-content").append(data);
            if (url === "likedProducts") {
                getData();
            } else if (url === "orderList") {
                getReview();
            }
        },
        error: function (err) {
            console.error("Error fetching product data:", err);
        },
    });
}*/

/*function getContent(url) {
    $.ajax({
        url: getContextPath() + "/mypage/" + url,  // 경로를 getContextPath() + "/mypage" 형태로 설정
        method: "GET",
        success: function (data) {
            $(".mypage-content").html(data);  // 데이터를 .mypage-content에 추가
            if (url === "mypage") {
                // 찜한 상품 조회 페이지 로딩 시 추가 작업 필요하면 작성
            } else if (url === "orderList") {
                getReview();  // orderList일 때만 리뷰 조회 함수 호출
            }
        },
        error: function (err) {
            console.error("Error fetching product data:", err);
        },
    });
}*/


/*$(document).on("click",".review-btn", function() {
	const orderId = $(this).data("orderid");
	const productId = $(this).data("productid");
	$.ajax({
		url:"reviewDetail",
		method:"GET",
		data:{
			"productId" : productId,
			"orderId" : orderId
		},
		success: function(){
			console.log("성공");
		}
	})
})*/

function dataToHtml(products) {
    if (Array.isArray(products)) {
        products.forEach(product => {
            const productHtml = `
            <div class="product-item">
                <div class="product-image-container">
                    <img src="${product.imageUrls[0]}" alt="${product.productName
                }" class="product-image">
                    <div class="product-icons">
                        <span class="icon like-icon active">
                            <img src="../../res/images/fill_heart.png" alt="찜하기 아이콘">
                        </span>
                        <span class="icon cart-icon">
                            <img src="../../res/images/cart_icon2.png" alt="장바구니 아이콘">
                        </span>
                        <span class="icon buy-icon">
                            <img src="../../res/images/dollar.png" alt="구매하기 아이콘">
                        </span>
                    </div>
                </div>
                <div class="product-details">
                    <p class="product-name">${product.productName}</p>
                    <p class="product-description">${product.mainDescription
                }</p>
                    <p class="product-price"><span class="price-amount">${product.price.toLocaleString()}</span>원</p>
                </div>
            </div>`;

            // 생성한 HTML을 product-container에 추가
            $(".product-container").append(productHtml);
        });
    }
}
/*
function getData() {
    $.ajax({
        url: "../../content/products.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            dataToHtml(data.products);
        },
        error: function (err) {
            console.error("Error fetching product data:", err);
        },
    });
}
*/
/*function getReview() {
    $.ajax({
        url: "reviews",
        method: "GET",
        success: function (data) {
            $(".order-status").append(data);
        },
        error: function (err) {
            console.error("Error fetching product data:", err);
        },
    })
}
*/

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
            $(".mypage-content").html(data);  // 가져온 JSP를 mypage-content에 추가
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
        $(".mypage-content").empty();
        getContent($(this).data("url"));  // 클릭한 탭의 URL을 기반으로 Ajax 호출

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

$(document).on('click', '.product-image', function () {
    window.location.href = 'detailpage';
});
$(document).on('click', '.order-img', function () {
    window.location.href = 'detailpage';
});


//================================== 개인 정보 수정 =========================================

document.addEventListener('input', function() {
	if(event.target.matches("#userPw")){
		inputPasswordCheck();
	}
	if(event.target.matches("#userPwCheck")){
		inputPasswordCheck();
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
     inputPasswordMessage1.innerHTML =  ''; 
 } else {
     inputPasswordMessage1.innerHTML = 
     "<span style='color:#F03F40; font-size:11px;'>6자 이상 20자 이하의 대소문자, 숫자, 특수문자를 조합해주세요</span>";
 }
 
 if (document.activeElement === inputPassword2) {
 	console.log('asgd')
     if (inputPassword1.value === inputPassword2.value || inputPassword2.value === '') {
         inputPasswordMessage2.innerHTML =  '';
     } else {
         inputPasswordMessage2.innerHTML =
         "<span style='color:#F03F40; font-size:11px;'>비밀번호를 확인해주세요</span>";
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

