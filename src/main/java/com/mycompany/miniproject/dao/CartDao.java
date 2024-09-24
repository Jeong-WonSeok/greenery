package com.mycompany.miniproject.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.CartDto;

@Mapper
public interface CartDao {

	int insertProduct(Map<String, Object> cart);

	List<CartDto> selectCartList(String userId);

	int updateProductQty(Map<String, Object> product);

	int deleteProduct(Map<String, Object> product);

	int updateEnableToTrue(Map<String, Object> cartInfo);

	int updateEnableToFalse(Map<String, Object> cartInfo);

	List<CartDto> selectListToOrder(String userId);

	CartDto selectCart(Map<String, Object> cartInfo);

	int countCart(String userId);

}
