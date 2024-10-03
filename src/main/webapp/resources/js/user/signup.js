
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

// 이름 유효성 검사
let inputName = document.querySelector('#inputName');
inputName.addEventListener('input', inputNameCheck);

function inputNameCheck() {
    let inputNameMessage = document.querySelector('#inputNameMessage');

    let regExp = RegExp(/^[가-힣a-zA-Z]{1,20}$/);
    if (regExp.test(inputName.value) || inputName.value === '') {
        inputNameMessage.innerHTML =  ''; 
        return true;
    } else {
        inputNameMessage.innerHTML = 
        "<span style='color:#F03F40; font-size:12px;'>영문 또는 한글로 입력해주세요</span>";
        return false;
    }
}

//핸드폰 번호 입력 유효성 검사 
let inputPhone = document.querySelector('#inputPhone');
inputPhone.addEventListener('input', inputPhoneCheck);

function inputPhoneCheck() {
    let inputPhoneMessage = document.querySelector('#inputPhoneMessage');

    let regExp = RegExp(/^[0-9]{1,11}$/);
    if (regExp.test(inputPhone.value) || inputPhone.value === '') {
        inputPhoneMessage.innerHTML =  ''; 
        return true;
    } else {
        inputPhoneMessage.innerHTML = 
        "<span style='color:#F03F40; font-size:12px;'>-하이픈을 제외하고 11자리로 입력해주세요</span>";
        return false;
    }
}

//이메일 유효성 검사
let inputEmail = document.querySelector('#inputEmailAddress');
inputEmail.addEventListener('input', inputEmailCheck);

function inputEmailCheck() {
    let inputEmailMessage = $('#inputEmailMessage');

    let regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 전체 이메일 형식 검사
    if (regExp.test(inputEmail.value) || inputEmail.value === '') {
        // 이메일 형식이 올바르거나 입력이 비어있으면 메시지 지우기
        inputEmailMessage.html('');
        return true;
    } else {
        // 이메일 형식이 올바르지 않으면 오류 메시지 표시
        inputEmailMessage.html(
            "<span style='color:#F03F40; font-size:12px;'>이메일 형식을 확인해주세요</span>"
        );
        return false;
    }
}

    

let idCheck = false;
let btnInputId = document.querySelector('#btnInputId');
btnInputId.addEventListener('click', btnInputIdCheck);
						// 아이디 중복 확인 ---------------------------------
function btnInputIdCheck() {
    let regExp = RegExp(/^[A-Za-z\d@$!%*?&]{6,16}$/);
 
    if(inputId.value == "") {
    	$(".modal-title").html("아이디 입력 실패");
    	$(".modal-body").html("아이디를 입력해주세요.");
		$("#headerModal").modal("show");
        inputId.focus();
    } else if(!regExp.test(inputId.value)) {
    	$(".modal-title").html("아이디 입력 실패");
		$(".modal-body").html("6자 이상 16자 이하로 영문, 숫자, 특수문자를 사용해주세요");
		$("#headerModal").modal("show");
        inputId.value = '';
        inputId.focus();
    } else {
    	checkIdExists(inputId.value);
    }
}

    
//CSRF 토큰 가져오기
const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
const csrfHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');

// 아이디 중복 체크 함수
function checkIdExists(userId) {
    fetch('checkId', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',  // 폼 데이터로 전송
//            [csrfHeader]: csrfToken  // CSRF 토큰 포함
        },
        body: new URLSearchParams({ "userId": userId })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.exists) {
			$(".modal-title").html("중복된 아이디");
			$(".modal-body").html("이미 사용 중인 아이디 입니다.");
			$("#headerModal").modal("show");
            idCheck = false; // 중복된 아이디
        } else {
			$(".modal-title").html("중복되지 않은 아이디");
			$(".modal-body").html("사용 가능한 아이디입니다.");
			$("#headerModal").modal("show");
            idCheck = true; // 중복되지 않은 아이디
        }
    });
}

//----------------회원가입 버튼 클릭 시 실행되는 함수-------------------------
let signupGo = document.querySelector('#signupGo');
signupGo.addEventListener('click', function (e) {

	 if (!idCheck) {
		 e.preventDefault();
		 $(".modal-title").html("회원가입 실패");
		 $(".modal-body").html("아이디 중복 체크를 완료해주세요.");
		 $("#headerModal").modal("show");
	     return; // 아이디 중복 체크가 완료되지 않으면 회원가입을 진행하지 않음
	 }
	 else if(!inputPhoneCheck()){
		e.preventDefault();
		$(".modal-title").html("회원가입 실패");
		$(".modal-body").html("핸드폰 번호 입력을 형식에 맞게 해주세요.");
		$("#headerModal").modal("show");
	    return; 
	 }
	 else if(!inputEmailCheck()){
		e.preventDefault();
		$(".modal-title").html("회원가입 실패");
		$(".modal-body").html("이메일 형식에 맞춰서 입력해주세요.");
		$("#headerModal").modal("show");
	    return;
	 }
	 else if(!inputNameCheck()){
			e.preventDefault();
			$(".modal-title").html("회원가입 실패");
			$(".modal-body").html("이름을 형식에 맞춰서 입력해주세요.");
			$("#headerModal").modal("show");
		    return;
	 }
	 
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


/*document.querySelector('#iconClose').addEventListener('click', function() {
    window.location.href = '../main/main.html';
});*/




