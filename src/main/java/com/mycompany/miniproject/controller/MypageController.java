package com.mycompany.miniproject.controller;
import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.mycompany.miniproject.dto.OrderDetailDto;
import com.mycompany.miniproject.dto.OrderDto;
import com.mycompany.miniproject.dto.OrderItemDto;
import com.mycompany.miniproject.dto.ProductDto;
import com.mycompany.miniproject.dto.ProductImageDto;
import com.mycompany.miniproject.dto.ReviewDto;
import com.mycompany.miniproject.dto.ReviewFormDto;
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
				ReviewDto reviewDto = reviewService.getReview(orderId, userId, productId);
				
				if(reviewDto != null) 
					orderDetail.setReviewEnable(reviewDto.isReviewEnable());
				else 
					orderDetail.setReviewEnable(false);
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
	
/*	@RequestMapping("/reviews")
	public String reviews() {
		return "mypage/reviews";
	}
*/	
	@PostMapping("/updateReview")
	public ResponseEntity<String> updateReview(ReviewFormDto reviewFormDto, Authentication authentication) throws IOException {
		log.info("실행");
		ReviewDto reviewDto = new ReviewDto();
		String userId = authentication.getName();
		
		MultipartFile reviewImage = reviewFormDto.getReviewImage();
		
		if(reviewImage != null) {
			reviewDto.setReviewImageName(reviewImage.getOriginalFilename());
			reviewDto.setReviewImageData(reviewImage.getBytes());
			reviewDto.setReviewImageType(reviewImage.getContentType());			
		}
		
		reviewDto.setReviewContent(reviewFormDto.getReviewContent());
		reviewDto.setReviewScore(reviewFormDto.getReviewScore());
		reviewDto.setOrderId(reviewFormDto.getOrderId());
		reviewDto.setProductId(reviewFormDto.getProductId());
		reviewDto.setUserId(userId);
		reviewDto.setOrderId(reviewDto.getOrderId());
		reviewDto.setProductId(reviewFormDto.getProductId());
		
		reviewService.updateReview(reviewDto);
		
		return ResponseEntity.ok("OK");
	}
	
	@GetMapping("/reviewDetail")
	public ResponseEntity<ReviewDto> reviewDetail(int productId, int orderId, Authentication authentication, Model model){
		String userId = authentication.getName();
		ReviewDto reviewDto = reviewService.getReview(orderId, userId, productId);
		model.addAttribute("review", reviewDto);
		return ResponseEntity.ok(reviewDto);
	}
	
	@GetMapping("/imageDown")
	public void imageDown(int productId, int orderId, Authentication authentication,
					HttpServletResponse response) throws Exception{
		
		String userId = authentication.getName();
		ReviewDto reviewImage = reviewService.getReview(orderId, userId, productId);
		if(reviewImage != null) {
		//응답 헤더에 들어가는 Content-Type
			String contentType = reviewImage.getReviewImageType();
			response.setContentType(contentType);		
			
			//응답 본문에 파일 데이터를 출력
			OutputStream out = response.getOutputStream();
			out.write(reviewImage.getReviewImageData());
			out.flush();
			out.close();
		}
	}
	
}
