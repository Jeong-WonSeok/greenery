package com.mycompany.miniproject.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.ProductDto;

@Mapper
public interface ProductDao {

	public List<ProductDto> selectCategory(Map<String, Object> catePager);

	public int countRows();
	
}
