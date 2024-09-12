package com.mycompany.miniproject.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.ReviewDto;

@Mapper
public interface ReviewDao {

	List<ReviewDto> selectReviewList(int productId);

	ReviewDto selectReview(int reviewId);

}
