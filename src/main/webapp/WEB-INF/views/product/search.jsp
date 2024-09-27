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
        <div class="product-count"><span id="product-count-text">제품</span> <span id="product-count">${totalProducts}</span>개</div>

        <!-- 상품 정렬 -->
        <div class="toolbar-sort">
            <form method="get">
            	<c:if test="${category != null }">
            		<select id="sort" name="sort" class="toolbar-sort-select" 
            			onchange="location.href='${pageContext.request.contextPath}/product/category?category=${category}&sort=' + this.value">
		                <option value="default" ${sort=='default' ? 'selected' : "" }>신상품순</option>
		                <option value="price-asc" ${sort=='price-asc' ? 'selected' : "" }>낮은 가격순</option>
		                <option value="price-desc" ${sort=='price-desc' ? 'selected' : "" }>높은 가격순</option>
		            </select>
       			</c:if>
            	<c:if test="${category == null }"> 
            		<select id="sort" name="sort" class="toolbar-sort-select" 
            			onchange="location.href='${pageContext.request.contextPath}/product/search?query=${query}&sort=' + this.value">
		                <option value="default" ${sort=='default' ? 'selected' : "" }>신상품순</option>
		                <option value="price-asc" ${sort=='price-asc' ? 'selected' : "" }>낮은 가격순</option>
		                <option value="price-desc" ${sort=='price-desc' ? 'selected' : "" }>높은 가격순</option>
		            </select>
      			</c:if>
            </form>
        </div>
    </div>

	
    <div class="main-products">
        <div class="product-container">
        	<c:forEach items="${productList}" var="product">
        		<div class="product-item">
	                <div class="product-image-container">
	                    <a href="${pageContext.request.contextPath}/product/detailpage?productId=${product.productId}"><img src="${pageContext.request.contextPath}/imageDown?productId=${product.productId}&usecase=1" alt="${product.productName}" class="product-image"></a>
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
		</div>
		<c:if test="${category == null }">
			<div class="pager text-center mt-5">
				<a href="search?pageNo=1&query=${query}&sort=${sort}" class="btn btn-sm">처음</a>
				<c:if test="${pager.groupNo>1}">
					<a href="search?pageNo=${pager.startPageNo-1}&query=${query}sort=${sort}" class="btn btn-sm">이전</a>
				</c:if>
				<c:forEach begin="${pager.startPageNo}" end="${pager.endPageNo}" var="i">
					<c:if test="${i == pager.pageNo}">
						<a href="search?pageNo=${i}&query=${query}&sort=${sort}" class="btn btn-outline-secondary btn-sm">${i}</a>
					</c:if>
					<c:if test="${i != pager.pageNo}">
						<a href="search?pageNo=${i}&query=${query}&sort=${sort}" class="btn btn-sm">${i}</a>
					</c:if>
				</c:forEach>
				<c:if test="${pager.groupNo<pager.totalGroupNo }" >
					<a href="search?pageNo=${pager.endPageNo+1 }" class="btn  btn-sm">다음</a>
				</c:if>
				<a href="search?pageNo=${pager.totalPageNo}" class="btn  btn-sm">맨끝</a>
			</div>
		</c:if>
		<c:if test="${category != null }">
			<div class="pager text-center mt-5">
				<a href="category?category=${category}&pageNo=1&sort=${sort}" class="btn btn-sm">처음</a>
				<c:if test="${pager.groupNo>1}">
					<a href="category?category=${category}&pageNo=${pager.startPageNo-1}&sort=${sort}" class="btn btn-sm">이전</a>
				</c:if>
				<c:forEach begin="${pager.startPageNo}" end="${pager.endPageNo}" var="i">
					<c:if test="${i == pager.pageNo}">
						<a href="category?category=${category}&pageNo=${i}&sort=${sort}" class="btn btn-outline-secondary btn-sm">${i}</a>
					</c:if>
					<c:if test="${i != pager.pageNo}">
						<a href="category?category=${category}&pageNo=${i}&sort=${sort}" class="btn btn-sm">${i}</a>
					</c:if>
				</c:forEach>
				<c:if test="${pager.groupNo<pager.totalGroupNo }" >
					<a href="category?category=${category}&pageNo=${pager.endPageNo+1 }&sort=${sort}" class="btn btn-sm">다음</a>
				</c:if>
				<a href="category?category=${category}&pageNo=${pager.totalPageNo}&sort=${sort}" class="btn btn-sm">맨끝</a>
			</div>
		</c:if>
        <button class="scroll-btn-up" onclick="scrollToTop()"></button>
    </div>
    <div id="footer"></div>  <!-- 공통 footer 삽입 -->
    <%@ include file="/WEB-INF/views/common/footer.jsp"%>
    <script src="${pageContext.request.contextPath}/resources/js/product/search.js"></script>
</body>

</html>