<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<section class="mypage-title">
	<div class="mypage-title-greeting">
		<img src="${pageContext.request.contextPath}/resources/images/thum.png">
		<div class="greeting-text">
			홍길동 님 반갑습니다.
		</div>
	</div>
	<div class="mypage-title-coupon">
		<span class="coupon-status">
			쿠폰 <span class="coupon-num">1</span>개
		</span>
	</div>
</section>
<span class="mypage-content-title">주문 내역</span>
<div class="order-list">
	
	<div class="order-list-col">
		<div class="ol-1">주문일자</div>
		<div class="ol-3">상품명</div>
		<div class="ol-1">수량</div>
		<div class="ol-1">주문금액</div>
		<div class="ol-1">상태</div>
	</div>
	<c:forEach items="${orderList}" var="detail">
		<div class="order-item-col">

			<div class="ol-1"><fmt:formatDate value="${detail.createdAt}" pattern="yyyy-MM-dd" /></div>
			<div class="ol-3">
				<div class="order-item-img">
					<img src="${pageContext.request.contextPath}/imageDown?productId=${detail.productId}&usecase=1" alt="${detail.productName}" class="order-img">
				</div>
				<div class="order-item-info">
					<span class="item-title">${detail.productName}</span>
					<span class="item-desc">${detail.summaryDescription}</span>
				</div>
			</div>
			<div class="ol-1">${detail.productQty}</div>
			<c:set var="productPrice" value="${detail.productPrice * detail.productQty}" />
			<div class="ol-1"><fmt:formatNumber value="${productPrice}" type="number"/>원</div>
			<div class="ol-1 order-status">
				결제완료
				<button type="button" class="review-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" 
					data-productid="${detail.productId}" data-orderid="${detail.orderId }">
        			리뷰 작성
    			</button>
			</div>
		    
		</div>
	</c:forEach>
</div>