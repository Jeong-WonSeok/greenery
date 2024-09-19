package com.mycompany.miniproject.dao;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.OrderItemDto;

@Mapper
public interface OrderItemDao {

	int insertOrderItem(OrderItemDto orderItemDto);

}
