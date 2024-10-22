package com.mycompany.miniproject.dto;



import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class ProductDto {
	private int productId;
	private String productName;
	private int productPrice;
	private int productStock;
	private String mainDescription;
	private String summaryDescription;
	private String productCategory;
	private boolean productEnable;
	private Date createdAt;
	private String detailDescription;
	private boolean isLiked;
}
