 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<section class="mypage-title">
	<div class="mypage-title-greeting">
		<img src="${pageContext.request.contextPath}/resources/images/thum.png">
		<div class="greeting-text">
			홍길동 님 반갑습니다.
		</div>
	</div>
	<div class="mypage-title-coupon">
		<span class="coupon-status">
			쿠폰 <span class="coupon-num">1</span>개
		</span>
	</div>
</section>
<span class="mypage-content-title">주문 내역</span>
<div class="order-list">
	
	<div class="order-list-col">
		<div class="ol-1">주문일자</div>
		<div class="ol-3">상품명</div>
		<div class="ol-1">수량</div>
		<div class="ol-1">주문금액</div>
		<div class="ol-1">상태</div>
	</div>
	<c:forEach items="${orderList}" var="detail">
		<div class="order-item-col">

			<div class="ol-1"><fmt:formatDate value="${detail.createdAt}" pattern="yyyy-MM-dd" /></div>
			<div class="ol-3">
				<div class="order-item-img">
					<img src="${pageContext.request.contextPath}/imageDown?productId=${detail.productId}&usecase=1" alt="${detail.productName}" class="order-img"
						onclick="window.location.href = '${pageContext.request.contextPath}/product/detailpage?productId=${detail.productId}'">
				</div>
				<div class="order-item-info">
					<span class="item-title">${detail.productName}</span>
					<span class="item-desc">${detail.summaryDescription}</span>
				</div>
			</div>
			<div class="ol-1">${detail.productQty}</div>
			<c:set var="productPrice" value="${detail.productPrice * detail.productQty}" />
			<div class="ol-1"><fmt:formatNumber value="${productPrice}" type="number"/>원</div>
			<div class="ol-1 order-status">
				결제완료
				<c:if test="${!detail.reviewEnable}">
					<button type="button" class="review-btn create_review" data-bs-toggle="modal" data-bs-target="#exampleModal" 
						data-productid="${detail.productId}" data-orderid="${detail.orderId }">
	        			리뷰 작성
					</button>
				</c:if>
				<c:if test="${detail.reviewEnable}">
					<button type="button" class="review-btn update-review" data-bs-toggle="modal" data-bs-target="#exampleModal" 
						data-productid="${detail.productId}" data-orderid="${detail.orderId }">
	        			리뷰 수정
					</button>
				</c:if>
			    <!-- Modal -->		
			</div>
		    
		</div>
	</c:forEach>
	<div class="order-pager text-center mt-5">
		<c:if test="${pager.groupNo>1}">
			<button class="btn btn-outline-info btn-sm page-move-button order-page" data-start="${pager.startPageNo-1 }">이전</button>
		</c:if>
		<c:forEach begin="${pager.startPageNo}" end="${pager.endPageNo}" var="i">
			<c:if test="${i == pager.pageNo}">
				<button class="btn btn-success btn-sm order-page">${i}</button>
			</c:if>
			<c:if test="${i != pager.pageNo }">
				<button class="btn btn-outline-success btn-sm order-page">${i}</button>
			</c:if>
		</c:forEach>
		<c:if test="${pager.groupNo<pager.totalGroupNo}" >
			<button class="btn btn-outline-info btn-sm page-move-button order-page" data-start="${pager.endPageNo+1 }">>다음</button>
		</c:if>
	</div>
	
	
	
	<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-scrollable" >
	        <div class="modal-content">
	
	            <div class="modal-header">
	                <h1 class="modal-title fs-5" id="exampleModalLabel">리뷰 작성</h1>
	                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	            </div>
	
	            <div class="modal-body">
	                <div class="product-container">
	                    <img src="#" alt="" id="review_img">
	                    <div class="product-label">
	                        <div class="product-name"><span><strong></strong></span></div>
	                        <div class="product-description"><span></span></div>
	                    </div>
	                </div>
	
	
	                <div class="star-container">
	                    <span id="review-span">상품은 어떠셨나요?</span>
	                    <div class="star_rating"> <!-- 별점 매기기 -->
	                    	<c:forEach begin="1" end="5" varStatus="status">
	                    		<span class="star" ></span>
	                    	</c:forEach>
	                   	</div>
	                </div>
	
	                <div class="review-tips">
	                    <span>리뷰 작성 TIP</span>
	                    <div class="image-container">
	                        <img src="${pageContext.request.contextPath}/resources/images/reviews-tip-1.jpg" alt="이미지 1" class="review-image">
	                        <img src="${pageContext.request.contextPath}/resources/images/reviews-tip-2.jpg" alt="이미지 2" class="review-image">
				                        </div>
				                        <span class="tip-text">나만의 스킨케어루틴과 함께 전/후 변화를 보여주세요</span>
				                        <span class="tip-text" id="tip-text2">오랜 기간동안 사용한 후기라면 더 좋아요!</span>
				                    </div>
				
				                    <span>솔직한 상품 리뷰를 남겨주세요.</span>
				                    <div class="textarea-wrapper">
				                        <textarea class="star_box" id="reviewTextarea" maxlength="1000" placeholder="꿀팁 가득, 상세한 리뷰를 작성해보세요!
도움수가 올라가면 포인트도 받고,
탑리뷰어가 될 확률도 높아져요!

*반품, 환불 관련 내용은 고객센터로 별도 문의해주세요." ></textarea>
				                        <div id="charCount">0 / 1,000</div> <!-- 글자 수 표시 -->
	                </div>
	
	                <div>
	                    <span>포토</span>
	                    <div class="image-upload-container" onclick="document.getElementById('image-input').click();">
	                        <div class="image-preview" id="image-preview">
	                            <span>
	                            	+
	                            </span>
	                        </div>
	                    </div>
                   		<input type="file" id="image-input" accept="image/*" style="display: none;" onchange="previewImage(event)" />
	                </div>
	
	            </div>
	
	            <div class="modal-footer">
	                <button type="button" class="btn" data-bs-dismiss="modal">닫기</button>
	                <button type="button" class="btn write-btn" data-productid="" data-orderid="">리뷰 등록하기</button>
	            </div>
	
	        </div>
	    </div>
	</div>
	<script src="${pageContext.request.contextPath}/resources/js/mypage/reviews.js"></script>
</div>
 