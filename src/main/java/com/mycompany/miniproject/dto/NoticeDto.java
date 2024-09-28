package com.mycompany.miniproject.dto;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class NoticeDto {
	private int noticeRownum;
	private int noticeId;
	private String noticeTitle;
	private String noticeContent;
	private Date createdAt;
	private String userId;

}
