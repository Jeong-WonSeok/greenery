package com.mycompany.miniproject.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.mycompany.miniproject.dao.CartDao;
import com.mycompany.miniproject.dao.OrderDao;
import com.mycompany.miniproject.dao.OrderItemDao;
import com.mycompany.miniproject.dto.CartDto;
import com.mycompany.miniproject.dto.OrderDto;
import com.mycompany.miniproject.dto.OrderItemDto;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OrderService {

	@Autowired
	CartDao cartDao;
	
	@Autowired
	OrderDao orderDao;
	
	@Autowired
	OrderItemDao orderItemDao;
	

	public int createOrder(OrderDto order) {
		orderDao.insertOrder(order);
		int orderId = order.getOrderId();
		return orderId;
	}


	public void insertOrderItem(OrderItemDto orderItemDto) {
		orderItemDao.insertOrderItem(orderItemDto);
		
	}

	public Date getCreatedOrder(int orderId) {
		OrderDto order = orderDao.selectCreatedOrder(orderId);
		Date createdOrder = order.getCreatedAt();
		return createdOrder;
	}

	public List<OrderDto> getOrderList(String userId) {
		List<OrderDto> orderList = orderDao.selectOrderList(userId);
		return orderList;
	}

	public List<OrderItemDto> getOrderItem(int orderId) {
		List<OrderItemDto> orderItemList = orderItemDao.selectOrderItem(orderId);
		return orderItemList;
	}

	public int getTotalRows(List<OrderDto> orderList) {
		int totalRows = 0;
		for(OrderDto orderDto : orderList) {
			 totalRows += orderItemDao.countRows(orderDto.getOrderId());
		}
		return totalRows;
	}

	
	

}
