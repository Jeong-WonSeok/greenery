package com.mycompany.miniproject.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/order")
public class OrderController {
	
	@RequestMapping("/basket")
	public String basket() {
		return "order/basket";
	}
	
	@RequestMapping("/order")
	public String order() {
		return "order/order";
	}
	
	@RequestMapping("/payment")
	public String payment() {
		return "order/payment";
	}
}
