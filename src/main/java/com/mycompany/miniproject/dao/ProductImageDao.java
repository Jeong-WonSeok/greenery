package com.mycompany.miniproject.dao;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.ProductImageDto;

@Mapper
public interface ProductImageDao {
	
	public ProductImageDto selectImage(int productId);
}
