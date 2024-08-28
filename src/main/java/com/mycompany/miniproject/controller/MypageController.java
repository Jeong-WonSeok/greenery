package com.mycompany.miniproject.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/mypage")
public class MypageController {

	@RequestMapping("/editMyInfo")
	public String editMyInfo() {
		return "mypage/editMyInfo";
	}
	
	@RequestMapping("/likedProducts")
	public String likedProducts() {
		return "mypage/likedProducts";
	}

	@RequestMapping("/mypage")
	public String mypage() {
		return "mypage/mypage";
	}
	
	@RequestMapping("/orderList")
	public String orderList() {
		return "mypage/orderList";
	}
	
	@RequestMapping("/reviews")
	public String reviews() {
		return "mypage/reviews";
	}
	
	
}
