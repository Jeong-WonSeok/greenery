package com.mycompany.miniproject.dto;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class ReviewDto {
	private int reviewScore;
	private String reviewContent;
	private byte[] reviewImageData;
	private String reviewImageName;
	private String reviewImageType;
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	private Date createdAt;
	private int productId;
	private String userId;
	private boolean reviewEnable;
	private String orderId;
}
