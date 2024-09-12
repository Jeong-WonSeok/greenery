<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>화장품 상세페이지</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/product/detailpage.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/product/detail-info.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/product/reviews-select.css">
</head>

<body>
	
	<%@ include file="/WEB-INF/views/common/header.jsp"%>
    <div id="header"></div>
    <!-- 공통 헤더(상단바) 삽입 -->
	
    <div class="container">
        <div class="left">

            <!-- 이미지 사이드 쇼 -->
            <div class="slideshow-container">

                <!-- Full-width images with number and caption text -->
                <div class="mySlides dot">
                    <img src="${pageContext.request.contextPath}/imageDown?productId=${product.productId}&usecase=1" alt="Slide 1">
                </div>

            </div>
        </div>

        <div class="right">
        <div class= "title-container">
            <p class="brand-name">브랜드 이름</p>
            <p class="product-title">${product.productName}</p>
		</div>
            <div class="description-container">
	            <div class="divider"></div>
	            <p class="description">
					${product.detailDescription}
	            </p>
	            <div class="divider"></div>
            </div>
            <div class="product-info">
                <div class="product-quantity">
                    <button onclick="decrease(this)">-</button>
                    <span class="quantity-number" id="quantity">1</span>
                    <button onclick="increase(this)">+</button>
                </div>
                <c:set var="productPrice" value="${product.productPrice}" />
                <span class="product-price" data-price="${product.productPrice}">
                	<fmt:formatNumber value="${productPrice}" type="number"/>원
               	</span>
            </div>
            <div class="buttons">
                <button class="add-to-cart">장바구니</button>
                <button class="checkout">바로구매</button>
                <button class="wishlist-button">
                    <img src="${pageContext.request.contextPath}/resources/images/heart-icon.png" alt="wishlist" class="wishlist">
                </button>
            </div>
        </div>
    </div>

    <!-- 밑에 다른 이미지 -->
    <div class="sideimg">
        <!-- Next and previous buttons -->
        <a class="prev" onclick="showSlides(1)">
            <img src="${pageContext.request.contextPath}/resources/images/left-icon.png" alt="Previous" style="width:20px">
        </a>

        <div class="currentSlide-container">
            <span class="dot">
                <img  onclick="showSlides(1)" src="${pageContext.request.contextPath}/imageDown?productId=${product.productId}&usecase=2" alt="currentSlide(1)"
                    onerror="noImage(this)" style="width: 25%">
            </span>
            <span class="dot">
                <img onclick="showSlides(2)" src="${pageContext.request.contextPath}/imageDown?productId=${product.productId}&usecase=3"  alt="currentSlide(2)"
                    onerror="noImage(this)" style="width: 25%">
            </span>
            <span class="dot" >
                <img onclick="showSlides(3)" src="${pageContext.request.contextPath}/imageDown?productId=${product.productId}&usecase=4" alt="currentSlide(3)"
                    onerror="noImage(this)" style="width: 25%">
            </span>
        </div>

        <a class="next" onclick="showSlides(3)">
            <img src="${pageContext.request.contextPath}/resources/images/right-icon.png" alt="Next" style="width:20px">
        </a>
    </div>

    <!-- 상세페이지, 리뷰페이지 -->
    <div class="tab-container">
    <div class="tab">
    <div class="tab-item">
        <button class="tab-button tablinks" data-target="detail-info" data-productid="${product.productId}">상세정보</button>
        <div class="detail-divider"></div>
        </div>
        <div class="tab-item">
        <button class="tab-button tablinks" data-target="reviews-select" data-productid="${product.productId}">리뷰</button>
        <div class="reviews-divider"></div>
    </div>
        </div>
        </div>

    <div id="tab-content">
        <!-- AJAX로 불러온 상세 페이지 or 리뷰 표시 -->
    </div>
    <!-- 업버튼 -->
    <div class="main-products">
        <button class="scroll-btn-up" onclick="scrollToTop()"></button>
    </div>

    <div id="footer"></div>
    <%@ include file="/WEB-INF/views/common/footer.jsp"%>
    <!-- 푸터를 삽입할 위치 -->

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/product/detailpage.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/product/detail-info.js"></script>
</body>

</html>