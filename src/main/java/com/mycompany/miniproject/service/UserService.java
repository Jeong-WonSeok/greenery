package com.mycompany.miniproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mycompany.miniproject.dao.UserDao;
import com.mycompany.miniproject.dto.UserDto;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {

	@Autowired
	private UserDao userDao;
	
	// 회원가입 enum
	public enum JoinResult {
		SUCCESS, 
		FAIL_DUPLICATED_ID
	}
	// 로그인 enum
	public enum LoginResult{
		SUCCESS,
		FAIL_ID,
		FAIL_PASSWORD,
		FAIL_ENABLED
	}

	// 회원가입 
	public JoinResult join(UserDto user) {
		
		/*boolean existId = isUserId(user.getUserId());
		if(existId) {			// 가입한 회원이 이미 있으면 회원가입은 fail.
			return JoinResult.FAIL_DUPLICATED_ID;
		}*/
		userDao.insert(user);
		return JoinResult.SUCCESS;
	}
	
	// 아이디 중복 체크
	public boolean isUserId(String userId) {
		UserDto user = userDao.selectById(userId);
		if (user == null) {
			return false;
		} else {
			return true;
		}
	}
	// 로그인
	public LoginResult login(UserDto user) {
		UserDto dbUser = userDao.selectById(user.getUserId());
		
		if(dbUser == null) {
			return LoginResult.FAIL_ID;
		}
		if(!dbUser.isUserEnable()) {
			return LoginResult.FAIL_ENABLED;
		}
		if(!dbUser.getUserPw().equals(user.getUserPw())) {
			return LoginResult.FAIL_PASSWORD;
		}
		return LoginResult.SUCCESS;
	}
	
	// 로그아웃
	public void logout(String userId) {
		
	}

	public void useCoupon(String userId) {
		userDao.updateCouponByUsing(userId);
	}
	
	public int getCouponNum(String userId) {
		int result = userDao.selectUserCoupon(userId);
		return result;
		
	}
	/*// UserId 가져오기
	public UserDto selectUserId(UserDto user) {
		UserDto userId = userDao.selectById(user.getUserId());
		return userId;
	}*/

	public void updateUser(UserDto userDto) {
		userDao.updateUser(userDto);
		
	}

	public void giveCoupon(String userId) {
		log.info(userDao.updateCouponByGiving(userId)+" ");		
	}

}
