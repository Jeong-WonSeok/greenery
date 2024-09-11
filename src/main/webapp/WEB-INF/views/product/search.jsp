<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <title>검색 페이지</title>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/product/search.css">

</head>

<body>
    <%@ include file="/WEB-INF/views/common/header.jsp"%>
    <div id="header"></div>  <!-- 공통 헤더(상단바) 삽입 -->

    <div class="search-result-text">
        '<span class="search-term"></span>' 에 대한 검색 결과입니다.
    </div>

    <div class="result-info">
        <div class="product-count"><span id="product-count-text">제품</span> <span id="product-count"></span>개</div>

        <!-- 상품 정렬 -->
        <div class="toolbar-sort">
            <select class="toolbar-sort-select">
                <option value="default">신상품순</option>
                <option value="price-asc">낮은 가격순</option>
                <option value="price-desc">높은 가격순</option>
            </select>
        </div>
    </div>


    <div class="main-products">
        <div class="product-container">
        	<c:forEach items="${productList}" var="product">
        		<div class="product-item">
	                <div class="product-image-container">
	                    <img src="${pageContext.request.contextPath}/imageDown?productId=${product.productId}" alt="${product.productName}" class="product-image">
	                    <div class="product-icons">
	                        <span class="icon like-icon">
	                            <img src="${pageContext.request.contextPath}/resources/images/heart.png" alt="찜하기 아이콘">
	                        </span>
	                        <span class="icon cart-icon">
	                            <img src="${pageContext.request.contextPath}/resources/images/cart_icon2.png" alt="장바구니 아이콘">
	                        </span>
	                        <span class="icon buy-icon">
	                            <img src="${pageContext.request.contextPath}/resources/images/dollar.png" alt="구매하기 아이콘" class="payment-img">
	                        </span>
	                    </div>
	                </div>
	                <div class="product-details">
	                    <p class="product-name">${product.productName}</p>
	                    <p class="product-description">${product.summaryDescription}</p>
	                    <p class="product-price"><span class="price-amount">${product.productPrice}</span>원</p>
	                </div>
	            </div>
        	</c:forEach>
		</div>
        <button class="scroll-btn-up" onclick="scrollToTop()"></button>
    </div>



    <!--<div id="footer"></div>  공통 footer 삽입 -->
    <%@ include file="/WEB-INF/views/common/footer.jsp"%>
    <script src="${pageContext.request.contextPath}/resources/js/product/search.js"></script>
</body>

</html>