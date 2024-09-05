package com.mycompany.miniproject.controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mycompany.miniproject.dto.SignUpFormDto;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/user")
public class UserController {
	
	
	@RequestMapping("/login")
	public String login() {
		return "user/login";
	}
	
	
	@GetMapping("/signupForm")
	public String signupForm() {
		return "user/signup";	//뷰(회원가입)를 가져옴
	}
	
	@PostMapping("/signup")
	public String signup(SignUpFormDto dto) {
		
		log.info("greeneryId: " + dto.getGreeneryId());
		log.info("password: " + dto.getPassword());
		log.info("passwordConfirm: " + dto.getPasswordConfirm());
		log.info("name: " + dto.getName());
		log.info("phone: " + dto.getPhone());
		log.info("emailAddress: " + dto.getEmailAddress());
		log.info("emailDomain: " + dto.getEmailDomain());
		log.info("zipcode: " + dto.getZipcode());
		log.info("address1: " + dto.getAddress1());
		log.info("address2: " + dto.getAddress2());
		
		//return "user/signup";
		return "redirect:/main";
	}

}
