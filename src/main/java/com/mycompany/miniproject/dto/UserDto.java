package com.mycompany.miniproject.dto;

import java.util.Date;

import lombok.Data;

@Data
public class UserDto {
	private String userId;
    private String userPw;    
    private String userName;        
    private String userTel;         
    private String userEmail;       
    private int userPostal;       
    private String userLoadAddress; 
    private String userDetailAddress;
    private int userCoupon;
    private Date createdAt;
    private String userRole;
    private boolean userEnable;
}
