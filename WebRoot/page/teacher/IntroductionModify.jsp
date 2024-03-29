<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
</head>

<body>
	<!--管理员审核信息时右侧内容-->
	<section class="content" id="content">
	<div class="row">
		<div class="col-md-12">
			<!--breadcrumbs start -->
			<ul class="breadcrumb">
				<li><a href="javascript:location.reload();"><i class="fa fa-home"></i> 首页</a></li>
			</ul>
			<!--breadcrumbs end -->
		</div>
	</div>
	<!-- 访问首页介绍的信息 --> 
	<s:action namespace="/System" name="system_getIntroduction" executeResult="false"></s:action>
	<div class="row">
		<div class="col-md-12">
			<!--breadcrumbs start -->
			<section class="panel general"> <header
				class="panel-heading"> 首页信息管理
			<button style="float: right; margin-top: -4px;" class="btn btn-primary btn-sm introduction_add">
				<i class="fa fa-plus"></i>添加用户
			</button>
			</header>
			<div class="panel-body table-responsive col-md-6">
				<div class="list-group">
					<s:iterator value="#request.Introductions" status="st">
						<s:if test="#st.odd">
							<a class="list-group-item"
								introduction-id="<s:property value="introductionId"/>"><span
								class="badge"><s:property value="introductionRanking" />
							</span> <s:property value="introductionName" /> </a>
						</s:if>
					</s:iterator>
				</div>
			</div>
			<div class="panel-body table-responsive col-md-6">
				<div class="list-group">
					<s:iterator value="#request.Introductions" status="st">
						<s:if test="#st.even">
							<a class="list-group-item"
								introduction-id="<s:property value="introductionId"/>"><span
								class="badge"><s:property value="introductionRanking" /></span>
								<s:property value="introductionName" /> </a>
						</s:if>
					</s:iterator>
				</div>
			</div>
			</section>
			<!--breadcrumbs end -->
		</div>
	</div>
	</section>
</body>
</html>
