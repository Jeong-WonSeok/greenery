package com.mycompany.miniproject.dto;

import lombok.Data;

@Data
public class ProductImageDto {
	private int pimageId;
	private String pimageName;
	private String pimageType;
	private byte[] pimageData;
	private String pimageUsecase;
	private int productId;
}
