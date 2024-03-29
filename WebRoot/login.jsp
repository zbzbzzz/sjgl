<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>登录到系统</title>
<!-- 提示框css -->
<link rel="stylesheet" href="<%=basePath%>css/toastr.css" />
<link rel="stylesheet" href="<%=basePath%>/css/bootstrap.min.css" />
<link rel="stylesheet" href="<%=basePath%>/css/login.css" />
</head>
<body>
	<div id="main_container">
		<div id="login_content">
			<div id="login_logo">
				<img src="<%=basePath%>/img/logo5.png" />
			</div>
			<div id="login_form">

				<form action="">
					<div class="group-form">
						<input class="form-control" type="text" name="user_id"
							placeholder="请输入用户名">
					</div>
					<div class="group-form">
						<input class="form-control" type="password" name="password"
							placeholder="请输入密码">
					</div>
					<div class="group-form">
						<input class="login_button" onclick="fun()" type="button"
							value="登录">
					</div>

				</form>

			</div>
		</div>
		<div id="copyRight">CopyRight@2018 本科数据管理系统 版权所有</div>
	</div>


	<script type="text/javascript"
		src="<%=basePath%>js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/toastr.js"></script>
	<script type="text/javascript">
		function fun() {
			$.ajax({
				url : "/jxkyglxt/System/system_login",
				type : "post",
				timeout : 3000,
				data : $("form").serialize(),
				dataType : "json",
				success : function(xhr_data) {
	
					if (xhr_data.result == "success") {
						location.href = "page/main_index.jsp";
					} else {
						toastr.error("登录失败，" + xhr_data.result);
					}
				},
				error : function() {}
			});
		}
	
		//回车事件
		document.onkeydown = function(event) {
			var e = event || window.event;
			if (e && e.keyCode == 13) { //回车键的键值为13
				$(".login_button").click(); //调用登录按钮的登录事件
			}
		};
	</script>
</body>
</html>