package com.mycompany.miniproject.dao;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.UserDto;

@Mapper
public interface UserDao {

	public UserDto selectById(String userId);

	public int insert(UserDto user);

	public int updateCouponByUsing(String userId);

	public int selectUserCoupon(String userId);

	public int updateUser(UserDto userDto);

	public int updateCouponByGiving(String userId);


} 
