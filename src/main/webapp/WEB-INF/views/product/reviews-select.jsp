<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<div id="reviewList">
	<c:forEach items="${productReviews}" var="item">
		<div class="reviews">
			<div class="reviews-container">
				<div class="star-container">
					<c:forEach begin="1" end="${item.reviewScore}">
						<img src="${pageContext.request.contextPath}/resources/images/fill-star.png" alt="별" class="star"/>
					</c:forEach>
					<c:forEach begin="${item.reviewScore+1}" end="5">
						<img src="${pageContext.request.contextPath}/resources/images/empty-star.png" alt="별" class="star"/>					
					</c:forEach>
					<span class="star-cnt"><strong>${item.reviewScore}</strong></span>
				</div>
		
				<div class="info-container">
				    <div class="user-id">${item.userId}</div>
					<span><fmt:formatDate value="${item.createdAt}" pattern="yyyy-MM-dd" /></span>
				</div>
		
				<span class="review-span">${item.reviewContent}</span>
			</div>
		
			<div class="img-box">
			    <img src="${pageContext.request.contextPath}/product/reviewImgDown?orderId=${item.orderId}&productId=${item.productId}"  alt="">
		    </div>
		</div>
	</c:forEach>
	<div class="pager text-center mt-5">
		<a href="?pageNo=1&productId=${productId}" class="btn btn-sm">처음</a>
		<c:if test="${pager.groupNo>1}">
			<a href="?pageNo=${pager.startPageNo-1}&productId=${productId}" class="btn  btn-sm">이전</a>
		</c:if>
		<c:forEach begin="${pager.startPageNo}" end="${pager.endPageNo}" var="i">
			<c:if test="${i == pager.pageNo}">
				<a href="?pageNo=${i}&productId=${productId}" class="btn btn-outline-secondary btn-sm">${i}</a>
			</c:if>
			<c:if test="${i != pager.pageNo }">
				<a href="?pageNo=${i}&productId=${productId}" class="btn  btn-sm">${i}</a>
			</c:if>
		</c:forEach>
		<c:if test="${pager.groupNo<pager.totalGroupNo }" >
			<a href="?pageNo=${pager.endPageNo+1 }" class="btn  btn-sm">다음</a>
		</c:if>
		<a href="?pageNo=${pager.totalPageNo}" class="btn  btn-sm">맨끝</a>
	</div>

</div> 