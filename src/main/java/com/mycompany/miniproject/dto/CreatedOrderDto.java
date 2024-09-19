package com.mycompany.miniproject.dto;

import java.util.List;

import lombok.Data;

@Data
public class CreatedOrderDto {
	
	private List<Integer> productIdList;
	private int totalPrice;
	private boolean coupon;

}
