package com.mycompany.miniproject.controller;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

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
import com.mycompany.miniproject.service.CartService;
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
	@Autowired
	CartService cartService;
	
	@GetMapping("/cart")
	public String cart(Model model, Authentication authentication, HttpSession session) {
		List<Map<String, Object>> productList = new ArrayList<>();
		Map<String, Object> productInfo = new HashMap<>();
		ProductDto product = new ProductDto();
		
		if(authentication != null) {
			String userId = authentication.getName();
			List<CartDto> cartList = cartService.getCartList(userId);
			for(CartDto cart : cartList) {
				productInfo = new HashMap<>();
				int productId = cart.getProductId();
				
				product = productService.getProduct(productId);
				productInfo.put("product", product);
				productInfo.put("productQty", cart.getProductQty());
				productList.add(productInfo);
				
				cartService.changeOrderEnable(productId, userId, false);
			}
		}else {
			Map<Integer, Integer> cartList = (Map<Integer, Integer>) session.getAttribute("cartList");
			if(cartList != null) {
				//key => productId, value => productQty
				for(Map.Entry<Integer, Integer> entry: cartList.entrySet()) {
					productInfo = new HashMap<>();
					
					product = productService.getProduct(entry.getKey());
					productInfo.put("product", product);
					productInfo.put("productQty",entry.getValue());
					productList.add(productInfo);
				}
			}
		}
		
		model.addAttribute("productList", productList);
		
		return "order/cart";
	}
	
//	@Secured("ROLE_USER")
	@PostMapping("/cartAdd")
	public ResponseEntity<String> cartAdd(@RequestParam(defaultValue="1") int productQty, int productId, Model model, Authentication authentication, HttpSession session) {
		log.info("실행");
		
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "text/html; charset=UTF-8");
		
		int result = 1;
		if(authentication != null) {
			String userId = authentication.getName();
			result = cartService.cartAdd(productQty, productId, userId);
		}else {
			Map<Integer, Integer> cartList = (Map<Integer, Integer>) session.getAttribute("cartList");
			if(cartList == null) {
				log.info("cart가 없습니다.");
				cartList = new HashMap<Integer, Integer>();
				session.setAttribute("cartList", cartList);
			}
			if(cartList.containsKey(productId)) {
				result = -1;
			}else {
				cartList.put(productId, productQty);
			}
			cartList.forEach((key, value) -> {
			    System.out.println("Key: " + key + ", Value: " + value);
			});
		}
		
		
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
		cartService.chageProductQty(productId, productQty, userId);
		
		return ResponseEntity.ok("OK");
	}
	
	@GetMapping("/deleteProduct")
	public ResponseEntity<Integer> deleteProduct(int productId, Authentication authentication, HttpSession session) {
		if(authentication != null) {
			String userId = authentication.getName();
			boolean hasProduct = cartService.hasProductInCart(productId, userId);
			if(hasProduct) {
				cartService.deleteProduct(productId, userId);
				return ResponseEntity.ok(1);
			}else
				return ResponseEntity.ok(0);
		}else {
			Map<Integer, Integer> cartList = (Map<Integer, Integer>) session.getAttribute("cartList");
			cartList.remove(productId);
			return ResponseEntity.ok(1);
		}
	}
	
	@RequestMapping("/order")
	public String order(int orderId, Model model) {
		model.addAttribute("orderId", orderId);
		return "order/order";
	}
	
	@PostMapping("/toOrder")
	public ResponseEntity<String> insertOrder(int[] orderItems, Authentication authentication){
		String userId = authentication.getName();
		for(int productId : orderItems) {
			cartService.changeOrderEnable(productId, userId, true);
			log.info(productId + " ");
		}
		return ResponseEntity.ok("OK");
	}
	
	@Secured("ROLE_USER")
	@GetMapping("/payment")
	public String payment(Authentication authentication, Model model) {

		String userId = authentication.getName();
		List<CartDto> cartList = cartService.getCartListToOrder(userId);
		List<Map<String, Object>> productList = new ArrayList<>();
		
		for(CartDto cart : cartList) {
			int productId = cart.getProductId();
			Map<String, Object> productInfo = new HashMap<>();
			ProductDto product = productService.getProduct(productId);
			log.info(product.toString());
			productInfo.put("product", product);
			productInfo.put("productQty", cart.getProductQty());
			productList.add(productInfo);				
		}
		int couponNum = userService.getCouponNum(userId);
		boolean hasCoupon = couponNum <= 0 ? false : true;
		model.addAttribute("hasCoupon", hasCoupon);
		model.addAttribute("productList", productList);

		
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
 			CartDto cartDto = cartService.getCartInfo(productId, userId);
 			
 			if(cartDto != null)
 				orderItemDto.setProductQty(cartDto.getProductQty());
 			else
 				orderItemDto.setProductQty(order.getQty());
 			
 			orderItemDto.setOrderId(orderId);
 			orderItemDto.setOrderState("배달완료");
 			orderItemDto.setProductId(productId);
 			orderItemDto.setProductPrice(productDto.getProductPrice());
 			
 			cartService.deleteProduct(productId, userId);
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
			
			int couponNum = userService.getCouponNum(userId);
			boolean hasCoupon = couponNum <= 0 ? false : true;
			
			model.addAttribute("hasCoupon", hasCoupon);
			model.addAttribute("productList", productList);
		}
		
		return "order/payment";
	}
	
	@GetMapping("/getCartNum")
	public ResponseEntity<Integer> getCartNum(Authentication authentication, Model model) {
		if(authentication == null || !authentication.isAuthenticated() ) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(-1);
		String userId = authentication.getName();
		int cartNum = cartService.getCartNum(userId);
		model.addAttribute("cartNum", cartNum);
		
		return ResponseEntity.ok(cartNum);
	}
}
