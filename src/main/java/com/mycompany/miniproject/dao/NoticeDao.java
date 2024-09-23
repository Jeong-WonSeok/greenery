package com.mycompany.miniproject.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.NoticeDto;

@Mapper
public interface NoticeDao {

	public List<NoticeDto> selectAll();

	public void insertNotice(NoticeDto notice);

	public NoticeDto selectNotice(int noticeId);

}
