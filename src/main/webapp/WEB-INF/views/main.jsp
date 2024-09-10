<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link href="${pageContext.request.contextPath}/resources/bootstrap/bootstrap.min.css" rel="stylesheet">
	<script src="${pageContext.request.contextPath}/resources/bootstrap/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/main.css" />
    <title>메인페이지</title>
</head>

<body>
	<c:if test="${category == 'all'}">
	    <div class="modal-container">
	        <div class="coupon-modal">
	            <img src="${pageContext.request.contextPath}/resources/images/modal.png" class="modal-image" />
	            <div class="modal-text">
	                <span class="today-close">오늘 그만 보기</span>
	                <span class="close">닫기</span>
	            </div>
	        </div>
	    </div>
    </c:if>
    <div class="alert-coupon">
        <img src="${pageContext.request.contextPath}/resources/images/coupon_modal_check.png" class="img-alert-coupon" />
        <span>쿠폰 발급이 완료되었습니다!</span>
    </div>
    <!-- 헤더를 삽입할 위치 -->
    <!-- <div id="header"></div> -->
    <%@ include file="/WEB-INF/views/common/header.jsp"%>
    <!-- 배너 -->
    <section class="banner">
        <!-- 배너 이미지 -->
        <div class="banner_slides fade_slide">
            <img src="${pageContext.request.contextPath}/resources/images/banner1.png" alt="slide 1" />
        </div>
        <div class="banner_slides fade_slide">
            <img src="${pageContext.request.contextPath}/resources/images/banner2.png" alt="slide 2" />
        </div>
        <div class="banner_slides fade_slide">
            <img src="${pageContext.request.contextPath}/resources/images/banner3.png" alt="slide 3" />
        </div>
        <!-- 배너 이동 버튼 (왼/오) -->
        <div class="banner-control">
            <button class="banner-control-btn-left" onclick="plusSlides(-1)"></button>
            <button class="banner-control-btn-right" onclick="plusSlides(1)"></button>
        </div>
        <!-- 배너 이동 버튼 (순서) -->
        <div class="banner-indicator">
            <button class="banner-indicator-btn" onclick="currentSlide(1)"></button>
            <button class="banner-indicator-btn" onclick="currentSlide(2)"></button>
            <button class="banner-indicator-btn" onclick="currentSlide(3)"></button>
        </div>
    </section>
    <div class="toolbar">
        <!-- 카테고리 -->
        <nav class="toolbar-category">
       	   	<a class="toolbar-category-btn ${category == 'all' ? 'active-category' : ''}" href="${pageContext.request.contextPath}">전체</a>
        	<a class="toolbar-category-btn ${category == 'Skincare' ? 'active-category' : ''}" href="category?category=Skincare">스킨케어</a>
            <a class="toolbar-category-btn ${category == 'Makeup' ? 'active-category' : ''}" href="category?category=Makeup">메이크업</a>
            <a class="toolbar-category-btn ${category == 'BodyCare' ? 'active-category' : ''}" href="category?category=BodyCare">바디케어</a>
            <a class="toolbar-category-btn ${category == 'HairCare' ? 'active-category' : ''}" href="category?category=HairCare">헤어케어</a>
            <a class="toolbar-category-btn ${category == 'BeautyTools' ? 'active-category' : ''}" href="category?category=BeautyTools">미용소품</a>
            <a class="toolbar-category-btn ${category == 'MensCare' ? 'active-category' : ''}" href="category?category=MensCare">맨즈케어</a>
        </nav>
        <!-- 상품 정렬 -->
        <div class="toolbar-sort">
			<form action="${pageContext.request.contextPath}"  method="get">
	        	<c:choose> 
	            	<c:when test="${category!='all' }"><select id="sort" name="sort" class="toolbar-sort-select" onchange="location.href='category?category=${category}&sort=' + this.value"></c:when>
	            	<c:otherwise> <select id="sort" name="sort" class="toolbar-sort-select" onchange="this.form.submit()"></c:otherwise>
            	</c:choose>
	                <option value="default" ${sort=='default' ? 'selected' : "" }>신상품순</option>
	                <option value="price-asc" ${sort=='price-asc' ? 'selected' : "" }>낮은 가격순</option>
	                <option value="price-desc" ${sort=='price-desc' ? 'selected' : "" }>높은 가격순</option>
	            </select>
            </form>
        </div>
    </div>
    <div class="main-products">
        <div class="product-container">
        
        	<c:forEach items="${productList}" var="product">
        		<div class="product-item">
	                <div class="product-image-container">
	                    <img src="imageDown?productId=${product.productId}" alt="${product.productName}" class="product-image">
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
	   		<%-- [처음][이전] 1 2 3 4 5 [다음][맨끝] --%>
        </div>
        <c:if test="${category == 'all'}">
	   		<div class="pager text-center">
	   			<a href="?pageNo=1&sort=${sort}" class="btn btn-outline-primary btn-sm">처음</a>
	   			<c:if test="${pager.groupNo>1}">
	   				<a href="?pageNo=${pager.startPageNo-1}&sort=${sort}" class="btn btn-outline-info btn-sm">이전</a>
	   			</c:if>
	   			<c:forEach begin="${pager.startPageNo}" end="${pager.endPageNo}" var="i">
	   				<c:if test="${i == pager.pageNo}">
	   					<a href="boardList?pageNo=${i}&sort=${sort}" class="btn btn-success btn-sm">${i}</a>
					</c:if>
	   				<c:if test="${i != pager.pageNo }">
	   					<a href="?pageNo=${i}&sort=${sort}" class="btn btn-outline-success btn-sm">${i}</a>
					</c:if>
	   			</c:forEach>
	   			<c:if test="${pager.groupNo<pager.totalGroupNo }" >
	   				<a href="?pageNo=${pager.endPageNo+1 }&sort=${sort}" class="btn btn-outline-info btn-sm">다음</a>
	  				</c:if>
	   			<a href="?pageNo=${pager.totalPageNo}&sort=${sort}" class="btn btn-outline-primary btn-sm">맨끝</a>
	   		</div>
		</c:if>

        <button class="scroll-btn-up" onclick="scrollToTop()"></button>
    </div>

    <!-- 푸터를 삽입할 위치 -->
    <!-- <div id="footer"></div> -->
    <%@ include file="/WEB-INF/views/common/footer.jsp"%>
    <script src="${pageContext.request.contextPath}/resources/js/main.js"></script>
</body>

</html>