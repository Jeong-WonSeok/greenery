
document.addEventListener('input', function() {
	
	if(event.target.matches("#userPw") || event.target.matches("#userPwCheck")){
		console.log("password check")
		inputPasswordCheck();
	}
	if(event.target.matches("#userName")){
		console.log("name check")
		inputNameCheck();
	}
	if(event.target.matches("#userTel")){
		console.log("tel check")
		inputPhoneCheck();
	}
	if(event.target.matches("#userEmail")){
		console.log("email check")
		inputEmailCheck();
	}
})
//inputPassword1.addEventListener('input', inputPasswordCheck);
//inputPassword2.addEventListener('input', inputPasswordCheck);

function inputPasswordCheck() {
	let inputPassword1 = document.querySelector('#userPw');
	let inputPassword2 = document.querySelector('#userPwCheck');
	let inputPasswordMessage1 = document.querySelector('#inputPasswordMessage1');
	let inputPasswordMessage2 = document.querySelector('#inputPasswordMessage2');
	
	let regExp = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/);
	if (regExp.test(inputPassword1.value) || inputPassword1.value === '') {
		inputPasswordMessage1.style.display = 'none';
		validCheck = true;
	} else {
	    inputPasswordMessage1.innerHTML = 
	    "<span style='color:#F03F40; font-size:11px;'>6자 이상 20자 이하의 대소문자, 숫자, 특수문자를 조합해주세요</span>";
	    inputPasswordMessage1.styledisplay = 'block';
	    validCheck = false;
	}
	 
	if (document.activeElement === inputPassword2) {
		if (inputPassword1.value === inputPassword2.value || inputPassword2.value === '') {
	        inputPasswordMessage2.style.display = 'none';
	        validCheck = true;
	    } else {
	        inputPasswordMessage2.innerHTML =
	        "<span style='color:#F03F40; font-size:11px;'>비밀번호를 확인해주세요</span>";
	        inputPasswordMessage2.styledisplay = 'block';
	        validCheck = false;
	    }
	}
}

//우편번호 API
document.addEventListener('click', () => {
	if(event.target.matches('#btnZipcode')){
	    new daum.Postcode({
	        oncomplete: function(data) {
	            console.log(data);
	            let fullAddr = '';
	            let extraAddr = '';
	
	            if (data.userSelectedType === 'R') {
	                fullAddr = data.roadAddress;
	            } else {
	                fullAddr = data.jibunAddress;
	            }
	
	            if (data.userSelectedType = 'R') {
	                if (data.bname !== '') {
	                    extraAddr += data.bname;
	                }
	                if (data.buildingName !== '') {
	                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	                }
	                fullAddr += (extraAddr !== '' ? '(' + extraAddr + ')' : '');
	            }
	
	            document.formInfo.userPostal.value = data.zonecode;
	            document.formInfo.userLoadAddress.value = fullAddr;
	            
	        }
	    }).open();
	}
});

function inputNameCheck() {
    let inputNameMessage = document.querySelector('.name-message');
    let inputName = $('#userName').val();
    console.log(inputName.length);
    let regExp = RegExp(/^[가-힣a-zA-Z]+$/);
    if (!regExp.test(inputName)) {
    	inputNameMessage.innerHTML= "<span style='color:#F03F40; font-size:12px;'>영문 또는 한글로 입력해주세요</span>";
    	inputNameMessage.style.display = 'block';
    	validCheck = false;
    } else if(inputName.length > 20){
    	inputNameMessage.innerHTML= "<span style='color:#F03F40; font-size:12px;'>20자 이내로 작성해 주세요 입력해주세요</span>";
    	inputNameMessage.style.display = 'block'; 
    	validCheck = false;
    } else {
    	inputNameMessage.style.display = 'none';
    	validCheck = true;
    }
}

function inputPhoneCheck() {
    let inputPhoneMessage = document.querySelector('.tel-message');
    let inputPhone = document.querySelector("#userTel");
    console.log(inputPhone.value);
    
    let regExp = RegExp(/^[0-9]{1,11}$/);
    if (!regExp.test(inputPhone.value)){
    	inputPhoneMessage.innerHTML = 
    		"<span style='color:#F03F40; font-size:12px;'>숫자만을 사용하여 핸드폰 번호를 입력해주세요</span>";
    	inputPhoneMessage.style.display = 'block';
    	validCheck = false;
    } else {
    	inputPhoneMessage.style.display = 'none';
    	validCheck = true;
    }
}

//function inputAdrressCheck

function inputEmailCheck() {
    // 입력값 가져오기
    let emailAddress = $('#userEmail').val();
    let inputEmailMessage = $('.email-message');
    

    // 이메일 형식을 검증하는 정규 표현식
    let regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 전체 이메일 형식 검사
    if (regExp.test(emailAddress) || emailAddress === '') {
        // 이메일 형식이 올바르거나 입력이 비어있으면 메시지 지우기
    	inputEmailMessage.css('display', 'none');
    	validCheck = true;
    } else {
        // 이메일 형식이 올바르지 않으면 오류 메시지 표시
        inputEmailMessage.html("<span style='color:#F03F40; font-size:12px;'>이메일 형식을 확인해주세요</span>");
        inputEmailMessage.css('display', 'block');
        validCheck = false;
    }
}

$(".myinfo-form").on('submit', function (e){
	if(!validCheck){
		console.log("chekc");
		$(".header-modal-title").html("수정 실패");
		$(".header-modal-body").html("형식에 맞춰서 입력해 주세요.");
		$("#headerModal").modal("show");
		return false;
	}
	
	return true;
})