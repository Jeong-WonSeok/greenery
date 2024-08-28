<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <title>검색 페이지</title>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/product/search.css">
    <link rel="stylesheet" href="../../common.css" />

</head>

<body>
    <div id="header"></div> <!-- 공통 헤더(상단바) 삽입 -->

    <div class="search-result-text">
        '<span class="search-term"></span>' 에 대한 검색 결과입니다.
    </div>

    <div class="result-info">
        <div class="product-count"><span id="product-count-text">제품</span> <span id="product-count">13</span>개</div>

        <!-- 상품 정렬 -->
        <div class="toolbar-sort">
            <select class="toolbar-sort-select">
                <option value="default">신상품순</option>
                <option value="price-asc">낮은 가격순</option>
                <option value="price-desc">높은 가격순</option>
            </select>
        </div>
    </div>
    <!-- 상품 정렬 -->
    <!-- <div class="toolbar-sort">
        <select class="toolbar-sort-select">
            <option value="default">신상품순</option>
            <option value="price-asc">낮은 가격순</option>
            <option value="price-desc">높은 가격순</option>
        </select>
    </div> -->

    <div class="main-products">
        <div class="product-container"></div>
        <button class="scroll-btn-up" onclick="scrollToTop()"></button>
    </div>



    <div id="footer"></div> <!-- 공통 footer 삽입 -->
    <script src="search.js"></script>
</body>

</html>