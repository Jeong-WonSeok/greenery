<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>장바구니</title>
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/order/basket.css">
</head>

<body>
    <!--<div id="header"></div> 공통 헤더(상단바) 삽입 -->
    <%@ include file="/WEB-INF/views/common/header.jsp"%>

    <h1>장바구니</h1>

    <div class="basket" id="basket">
        <div class="product-list">
            <!-- <h1 class="payment-title">결제하기</h1> -->
            <div class="basket-list-header">
                <div class="checkbox-container">
                    <input type="checkbox" id="allchk" onclick="allchk"> <label for="allchk">전체선택</label>
                </div>
                <div class="button-group">
                    <button type="button" class="choice-detele btn" onclick="deleteSelected()">선택 삭제</button>
                </div>
            </div>

            <hr id="hr-topLine">

            <div id="productList">
            <!-- forEach -->
            	<c:forEach items="${productList}" var="product">
	            	<div class="product">
                        <div class="product-body">
                            <input type="checkbox" class="product-checkbox" data-price="${product.product.productPrice}" data-productid="${product.product.productId}"/>
                            <div class="img"><img src="${pageContext.request.contextPath}/imageDown?productId=${product.product.productId}&usecase=1" alt="${product.product.productName}" class="product-image"></div>                            
                            <div class="product-label">
                                <div class="product-name"><span><strong>${product.product.productName}</strong></span></div>
                                <div class="product-description"><span>${product.product.summaryDescription}</span></div>
                            </div>
                            <div class="product-quantity" data-stock="${product.productQty}">
                                <button onclick="decreaseQuantity(this)">-</button>
                                <span class="quantity-number" >${product.productQty}</span>
                                <button onclick="increaseQuantity(this)">+</button>
                            </div>
							<c:set var="productPrice" value="${product.product.productPrice*product.productQty}" />
                            <div class="product-price" data-price="${product.product.productPrice}" data-productid="${product.product.productId}">
                            	<p class="product-price-p"><strong>
								<fmt:formatNumber value="${productPrice}" type="number"/>원
								</strong></p>
							</div>
                            
                            <div class="basket-delete">
								<img src="${pageContext.request.contextPath}/resources/images/X버튼.png" alt="삭제 버튼" data-productid="${product.product.productId}" class="delete-icon" style="width: 30px; height: 30px;">
                            </div>
                            
                       	</div>
                    </div>
				</c:forEach>
            </div>
            <button class="scroll-btn-up" onclick="scrollToTop()"></button>

        </div>

        <!-- 결제 정보 창 -->
        <div class="payment-info">
            <h2>결제정보</h2>
            <div id="payment-info-body">
                <div class="payment-info-body-content1">
                    <div class="orderPrice">
                        <span>총 주문 금액 &nbsp;</span><span id="sumPrice">0원</span>
                    </div>
                    <div class="delivery">
                        <span>배송비 </span><span id="deliveryPrice">2,500 원</span>
                    </div>
                </div>
                <div class="divider"></div>

                <div class="payment-info-body-content1">
                    <div class="totalPrice" id="sum_p_price">
                        <span>총 결제 금액 &nbsp;</span><span id="totalPrice-num">0</span> 원
                    </div>
                    <div id="goOrder" class="">
                        <!-- 주문버튼 -->
                        <div class="clear"></div>
                        <div id="product-order">
                            <button id="order-button" >선택 상품 주문</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--<div id="footer"></div>  공통 footer 삽입 -->
    <%@ include file="/WEB-INF/views/common/footer.jsp"%>
    
    <script src="${pageContext.request.contextPath}/resources/js/order/basket.js"></script> 
</body>

</html>