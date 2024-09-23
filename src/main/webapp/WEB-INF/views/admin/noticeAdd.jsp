<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
	src="${pageContext.request.contextPath}/resources/bootstrap/jquery.min.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/bootstrap/bootstrap.bundle.min.js"></script>
	<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<link
	href="${pageContext.request.contextPath}/resources/css/admin/noticeadd.css"
	rel="stylesheet" type="text/css" />
</head>



<body>
	<%@ include file="/WEB-INF/views/common/adminCommon.jsp"%>
	<div class="section4">
		<div>
			<form class="container-form" method="post" action='${notice == null  ? "insertNotice" : "updateNotice" }'>
				<div class="top-text-margin">
					공지사항 > <span class="text-success"><b>공지사항 등록</b></span>
				</div>
				<h2 class="top-text-margin">
					<b>공지사항 등록</b>
				</h2>
				<h5 class="top-text-margin">
					<b>기본 정보</b>
				</h5>

				<input type="number" name="noticeId" id="notice-id" value="${notice.noticeId}" 
					style="display:none">
				<div class="form-group">
					<label>제목</label> 
					<input type="text" name="noticeTitle" id="notice-title" 
						placeholder="그리너리 서버 점검 안내(8/21)" maxlength="250" value="${notice.noticeTitle}">
					<div id="charCount">0 / 250</div>
				</div>
				<div class="form-group">
					<label>내용</label>
				</div>
				<div class="container-textarea">
					<textarea class="textarea" rows="5" name="noticeContent"
						placeholder="공지사항에 대한 내용을 입력하세요">${notice.noticeContent }</textarea>
				</div>
			
				<div class="btn-register-div">
					<c:if test="${notice != null }">
						<button type="submit" class="btn-update">수정</button>
					</c:if>
					<c:if test="${notice == null }">
						<button type="submit" class="btn-register">등록</button>
					</c:if>
				</div>
			</form>
			
		</div>
	</div>
	<script
		src="${pageContext.request.contextPath}/resources/js/admin/noticeadd.js"></script>
</body>
</html>