package com.mycompany.miniproject.controller;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mycompany.miniproject.dto.Pager;
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
		int imageNum = productService.getImageNum(productId); 
		model.addAttribute("imageNum", imageNum);
		log.info(imageNum + " ");
		model.addAttribute("product", product);
		return "product/detailpage";
	}
	
	@RequestMapping("/reviewSelect")
	public String reviewSelect(
			@RequestParam(defaultValue="1") int pageNo,
			HttpSession session,
			int productId, Model model) {
		int totalRows = reviewService.getTotalRows();
		Pager pager = new Pager(10, 5, totalRows, pageNo);
		session.setAttribute("pager", pager);
		List<ReviewDto> productReviews = reviewService.getReviewList(productId, pager);
		
		model.addAttribute("productReviews", productReviews);
		model.addAttribute("productId", productId);
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
	
	@GetMapping("/reviewImgDown")
	public void reviewImgDown(int productId, int orderId, HttpServletResponse response) throws Exception{
		ReviewDto review = reviewService.getReviewByOrderId(orderId, productId); 
		if(review.getReviewImageName() != null) {
		//응답 헤더에 들어가는 Content-Type
			String contentType = review.getReviewImageType();
			response.setContentType(contentType);		
			
			//응답 본문에 파일 데이터를 출력
			OutputStream out = response.getOutputStream();
			out.write(review.getReviewImageData());
			out.flush();
			out.close();
		}
		
	}
}
