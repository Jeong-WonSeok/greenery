package com.mycompany.miniproject.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AuthenticationSuccessHandler
//	extends SavedRequestAwareAuthenticationSuccessHandler{	//로그인 성공 시 사용자가 요청한 페이지로 이동
	// 로그인 성공 시 지정한 페이지로 이동
	extends SimpleUrlAuthenticationSuccessHandler{
	
    private RequestCache requestCache = new HttpSessionRequestCache();
	
	@Override
	public void onAuthenticationSuccess( 	// 로그인 성공했을 때 자동으로 실행
			HttpServletRequest request, 
			HttpServletResponse response,
			Authentication authentication) throws ServletException, IOException {
		// Authentication authentication: 로그인한 사용자의 정보를 얻을 수 있는 객체
		// extends SimpleUrlAuthenticationSuccessHandler 를 사용할 경우 
//		setDefaultTargetUrl("/");	//로그인 성공하면 지정한 이 경로로 이동  
		SavedRequest savedRequest = requestCache.getRequest(request, response);
		
		if (savedRequest != null) {
            requestCache.removeRequest(request, response);
            getRedirectStrategy().sendRedirect(request, response, "/");
            return;
        }
		super.onAuthenticationSuccess(request, response, authentication);
	}
	
}
