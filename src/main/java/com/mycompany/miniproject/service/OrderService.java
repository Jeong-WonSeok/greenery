package com.mycompany.miniproject.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.mycompany.miniproject.dao.CartDao;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OrderService {

	@Autowired
	CartDao cartDao;
	
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

}
