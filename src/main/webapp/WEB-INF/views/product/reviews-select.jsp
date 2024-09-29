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
	<div class="pager text-center mt-5 review-detail-page-div" data-productid="${productId}">
		<button class="btn btn-sm review-detail-page" data-end="1">처음</button>
		<c:if test="${pager.groupNo>1}">
			<button class="btn btn-sm review-detail-page" data-start="${pager.startPageNo - 1}">이전</button>
		</c:if>
		<c:forEach begin="${pager.startPageNo}" end="${pager.endPageNo}" var="i">
			<c:if test="${i == pager.pageNo}">
				<button class="btn btn-outline-secondary btn-sm review-detail-page">${i}</button>
			</c:if>
			<c:if test="${i != pager.pageNo }">
				<button class="btn btn-sm review-detail-page">${i}</button>
			</c:if>
		</c:forEach>
		<c:if test="${pager.groupNo<pager.totalGroupNo }" >
			<button class="btn btn-sm review-detail-page" data-start="${pager.endPageNo + 1}">다음</button>
		</c:if>
		<button class="btn  btn-sm review-detail-page" data-end="${pager.totalPageNo}">맨끝</button>
	</div>

</div> 