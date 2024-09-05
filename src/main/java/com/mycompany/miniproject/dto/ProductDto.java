package com.mycompany.miniproject.dto;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class ProductDto {
	private int id;
	private String name;
	private int price;
	private String image;
	private String image2;
	private String image3;
	private String image4;
	private String mainDescription;
	private String summaryDescription;
	@DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
	private Date createdAt;
	@DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
	private Date updateAt;
	private String cartegory;
}
