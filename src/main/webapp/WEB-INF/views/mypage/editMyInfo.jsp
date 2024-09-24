<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<div class="mypage-myinfo-title">개인정보 수정</div>
<div class="myinfo-list">
	<form method="post" action="updateUser" name="formInfo">
		<div class="myinfo-id">
			<span><label for="userId">아이디</label></span>
			<span><input type="text" id="userId" name="userId" value="${user.userId}" readonly></span>
		</div>
		<div class="myinfo-name">
			<span><label for="userName">이름</label></span>
			<span><input type="text" id="userName" name="userName" value="${user.userName}" required></span>
		</div>
		<div class="myinfo-phone">
			<span><label for="userTel">전화번호</label></span>
			<span><input type="text" id="userTel" name="userTel" value="${user.userTel}" required></span>
		</div>
		<div class="myinfo-zipcode">
			<span><label for=userPostal>우편번호</label></span>
			<span><input class="input input8" type="text" name="userPostal"
				value="${user.userPostal }" required></span>
		</div>
		<div class="btnZip">
			<button id="btnZipcode" class="btn btn2" type="button">우편번호 찾기</button>
		</div>
		<div class="myinfo-address">
			<span><label for="userLoadAddress">주소</label></span>
			<span><input name="userLoadAddress" type="text"  value="${user.userLoadAddress}" required></span> 
		</div>
		<div class="myinfo-detail-address">
			<span><label for="userDetailAddress">상세 주소</label></span>
			<span><input name="userDetailAddress" type="text"  value="${user.userDetailAddress}" required></span> 
		</div>
		<div class="myinfo-email">
			<span><label for="userEmail">이메일</label></span>
			<span><input id="userEmail" name="userEmail" type="text" value="${user.userEmail}" required></span>
		</div>
		<div class="myinfo-password">
			<span><label for="userPw">비밀번호</label></span>
			<span><input id="userPw" name="userPw" type="password" value=""></span>
		</div>
		<div id="inputPasswordMessage1"></div>
		<div class="myinfo-password-check">
			<span><label for="userPwCheck">비밀번호 확인</label></span>
			<span><input id="userPwCheck" name="userPwCheck" type="password" value=""></span>
		</div>
		<div id="inputPasswordMessage2"></div>
		<div class="myinfo-edit">
			<button type=submit class="myinfo-edit-btn">개인정보 수정</button>
		</div>
	</form>
</div>