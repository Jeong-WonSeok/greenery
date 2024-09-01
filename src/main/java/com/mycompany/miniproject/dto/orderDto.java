package com.mycompany.miniproject.dto;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class orderDto {
	private int id;
	private String orderPrice;
	private int orderStock;
	private String orderStatus;
	@DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
	private Date createdAt;
	@DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
	private Date updateAt;
	private int userId;
	
}
