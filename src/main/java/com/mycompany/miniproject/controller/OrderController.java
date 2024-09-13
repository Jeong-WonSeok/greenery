package com.mycompany.miniproject.controller;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mycompany.miniproject.dto.CartDto;
import com.mycompany.miniproject.dto.ProductDto;
import com.mycompany.miniproject.service.OrderService;
import com.mycompany.miniproject.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/order")
public class OrderController {
	@Autowired
	OrderService orderService;
	@Autowired
	ProductService productService;
	
	@GetMapping("/cart")
	public String cart(Model model) {
		String userId = "jws9012";
		List<CartDto> cartList = orderService.getCartList(userId);
		List<Map<String, Object>> productList = new ArrayList<>();
		for(CartDto cart : cartList) {
			int productId = cart.getProductId();
			Map<String, Object> productInfo = new HashMap<>();
			ProductDto product = productService.getProduct(productId);
			productInfo.put("product", product);
			productInfo.put("productQty", cart.getProductQty());
			productList.add(productInfo);
		}
		
		model.addAttribute("productList", productList);
		
		return "order/cart";
	}
	
	@GetMapping("/cartAdd")
	public ResponseEntity<String> cartAdd(@RequestParam(defaultValue="1") int productQty, int productId, Model model) {
		int result = orderService.cartAdd(productQty, productId, "jws9012");
		
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
	public ResponseEntity<String> changeQty(int productId, int productQty) {
		String userId = "jws9012";
		orderService.chageProductQty(productId, productQty, userId);
		
		return ResponseEntity.ok("OK");
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
