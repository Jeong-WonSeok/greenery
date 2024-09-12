
let inputId = document.querySelector('#inputId');
inputId.addEventListener('input', inputIdCheck);

function inputIdCheck() {
    let inputIdMessage = document.querySelector('#inputIdMessage');

    let regExp = RegExp(/^[A-Za-z\d@$!%*?&]{6,16}$/);
    if (regExp.test(inputId.value) || inputId.value === '') {
        inputIdMessage.innerHTML =  ''; 
    } else {
        inputIdMessage.innerHTML = 
        "<span style='color:#F03F40; font-size:12px;'>6자 이상 16자 이하로 영문, 숫자, 특수문자를 사용해주세요</span>";
    }
}

let inputPassword1 = document.querySelector('#inputPassword1');
let inputPassword2 = document.querySelector('#inputPassword2');
inputPassword1.addEventListener('input', inputPasswordCheck);
inputPassword2.addEventListener('input', inputPasswordCheck);

function inputPasswordCheck() {
    let inputPasswordMessage1 = document.querySelector('#inputPasswordMessage1');
    let inputPasswordMessage2 = document.querySelector('#inputPasswordMessage2');

    let regExp = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/);
    if (regExp.test(inputPassword1.value) || inputPassword1.value === '') {
        inputPasswordMessage1.innerHTML =  ''; 
    } else {
        inputPasswordMessage1.innerHTML = 
        "<span style='color:#F03F40; font-size:12px;'>6자 이상 20자 이하의 대소문자, 숫자, 특수문자를 조합해주세요</span>";
    }
    
    if (document.activeElement === inputPassword2) {
        if (inputPassword1.value === inputPassword2.value || inputPassword2.value === '') {
            inputPasswordMessage2.innerHTML =  '';
        } else {
            inputPasswordMessage2.innerHTML =
            "<span style='color:#F03F40; font-size:12px;'>비밀번호를 확인해주세요</span>";
        }
    }
}

let inputName = document.querySelector('#inputName');
inputName.addEventListener('input', inputNameCheck);

function inputNameCheck() {
    let inputNameMessage = document.querySelector('#inputNameMessage');

    let regExp = RegExp(/^[가-힣a-zA-Z]{1,20}$/);
    if (regExp.test(inputName.value) || inputName.value === '') {
        inputNameMessage.innerHTML =  ''; 
    } else {
        inputNameMessage.innerHTML = 
        "<span style='color:#F03F40; font-size:12px;'>영문 또는 한글로 입력해주세요</span>";
    }
}

let inputPhone = document.querySelector('#inputPhone');
inputPhone.addEventListener('input', inputPhoneCheck);

function inputPhoneCheck() {
    let inputPhoneMessage = document.querySelector('#inputPhoneMessage');

    let regExp = RegExp(/^[0-9]{1,11}$/);
    if (regExp.test(inputPhone.value) || inputPhone.value === '') {
        inputPhoneMessage.innerHTML =  ''; 
    } else {
        inputPhoneMessage.innerHTML = 
        "<span style='color:#F03F40; font-size:12px;'>-하이픈을 제외하고 핸드폰 번호를 입력해주세요</span>";
    }
}

$(document).ready(function() {
    // 이메일 주소와 도메인 입력 필드 선택
    $('#inputEmailAddress, #inputEmail').on('input', function() {
        // 입력값 가져오기
        let emailAddress = $('#inputEmailAddress').val();
        let emailDomain = $('#inputEmail').val();
        let inputEmailMessage = $('#inputEmailMessage');
        
        // 이메일 주소와 도메인 결합
        let fullEmail = emailAddress + emailDomain;

        // 이메일 형식을 검증하는 정규 표현식
        let regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // 전체 이메일 형식 검사
        if (regExp.test(fullEmail) || fullEmail === '') {
            // 이메일 형식이 올바르거나 입력이 비어있으면 메시지 지우기
            inputEmailMessage.html('');
        } else {
            // 이메일 형식이 올바르지 않으면 오류 메시지 표시
            inputEmailMessage.html(
                "<span style='color:#F03F40; font-size:12px;'>이메일 형식을 확인해주세요</span>"
            );
        }
    });
});

let idCheck = false;
let btnInputId = document.querySelector('#btnInputId');
btnInputId.addEventListener('click', btnInputIdCheck);
						// 아이디 중복 확인 ---------------------------------
function btnInputIdCheck() {
    let regExp = RegExp(/^[A-Za-z\d@$!%*?&]{6,16}$/);
 
    if(inputId.value == "") {
        alert('아이디를 입력해주세요.');
        inputId.focus();
    } else if(!regExp.test(inputId.value)) {
        alert("6자 이상 16자 이하로 영문, 숫자, 특수문자를 사용해주세요");
        inputId.value = '';
        inputId.focus();
    } else {
    	checkIdExists(inputId.value);
    }
}

    
//아이디 중복 체크 함수
function checkIdExists(userId) {
	 fetch('checkId', {
	     method: 'POST',
	     headers: {
	         'Content-Type': 'application/json',
	     },
	     body: JSON.stringify({"userId" : userId})
	 })
	 .then(response => response.json())
	 .then(data => {
		 console.log(data);
	     if (data.exists) {
	         alert("이미 사용 중인 아이디입니다.");
	         idCheck = false; // 중복된 아이디
	     } else {
	         alert("사용 가능한 아이디입니다.");
	         idCheck = true; // 중복되지 않은 아이디
	     }
	 });
}

//회원가입 버튼 클릭 시 실행되는 함수
let signupGo = document.querySelector('#signupGo');
signupGo.addEventListener('click', function (e) {

	 if (!idCheck) {
		 e.preventDefault();
	     alert("아이디 중복 체크를 먼저 해주세요.");
	     return; // 아이디 중복 체크가 완료되지 않으면 회원가입을 진행하지 않음
	 }
	
//	 fetch('signup', {
//	     method: 'POST',
//	     headers: {
//	         'Content-Type': 'application/json',
//	     },
//	     body: JSON.stringify(user)
//	 })
//	 .then(response => {
//	     if (!response.ok) {
//	         return response.json().then(data => { throw new Error(data.message); });
//	     }
//	     return response.json();
//	 })
//	 .then(data => {
//	     alert(data.message); // "회원가입이 완료되었습니다."
//	     window.location.href = '/user/login'; // 회원가입 완료 후 로그인 페이지로 이동
//	 });
});


// 우편번호 API
let btnZipcode = document.querySelector('#btnZipcode');
btnZipcode.addEventListener('click', () => {
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

            document.formSignup.userPostal.value = data.zonecode;
            document.formSignup.userLoadAddress.value = fullAddr;
            
        }
    }).open();
});


document.querySelector('#iconClose').addEventListener('click', function() {
    window.location.href = '../main/main.html';
})


