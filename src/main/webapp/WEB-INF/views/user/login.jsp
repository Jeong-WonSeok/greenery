<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>로그인</title>
<link
	href="${pageContext.request.contextPath}/resources/css/user/login.css"
	rel="stylesheet" type="text/css" />
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>

	<div class="container-login">
		<h2 class="text-login">로그인</h2>
		<a href="${pageContext.request.contextPath}"> 
		<img id="IconClose" class="icon-close"
			src="${pageContext.request.contextPath}/resources/images/xIcon.png">
		</a>
	</div>

	<div class="text-introduce">그리너리의 다양한 서비스와 혜택을 누리세요</div>

	<div class="container-form1">
		<div class="container-form2">
		
			<form method="post" action="${pageContext.request.contextPath}/login">

				<%--	스프링 시큐리티 hidden속성
	       		<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
	       		--%>

				<input id="inputId" class="input-idpassword" type="text"
					name="userId" placeholder="아이디 입력" required><br>
				<div id="inputIdMessage"></div>

				<input id="inputPassword1" class="input-idpassword" type="password"
					name="userPassword" placeholder="비밀번호 입력(영문, 숫자, 특수문자 조합)" required><br>
				<div id="inputPasswordMessage1"></div>

				<!-- <input id="btnLogin" class="btn-login" type="submit" value="로그인"> -->
				<button type="submit" id="btnLogin" class="btn-login">로그인</button>
			</form>
			
			<div id="boxSignup" class="box-signup">
				<div>아직 회원이 아니신가요?</div>
				<div>
					<a href="${pageContext.request.contextPath}/user/signup">회원가입</a>
					<img src="${pageContext.request.contextPath}/resources/images/arrowIcon.png">
				</div>
			</div>
			
		</div>
	</div>



	<script src="login.js"></script>
</body>

</html>