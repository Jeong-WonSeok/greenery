package com.mycompany.miniproject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/admin")
public class AdminController {
	
	@RequestMapping("")
	public String mainadmin() {
		return "admin/mainadmin";
	}

	@RequestMapping("/noticeadd")
	public String admin_noticesadd() {
		return "admin/noticeadd";
	}

	@RequestMapping("/noticeselect")
	public String admin_notice() {
		return "admin/noticeselect";
	}

	@RequestMapping("/productadd")
	public String admin_productadd() {
		return "admin/productadd";
	}

	@RequestMapping("/productselect")
	public String admin_productselect() {
		return "admin/productselect";
	}


}
