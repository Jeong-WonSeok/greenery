package com.mycompany.miniproject.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mycompany.miniproject.dto.ProductDto;
import com.mycompany.miniproject.dto.ReviewDto;
import com.mycompany.miniproject.service.ProductService;
import com.mycompany.miniproject.service.ReviewService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/product")
public class ProductController {

	@Autowired
	private ProductService productService;
	@Autowired
	private ReviewService reviewService;
	
	@RequestMapping("/detailInfo")
	public String detailInfo(String productId, Model model) {
		model.addAttribute("productId", productId);
		return "product/detail-info";
	}
	
	@GetMapping("/detailpage")
	public String detailpage(int productId, Model model) {
		ProductDto product = productService.getProduct(productId);
		model.addAttribute("product", product);
		return "product/detailpage";
	}
	
	@RequestMapping("/reviewSelect")
	public String reviewSelect(int productId, Model model) {
		List<ReviewDto> productReviews = reviewService.getReviewList(productId);
		model.addAttribute("productReviews", productReviews);
		return "product/reviews-select";
	}
	
	@RequestMapping("/search")
	public String search(String query, 
			@RequestParam(defaultValue="default") String sort, 
			Model model) {
		List<ProductDto> productList = productService.getProductSearch(query, sort);
		model.addAttribute("query", query);
		model.addAttribute("productList", productList);
		model.addAttribute("sort", sort);
		model.addAttribute("totalProducts", productList.size());
		return "product/search";
	}
	
	@GetMapping("/category")
	public String category(String category, 
						@RequestParam(defaultValue="default") String sort, 
						Model model) {
		List<ProductDto> productList = productService.getProductCategory(category, sort);
		model.addAttribute("productList", productList);
		model.addAttribute("category", category);
		model.addAttribute("sort", sort);
		model.addAttribute("totalProducts", productList.size());
		return "product/search";
	}
}
