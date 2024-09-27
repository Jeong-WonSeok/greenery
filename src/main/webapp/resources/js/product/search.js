// 헤더, 푸터 파일 로드
$(document).ready(function () {

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
                    heartIcon.attr("src",  getContextPath() + "/resources/images/noFill_heart.png");
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
                    heartIcon.attr("src",  getContextPath() + "/resources/images/fill_heart.png");
                    likeButton.addClass("active"); // likeButton을 사용하여 active 클래스 추가
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText);
                }
            });
        }
    });

    handleQueryParams();
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

/*function dataToHtml(products) {
    if (Array.isArray(products)) {
        products.forEach(product => {
            const productHtml = `
            <div class="product-item">
                <div class="product-image-container">
                    <img src="${product.imageUrls[0]}" alt="${
                product.productName
            }" class="product-image">
                    <div class="product-icons">
                        <span class="icon like-icon">
                            <img src="../../res/images/heart.png" alt="찜하기 아이콘">
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
                    <p class="product-description">${
                        product.mainDescription
                    }</p>
                    <p class="product-price"><span class="price-amount">${product.price.toLocaleString()}</span>원</p>
                </div>
            </div>`;

            // 생성한 HTML을 product-container에 추가
            $(".product-container").append(productHtml);
        });
    }
}
*/
function handleQueryParams() {
	const categoryMap ={
			"Skincare" : "스킨케어",
			"Makeup" : "메이크업",
			"BodyCare" : "바디케어",
			"HairCare" : "헤어케어",
			"BeautyTools" : "미용소품",
			"MensCare" : "맨즈케어"
	}
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    const category = categoryMap[params.get("category")];
    if (query) {
        $(".search-term").html(query);
    }

    if (category) {
        $(".search-result-text").css("display", "none");
        $("#header").after(`<div class="category-result">${category}</div>`);
    }
}
