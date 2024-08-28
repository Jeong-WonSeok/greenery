<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <title>주문완료 페이지</title>

  <link rel="stylesheet" href="order.css">
</head>

<body>
  <div id="header"></div>
  <!-- 공통 헤더(상단바) 삽입 -->

  <div class="container">
    <div class="order">
      <img src="../../res/images/checkout-icon.png" alt="order" class="order-icon">
    </div>
    <div class="finish">
      <p class="order-complete">고객님의 주문이 완료 되었습니다.</p>
      <p class="order-info">주문내역 및 배송에 관한 안내는 주문조회를 통하여 확인 가능합니다.</p>
      <div class="ordernum">주문번호: <strong style="color: black">2020202020</strong></div>
    </div>
  </div>

  <div id="footer"></div>
  <!-- 푸터를 삽입할 위치 -->

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      $("#header").load("../header/header.html");
      $("#footer").load("../footer/footer.html");
    });
  </script>

</body>

</html>