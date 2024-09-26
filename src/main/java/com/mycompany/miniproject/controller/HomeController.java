package com.mycompany.miniproject.controller;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mycompany.miniproject.dto.CartDto;
import com.mycompany.miniproject.dto.Pager;
import com.mycompany.miniproject.dto.ProductDto;
import com.mycompany.miniproject.dto.ProductImageDto;
import com.mycompany.miniproject.service.CartService;
import com.mycompany.miniproject.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class HomeController {
	
	@Autowired
	private ProductService productService;
	@Autowired
	private CartService cartService;
	
	@GetMapping("/")
	public String mainPage( 
						@RequestParam(defaultValue="1") int pageNo,
						@RequestParam(name="sort", defaultValue="default") String sort,
						Authentication authentication,
						HttpSession session, 
						Model model) {
		
		int totalRows = productService.getTotalRows();
		Pager pager = new Pager(10, 5, totalRows, pageNo);
		session.setAttribute("pager", pager);
		
		if(authentication != null) {
			String userId = authentication.getName();
			Map<Integer, Integer> cartList = (Map<Integer, Integer>) session.getAttribute("cartList");
			if(cartList != null) {
				for(Map.Entry<Integer, Integer> entry : cartList.entrySet()) {
					int productId = entry.getKey();
					int productQty = entry.getValue();
					CartDto cartDto = cartService.getCartInfo(productId, userId);
					if(cartDto == null) {
						cartService.cartAdd(productQty, productId, userId);
					}
				}
				session.removeAttribute("cartList");
			}
		}
		
		List<ProductDto> productList = productService.getProductAll(pager, sort);
		model.addAttribute("productList", productList);
		model.addAttribute("category", "all");
		model.addAttribute("sort", sort);
		return "main";
	}
	
	@GetMapping("/category")
	public String mainPage(
			String category, Model model,
			@RequestParam(name="sort", defaultValue="default") String sort) {
		List<ProductDto> productList = productService.getCategoryToMain(category, sort);
		
		
		model.addAttribute("productList", productList);
		model.addAttribute("category", category);
		model.addAttribute("sort", sort);
		return "main";
		
	}
	
	
	@GetMapping("/imageDown")
	public void imageDown(int productId,
					@RequestParam(defaultValue="1") int usecase,
					HttpServletResponse response) throws Exception{
		ProductImageDto image = productService.getProductImage(productId, usecase);
		if(image != null) {
		//응답 헤더에 들어가는 Content-Type
			String contentType = image.getPimageType();
			response.setContentType(contentType);		
			
			//응답 본문에 파일 데이터를 출력
			OutputStream out = response.getOutputStream();
			out.write(image.getPimageData());
			out.flush();
			out.close();
		}
	}

}

