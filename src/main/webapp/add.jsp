<%@ page import="controller.BookMarkManagement" %><%--
  Created by IntelliJ IDEA.
  User: zhihu
  Date: 15/12/8
  Time: 下午4:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setCharacterEncoding("UTF-8");
    response.getWriter().write(BookMarkManagement.add(request.getParameter("title"),request.getParameter("address")));
%>
