package com.mycompany.miniproject.dto;

import lombok.Data;

@Data
public class SignUpFormDto {
	
	private String greeneryId;          // inputId
    private String password;             // inputPassword1
    private String passwordConfirm;      // inputPassword2	비밀번호 재확인
    private String name;                 // inputName
    private String phone;                // inputPhone
    private String emailAddress;         // inputEmailAddress
    private String emailDomain;          // inputEmail		도메인 주소-naver.com 
    private String zipcode;              // name="zipcode"	우편번호
    private String address1;             // name="address1"	도로명주소
    private String address2;             // name="address2" 상세주소
}
