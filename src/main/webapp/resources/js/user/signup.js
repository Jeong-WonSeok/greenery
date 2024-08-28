
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

let inputEmail = document.querySelector('#inputEmail')
inputEmail.addEventListener('input', inputEmailCheck);

function inputEmailCheck() {
    let inputEmailMessage = document.querySelector('#inputEmailMessage')

    let regExp = RegExp(/^@{1,}$/);
    if (regExp.test(inputEmail.value) || inputEmail.value === '') {
        inputEmailMessage.innerHTML =  ''; 
    } else {
        inputEmailMessage.innerHTML = 
        "<span style='color:#F03F40; font-size:12px;'>이메일 입력을 확인해주세요</span>";
    }
}

let idCheck = false;
let btnInputId = document.querySelector('#btnInputId');
btnInputId.addEventListener('click', btnInputIdCheck);

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
        alert("회원가입이 가능한 아이디입니다");
        idCheck = true;
    }
}

let btnZipcode = document.querySelector('#btnZipcode');
btnZipcode.addEventListener('click', () => {
        new daum.Postcode({
            oncomplete: function(data) {
                console.log(data)
                let fullAddr = '';
                let extraAddr = '';

                if (data.userSelectedType === 'R') {
                    fullAddr = data.roadAddress;
                } else {
                    fullAddr = data.jibunAddress;
                }

                if (data.userSelectedType = 'R') {
                    if(data.bname !== '') {
                        extraAddr += data.bname
                    }
                    if (data.buildingName !== '') {
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    fullAddr += (extraAddr !== '' ? '(' + extraAddr + ')' : '');
                }

                document.formSignup.zipcode.value = data.zonecode;
                document.formSignup.address1.value = fullAddr;
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
                // 예제를 참고하여 다양한 활용법을 확인해 보세요.
            }
        }).open();
    }
);

document.querySelector('#iconClose').addEventListener('click', function() {
    window.location.href = '../main/main.html';
})


