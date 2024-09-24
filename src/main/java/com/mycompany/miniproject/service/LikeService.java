package com.mycompany.miniproject.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mycompany.miniproject.dao.LikeDao;
import com.mycompany.miniproject.dto.LikeDto;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class LikeService {
	@Autowired
	LikeDao likeDao;
	
	// 찜한 상품 조회
	public List<LikeDto> getLikeList(String userId) {
		List<LikeDto> likeList = likeDao.selectLikeList(userId);
		return likeList;
	}

	//찜 추가 
	public int likeAdd(int productId, String userId) {
		Map<String, Object> like = new HashMap<>();
		like.put("productId", productId);
		like.put("userId", userId);
		
		try {
	        int result = likeDao.insertProduct(like);
	        if(result >= 1)
	            return 1;
	        else
	            return 0;
	    } catch(Exception e) {
	        return 0;
	    }
	
	}
	// 찜 삭제
	public int likeRemove(int productId, String userId) {
		Map<String, Object> like = new HashMap<>();
		like.put("productId", productId);
	    like.put("userId", userId);

	    try {
	        int result = likeDao.deleteProduct(like); // DB에서 찜 해제
	        if (result >= 1)
	            return 1;
	        else
	            return 0;
	    } catch (Exception e) {
	        return 0;
	    }
	}

}
