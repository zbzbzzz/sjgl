<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<body>
	<div class="modal fade" id="user_info_modal" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class=" modal-dialog">
			<form id="info_form">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">个人中心</h4>
					</div>
					<div class="modal-body">
						<div id="main_body">
							<table class="tab">
								<tbody class="basic">
									<tr>
										<td>工号：</td>
										<td><input name="teacherAward.userId"
											class="form-control table_infomation" type="text"></td>
									</tr>
									<tr>
										<td>姓名：</td>
										<td><input class="form-control table_infomation"
											type="text"></td>
									</tr>
									<tr>
										<td>密码：</td>
										<td><input class="form-control table_infomation"
											type="text"></td>
									</tr>
								</tbody>

							</table>

						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
						<input name="teacherAward.awardId" id="tableid" type="hidden" />
						<button type="button" class="btn btn-danger review-info"
							data-dismiss="modal">提交修改</button>
					</div>
				</div>
			</form>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
</body>
</html>
