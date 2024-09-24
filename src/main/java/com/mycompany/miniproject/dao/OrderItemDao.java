package com.mycompany.miniproject.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.OrderItemDto;

@Mapper
public interface OrderItemDao {

	int insertOrderItem(OrderItemDto orderItemDto);

	List<OrderItemDto> selectOrderItem(int orderId);

	int countRows(int orderId);

}
