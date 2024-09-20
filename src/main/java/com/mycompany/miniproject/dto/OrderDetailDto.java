package com.mycompany.miniproject.dto;

import java.util.Date;

import lombok.Data;

@Data
public class OrderDetailDto {
	private Date createdAt;
	private String userId;
	private int orderId;
	private int productId;
	private String productName;
	private int productQty;
	private int productPrice;
	private String summaryDescription;
	private String orderState;
	
}
