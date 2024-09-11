<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<!-- <link rel="stylesheet" href="../../common.css" /> -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common/header.css"/>
<script src="${pageContext.request.contextPath}/resources/js/common/header.js"></script>

<header>
    <div class="header-logo">
        <a href="${pageContext.request.contextPath}">
            <!--  <span class="logo">greenery</span> -->
            <img src="${pageContext.request.contextPath}/resources/images/logo4.png" class="logo">
        </a>
    </div>
    <div class="header-nav">
    
		<sec:authorize access="isAnonymous()">	<!-- //로그인을 하지 않았을 경우 -->
	    	<button class="header-login" onclick="location.href='${pageContext.request.contextPath}/user/login'">
	            <img src="${pageContext.request.contextPath}/resources/images/login_icon.png" class="header-nav-icon" />
	            <span class="header-nav-text">로그인</span>
	        </button>
	    </sec:authorize>
	    
	    							<!-- 로그인을 했을 때 -->
		<sec:authorize	access="isAuthenticated()">		<!-- 로그인한 사용자의 id를 얻을 수 있음 -->
			<img width="40" src="${pageContext.request.contextPath}/resources/image/login.png"/>
			<span class="me-2 text-white me-2"><sec:authentication property="principal.username" /></span>
			<!-- CSRF가 비활성화되어 있을 경우 -->
			<a class="btn btn-danger btn-sm" href="${pageContext.request.contextPath}/logout">로그아웃</a>
			
			<!-- CSRF가 활성화되어 있을 경우(로그아웃도 post방식으로 요청해야함) 
			<form class="d-inline-block" method="post" action="${pageContext.request.contextPath}/logout">
				<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
				<button class="btn btn-danger btn-sm">로그아웃</button>
			</form>
			-->
			
		</sec:authorize>
	    
	    
        
        <button class="header-mypage" onclick="location.href='${pageContext.request.contextPath}/mypage/mypage'">
            <img src="${pageContext.request.contextPath}/resources/images/mypage_icon.png" class="header-nav-icon" />
            <span class="header-nav-text">마이페이지</span>
        </button>
        <button class="header-cart" onclick="location.href='${pageContext.request.contextPath}/order/basket'">
            <img src="${pageContext.request.contextPath}/resources/images/cart_icon.png" class="header-nav-icon" />
            <span class="header-cart-badge">0</span>
            <span class="header-nav-text">장바구니</span>
        </button>
    </div>
</header>
<div class="header-category">
    <div class="header-category-btn" onclick="categoryOpen(this)">
        <div class="header-category-bar">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
        <span class="header-category-text">카테고리</span>
    </div>
    <div class="header-category-wrap">
        <ul class="category-wrap">
            <li>
                <span class="category-span" data-category="스킨케어">
                    스킨케어
                    <img src="${pageContext.request.contextPath}/resources/images/category_right_arrow.png" width="5" height="10" />
                </span>
            </li>
            <li>
                <span class="category-span" data-category="메이크업">
                    메이크업
                    <img src="${pageContext.request.contextPath}/resources/images/category_right_arrow.png" width="5" height="10" />
                </span>
            </li>
            <li>
                <span class="category-span" data-category="바디케어">
                    바디케어
                    <img src="${pageContext.request.contextPath}/resources/images/category_right_arrow.png" width="5" height="10" />
                </span>
            </li>
            <li>
                <span class="category-span" data-category="헤어케어">
                    헤어케어
                    <img src="${pageContext.request.contextPath}/resources/images/category_right_arrow.png" width="5" height="10" />
                </span>
            </li>
            <li>
                <span class="category-span" data-category="미용소품">
                    미용소품
                    <img src="${pageContext.request.contextPath}/resources/images/category_right_arrow.png" width="5" height="10" />
                </span>
            </li>
            <li>
                <span class="category-span" data-category="맨즈케어">
                    맨즈케어
                    <img src="${pageContext.request.contextPath}/resources/images/category_right_arrow.png" width="5" height="10" />
                </span>
            </li>
        </ul>
    </div>
    <div class="notice">공지사항</div>
</div>
<!-- 검색창 -->
<div class="header-search">
    <input type="text" class="header-search-input" />
    <button class="header-search-icon"></button>
</div>