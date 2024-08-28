<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>결제 페이지</title>
	<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
	<link rel="stylesheet" href="../../common.css" />
	<link rel="stylesheet" href="payment.css">
</head>

<body>
	<script src="payment.js"></script>
	<div id="header"></div>
	<!-- 공통 헤더(상단바) 삽입 -->

	<h1>결제하기</h1>
	<div class="basket" id="basket">
		<div class="product-list">
			<!-- <h1 class="payment-title">결제하기</h1> -->
			<div class="basket-list-header">
				<div class="checkbox-container">
					<input type="checkbox" id="allchk" onclick="allchk"> <label for="allchk">전체선택</label>
				</div>
				<div class="button-group">
					<button type="button" class="btn" onclick="deleteSelected()">선택 삭제</button>
				</div>
			</div>

			<hr id="hr-topLine">

			<div id="productList"></div> <!-- 동적으로 상품을 추가할 위치 -->
			<button class="scroll-btn-up" onclick="scrollToTop()"></button>



			<div class="coupon-info">
				<!--  쿠폰 할인 정보 -->
				<div class="coupon-title">
					<h1>쿠폰할인정보</h1>
					<button id="have-coupon">보유쿠폰(1)</button>
				</div>
				<hr id="hr-topLine">
				<div class="coupon-input-container">
					<span class="coupon-label">쿠폰</span>
					<div class="custom-select">
						<select id="coupon-select">
							<option value="1">그리너리 회원을 위한 1,000원 할인 쿠폰</option>
						</select> <img src="../../res/images/dropdown-icon.png" alt="dropdown-icon"
							class="dropdown-icon">
					</div>
					<button class="apply-coupon" onclick="applyCoupon()">쿠폰 적용</button>
				</div>
				<div class="coupon-discount" id="coupon-discount"></div>
			</div>

		</div>
		<div class="alert-coupon">
			<img src="../../res/images/coupon_modal_check.png" class="img-alert-coupon" />
			<span>쿠폰 적용 되었습니다.</span>
		</div>

		<!-- 결제 정보 창 -->
		<div class="payment-info">
			<h2>결제 예정 금액</h2>
			<div id="payment-info-body">
				<div class="payment-info-body-content1">
					<div class="orderPrice">
						<span>총 주문 금액 &nbsp;</span><span id="sumPrice">0원</span>
					</div>
					<div class="delivery">
						<span>배송비 </span><span id="deliveryPrice">2,500원</span>
					</div>
					<div class="coupon">
						<span>쿠폰 할인 금액 &nbsp;</span><span id="discount">0원</span>
					</div>
				</div>
				<div class="divider"></div>

				<div class="payment-info-body-content1">
					<div class="totalPrice" id="sum_p_price">
						<span>총 결제 금액 &nbsp;</span><span id="totalPrice-num">0</span>원
					</div>
					<div id="goOrder" class="">
						<!-- 주문버튼 -->
						<div class="clear"></div>
						<div id="product-order">
							<button id="order-button">선택 상품 결제</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>



	<div id="footer"></div> <!-- 푸터를 삽입할 위치 -->

	<!--  <script src="script.js"></script> JavaScript 파일 링크 -->


</body>

</html>