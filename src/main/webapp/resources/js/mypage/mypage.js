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


$(document).on("click",".review-btn", function() {
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
})

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
function getReview() {
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

function getContent(url) {
    $.ajax({
        url: "/mypage/" + url,  // 절대 경로로 수정
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