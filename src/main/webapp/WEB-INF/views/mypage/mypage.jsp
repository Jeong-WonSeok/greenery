<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>마이페이지</title>
	<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/mypage/mypage.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/mypage/reviews.css">

</head>

<body>

	<!-- 헤더를 삽입할 위치 -->
	<!-- <div id="header"></div> -->
	<%@ include file="/WEB-INF/views/common/header.jsp"%> 
		<div class="mypage">
		<div class="mypage-sidebar">
			<span class="mypage-sidebar-title">마이페이지</span>
			<span class="mypage-menu" data-url="likedProducts">찜한 상품</span>
			<span class="mypage-menu order-list-btn" data-url="orderList">주문 내역</span>
			<span class="mypage-menu" data-url="editMyInfo">개인정보 수정</span>
		</div>
		<div class="mypage-content">
		</div>
	</div>
	<!-- 푸터를 삽입할 위치 -->
	<%@ include file="/WEB-INF/views/common/footer.jsp"%> 
	<script src="${pageContext.request.contextPath}/resources/js/mypage/mypage.js"></script><!-- 스크립트 파일 경로 -->
<!-- 	<div id="footer"></div>
</body>

</html> -->