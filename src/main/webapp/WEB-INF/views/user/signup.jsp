<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원가입</title>
    <link href="${pageContext.request.contextPath}/resources/css/user/signup.css" rel="stylesheet" type="text/css" />
    
    <!-- <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script> -->
    <%-- <link href="${pageContext.request.contextPath}/resources/bootstrap/bootstrap.min.css" rel="stylesheet">
	<script src="${pageContext.request.contextPath}/resources/bootstrap/bootstrap.bundle.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/jquery/jquery.min.js"></script> --%>
</head>

<body>

    <div class="container-signup">
        <h2>회원가입</h2>
        <img id="iconClose" class="icon-close" src="${pageContext.request.contextPath}/resources/images/xIcon.png">
    </div>

    <div class="text-introduce">그리너리 회원이 되어 다양한 혜택을 경험해 보세요!</div>

    <form class="form-signup" name="formSignup" action="/user/signup" method="post">
    
	    <div class="form-id">
	        <input id="inputId" name="greeneryId" class="input input1" type="text" placeholder="아이디 입력(6-20자)" required>
	        <button id="btnInputId" class="btn btn1" type="button">중복확인</button>
	    </div>
	    <div id="inputIdMessage"></div>
	
	    <input id="inputPassword1" name="password" class="input input2" type="password" placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8-20자)" required>
	    <div id="inputPasswordMessage1"></div>
	    <input id="inputPassword2" name="passwordConfirm" class="input input3" type="password" placeholder="비밀번호 재입력" required>
	    <div id="inputPasswordMessage2"></div>
	    <input id="inputName" name="name" class="input input4" type="text" placeholder="이름을 입력해주세요." required>
	    <div id="inputNameMessage"></div>
	    <input id="inputPhone" name="phone" class="input input5" type="text" placeholder="휴대폰 번호 입력('-'제외 11자리 입력)" required>
	    <div id="inputPhoneMessage"></div>
	
	    <div class="form-email">
	        <input id="inputEmailAddress" name="emailAddress" class="input input6" type="text" placeholder="이메일주소" required>
	        <input id="inputEmail" name="emailDomain" class="input input6" type="text" placeholder="@" required>
	    </div>
	    <div id="inputEmailMessage"></div>
	
	    <div class="form-address">
	        <input class="input input8" type="text" name="zipcode" placeholder="우편번호" required>
	        <button id="btnZipcode" class="btn btn2" type="button">우편번호 찾기</button>
	    </div>
	
	    <input class="input input9" name="address1" type="text" placeholder="도로명 주소" required>
	    <input class="input input10" name="address2" type="text" placeholder="상세 주소" required>
	
	    <input class="btn btn3" type="submit" value="회원가입">
</form>


    <script src="${pageContext.request.contextPath}/resources/js/user/signup.js"></script>
</body>

</html>