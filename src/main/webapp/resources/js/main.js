let slideIndex = 1;     // 슬라이드 인덱스
let products = [];

// ---------------------슬라이드 관련 함수 ----------------
function autoSlides() {     // 슬라이드 자동으로 넘김
    showSlides(slideIndex);

    // 자동 슬라이드
    setInterval(() => {
        plusSlides(1);
    }, 7000); // 7초마다 슬라이드 변경
}

function plusSlides(n) {    // 슬라이드 인덱스를 +1 시켜서 다음 슬라이드로 넘김
    showSlides((slideIndex += n));
}

function currentSlide(n) {      // dots를 클릭하면 인덱스에 해당하는 현재 슬라이드 보여줌 
    showSlides((slideIndex = n));
}

function showSlides(n) {
    let slides = document.getElementsByClassName("banner_slides");
    let dots = document.getElementsByClassName("banner-indicator-btn"); // 배너에서 동그라미 버튼
    if (n > slides.length) {        // 슬라이드가 전체 길이보다 커지면 첫번째 슬라이드로 다시 넘어감
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    Array.from(slides).forEach(slide => (slide.style.display = "none"));    // 다른 배너 상태 none
    Array.from(dots).forEach(dot => dot.classList.remove("active"));        // 다른 배너 active해제
    slides[slideIndex - 1].style.display = "block";     //none 상태를 다시 block으로 해서 보이게
    dots[slideIndex - 1].className += " active";
}

// 배너 밑의 카테고리들 
function clickCategoryBtn(target) {
    let categoryBtns = $(".toolbar-category").children("button");   // 하위 요소인 버튼들을 다 가져옴
    Array.from(categoryBtns).forEach(categoryBtn =>
        categoryBtn.classList.remove("active-category") // 클릭되지 않은 버튼 액티브 지움(비활성화)
    );
    target.addClass("active-category"); // 현재 클릭한 버튼 액티브 추가(활성화)
}
// 스크롤 올리기
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}
// -------------------팝업- 오늘 하루 보지 않기-------------------
// 로컬 스토리지에 현재 시간 + 1일을 ms 단위로 저장
function setTime(name, exp) {
    let date = new Date();
    date = date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000); // 일 단위를 ms 단위로 변환하여 더하기(내일 시간을 넣어줌)
    localStorage.setItem(name, date);
    $(".modal-container").css("display", "none");   // 오늘 하루 보지 않기 누르면 display none으로 해서 안보이게
}

// 하루를 넘겼는지 여부 확인
function isOverExp(name) {
    const status = parseInt(localStorage.getItem(name)) > new Date().getTime();
    const modal = $(".modal-container");
    if (!status) {
        localStorage.removeItem(name);
        modal.css("display", "block"); // 하루가 지난 상태 => 보임
    }
}

// 쿠폰 받기 시 알림창
function showAlertCoupon() {
    $(".modal-container").hide();
    $(".alert-coupon").addClass("show");    // show -> 쿠폰 화면에 보이게
    setTimeout(() => {
        $(".alert-coupon").removeClass("show");
    }, 2000);       // 2초동안 보이게
}

// 상품 데이터 가져오기
function dataToHtml(products) {
    if (Array.isArray(products)) {
        products.forEach(product => {
            const productHtml = `
            <div class="product-item">
                <div class="product-image-container">
                    <img src="${product.imageUrls[0]}" alt="${product.productName
                }" class="product-image">
                    <div class="product-icons">
                        <span class="icon like-icon">
                            <img src="../../res/images/heart.png" alt="찜하기 아이콘">
                        </span>
                        <span class="icon cart-icon">
                            <img src="../../res/images/cart_icon2.png" alt="장바구니 아이콘">
                        </span>
                        <span class="icon buy-icon">
                            <img src="../../res/images/dollar.png" alt="구매하기 아이콘" class="payment-img">
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
// 정렬(신상품, 가격 오름차순, 가격 내림차순)
function sortProducts(products, sortOption) {
    switch (sortOption) {
        case "price-asc":
            return products.slice().sort((a, b) => a.price - b.price);
        case "price-desc":
            return products.slice().sort((a, b) => b.price - a.price);
        default:
            return products;
    }
}

function filteredProducts(category) {
    const sortOption = $(".toolbar-sort-select").val();
    let categoryProducts = products;

    if (category) {
        categoryProducts = products.filter(
            product => product.category === category
        );
    }

    $(".product-container").empty();
    dataToHtml(sortProducts(categoryProducts, sortOption));
}

function getData() {
    $.ajax({
        url: "../../content/products.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            products = data.products;
            filteredProducts();     // 데이터 불러올 때 성공하면 filteredProducts() 호출
        },
        error: function (err) {
            console.error("Error fetching product data:", err);
        },
    });
}

$(document).ready(function () {
    $("#header").load("../header/header.html");
    $("#footer").load("../footer/footer.html");
    autoSlides();
    getData(); // 초기 데이터 로드 (전체)
    scrollToTop();
    isOverExp("TodayCloseTime");
    $(".close").click(() => {
        $(".modal-container").hide();
    });
    $(".today-close").click(() => {
        setTime("TodayCloseTime", 1);
    });
    $(".modal-image").click(() => {
        showAlertCoupon();
    });
    $(".toolbar-category-btn").click(function () {
        clickCategoryBtn($(this));
        $(".toolbar-sort-select").val("default"); // 카테고리 변경시 정렬 옵션 기본으로 되돌아가기
        filteredProducts($(this).data("category"));
    });
    $(".toolbar-sort-select").change(function () {
        filteredProducts(
            $(".toolbar-category .active-category").data("category")
        );
    });
    // 동적으로 생성된 like 아이콘에 대한 이벤트 처리
    $(document).on('click', '.icon.like-icon', function () {
        $(this).toggleClass("active");
        let heartIcon = $(this).find("img");
        if ($(this).hasClass("active")) {
            heartIcon.attr("src", "../../res/images/fill_heart.png");
        } else {
            heartIcon.attr("src", "../../res/images/heart.png")
        }
    });
});


$(document).on('click', '.product-image', function () {
    window.location.href = '../detail/detailpage.html';
});

$(document).on('click', '.buy-icon', function () {
    window.location.href = '../payment/payment.html';
});