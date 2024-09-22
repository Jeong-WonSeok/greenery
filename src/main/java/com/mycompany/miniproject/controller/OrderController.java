package com.mycompany.miniproject.controller;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mycompany.miniproject.dto.CartDto;
import com.mycompany.miniproject.dto.CreatedOrderDto;
import com.mycompany.miniproject.dto.OrderDto;
import com.mycompany.miniproject.dto.OrderItemDto;
import com.mycompany.miniproject.dto.ProductDto;
import com.mycompany.miniproject.service.OrderService;
import com.mycompany.miniproject.service.ProductService;
import com.mycompany.miniproject.service.ReviewService;
import com.mycompany.miniproject.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/order")
public class OrderController {
	@Autowired
	OrderService orderService;
	@Autowired
	ProductService productService;
	@Autowired
	UserService userService;
	@Autowired
	ReviewService reviewService;
	
	@GetMapping("/cart")
	public String cart(Model model, Authentication authentication) {
		if(authentication != null) {
			String userId = authentication.getName();
			List<CartDto> cartList = orderService.getCartList(userId);
			List<Map<String, Object>> productList = new ArrayList<>();
			for(CartDto cart : cartList) {
				int productId = cart.getProductId();
				
				Map<String, Object> productInfo = new HashMap<>();
				ProductDto product = productService.getProduct(productId);
				productInfo.put("product", product);
				productInfo.put("productQty", cart.getProductQty());
				productList.add(productInfo);
				
				orderService.changeOrderEnable(productId, userId, false);
			}
			model.addAttribute("productList", productList);
		}
		
		
		return "order/cart";
	}
	
	@GetMapping("/cartAdd")
	public ResponseEntity<String> cartAdd(@RequestParam(defaultValue="1") int productQty, int productId, Model model, Authentication authentication) {
		String userId = authentication.getName();
		log.info("userId : " + userId);
		
		int result = orderService.cartAdd(productQty, productId, userId);
		
		HttpHeaders headers = new HttpHeaders();
	    headers.add("Content-Type", "text/html; charset=UTF-8");
		
		if(result == -1)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
								.headers(headers)
								.body("이미 장바구니에 상품이 있습니다.");
		else if(result == 0)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
								.headers(headers)
								.body("장바구니 상품 등록에 실패하였습니다.");
		else
			return ResponseEntity.ok()
								.headers(headers)
								.body("상품이 장바구니에 담겼습니다.");
	}
	
	@GetMapping("/changeQty")
	public ResponseEntity<String> changeQty(int productId, int productQty, Authentication authentication) {
		String userId = authentication.getName();
		orderService.chageProductQty(productId, productQty, userId);
		
		return ResponseEntity.ok("OK");
	}
	
	@GetMapping("/deleteProduct")
	public String deleteProduct(int productId, Authentication authentication) {
		String userId = authentication.getName();
		orderService.deleteProduct(productId, userId);
		return "/order/cart";
	}
	
	@RequestMapping("/order")
	public String order(int orderId, Model model) {
		model.addAttribute("orderId", orderId);
		return "order/order";
	}
	
	@GetMapping("/toOrder")
	public ResponseEntity<String> insertOrder(int productId, Authentication authentication){
		String userId = authentication.getName();
		orderService.changeOrderEnable(productId, userId, true);
		
		return ResponseEntity.ok("OK");
	}
	
	@Secured("ROLE_USER")
	@RequestMapping("/payment")
	public String payment(Authentication authentication, Model model) {

		if(authentication != null) {
			String userId = authentication.getName();
			List<CartDto> cartList = orderService.getCartListToOrder(userId);
			List<Map<String, Object>> productList = new ArrayList<>();
			
			for(CartDto cart : cartList) {
				int productId = cart.getProductId();
				
				Map<String, Object> productInfo = new HashMap<>();
				ProductDto product = productService.getProduct(productId);
				productInfo.put("product", product);
				productInfo.put("productQty", cart.getProductQty());
				productList.add(productInfo);				
			}
			boolean hasCoupon = userService.hasCoupon(userId);
			log.info("쿠폰 확인 : " + hasCoupon);
			model.addAttribute("hasCoupon", hasCoupon);
			model.addAttribute("productList", productList);
		}
		else {
			return "redirect:/order/cart";
		}
		
		return "order/payment";
	}
	
	@PostMapping("/createOrder")
	public ResponseEntity<String> createOrder(@RequestBody CreatedOrderDto order, Authentication authentication){
		OrderDto orderDto = new OrderDto();
		String userId = authentication.getName();
		int totalPrice = order.getTotalPrice();
		
		orderDto.setUserId(userId);
		orderDto.setTotalPrice(totalPrice);
 		int orderId = orderService.createOrder(orderDto);
 		
 		List<Integer> orderList = order.getProductIdList();
 		
 		for(int productId : orderList) {
 			OrderItemDto orderItemDto = new OrderItemDto();
 			ProductDto productDto = productService.getProduct(productId);
 			CartDto cartDto = orderService.getCartInfo(productId, userId);
 			if(cartDto != null)
 				orderItemDto.setProductQty(cartDto.getProductQty());
 			else
 				orderItemDto.setProductQty(order.getQty());
 			
 			orderItemDto.setOrderId(orderId);
 			orderItemDto.setOrderState("배달완료");
 			orderItemDto.setProductId(productId);
 			orderItemDto.setProductPrice(productDto.getProductPrice());
 			
 			orderService.deleteProduct(productId, userId);
 			orderService.insertOrderItem(orderItemDto);
 			reviewService.createReview(orderId, userId, productId);
 		}
 		
 		if(order.isCoupon()) {
 			userService.useCoupon(userId);
 		}
 		
		return ResponseEntity.ok(String.valueOf(orderId));
	}
	
	@Secured("ROLE_USER")
	@GetMapping("addOneProduct")
	public String addOneProduct(int productId,
							@RequestParam(defaultValue="1") int qty,
							Authentication authentication, Model model) {
		if(authentication != null) {
			String userId = authentication.getName();
			List<Map<String, Object>> productList = new ArrayList<>();
			
				
			Map<String, Object> productInfo = new HashMap<>();
			ProductDto product = productService.getProduct(productId);
			productInfo.put("product", product);
			productInfo.put("productQty", qty);
			productList.add(productInfo);				
			
			boolean hasCoupon = userService.hasCoupon(userId);
		
			model.addAttribute("hasCoupon", hasCoupon);
			model.addAttribute("productList", productList);
		}
		
		return "order/payment";
	}
}
