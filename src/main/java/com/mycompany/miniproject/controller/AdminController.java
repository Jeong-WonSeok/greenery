package com.mycompany.miniproject.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.mycompany.miniproject.dao.NoticeDao;
import com.mycompany.miniproject.dao.ProductImageDao;
import com.mycompany.miniproject.dto.NoticeDto;
import com.mycompany.miniproject.dto.NoticeFormDto;
import com.mycompany.miniproject.dto.ProductDto;
import com.mycompany.miniproject.dto.ProductFormDto;
import com.mycompany.miniproject.dto.ProductImageDto;
import com.mycompany.miniproject.service.NoticeService;
import com.mycompany.miniproject.service.ProductService;
import com.mycompany.miniproject.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	ProductService productService;
	@Autowired
	ProductImageDao productImageDao;
	@Autowired
	NoticeService noticeService;
	@Autowired
	NoticeDao noticeDao;
	@Autowired
	UserService userService;
	
	@GetMapping("")
	public String mainadmin() {
		return "redirect:/admin/productselect";
	}
	
	// 공지사항 전체 조회
	@GetMapping("/noticeselect")
	public String noticeSelect(Model model) {
		List<NoticeDto> notice = noticeService.getNoticeAll();
		model.addAttribute("notice", notice);
		log.info("목록 조회");
		return "admin/noticeSelect";
	}
	// 공지사항 추가 폼get
	@GetMapping("/noticeadd")
	public String noticeoAdd() {
		return "admin/noticeAdd";
	}
	// 공지사항 추가 post
	@PostMapping("/insertNotice")
	public String insertNotice(NoticeFormDto noticeForm, Authentication authentication) {
		NoticeDto notice = new NoticeDto();
		
		notice.setNoticeId(noticeForm.getNoticeId());
		notice.setNoticeTitle(noticeForm.getNoticeTitle());
		notice.setNoticeContent(noticeForm.getNoticeContent());
		
		String userId = authentication.getName();
		log.info("userId : " + userId);
		
		notice.setUserId(userId);
		int noticeId = noticeService.insertNotice(notice);
		
		log.info("공지사항 추가 완료. Id: "  + noticeId);
		return "redirect:/admin/noticeselect";
	}

	@GetMapping("/noticeDetail")
	public String noticeDetail(int noticeId, Model model) {
		NoticeDto noticeDto = noticeService.getNotice(noticeId);
		model.addAttribute("notice", noticeDto);
		return "admin/noticeAdd";
	}
	
	@PostMapping("/updateNotice")
	public String updateNotice(NoticeDto noticeDto, Authentication authentication, Model model) {
		String userId = authentication.getName();
		log.info(noticeDto.toString());
		noticeDto.setUserId(userId);
		noticeService.updateNotice(noticeDto);
		return "redirect:/admin/noticeselect";
	}
	
	@PostMapping("/deleteNotice")
	public String deleteNotice(int noticeId) {
		noticeService.deleteNotice(noticeId);
		return "redirect:/admin/noticeselect";
	}
	@GetMapping("/productadd")
	public String productAdd() {
		log.info("실행");
		return "admin/productAdd";
	}
	
	// 상품 추가
	@PostMapping("/productInsert")
	public String productInsert(ProductFormDto productForm) throws IOException {
		ProductDto product = new ProductDto();
		product.setProductName(productForm.getProductName());
		product.setProductPrice(productForm.getProductPrice());
		product.setProductStock(productForm.getProductStock());
		product.setSummaryDescription(productForm.getSummaryDescription());
		product.setMainDescription(productForm.getMainDescription());
		product.setDetailDescription(productForm.getDetailDescription());
		product.setProductCategory(productForm.getProductCategory());
		int productId = productService.insertProduct(product);
		
		MultipartFile[] iamgeList = { 
				productForm.getProductImage1(), productForm.getProductImage2(),
				productForm.getProductImage3(), productForm.getProductImage4(),
				productForm.getDetailImage() };
		
		for(int i = 0; i < 5; i++) {
			ProductImageDto productImage = new ProductImageDto();
			if(!iamgeList[i].isEmpty()) {
				productImage.setProductId(productId);
				productImage.setPimageName(iamgeList[i].getOriginalFilename());
				productImage.setPimageType(iamgeList[i].getContentType());
				productImage.setPimageData(iamgeList[i].getBytes());
				if(i == 4) {
					productImage.setPimageUsecase("detailImage");
				}else {
					productImage.setPimageUsecase("productImage"+(i+1));
				}
				productService.insertProductImage(productImage);
			}
		}
		log.info("완료");
		
		return "redirect:/admin/productselect";	
	}
	// 관리자 페이지 - 상품 목록 조회
	@GetMapping("/productselect")
	public String productSelect(Model model) {
		List<ProductDto> product = productService.getProductAll();
		model.addAttribute("product", product);
		log.info("상품 목록 productSelect 화면 실행");
		return "admin/productSelect";
	}
	// 상품 목록 조회 - 이미지 불러오기
	@GetMapping("/imageDown")
	public void imageDown(int productId, 
			@RequestParam(defaultValue="1") int usecase,
			HttpServletResponse response) throws Exception{
		ProductImageDto image = productService.getProductImage(productId, usecase);
		if (image != null) {
			// 응답 헤더에 들어가는 Content-Type
			String contentType = image.getPimageType();
			response.setContentType(contentType);
			
			//응답 본문에 파일 데이터 출력
			OutputStream out = response.getOutputStream();
			out.write(image.getPimageData());
			out.flush();
			out.close();
		}
	}
	// 상품 수정 - get
	@GetMapping("/updateProductForm")
	public String updateProductForm(@RequestParam("productId") int productId, Model model) {
		
	    ProductDto product = productService.getProduct(productId);

	    ProductImageDto image1 = productService.getProductImage(productId, 1);
	    ProductImageDto image2 = productService.getProductImage(productId, 2);
	    ProductImageDto image3 = productService.getProductImage(productId, 3);
	    ProductImageDto image4 = productService.getProductImage(productId, 4);
	    ProductImageDto detailImage = productService.getProductImage(productId, 5);

	    model.addAttribute("product", product);
	    model.addAttribute("image1", image1);
	    model.addAttribute("image2", image2);
	    model.addAttribute("image3", image3);
	    model.addAttribute("image4", image4);
	    model.addAttribute("detailImage", detailImage);
	    
	    return "admin/updateProductForm";
	}
	// 상품 수정 - post
	@PostMapping("/updateProduct")
	public String productUpdate(@ModelAttribute ProductFormDto productForm) throws IOException {
		
		ProductDto product = new ProductDto();
		
		product.setProductId(productForm.getProductId());
		product.setProductName(productForm.getProductName());
		product.setProductPrice(productForm.getProductPrice());
		product.setProductStock(productForm.getProductStock());
		product.setSummaryDescription(productForm.getSummaryDescription());
		product.setMainDescription(productForm.getMainDescription());
		product.setDetailDescription(productForm.getDetailDescription());
		product.setProductCategory(productForm.getProductCategory());
		product.setCreatedAt(new Date());
		product.setProductEnable(true);	 /*상품 이미지를 수정하면 enable이 0으로 변경됨(이유는 아직 발견x)*/
		
		// 업데이트할 상품 id 설정
		int productId = productService.updateProduct(product);
		
		MultipartFile[] imageList = {
	            productForm.getProductImage1(), productForm.getProductImage2(),
	            productForm.getProductImage3(), productForm.getProductImage4(),
	            productForm.getDetailImage() };
		
		// 상품 1개 당 이미지는 5개니까 이미지 1개마다 ProductImageDto에 해당하는 필드값을 주입시켜줘야함
		// PimageUsecase = 5 이면 디테일이미지, 그 외에는 해당 숫자의 이미지에 해당
		for (int i = 0; i < 5; i++) {	// 이미지가 5개니까 for문으로 이미지 하나하나 이미지Dto에 값 세팅
			 if (imageList[i] != null && !imageList[i].isEmpty()) { // null 체크 추가
				ProductImageDto productImage = new ProductImageDto();
				productImage.setProductId(productId);
				productImage.setPimageName(imageList[i].getOriginalFilename());
				productImage.setPimageType(imageList[i].getContentType());
				productImage.setPimageData(imageList[i].getBytes());
				productImage.setPimageUsecase(i == 4 ? "detailImage" : "productImage" + (i + 1));
				
				log.info("이미지 {}: 이름={}", i + 1, imageList[i].getOriginalFilename());

				// 기존 이미지 조회
	            Map<String, Object> image = new HashMap<>();
	            image.put("productId", productImage.getProductId());
	            image.put("usecase", i + 1);
	            
	            ProductImageDto existingImage = productImageDao.selectImage(image);

	            if (existingImage != null) {
	                productImage.setPimageId(existingImage.getPimageId());
	            }
				
				productService.updateProductImage(productImage);
			}
			 
		}
		log.info("수정 post 메소드 실행");
		return "redirect:/admin/productselect";
	}
 
	// 관리자 상품 조회 페이지 - 상품 삭제 
	@PostMapping("/deleteProduct")
	public String deleteProduct(int productId) {
		productService.deleteProduct(productId);
		ProductDto product = productService.getProduct(productId);
		log.info("productId: " + product.getProductId());
		log.info("상품 이름: " + product.getProductName());
		
		log.info("상품 삭제");
		return "redirect:/admin/productselect";
	}
	
}
