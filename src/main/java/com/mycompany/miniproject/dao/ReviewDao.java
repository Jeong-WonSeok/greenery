package com.mycompany.miniproject.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.ReviewDto;

@Mapper
public interface ReviewDao {

	List<ReviewDto> selectReviewList(int productId);

	ReviewDto selectReview(Map<String, Object> reviewInfo);

	int insertReview(Map<String, Object> reviewInfo);

	int updateReview(ReviewDto reviewDto);

}
