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
	
	public List<ProductDto> getProductAll(Pager pager, String sort) {
		
		Map<String, Object> catePager = new HashMap<>();
//		catePager.put("category", category);
		catePager.put("pager", pager);
		catePager.put("sort", sort);
		List<ProductDto> productList = productDao.selectAll(catePager);
		
		return productList;
	}
	
	public List<ProductDto> getProductCategory(String category, String sort){
		Map<String, Object> categorySort = new HashMap<>();
		
		categorySort.put("category", category);
		categorySort.put("sort", sort);
		
		log.info("실행");
		List<ProductDto> productList = productDao.selectCategory(categorySort);
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
	
	public int insertProduct(ProductDto product) {
		productDao.insertProduct(product);
		int productId = product.getProductId();
		log.info(productId+" ");
		return productId;
	}

	public void insertProductImage(ProductImageDto productImage) {
		productImageDao.insertProductImage(productImage);
	}

	public List<ProductDto> getProductSearch(String query, String sort) {
		Map<String, Object> querySort = new HashMap<>();
		
		querySort.put("query", query);
		querySort.put("sort", sort);
		List<ProductDto> productList = productDao.selectQuery(querySort); 
		return productList;
	}

	public ProductDto getProduct(int productId) {
		ProductDto productDto = productDao.selectProduct(productId);
		return productDto;
	}

}
