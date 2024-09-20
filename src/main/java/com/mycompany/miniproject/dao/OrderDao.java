package com.mycompany.miniproject.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.OrderDto;

@Mapper
public interface OrderDao {

	int insertOrder(OrderDto order);

	OrderDto selectCreatedOrder(int orderId);

	List<OrderDto> selectOrderList(String userId);

}
