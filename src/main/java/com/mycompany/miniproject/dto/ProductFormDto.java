package com.mycompany.miniproject.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ProductFormDto {
	private int productId;
	private String productName;
	private int productPrice;
	private int productStock;
	private String productCategory;
	private MultipartFile productImage1;
	private MultipartFile productImage2;
	private MultipartFile productImage3;
	private MultipartFile productImage4;
	private String summaryDescription;
	private String mainDescription;
	private String detailDescription;
	private MultipartFile detailImage;
	private boolean deletedImage2; 
	private boolean deletedImage3; 
	private boolean deletedImage4;
}
