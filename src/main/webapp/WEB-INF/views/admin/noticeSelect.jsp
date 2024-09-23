<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>

<link
	href="${pageContext.request.contextPath}/resources/bootstrap/bootstrap.min.css"
	rel="stylesheet">
<script
	src="${pageContext.request.contextPath}/resources/bootstrap/bootstrap.bundle.min.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/bootstrap/jquery.min.js"></script>
<link
	href="${pageContext.request.contextPath}/resources/css/admin/noticeselect.css"
	rel="stylesheet" type="text/css" />
</head>



<body>
	<%@ include file="/WEB-INF/views/common/adminCommon.jsp"%>
	<div class="section4">
		<div>
			<div class="top-text-margin">
				공지사항 > <span class="text-success"><b>공지사항 수정 / 삭제</b></span>
			</div>
			<h2 class="top-text-margin">
				<b>공지사항 수정 / 삭제</b>
			</h2>

			<div class="list-header">
				<div class="item1">등록일자</div>
				<div class="item2">제목</div>
				<div class="item3">수정 / 삭제</div>
			</div>


			<c:forEach items="${notice}" var="i">
				<div class="list-container">
					<div class="notice-created"><fmt:formatDate value="${i.createdAt}" pattern="yyyy-MM-dd" /></div>
					<div class="notice-title">${i.noticeTitle }</div>
					
					<div class="upAndDelBtn">
						<button onclick="location.href='noticeDetail?noticeId=${i.noticeId}'" class="btn1">수정</button>
						<button class="btn2" data-noticeid="${i.noticeId}">삭제</button>
					</div>
				</div>
			</c:forEach>
		</div>
	</div>

	<script
		src="${pageContext.request.contextPath}/resources/js/admin/noticeselect.js"></script>
</body>
</html>
