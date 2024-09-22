package com.mycompany.miniproject.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ReviewFormDto {
	private MultipartFile reviewImage;
	private int reviewScore;
	private String reviewContent;
	private int productId;
	private int orderId;
	
}
