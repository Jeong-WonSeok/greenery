package com.mycompany.miniproject.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mycompany.miniproject.dto.NoticeDto;
import com.mycompany.miniproject.service.NoticeService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/notice")
public class NoticesController {

	@Autowired
	NoticeService noticeService;
	
	@RequestMapping("/noticeContent")
	public String editMyInfo(int noticeId, Model model) {
		NoticeDto noticeDto = noticeService.getNotice(noticeId);
		model.addAttribute("notice", noticeDto);
		return "notice/noticeContent";
	}
	
	@RequestMapping("/notices")
	public String notices(Model model) {
		List<NoticeDto> notice = noticeService.getNoticeAll();
		model.addAttribute("noticeList", notice);
		return "notice/notices";
	}
	
	
}
