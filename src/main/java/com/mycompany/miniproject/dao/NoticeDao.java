package com.mycompany.miniproject.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mycompany.miniproject.dto.NoticeDto;

@Mapper
public interface NoticeDao {

	public List<NoticeDto> selectAll();

	public int insertNotice(NoticeDto notice);

	public NoticeDto selectNotice(int noticeId);

	public int updateNotice(NoticeDto noticeDto);

	public int deleteNotice(int noticeId);

}
