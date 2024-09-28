package com.mycompany.miniproject.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mycompany.miniproject.dto.NoticeDto;
import com.mycompany.miniproject.dto.Pager;
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
	public String notices(Model model, @RequestParam(defaultValue="1") int pageNo) {
		int totalRows = noticeService.getSearchTotalRows();
		Pager pager = new Pager(15, 5, totalRows, pageNo);
		List<NoticeDto> notice = noticeService.getNoticeAll(pager);
		model.addAttribute("pager", pager);
		model.addAttribute("noticeList", notice);
		return "notice/notices";
	}
	
	
}
