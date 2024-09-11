package com.mycompany.miniproject.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.ProductImageDto;

@Mapper
public interface ProductImageDao {
	
	public ProductImageDto selectImage(Map<String, Object> imageInfo);

	public void insertProductImage(ProductImageDto productImage);
}
