package com.mycompany.miniproject.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.ProductDto;

@Mapper
public interface ProductDao {

	public List<ProductDto> selectAll(Map<String, Object> catePager);

	public int countRows();

	public List<ProductDto> selectCategory(String category, String sort);

	public List<ProductDto> selectCategory(Map<String, Object> categorySort);

	public void insertProduct(ProductDto product);

	public List<ProductDto> selectQuery(Map<String, Object> querySort);
	
}
