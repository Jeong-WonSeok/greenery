function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}


/*// 데이터 
$.ajax({
    url: '../../content/products.json',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log(data);  //데이터 구조 확인하려고 로그 출력함
        // JSON 데이터 배열을 순회하면서 각 제품의 데이터를 HTML에 삽입
        if (Array.isArray(data.products)) {
            data.products.forEach(product => {
                const productHtml = `
                    <div class="product">

                        <div class="product-body">
                            <input type="checkbox" class="product-checkbox" data-price="${product.price}">
                            <div class="img"><img src="${product.imageUrls[0]}" alt="${product.productName}" class="picture"></div>
                            
                            <div class="product-label">
                                <div class="product-name"><span><strong>${product.productName}</strong></span></div>
                                <div class="product-description"><span>${product.summaryDescription}</span></div>
                            </div>
                            
                            <div class="product-quantity" data-stock="${product.stock.toLocaleString()}">
                                <button onclick="decreaseQuantity(this)">-</button>
                                <span class="quantity-number" >${product.stock.toLocaleString()}</span>
                                <button onclick="increaseQuantity(this)">+</button>
                            </div>

                            <div class="product-price" data-price="${product.price}"><p><strong>${product.price.toLocaleString()}원</strong></p></div>
                            
                            <div class="basket-delete">
                                    <img src="../../res/images/X버튼.png" alt="삭제 버튼" class="delete-icon" style="width: 30px; height: 30px;">
                            </div>
                            
                        </div>
                    </div>
                `;
                // 생성한 HTML을 productList에 추가
                $('#productList').append(productHtml);
            });
        }

    },
    error: function (err) {
        console.error('Error fetching product data:', err);
    }
});*/
/*$(document).ready(function () {
	
    $('#order-button').on('click', function () {
        window.location.href = '../payment/payment.html';
    });
});*/

// 전체선택 체크박스 클릭 시 상품 전체 체크 활성화
$(document).ready(function () {
    $('#allchk').prop('checked', true); // 페이지 로딩 시 전체선택이 활성화된 상태로 
    $('.product-checkbox').prop('checked', true);
    calculatePrice();

    $('#allchk').click(function () {
        let isChecked = $(this).is(':checked'); // 전체 선택 체크박스의 체크 상태를 true, false로 저장
        $('.product-checkbox').prop('checked', isChecked);
        calculatePrice();
    });

    $('.product-checkbox').change(function () {
        calculatePrice();
    });
});
// 결제정보 가격 업데이트
function calculatePrice() {
    let totalOrderPrice = 0;    // 총 주문 금액
    let deliveryPrice = 2500;

    // 체크된 상품 가격 업데이트
    $('.product-checkbox:checked').each(function () {
        let price = parseInt($(this).data('price'));    //각 상품 가격 가져옴
        let quantity = parseInt($(this).closest('.product').find('.quantity-number').text()); // 수량 가져옴
        totalOrderPrice += price * quantity;
    });
    let totalPrice = deliveryPrice + totalOrderPrice;

    $('#sumPrice').text(totalOrderPrice.toLocaleString() + ' 원');
    $('#totalPrice-num').text(totalPrice.toLocaleString());
}

// --------------수량 증감소-------------
//감소
function decreaseQuantity(button) {
    let quantity = $(button).siblings('.quantity-number');  // 형제노드인 quantity-number 선택함(그래야 수량 업뎃)
    let stock = parseInt($(button).parent().data('stock')); // 부모 요소(product-quantity)의 stock 개수 가져옴

    if (stock > 1) {
        stock -= 1;
        quantity.text(stock.toLocaleString());
        $(button).parent().data('stock', stock);
        updateTotalPrice(button);
    }
}
// 증가
function increaseQuantity(button) {
    let quantity = $(button).siblings('.quantity-number');
    let stock = parseInt($(button).parent().data('stock'));
    stock += 1;

    quantity.text(stock.toLocaleString());
    $(button).parent().data('stock', stock);
    updateTotalPrice(button);
}

// 상품 개별 가격 수량에 따라 업데이트(결제정보에는 반영x(체크가 되어있어야함))
function updateTotalPrice(button) {
    let quantity = parseInt($(button).siblings('.quantity-number').text());    // 현재 수량
    let price = parseInt($(button).parent().siblings('.product-price').data('price')); // 가격
    let totalPrice = quantity * price;
    
    let productId =$(button).parent().siblings('.product-price').data('productid');
    
    $.ajax({
    	url: "changeQty",
    	method:"GET",
    	data: {
    		productId: productId,
    		productQty: quantity
		},
		success: function (data){
			console.log(data);
			$(button).parent().siblings('.product-price').html(`<strong>${totalPrice.toLocaleString()}</strong> 원`);			
		},
		error: function(data){
			alert("수량 변경에 실패하였습니다.");
		}
		
    })

    calculatePrice();
}

function deleteProduct(data) {
	$.ajax({
		url: "deleteProduct",
		method: "GET",
		data: {productId : $(data).data("productid")},
		success : function (){
			window.location.href="cart";
		},
		error : function(){
			alert("삭제에 실패하였습니다.");
		}
		
	})
}
// ----------상품 삭제(x버튼, 선택 삭제 버튼)---------------
// x버튼
$(document).on('click', '.delete-icon', function () {
	deleteProduct(this);
    calculatePrice();
})

// 선택 삭제 버튼 
$('.choice-delete').on('click', function () {
    deleteSelected();
});

$('#order-button').on('click', function() {
	orderSelected();
})

function toOrder(data){
	console.log($(data).data("productid"));
	$.ajax({
		url:"toOrder",
		method: "GET",
		data: {
			productId : $(data).data("productid")
			},
		success: function() {
		},
		error : function(){
			alert("에러가 발생하였습니다.")
		}
	})
}


function orderSelected(){
	$('.product-checkbox:checked').each(function () {
		console.log("Check " + $(this).data("productid"));
		toOrder(this);
    });
	window.location.href="payment";
}


function deleteSelected() {
    $('.product-checkbox:checked').each(function () {
    	deleteProduct(this);
    });
    calculatePrice(); // 결제 정보 업데이트
}