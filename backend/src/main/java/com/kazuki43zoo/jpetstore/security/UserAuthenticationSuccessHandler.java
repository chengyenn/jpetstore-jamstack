package com.kazuki43zoo.jpetstore.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kazuki43zoo.jpetstore.domain.Account;
import com.kazuki43zoo.jpetstore.service.AccountUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


public class UserAuthenticationSuccessHandler implements AuthenticationSuccessHandler {


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        String sessionId = request.getSession().getId();
        String username = ((User) authentication.getPrincipal()).getUsername();


        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("token", sessionId);
        responseBody.put("username", username);


        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        new ObjectMapper().writeValue(response.getWriter(), responseBody);
    }
}
