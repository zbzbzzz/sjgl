<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<body>
	<!-- 模态框（Modal） -->
	<div class="modal fade" id="patent_modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class=" modal-dialog">
			<form id="info_form">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">专利</h4>
					</div>
					<div class="modal-body">
						<div id="main_body">
							<table class="tab com-table">
								<tr>
									<td>专利名称:</td>
									<td><input name="teacherPatent.patentName"
										class="form-control table_infomation" type="text"></td>
									<td>作者姓名:</td>
									<td><input name="teacherPatent.authorUserNames"
										class="form-control table_infomation" type="text"></td>
								</tr>
								<tr>
									<td>作者工号_排名:</td>
									<td><input name="teacherPatent.authorUserIds"
										class="form-control table_infomation" type="text"></td>
									<td>专利类型:</td>
									<td><input name="teacherPatent.patentType"
										class="form-control table_infomation" type="text"></td>
								</tr>
								<tr>
									<td>授权号:</td>
									<td><input name="teacherPatent.authorizationNo"
										class="form-control table_infomation" type="text"></td>
									<td>获批日期:</td>
									<td><input name="teacherPatent.approvedDate"
										class="form-control table_infomation laydate-icon"
										onfocus="time()" type="text"></td>
								</tr>
								<tr>
									<td>是否应用:</td>
									<td><select name="teacherPatent.isApplication"
										class="form-control table_infomation">
											<option>否</option>
											<option>是</option>
									</select></td>
									<td>行业联合专利(著作权):</td>
									<td><select name="teacherPatent.sfhylh"
										class="form-control table_infomation">
											<option>否</option>
											<option>是</option>
									</select></td>
								</tr>
								<tr class="img-control">
									<td>附件:</td>
									<td colspan="3" class="img-upload">
										<div class="addInfo">
											<div class="img-control-btn">
												<img effect="imgadd" src="img/add.png" />
											</div>
										</div> <input name="" upload-type="patent" type="file" multiple
										onchange="ImgManiFunc.previewFile(this)"
										accept="image/gif, image/pdf, image/png, image/jpeg"
										style="display:none">
									</td>
								</tr>
							</table>

						</div>
					</div>
					<div class="modal-footer">
						<button style="display: none;" type="button"
							class="btn btn-danger sure_add">添加</button>
						<button style="display: none;" type="button"
							class="btn btn-danger sure_mod">修改</button>
						<button type="button" class="btn btn-default close-btn"
							data-dismiss="modal">关闭</button>
						<input name="teacherPatent.patentId" id="tableid" type="hidden" />
						<!-- 	<button type="button" class="btn btn-danger review-info"
							data-dismiss="modal">信息未审核</button> -->
					</div>
				</div>
			</form>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
</body>
</html>
