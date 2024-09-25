package com.mycompany.miniproject.dto;

import lombok.Data;

@Data
public class CartDto {
	private String userId;
	private int productId;
	private int productQty;	
	private boolean orderEnable;
}
