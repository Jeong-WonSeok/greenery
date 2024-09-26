$(document).ready(function () {
	$('#allchk').prop('checked', true);  
    $('.product-checkbox').prop('checked', true);
    
    scrollToTop();
	calculatePrice();	
	
    $(".modal-image").click(() => {
//        console.log("쿠폰 버튼 클릭됨");
        showAlertCoupon();
    });
});;

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

function showAlertCoupon() {
    const alertCoupon = $(".alert-coupon");
    if (alertCoupon.length === 0) {
        console.error("알림 요소가 없습니다.");
        return;
    }
    alertCoupon.addClass("show");
    console.log("쿠폰 알림 표시됨");
    setTimeout(() => {
        alertCoupon.removeClass("show");
        console.log("쿠폰 알림 숨김");
    }, 2000);
}

/* 쿠폰 적용 */
function applyCoupon() {
    const couponDiscount = -1000; // 쿠폰 할인 금액
    const discountElement = document.querySelector('#discount');
    discountElement.innerText = couponDiscount.toLocaleString() + '원'; // 할인 금액을 #discount에 표시
    totalPriceCalculation(); // 총 가격 계산 업데이트
    showAlertCoupon();
}

/*function orderPrice() {
    const checkedBoxes = document.querySelectorAll('.product-checkbox:checked');
    let finalPrice = 0;

    checkedBoxes.forEach(checkedBox => {
        const productElement = checkedBox.closest('.product');
        const priceElement = productElement.querySelector('.product-price');
        const price = parseFloat(priceElement.getAttribute('data-price'));
        const quantity = parseInt(productElement.querySelector('.quantity-number').innerText);
        finalPrice += price * quantity;
    });

    document.querySelector('#sumPrice').innerText = finalPrice.toLocaleString() + '원';
}*/
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

/* 총 가격 계산 */
function totalPriceCalculation() {
    const checkedBoxes = document.querySelectorAll('.product-checkbox:checked');
    let finalPrice = 0;

    // 선택된 제품들의 총 가격 계산
    checkedBoxes.forEach(checkedBox => {
        const priceElement = checkedBox.closest('.product').querySelector('.product-price');
        const price = parseFloat(priceElement.getAttribute('data-price'));
        const quantity = parseInt(checkedBox.closest('.product').querySelector('.quantity-number').innerText);
        finalPrice += price * quantity;
    });

    // 배송비와 할인 금액 계산
    const deliveryPrice = parseFloat(document.querySelector('#deliveryPrice').innerText.replace(/[^0-9]/g, '')) || 0;
    const discount = parseFloat(document.querySelector('#discount').innerText.replace(/[^0-9]/g, '')) || 0; // 할인 금액이 없으면 0으로 처리
    const sumPrice = finalPrice + deliveryPrice - discount;

    // 총 결제 금액을 화면에 표시
    document.querySelector('#totalPrice-num').innerText = sumPrice.toLocaleString();
}

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

function deleteSelected() {
	$('.product-checkbox:checked').each(function(){
    	deleteProduct(this);
    });
    
}



/* 체크 박스 전체 선택 */
document.addEventListener('DOMContentLoaded', function () {
    const allchk = document.querySelector('#allchk');
    const productCheckboxes = document.querySelectorAll('.product-checkbox');

    allchk.addEventListener('click', function () {
        const isChecked = allchk.checked;

        productCheckboxes.forEach(checkBox => {
            checkBox.checked = isChecked;
        });
        calculatePrice();
        totalPriceCalculation(); // 전체 선택 시 총 가격 계산 업데이트
    });

    productCheckboxes.forEach(chk => {
        chk.addEventListener('click', function () {
        	calculatePrice();	
            totalPriceCalculation(); // 체크 박스 클릭 시 총 가격 계산 업데이트
        });
    });
});

/* 제품 삭제 */
function removeProduct(link) {
    link.closest('.product').remove();
    calculatePrice();
    totalPriceCalculation(); // 제품 삭제 후 총 가격 계산 업데이트
}


// 전체선택 체크박스 클릭 시 상품 전체 체크 활성화
$(document).ready(function () {
    $('#allchk').prop('checked', true); // 페이지 로딩 시 전체선택이 활성화된 상태로 
    $('.product-checkbox').prop('checked', true);
    totalPriceCalculation();

    $('#allchk').click(function () {
        let isChecked = $(this).is(':checked'); // 전체 선택 체크박스의 체크 상태를 true, false로 저장
        $('.product-checkbox').prop('checked', isChecked);
        calculatePrice();
    });

    $('.product-checkbox').change(function () {
    	calculatePrice();
        totalPriceCalculation();
    });
    
    
});


$(document).ready(function () {
    $('#order-button').on('click', function () {
        createdOrder();
    });
});

// 주문내역 DB에 넣기
function createdOrder() {
	let productIdList = []; 
	if($('.product-checkbox:checked').length == 0){
		$(".modal-title").html("결제 에러");
		$(".modal-body").html("상품을 선택하거나 상품을 담아주세요.");
		$("#headerModal").modal("show");
	}else{
		$('.product-checkbox:checked').each(function () {
			productIdList.push(Number($(this).data("productid")));
	    });
		
		const totalPrice = $('#totalPrice-num').html().replace(",", "");
		const couponValue = ($('#discount').html()).replace("원", "");
		const coupon = parseInt(couponValue) < 0 ? true : false; 
		const productQty = parseInt($('.quantity-number').html());
		
		$.ajax({
			url:"createOrder",
			method:"POST",
			contentType:"application/json",
			data: JSON.stringify({
				"productIdList": productIdList,
				"totalPrice" : totalPrice,
				"coupon" : coupon,
				"qty" : productQty
			}),
			success: function (data) {
				location.href="order?orderId="+data;
			},
			error: function () {
				alert("주문에 실패하였습니다.");
			}		
		})
	}
}

$(document).on('click', '.delete-icon', function () {
	deleteProduct(this);
})

function deleteProduct(data) {
	$.ajax({
		url: "deleteProduct",
		method: "GET",
		data: {productId : $(data).data("productid")},
		success : function (response){
			if(response==1)
				window.location.reload();
			else
				removeProduct(data);
		
		},
		error : function(){
			$(".modal-title").html("결제 에러");
			$(".modal-body").html("삭제에 실패하였습니다.");
			$("#headerModal").modal("show");
		}
		
	})
}

