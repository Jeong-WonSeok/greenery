package com.mycompany.miniproject.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CartDao {

	int insertProduct(Map<String, Object> cart);

}
