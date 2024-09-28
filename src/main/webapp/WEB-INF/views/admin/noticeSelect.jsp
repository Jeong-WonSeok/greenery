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
	src="${pageContext.request.contextPath}/resources/jquery/jquery.min.js"></script>
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
			
			<div class="pager text-center mt-4">
	   			<a href="?pageNo=1&sort=${sort}" class="btn btn-sm">처음</a>
	   			<c:if test="${pager.groupNo>1}">
	   				<a href="?pageNo=${pager.startPageNo-1}&sort=${sort}" class="btn btn-sm">이전</a>
	   			</c:if>
	   			<c:forEach begin="${pager.startPageNo}" end="${pager.endPageNo}" var="i">
	   				<c:if test="${i == pager.pageNo}">
	   					<a href="?pageNo=${i}&sort=${sort}" class="btn btn-outline-secondary btn-sm">${i}</a>
					</c:if>
	   				<c:if test="${i != pager.pageNo }">
	   					<a href="?pageNo=${i}&sort=${sort}" class="btn btn-sm">${i}</a>
					</c:if>
	   			</c:forEach>
	   			<c:if test="${pager.groupNo<pager.totalGroupNo }" >
	   				<a href="?pageNo=${pager.endPageNo+1 }&sort=${sort}" class="btn btn-sm">다음</a>
	  				</c:if>
	   			<a href="?pageNo=${pager.totalPageNo}&sort=${sort}" class="btn btn-sm">맨끝</a>
	   		</div>
		</div>
	</div>
	
	
	<button type="button" class="btn btn-primary notice-modal" data-bs-toggle="modal" data-bs-target="#noticeModal" style="display:none"></button>
	
	<div class="modal fade" id="noticeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="exampleModalLabel">
						Modal title
					</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
				  	로그인을 해주시길 바랍니다.
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> 닫기 </button>
					<button type="button" class="btn btn-primary delete-modal-btn">삭제 </button>	
				</div>
			</div>
		</div>
	</div>
	<script
		src="${pageContext.request.contextPath}/resources/js/admin/noticeselect.js"></script>
</body>
</html>
