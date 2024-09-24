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
import com.mycompany.miniproject.dto.ProductFormDto;
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
		
		List<ProductDto> productList = productDao.selectCategory(categorySort);
		return productList;
	}


	public int getTotalRows() {
		int totalRows = productDao.countRows();
		return totalRows;
	}
	
	public int insertProduct(ProductDto product) {
		productDao.insertProduct(product);
		int productId = product.getProductId();
		return productId;
	}

	// 상품 검색
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

	public void insertProductImage(ProductImageDto productImage) {
		productImageDao.insertProductImage(productImage);
	}
	
	// 상품 이미지 조회
	public ProductImageDto getProductImage(int productId, int usecase) {	
		Map<String, Object> imageInfo = new HashMap<>();
		imageInfo.put("productId", productId);
		imageInfo.put("usecase", usecase);
		
		ProductImageDto image = productImageDao.selectImage(imageInfo);
		return image;
	}
	
	// 관리자 상품 조회
	public List<ProductDto> getProductAll() {
		//Map<String, Object> catePager = new HashMap<>();
		//catePager.put("pager", pager);
		
		List<ProductDto> productList = productDao.selectAllProduct();
		
		return productList;
	}
	
	// ---------관리자 페이지 상품 수정하기 ------
	// 상품 수정 
	public int updateProduct(ProductDto product) {
		productDao.updateProduct(product);
		int productId = product.getProductId();
		return productId;
	}
	// 상품 이미지 수정
	public void updateProductImage(ProductImageDto productImage) {
		if (productImage.getPimageId() == 0) {
			productImageDao.insertProductImage(productImage);
		} else {
			productImageDao.updateProductImage(productImage);
		}
	}

	// 관리자 상품 조회 페이지 - 상품 삭제
	public void deleteProduct(int productId) {
		productDao.disableProduct(productId);
	}

	public int getImageNum(int productId) {
		int num = productImageDao.selectImageNumber(productId);
		return num;
	}
	
	
	
}
