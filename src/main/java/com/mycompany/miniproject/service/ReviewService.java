package com.mycompany.miniproject.service;

import java.util.List;

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

}
