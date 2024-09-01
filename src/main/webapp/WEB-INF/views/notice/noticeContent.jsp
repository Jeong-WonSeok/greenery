<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>공지 내용 페이지</title>

<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/noticeContent.css">
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>

<body>
	<script src="${pageContext.request.contextPath}/resources/js/noticeContent.js"></script>
	<!-- <div id="header"></div> -->
	<!-- 공통 헤더(상단바) 삽입 -->
	<%@ include file="/WEB-INF/views/common/header.jsp"%> 

	<div class="notice-container">
		<div class="notice-inner">
			<p class="notice-title">공지사항</p>
		</div>
		<div class="divider"></div>
		<div class="notice-Content">
			<!-- <div class="content-top">
				<div class="content-title"></div>
				<div class="content-date">작성일</div>			
			</div> -->
				<div class="content">
				<!-- <div class="divider-bottom"></div> -->
				</div>
			<!-- <div class="pageCount">
				<div class="count">조회</div>
				<div class="divider"></div>
				<div class="count-num">1</div>
				</div> -->
		</div>
</div>


<!-- 	<div id="footer"></div> -->
	<!-- 푸터를 삽입할 위치 -->
	<%@ include file="/WEB-INF/views/common/footer.jsp"%> 
</body>
</html>