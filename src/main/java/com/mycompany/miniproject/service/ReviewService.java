package com.mycompany.miniproject.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mycompany.miniproject.dao.ReviewDao;
import com.mycompany.miniproject.dto.ReviewDto;

@Service
public class ReviewService {
	@Autowired
	private ReviewDao reviewDao;
	
	public List<ReviewDto> getReviewList(int productId) {
		List<ReviewDto> reviews = reviewDao.selectReviewList(productId); 
		return reviews;
	}

	public ReviewDto getReview(int reviewId) {
		ReviewDto review = reviewDao.selectReview(reviewId);
		return review;
	}

	public void createReview(Date createdOrder, String userId, int productId) {
		Map<String, Object> reviewInfo = new HashMap<>();
		reviewInfo.put("createdAt", createdOrder);
		reviewInfo.put("userId", userId);
		reviewInfo.put("productId", productId);
		reviewDao.insertReview(reviewInfo);
		
		
	}

}
