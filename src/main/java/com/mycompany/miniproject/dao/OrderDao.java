package com.mycompany.miniproject.dao;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.OrderDto;

@Mapper
public interface OrderDao {

	int insertOrder(OrderDto order);

	OrderDto selectCreatedOrder(int orderId);

}
