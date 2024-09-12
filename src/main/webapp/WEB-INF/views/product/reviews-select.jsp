<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

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
					<span>${review.createdAt}</span>
				</div>
		
				<span class="review-span">${item.reviewContent}</span>
			</div>
		
			<div class="img-box">
			    <img src="${i.imageUrl}" alt="">
		    </div>
		</div>
	</c:forEach>
</div> 