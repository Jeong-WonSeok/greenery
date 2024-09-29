<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
		href="${pageContext.request.contextPath}/resources/css/admin/productselect.css"
		rel="stylesheet" type="text/css" />
</head>



<body>
	<%@ include file="/WEB-INF/views/common/adminCommon.jsp"%>
	<div class="section4">
		<div>
			<div class="top-text-margin">
				상품관리 > <span class="text-success"><b>상품조회</b></span>
			</div>
			<h2 class="top-text-margin">
				<b>상품조회</b>
			</h2>
	
			<div class="list-header">
				<div class="item1">등록일자</div>
				<div class="item2">상품 이미지</div>
				<div class="item3">상품명</div>
				<div class="item4">상품 수량</div>
				<div class="item5">판매가</div>
				<div class="item6">수정 / 삭제</div>
			</div>
			
			<c:forEach items="${product}" var="i">
				<div class="product-container">
					<div class="product-created">
					    <fmt:formatDate value="${i.createdAt}" pattern="yyyy-MM-dd" />
					</div>
					<div class=product-image>
						<a href="${pageContext.request.contextPath}/admin/updateProductForm?productId=${i.productId}">
		                     <img src="imageDown?productId=${i.productId}&usecase=1" alt="${i.productName}" class="product-image">
						</a>
					</div>
					
					<div class="product-name">${i.productName}</div>
					<div class="product-stock">${i.productStock}</div>
					<div class="product-price"><span><fmt:formatNumber value="${i.productPrice}" type="number"/></span>원</div>
					
					<div class="upAndDelBtn">
						<button onclick="location.href='updateProductForm?productId=${i.productId}'" class="btn1">수정</button>
						<form action="deleteProduct" method="post">
						    <input type="hidden" name="productId" value="${i.productId}">
						    <button type="submit" class="btn2">삭제</button>
						</form>
					</div>
				</div>
			</c:forEach>
			
			<tr>
				<td colspan="5" class="text-center">
					<%-- [처음][이전] 1 2 3 4 5 [다음][맨끝] --%>
					<div class="pagetable">
						<a href="productselect?pageNo=1" class="btn  btn-sm">처음</a>
						<c:if test="${pager.groupNo>1}">
						    <a href="productselect?pageNo=${pager.startPageNo - 1}" class="btn  btn-sm">이전</a>
						</c:if>
						
						<!-- 한 페이지 당 화면에 나오는 번호 ex) 1 2 3 4 5 -->
						<c:forEach begin="${pager.startPageNo}" end="${pager.endPageNo}" step="1" var="i">
						    <c:if test="${pager.pageNo == i}">
						        <a href="productselect?pageNo=${i}" class="btn btn-outline-secondary btn-sm">${i}</a>
						    </c:if>
						    <c:if test="${pager.pageNo != i}">
						        <a href="productselect?pageNo=${i}" class="btn  btn-sm">${i}</a>
						    </c:if>
						</c:forEach>
						<c:if test="${pager.groupNo<pager.totalGroupNo}">
						    <a href="productselect?pageNo=${pager.endPageNo + 1}" class="btn  btn-sm">다음</a>
						</c:if>
						<a href="productselect?pageNo=${pager.totalPageNo}" class="btn  btn-sm">맨끝</a>
					</div>
				</td>
			</tr>
			
		</div>
	</div>


	<script
		src="${pageContext.request.contextPath}/resources/js/admin/productselect.js"></script>
</body>
</html>