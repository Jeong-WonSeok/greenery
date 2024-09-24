package com.mycompany.miniproject.controller;
import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.mycompany.miniproject.dto.LikeDto;
import com.mycompany.miniproject.dto.OrderDetailDto;
import com.mycompany.miniproject.dto.OrderDto;
import com.mycompany.miniproject.dto.OrderItemDto;
import com.mycompany.miniproject.dto.ProductDto;
import com.mycompany.miniproject.dto.ReviewDto;
import com.mycompany.miniproject.dto.ReviewFormDto;
import com.mycompany.miniproject.dto.UserDto;
import com.mycompany.miniproject.security.UserDetailServiceImpl;
import com.mycompany.miniproject.security.UserDetailsImpl;
import com.mycompany.miniproject.service.LikeService;
import com.mycompany.miniproject.service.OrderService;
import com.mycompany.miniproject.service.ProductService;
import com.mycompany.miniproject.service.ReviewService;
import com.mycompany.miniproject.service.UserService;

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
	@Autowired
	UserService userService; 
	@Autowired
	UserDetailServiceImpl userDetailService;
	@Autowired
	LikeService likeService;
	
	@GetMapping("/editMyInfo")
	public String editMyInfo(Model model, Authentication authentication) {
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		UserDto userDto = userDetails.getMember();
		
		model.addAttribute("user", userDto);
		
		return "mypage/editMyInfo";
	}
	
	@PostMapping("/updateUser")
	public String updateUser(UserDto userDto, Model model, Authentication authentication) {
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		UserDto curUserDto = userDetails.getMember();
		log.info(userDto.toString());
		if(userDto.getUserPw() == null) {
			userDto.setUserPw(curUserDto.getUserPw());
		}else {
			PasswordEncoder passwordEncoder = 
					PasswordEncoderFactories.createDelegatingPasswordEncoder();
			userDto.setUserPw(passwordEncoder.encode(userDto.getUserPw()));
		}
		userService.updateUser(userDto);
		
		//사용자 상세 정보 얻기
		userDetails = (UserDetailsImpl) userDetailService.loadUserByUsername(userDto.getUserId());
		//인증 객체 얻기
		authentication = 
				new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
		//스프링 시큐리티에 인증 객체 설정
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		return "redirect:/mypage/mypage";
	}
	
	@RequestMapping("/likedProducts")
	public String likedProducts() {
		return "mypage/likedProducts";
	}
	
	// 마이페이지 홈
	@RequestMapping("/mypage")
	public String mypage() {
		return "mypage/mypage";
	}
	
	// 찜한 상품 조회 
    @GetMapping("/likedProducts")
    public String likedProducts(Model model, Authentication authentication) {
    	log.info("실행------");
        if(authentication != null) {
            String userId = authentication.getName();
            List<LikeDto> likeList = likeService.getLikeList(userId);
            List<ProductDto> productList = new ArrayList<>();
 
            for (LikeDto like : likeList) {
                int productId = like.getProductId();
                ProductDto product = productService.getProduct(productId);
                productList.add(product);
            }
            model.addAttribute("productList", productList);
        }
        return "mypage/likedProducts";
    }

	
	// 찜하기  - 찜 추가
	@GetMapping("/likeAdd")
	public ResponseEntity<String> likeAdd(int productId, Model model, Authentication authentication) {
		log.info("productId: " + productId + "찜 추가");
		String userId = authentication.getName();
		log.info("userId: " + userId);
		
		int result = likeService.likeAdd(productId, userId);
		
		HttpHeaders headers = new HttpHeaders();
	    headers.add("Content-Type", "text/html; charset=UTF-8");
		
	    if(result == 0)
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                             .headers(headers)
	                             .body("찜하기 등록에 실패하였습니다.");
	    else
	        return ResponseEntity.ok()
	                             .headers(headers)
	                             .body("상품을 찜하였습니다.");
	}
	// 찜하기 - 찜 삭제 
	@GetMapping("/likeRemove")
	public ResponseEntity<String> likeRemove(int productId, Authentication authentication){
		log.info("productId: " + productId + " 찜 삭제");
		String userId = authentication.getName();
		log.info("userId: " + userId);
		
		int result = likeService.likeRemove(productId, userId);
		

	    HttpHeaders headers = new HttpHeaders();
	    headers.add("Content-Type", "text/html; charset=UTF-8");

	    if (result == 0)
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                             .headers(headers)
	                             .body("찜 해제에 실패하였습니다.");
	    else
	        return ResponseEntity.ok()
	                             .headers(headers)
	                             .body("찜이 해제되었습니다.");
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

		ReviewDto reviewDto = new ReviewDto();
		String userId = authentication.getName();
		int orderId = reviewFormDto.getOrderId();
		int productId = reviewFormDto.getProductId();
		
		MultipartFile reviewImage = reviewFormDto.getReviewImage();
		ReviewDto tempReview = reviewService.getReview(orderId, userId, productId);
		if(reviewImage != null) {
			reviewDto.setReviewImageName(reviewImage.getOriginalFilename());
			reviewDto.setReviewImageData(reviewImage.getBytes());
			reviewDto.setReviewImageType(reviewImage.getContentType());
		}else {
			if(reviewFormDto.isChagedImg()) {
				reviewDto.setReviewImageName(tempReview.getReviewImageName());
				reviewDto.setReviewImageData(tempReview.getReviewImageData());
				reviewDto.setReviewImageType(tempReview.getReviewImageType());
			}
		}
		
		reviewDto.setReviewContent(reviewFormDto.getReviewContent());
		reviewDto.setReviewScore(reviewFormDto.getReviewScore());
		reviewDto.setOrderId(reviewFormDto.getOrderId());
		reviewDto.setProductId(reviewFormDto.getProductId());
		reviewDto.setUserId(userId);
		reviewDto.setOrderId(orderId);
		reviewDto.setProductId(productId);
		
		boolean result = reviewService.updateReview(reviewDto);
		if(result)
			return ResponseEntity.ok("OK");
		else
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error 발생");
	}
	
	@GetMapping("/reviewDetail")
	public ResponseEntity<Map<String, Object>> reviewDetail(int productId, int orderId, Authentication authentication){

		Map<String,Object> reviewDetail = new HashMap<>();
		String userId = authentication.getName();
		ReviewDto reviewDto = reviewService.getReview(orderId, userId, productId);
		ProductDto productDto = productService.getProduct(productId);
		reviewDetail.put("review", reviewDto);
		reviewDetail.put("product", productDto);
		
		return ResponseEntity.ok(reviewDetail);
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
