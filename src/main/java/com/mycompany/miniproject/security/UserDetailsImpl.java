package com.mycompany.miniproject.security;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.mycompany.miniproject.dto.UserDto;

import lombok.extern.slf4j.Slf4j;
@Slf4j
public class UserDetailsImpl extends User{	//User가 UserDetail를 구현해서 정보를 가지고 있음
	
	private UserDto user;
	
	public UserDetailsImpl(UserDto user, List<GrantedAuthority> authorities) {
		super(user.getUserId(), 
				user.getUserPw(),
				user.isUserEnable(),
				true, true, true,
				authorities);	// authorities: 사용자의 권한(role)정보가 들어있음
		this.user = user;
	}
	
	public UserDto getMember() {
		return user;
	}
	
	public String getPassword() {
		log.info("패스워드를 가지고 오겠습니다.");
        return super.getPassword();  
	}
	
}
