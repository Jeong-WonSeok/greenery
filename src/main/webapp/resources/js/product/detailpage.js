
// 찜 추가
const wishlistButton = document.querySelector('.wishlist-button');

wishlistButton.addEventListener('click', function () {
    const productDiv = this.closest('.product-info');
    const productNameSpan = document.querySelector('.product-title');

    if (!productNameSpan) return;
    const productName = productNameSpan.innerText.trim();

    this.classList.toggle('active'); // active 클래스를 토글

    // 추가 기능: 위시리스트에 아이템 추가/제거 로직 구현 가능
    if (this.classList.contains('active')) {
        console.log("아이템이 위시리스트에 추가되었습니다.");
        saveToWishlist(productName);
    } else {
        console.log("아이템이 위시리스트에서 제거되었습니다.");
        removeFromWishlist(productName);
    }
});

function saveToWishlist(productName) {
    let wishlist = JSON.parse(localStorage.getItem('whislist')) || [];
    if (!wishlist.includes(productName)) {
        wishlist.push(productName);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
//    console.log(위시리스트에 저장된 아이템: ${wishlist.join(', ')});
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
//    console.log(위시리스트에서 제거된 아이템: ${productName});
}

/* 이미지 스크롤 */
let slideIndex = 1;
showSlides(slideIndex);

/*// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}*/

function noImage(e){
	$(e).parent('.dot').remove();
	/*e.style.display='none';*/
	/*$(".prev").css("display", 'none');
	$(".next").css("display", 'none');*/
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
	
//    const productDiv = button.closest('.product-info'); // 부모 요소 찾기
//    console.log(productDiv);
//    if (!productDiv) return; // productDiv가 null인 경우 함수 종료
//
//    const quantitySpan = productDiv.querySelector('.quantity-number');
//    const priceSpan = productDiv.querySelector('.product-price');
//
//    console.log(quantitySpan);
//    console.log(priceSpan);
//    if (!quantitySpan || !priceSpan) return; // 요소가 없으면 함수 종료
//
//    let quantity = parseInt(quantitySpan.innerText);
//    quantity += 1;
//    quantitySpan.innerText = quantity;
//
//    /* 가격 업데이트 */
//    const pricePerUnit = parseFloat(priceSpan.getAttribute('data-price'));
//    const totalPrice = (pricePerUnit * quantity) + '원';
//    console.log(totalPrice);
//    priceSpan.innerText = totalPrice; // 가격 업데이트
//
//    $(".product-price").html(totalPrice+"원");
//    console.log("수량 증가");
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

/*// 로컬 스토리지에 저장하는 함수
function saveToLocalStorage(productDiv) {
    const quantitySpan = document.querySelector('.quantity-number');
    const priceSpan = document.querySelector('.product-price');
    const productNameSpan = document.querySelector('.product-title');

    if (!quantitySpan || !priceSpan || !productNameSpan) return; // 요소가 없으면 함수 종료

    const productName = productNameSpan.innerText.trim(); // 상품명
    const quantity = parseInt(quantitySpan.innerText); // 수량
    const price = priceSpan.getAttribute('data-price'); // 가격 (숫자형)

    const productInfo = {
        name: productName,
        quantity: quantity,
        price: price
    };

    // 로컬 스토리지에 저장
    localStorage.setItem(productName, JSON.stringify(productInfo));

//    console.log(저장된 상품: ${productName}, 수량: ${quantity}, 가격: ${price});
}*/

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
    window.location.href = '../payment/payment.html'; // 결제 페이지로 이동 
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

