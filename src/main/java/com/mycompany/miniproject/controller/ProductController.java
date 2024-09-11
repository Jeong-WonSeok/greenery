package com.mycompany.miniproject.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mycompany.miniproject.dto.ProductDto;
import com.mycompany.miniproject.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/product")
public class ProductController {

	@Autowired
	private ProductService productService;
	
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
	
	@GetMapping("/category")
	public String category(String category, 
						@RequestParam(defaultValue="default") String sort, 
						Model model) {
		List<ProductDto> productList = productService.getProductCategory(category, sort);
		model.addAttribute("productList", productList);
		return "product/search";
	}
}
