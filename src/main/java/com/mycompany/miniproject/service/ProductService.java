package com.mycompany.miniproject.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mycompany.miniproject.dao.ProductDao;
import com.mycompany.miniproject.dao.ProductImageDao;
import com.mycompany.miniproject.dto.Pager;
import com.mycompany.miniproject.dto.ProductDto;
import com.mycompany.miniproject.dto.ProductImageDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProductService {

	@Autowired
	private ProductDao productDao;
	@Autowired
	private ProductImageDao productImageDao;
	
	public List<ProductDto> getProductList(String category, Pager pager, String sort) {
		
		Map<String, Object> catePager = new HashMap<>();
		catePager.put("category", category);
		catePager.put("pager", pager);
		catePager.put("sort", sort);
		List<ProductDto> productList = productDao.selectCategory(catePager);
		
		return productList;
	}
	

	public ProductImageDto getProductImage(int productId) {
		ProductImageDto image = productImageDao.selectImage(productId);
		return image;
	}


	public int getTotalRows() {
		int totalRows = productDao.countRows();
		return totalRows;
	}

}
