<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<head>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/mypage/mypage.css">
</head>
<section class="mypage-title">
	<div class="mypage-title-greeting">
		<img src="${pageContext.request.contextPath}/resources/images/thum.png">
		<div class="greeting-text">
			${userName} 님 반갑습니다.
		</div>
	</div>
	<div class="mypage-title-coupon">
		<span class="coupon-status">
			쿠폰 <span class="coupon-num">${coupon}</span>개
		</span>
	</div>
</section>
<span class="mypage-content-title">찜한 상품</span>
<span class="product-container">
	<c:forEach items="${productList}" var="product">
		<div class="product-item">
	       <div class="product-image-container">
	           <a href="${pageContext.request.contextPath}/product/detailpage?productId=${product.productId}">
		    		<img src="${pageContext.request.contextPath}/imageDown?productId=${product.productId}&usecase=1" alt="${product.productName}" class="product-image">
				</a>
			   <div class="product-icons">
			       <span class="icon like-icon ${product.liked ? 'active' : ''}">
			           <img src="${pageContext.request.contextPath}/resources/images/${product.liked ? 'fill_heart.png' : 'noFill_heart.png'}" alt="찜하기 아이콘" data-productid="${product.productId}">
			       </span>
			       <span class="icon cart-icon">
			           <img src="${pageContext.request.contextPath}/resources/images/cart_icon2.png" alt="장바구니 아이콘" class="cart-img" data-productid="${product.productId}">
			       </span>
			       <span class="icon buy-icon">
			           <img src="${pageContext.request.contextPath}/resources/images/dollar.png" alt="구매하기 아이콘" class="payment-img" onclick="window.location.href='${pageContext.request.contextPath}/order/addOneProduct?productId=${product.productId}'">
			        </span>
			    </div>
			</div>
	
			<div class="product-details">
			    <p class="product-name">${product.productName}</p>
				<p class="product-description">${product.summaryDescription}</p>
				<c:set var="productPrice" value="${product.productPrice}" />	                    
				<p class="product-price"><span class="price-amount"><fmt:formatNumber value="${productPrice}" type="number"/></span>원</p>
	        </div>
	    </div>
	</c:forEach>
</span>