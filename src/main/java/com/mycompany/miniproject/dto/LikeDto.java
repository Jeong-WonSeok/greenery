package com.mycompany.miniproject.dto;

import java.util.Date;

import lombok.Data;

@Data
public class LikeDto {
	private String userId;
	private int productId;
	private Date likeDate;
}
