<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>공지사항 페이지</title>

	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/notice/notices.css">
	<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>

<body>
	<script src="${pageContext.request.contextPath}/resources/js/notice/notices.js"></script>
	<%@ include file="/WEB-INF/views/common/header.jsp"%> 
	<!-- <div id="header"></div>
	공통 헤더(상단바) 삽입 -->

	<div class="notice-container">
		<div class="notice-inner">
			<p class="notice-title">공지사항</p>
			<p class="notice-num">총 4건</p>
		</div>
		<div class="divider"></div>

		<div class="contents">
			<div class="content-title">
				<div class="num">번호</div>
				<div class="main-title">제목</div>
				<!-- <p class="neyoung">내용</p> -->
				<div class="date">작성일</div>
			</div>
			<div class="divider"></div>
		</div>
		<div class="contents">
			<div class="content">
				<div class="noticeId"></div>
				<div class="title"></div>

				<div class="registrationDate"></div>
				<c:forEach items="${noticeList}" var="notices">
					<div class="notices-item">
	        			<div class="noticeId">${notices.noticeId}</div>
	        			<div class="title" >${notices.noticeTitle}</div>
	        			<div class="registrationDate"><fmt:formatDate value="${notices.createdAt}" pattern="yyyy-MM-dd" /></div>
	       			</div>
					<div class="divider"></div>
				</c:forEach>
			</div>
			<div class="divider"></div>
		</div>

		<div class="pageNum">1
			<div class="divider" style="width: 20px; border: 1.5px solid #069369; margin-top: 7px;"></div>
		</div>

	</div>



	<%@ include file="/WEB-INF/views/common/footer.jsp"%>  
	<!-- <div id="footer"></div> -->
	<!-- 푸터를 삽입할 위치 -->

</body>

</html>