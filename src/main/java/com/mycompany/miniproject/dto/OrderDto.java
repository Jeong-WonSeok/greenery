package com.mycompany.miniproject.dto;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class OrderDto {
	private int orderId;
	private Date createdAt;
	private String userId;
	private int totalPrice;
}
