package com.mycompany.miniproject.dto;

import lombok.Data;

@Data
public class OrderItemDto {
	private int orderId;
	private int productId;
	private int productQty;
	private int productPrice;
	private boolean orderState;
}
