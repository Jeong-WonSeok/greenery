package com.mycompany.miniproject.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.LikeDto;

@Mapper
public interface LikeDao {
	
	int insertProduct(Map<String, Object> like);

	int deleteProduct(Map<String, Object> like);

	List<LikeDto> selectLikeList(Map<String, Object> likePager);

	int countRowsByLike(String userId);

	LikeDto selectLikeProduct(Map<String, Object> like);
	
}
