package com.mycompany.miniproject.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/product")
public class ProductController {

	@RequestMapping("/detail-info")
	public String detailInfo() {
		return "product/detail-info";
	}
	
	@RequestMapping("/detailpage")
	public String detailpage() {
		return "product/detailpage";
	}
	
	@RequestMapping("/reviews-select")
	public String reviewsSelect() {
		return "product/reviews-select";
	}
	
	@RequestMapping("/search")
	public String search() {
		return "product/search";
	}
}
