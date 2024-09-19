<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <title>주문완료 페이지</title>

  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/order/order.css">
</head>

<body>
  <!-- <div id="header"></div> -->
  <!-- 공통 헤더(상단바) 삽입 -->
  <%@ include file="/WEB-INF/views/common/header.jsp"%>

  <div class="container">
    <div class="order">
      <img src="${pageContext.request.contextPath}/resources/images/checkout-icon.png" alt="order" class="order-icon">
    </div>
    <div class="finish">
      <p class="order-complete">고객님의 주문이 완료 되었습니다.</p>
      <p class="order-info">주문내역 및 배송에 관한 안내는 주문조회를 통하여 확인 가능합니다.</p>
      <div class="ordernum">주문번호: <strong style="color: black">${orderId}</strong></div>
    </div>
  </div>

  <div id="footer"></div>
  <!-- 푸터를 삽입할 위치 -->
  <%@ include file="/WEB-INF/views/common/footer.jsp"%>

  

</body>

</html>