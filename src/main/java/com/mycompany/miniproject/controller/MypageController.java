package com.mycompany.miniproject.controller;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mycompany.miniproject.dto.OrderDetailDto;
import com.mycompany.miniproject.dto.OrderDto;
import com.mycompany.miniproject.dto.OrderItemDto;
import com.mycompany.miniproject.dto.ProductDto;
import com.mycompany.miniproject.dto.ReviewDto;
import com.mycompany.miniproject.service.OrderService;
import com.mycompany.miniproject.service.ProductService;
import com.mycompany.miniproject.service.ReviewService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/mypage")
public class MypageController {
	
	@Autowired
	OrderService orderService;
	@Autowired
	ProductService productService;
	@Autowired
	ReviewService reviewService;
	
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
	
	@GetMapping("/orderList")
	public String orderList(Authentication authentication, Model model) throws ParseException {
		String userId = authentication.getName();
		List<OrderDto> orderList = orderService.getOrderList(userId);
		List<OrderDetailDto> orderDetailList = new ArrayList<>();
		
		for(OrderDto orderDto : orderList) {
			int orderId = orderDto.getOrderId();
			List<OrderItemDto> orderItemList = orderService.getOrderItem(orderId);
			for(OrderItemDto orderItemDto : orderItemList) {
				int productId = orderItemDto.getProductId();
				
				ProductDto productDto = productService.getProduct(productId); 
				OrderDetailDto orderDetail = new OrderDetailDto();
				
				orderDetail.setOrderId(orderId);
				orderDetail.setUserId(userId);
				orderDetail.setCreatedAt(orderDto.getCreatedAt());
				orderDetail.setProductName(productDto.getProductName());
				orderDetail.setProductId(productId);
				orderDetail.setProductPrice(orderItemDto.getProductPrice());
				orderDetail.setProductQty(orderItemDto.getProductQty());
				orderDetail.setSummaryDescription(productDto.getSummaryDescription());
				orderDetail.setOrderState(orderItemDto.getOrderState());
				
				orderDetailList.add(orderDetail);
			}
		}
		model.addAttribute("orderList", orderDetailList);
		return "mypage/orderList";
	}
	
	@RequestMapping("/reviews")
	public String reviews() {
		return "mypage/reviews";
	}
	
	@GetMapping("/reviewDetail")
	public String reviewDetail(int productId, int orderId, Authentication authentication) {
		String userId = authentication.getName();
		ReviewDto reviewDto = reviewService.getReview(orderId, userId, productId);
		return null;
	}
	
	
}
