package com.mycompany.miniproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mycompany.miniproject.dao.NoticeDao;
import com.mycompany.miniproject.dto.NoticeDto;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class NoticeService {
	
	@Autowired
	NoticeDao noticeDao;
	
	// 공지사항 조회
	public List<NoticeDto> getNoticeAll(){
		List<NoticeDto> noticeList = noticeDao.selectAll();
		return noticeList;
	}
	
	// 공지사항 등록
	public int insertNotice(NoticeDto notice) {
		noticeDao.insertNotice(notice);
		int noticeId = notice.getNoticeId();
		return noticeId;
	}

	public NoticeDto getNotice(int noticeId) {
		NoticeDto noticeDto = noticeDao.selectNotice(noticeId);
		return noticeDto;
	}

	public void updateNotice(NoticeDto noticeDto) {
		noticeDao.updateNotice(noticeDto);
		
	}

	public void deleteNotice(int noticeId) {
		noticeDao.deleteNotice(noticeId);
		
	}
	
	
	
	
	
	
}
