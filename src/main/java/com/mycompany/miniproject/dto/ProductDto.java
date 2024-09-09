package com.mycompany.miniproject.dto;

import java.sql.Date;

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
	private int productEnable;
	private Date createdAt;
	private String detailDescription;
}
