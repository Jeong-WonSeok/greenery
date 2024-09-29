package com.mycompany.miniproject.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.ProductImageDto;

@Mapper
public interface ProductImageDao {
	
	public ProductImageDto selectImage(Map<String, Object> imageInfo);

	public void insertProductImage(ProductImageDto productImage);

	public int updateProductImage(ProductImageDto productImage);// insert, update, delete는 반환타입을 최대한 int로

	public int selectImageNumber(int productId);

	public int deleteImage(Map<String, Object> image);
	
}
