
function saveToWishlist(productName) {
    let wishlist = JSON.parse(localStorage.getItem('whislist')) || [];
    if (!wishlist.includes(productName)) {
        wishlist.push(productName);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function slideReset(){
	const dots = $(".dot img");
	for(var i = 0; i < dots.length; i++){
		const curSrc = $(dots[i]).attr("src");
		const newSrc = curSrc.replace(/usecase=\d+/, ("usecase=" + (i+1))) ;	    
	    $(dots[i]).attr("src", newSrc);
		
	}
		
}

function getContextPath(){
	const hostIndex = location.href.indexOf(location.host) + location.host.length;
	const contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));
	return contextPath;
}

function buyNow(productId) {
	let quantity = $('#quantity').text();

	location.href = getContextPath() + "/order/addOneProduct?productId=" + productId + "&qty=" + quantity;
}

function removeFromWishlist(productName) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item !== productName);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

/* 이미지 스크롤 */
let slideIndex = 1;
showSlides(slideIndex);

function noImage(e){
	$(e).parent('.dot').remove();
}

function showSlides(n) {
	if (n === -1) 
		n = $(".dot").length-1;
    let i;
    let dots = $(".dot img");
    const length = parseInt(dots.length);
    let srcList = [];
    if(length != 1){
	    for(i = 0; i < length; i++){
	    	let src = dots[i].src;
	    	srcList.push(src);
	    }
	    for(i = 0; i < length; i++){	
	        $(dots[i]).attr("src", srcList[(i+n) % length]);
	    }
    }

    
}
    


// ---------------------탭 - 상세정보,  리뷰 --------------------
$(document).ready(function () {
	slideReset();
	$(document).on('click', '.wishlist-button', function () {
	    let heartIcon = $(this).find("img");
	    let productId = heartIcon.data("productid");
	    let likeButton = $(this); // this를 likeButton 변수에 저장(이래야 Ajax 요청 내부에서 사용할 수 있음)

	    if (likeButton.hasClass("active")) {
	        // 찜 해제 
	        $.ajax({
	            url: getContextPath() + "/mypage/likeRemove?productId=" + productId,
	            method: 'GET',
	            success: function (response) {

	                heartIcon.attr("src", getContextPath() + "/resources/images/heart-icon.png");
	                likeButton.removeClass("active"); // likeButton을 사용하여 active 클래스 제거
	            },
	            error: function (jqXHR, textStatus, errorThrown) {
	            }
	        });
	    } else {
	        // 찜 추가 
	        $.ajax({
	            url: getContextPath() + "/mypage/likeAdd?productId=" + productId,
	            method: 'GET',
	            success: function (response) {
	            	$(".modal-title").html("찜 등록");
        			$(".modal-body").html("찜 등록에 성공하였습니다.");
        			$("#headerModal").modal("show");
	                heartIcon.attr("src", getContextPath() + "/resources/images/fullheart-icon.png");
	                likeButton.addClass("active"); // likeButton을 사용하여 active 클래스 추가
	            },
	            error: function (jqXHR, textStatus, errorThrown) {
	            	$(".modal-title").html("찜 등록");
        			if (jqXHR.status === 401) {
        				$(".modal-body").html("로그인을 해주세요.");
        				$("#headerModal").modal("show");
                    }else{
                    	$(".modal-body").html("찜 등록에 실패했습니다.");
                    	$("#headerModal").modal("show");
                    }
	            }
	        });
	    }
	});

    $('.tab-button').on('click', function () {
        var target = $(this).data('target') + '.html';
		if ($(this).data('target') !== 'reviews-select'){
	        //ajax 요청
	        $.ajax({
	            url: "detailInfo?productId="+$(this).data('productid'),
	            method: 'GET',
	            success: function (data) {
	                $('#tab-content').html(data);
	            }.bind(this),
	            error: function () {
	                $('#tab-content').html('<p>내용을 불러오는 데 실패함.</p>');
	            }
	        });
	    }else{
	    	$.ajax({
	            url: "reviewSelect?productId="+$(this).data('productid'),
	            method: 'GET',
	            success: function (data) {
	                $('#tab-content').html(data);	                
	            }.bind(this),
	            error: function () {
	                $('#tab-content').html('<p>내용을 불러오는 데 실패함.</p>');
	            }
	        });
	    }
    });
    // 페이지 로드되면 기본적으로 detail탭이 열리게 
    $('.tab-button').first().trigger('click');
});

// 탭 버튼 클릭 시 색상 변경
document.addEventListener('DOMContentLoaded', function() {
	const buttons = document.querySelectorAll('.tab-button');
	const dividers = document.querySelectorAll('.divider');
	
	buttons.forEach(button => {
		button.addEventListener('click', () => {
			buttons.forEach(btn => btn.classList.remove('active'));
			dividers.forEach(div => {
				div.style.backgroundColor = '#a9a9a9';
				div.style.height = '0.2px';
				});
			
			button.classList.add('active');
			
			const index = Array.from(buttons).indexOf(button);
			const activeDivider = dividers[index];
			activeDivider.style.backgroundColor = 'black';
			activeDivider.style.height = '2px';
		});
	});
});



/* 수량 조절 */
function increase(button) {
	let price = parseInt($(".product-price").data("price"));
	let priceString = $(".product-price").html();
	let curPrice = parseInt(priceString.replace(",", "").replace("원", ""));
	let qty = parseInt($("#quantity").html());
	$("#quantity").html(qty + 1);
	$(".product-price").html((price+curPrice).toLocaleString() + "원");
	
}



function decrease(button) {
	let price = parseInt($(".product-price").data("price"));
	let priceString = $(".product-price").html();
	let curPrice = parseInt(priceString.replace(",", "").replace("원", ""));
	let qty = parseInt($("#quantity").html());
	
	if(qty <= 1) return;
	$("#quantity").html(qty - 1);
	$(".product-price").html((curPrice-price).toLocaleString() + "원");
}


// 결제 페이지로 이동 시 호출되는 함수
function checkout() {
    const cartItems = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const item = JSON.parse(localStorage.getItem(key));
        cartItems.push(item);
    }

    /* document.getElementById('add-to-cart').addEventListener('click', function() {
        window.location.href = '../payment/payment.html'; */
    sessionStorage.setItem('checkout', JSON.stringify(checkout));
//    window.location.href = '../payment/payment.html'; // 결제 페이지로 이동 
}


/*function cart() {
    const cartItems = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const item = JSON.parse(localStorage.getItem(key));
        cartItems.push(item);
    }

    sessionStorage.setItem('add-to-cart', JSON.stringify(cart));
    window.location.href = '../basket/basket.html'; // 장바구니 페이지로 이동 
}
*/
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

