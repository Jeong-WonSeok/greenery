package com.mycompany.miniproject.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mycompany.miniproject.dao.ReviewDao;
import com.mycompany.miniproject.dto.Pager;
import com.mycompany.miniproject.dto.ReviewDto;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ReviewService {
	@Autowired
	private ReviewDao reviewDao;
	
	public List<ReviewDto> getReviewList(int productId, Pager pager) {
		Map<String, Object> reviewPage = new HashMap<>();
		reviewPage.put("pager", pager);
		reviewPage.put("productId", productId);
		List<ReviewDto> reviews = reviewDao.selectReviewList(reviewPage); 
		return reviews;
	}

	public ReviewDto getReview(int orderId, String userId, int productId) {
		Map<String, Object> reviewInfo = new HashMap<>();
		reviewInfo.put("orderId", orderId);
		reviewInfo.put("userId", userId);
		reviewInfo.put("productId", productId);
		
		ReviewDto review = reviewDao.selectReview(reviewInfo);
		return review;
	}

	public void createReview(int orderId, String userId, int productId) {
		Map<String, Object> reviewInfo = new HashMap<>();
		reviewInfo.put("orderId", orderId);
		reviewInfo.put("userId", userId);
		reviewInfo.put("productId", productId);
		reviewDao.insertReview(reviewInfo);
		
		
	}

	public boolean updateReview(ReviewDto reviewDto) {
		boolean result = reviewDao.updateReview(reviewDto) > 0;
		return result;
	}

	public ReviewDto getReviewByOrderId(int orderId, int productId) {
		Map<String, Object> reviewInfo = new HashMap<>();
		reviewInfo.put("orderId", orderId);
		reviewInfo.put("productId", productId);
		
		ReviewDto review = reviewDao.selectReviewByOrderId(reviewInfo);
		
		return review;
	}

	public int getTotalRows() {
		int totalRows = reviewDao.countRows();
		return totalRows;
	}

	
}
