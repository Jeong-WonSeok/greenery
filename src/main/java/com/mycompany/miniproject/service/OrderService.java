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
	
	public int cartAdd(int productQty, int productId, String userId) {
		Map<String, Object> cart = new HashMap<>();
		cart.put("productQty", productQty);
		cart.put("productId", productId);
		cart.put("userId", userId);
		
		try {
			int result = cartDao.insertProduct(cart);			
			if(result >= 1)
				return 1;
			else 
				return 0;
		} catch (DataIntegrityViolationException e) {
			log.info(e.getMessage());
			return -1;
		} catch (Exception e) {
			return 0;
		}
		
	}

	public List<CartDto> getCartList(String userId) {
		List<CartDto> cartList = cartDao.selectCartList(userId);
		return cartList;
	}

	public void chageProductQty(int productId, int productQty, String userId) {
		Map<String, Object> product = new HashMap<>();
		product.put("productId", productId);
		product.put("productQty", productQty);
		product.put("userId", userId);
		cartDao.updateProductQty(product);
		
		
	}

	public void deleteProduct(int productId, String userId) {
		Map<String, Object> product = new HashMap<>();
		product.put("productId", productId);
		product.put("userId", userId);
		cartDao.deleteProduct(product);
	}

	public void changeOrderEnable(int productId, String userId, boolean toOrder) {
		
		Map<String, Object> cartInfo=new HashMap<>();
		cartInfo.put("productId", productId);
		cartInfo.put("userId", userId);
		if(toOrder)
			cartDao.updateEnableToTrue(cartInfo);
		else
			cartDao.updateEnableToFalse(cartInfo);
		
	}

	public List<CartDto> getCartListToOrder(String userId) {
		List<CartDto> cartList = cartDao.selectListToOrder(userId);
		return cartList;
	}

	public int createOrder(OrderDto order) {
		orderDao.insertOrder(order);
		int orderId = order.getOrderId();
		return orderId;
	}

	public CartDto getCartInfo(int productId, String userId) {
		Map<String, Object> cartInfo = new HashMap<>();
		cartInfo.put("productId", productId);
		cartInfo.put("userId", userId);
		CartDto cartDto = cartDao.selectCart(cartInfo);
		return cartDto;
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

	public int getCartNum(String userId) {
		int cartNum = cartDao.countCart(userId);
		return cartNum;
	}

	

}
