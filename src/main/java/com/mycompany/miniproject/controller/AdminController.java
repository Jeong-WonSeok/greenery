package com.mycompany.miniproject.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.mycompany.miniproject.dto.ProductDto;
import com.mycompany.miniproject.dto.ProductFormDto;
import com.mycompany.miniproject.dto.ProductImageDto;
import com.mycompany.miniproject.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	ProductService productService;
	
	@RequestMapping("")
	public String mainadmin() {
		return "admin/mainAdmin";
	}

	@RequestMapping("/noticeadd")
	public String noticeoAdd() {
		return "admin/noticeAdd";
	}

	@RequestMapping("/noticeselect")
	public String admin_notice() {
		return "admin/noticeSelect";
	}

	@RequestMapping("/productadd")
	public String productAdd() {
		log.info("실행");
		return "admin/productAdd";
	}
	
	@PostMapping("/productInsert")
	public String productInsert(ProductFormDto productForm) throws IOException {
		ProductDto product = new ProductDto();
		product.setProductName(productForm.getProductName());
		product.setProductPrice(productForm.getProductPrice());
		product.setProductStock(productForm.getProductStock());
		product.setSummaryDescription(productForm.getSumaryDescription());
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
		
		return "admin/productSelect";		
	}

	@RequestMapping("/productselect")
	public String productSelect() {
		return "admin/productSelect";
	}


}
