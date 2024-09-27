package com.mycompany.miniproject.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mycompany.miniproject.dto.UserDto;
import com.mycompany.miniproject.security.UserDetailsImpl;
import com.mycompany.miniproject.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/user")
public class UserController {
	
	@Autowired 
	private UserService userService;
	
	// 로그인 폼
	@RequestMapping("/login")
	public String login() {
		return "user/login";
	}
	
	//  ------- CSRF(비밀번호 암호화)--------
	// 회원가입 폼 
	@GetMapping("/signup")
	public String signupForm() {
		return "user/signup";	//뷰(회원가입)를 가져옴
	}
	// 회원가입 할 때 ID 중복 체크 
	@PostMapping("/checkId")
	@ResponseBody
	public ResponseEntity<Map<String, Boolean>> checkId(@RequestParam String userId) {
	    log.info("---------Id 중복체크 실행-------------");
	    boolean exists = userService.isUserId(userId); // 아이디 중복 확인

	    Map<String, Boolean> response = new HashMap<>();
	    response.put("exists", exists);
	    return ResponseEntity.ok(response); // 중복 여부를 JSON 형식으로 응답
	}
	
	// 회원가입 폼 post 데이터 보내기
	@PostMapping("/signup")
	public String signup(UserDto user, Model model) {
		log.info(user.toString());
		
		// 계정 활성화
		user.setUserEnable(true);
		// 비밀번호 암호화
		PasswordEncoder passwordEncoder =
				PasswordEncoderFactories.createDelegatingPasswordEncoder();	//패스워드를 암호화시킴
		user.setUserPw(passwordEncoder.encode(user.getUserPw()));
		
		userService.join(user);
		log.info("회원가입 완료" + user.toString());
		
		return "user/login";
	}
	
	@GetMapping("/giveCoupon")
	public ResponseEntity<String> giveCoupon(Authentication authentication){
		String userId = authentication.getName();
		userService.giveCoupon(userId);
		return ResponseEntity.ok("ok");
	}

}
