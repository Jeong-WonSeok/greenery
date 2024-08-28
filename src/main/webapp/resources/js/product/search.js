// 헤더, 푸터 파일 로드
$(document).ready(function () {
    $("#header").load("../header/header.html");
    $("#footer").load("../footer/footer.html");

    $.getJSON("../../content/products.json", function (data) {
        dataToHtml(data.products);
    }).fail(function () {
        console.error("JSON 파일을 불러오는 데 실패함");
    });

    handleQueryParams();
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

function dataToHtml(products) {
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

function handleQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    const category = params.get("category");

    if (query) {
        $(".search-term").html(query);
    }

    if (category) {
        $(".search-result-text").css("display", "none");
        $("#header").after(`<div class="category-result">${category}</div>`);
    }
}
