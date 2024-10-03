function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

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
			$(button).parent().siblings('.product-price').html(`<strong>${totalPrice.toLocaleString()}</strong> 원`);			
		},
		error: function(data){
			alert("수량 변경에 실패하였습니다.");
		}
		
    })

    calculatePrice();
}

function deleteProduct(deletedItems) {
	var queryString = "";
	for(var i=0; i<deletedItems.length; i++) {
		queryString += "deletedItems=" + deletedItems[i] + "&";
	}
	console.log(queryString);
	$.ajax({
		url: "deleteProduct",
		method: "GET",
		data: queryString,
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
	var deletedItems = [];
	deletedItems.push($(this).data("productid"));
    deleteProduct(deletedItems);
    calculatePrice();
})

// 선택 삭제 버튼 
$('.choice-delete').on('click', function () {
    deleteSelected();
});

$('#order-button').on('click', function() {
	orderSelected();
})

function toOrder(orderItems){
	var queryString = "";
	for(var i=0; i<orderItems.length; i++) {
		queryString += "orderItems=" + orderItems[i] + "&";
	}
	if(orderItems.length === 0){
		$(".modal-title").html("장바구니");
		$(".modal-body").html("장바구니에 상품을 담아주세요.");
		$("#headerModal").modal("show");
	}else{
		$.ajax({
			url:"toOrder",
			method: "POST",
			data: queryString,
			success: function() {
				window.location.href="payment";
			},
			error : function(){
				$(".modal-title").html("오류 발생");
				$(".modal-body").html("알 수 없는 에러 발생");
				$("#headerModal").modal("show");
			}
		});
	}
}


function orderSelected(){
	var orderItems = [];
	$('.product-checkbox:checked').each(function () {
		orderItems.push($(this).data("productid"));
    });
	toOrder(orderItems);
}


function deleteSelected() {
	var deletedItems = [];
    $('.product-checkbox:checked').each(function () {
    	deletedItems.push($(this).data("productid"));
    });
    deleteProduct(deletedItems);
    calculatePrice(); // 결제 정보 업데이트
}