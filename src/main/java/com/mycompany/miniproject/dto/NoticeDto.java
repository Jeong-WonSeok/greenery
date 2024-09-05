package com.mycompany.miniproject.dto;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class NoticeDto {
	private int noticeId;
	private String noticeTitle;
	private String noticeContent;
	@DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
	private Date created_at;
	private String userId;

}
