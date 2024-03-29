<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<body>
	<!-- 模态框（Modal） -->
	<div class="modal fade" id="works_modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class=" modal-dialog">
			<form id="info_form">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">著作</h4>
					</div>
					<div class="modal-body">
						<div id="main_body">
							<table class="tab com-table">
								<tr>
									<td>著作(专著)名称:</td>
									<td><input name="teacherWorks.worksName"
										class="form-control table_infomation" type="text"></td>
									<td>著作类别:</td>
									<td><select name="teacherWorks.worksType"
										class="form-control table_infomation">
											<option>教材</option>
											<option>专著</option>
											<option>译著</option>
											<option>辞书</option>
									</select></td>
								</tr>
								<tr>
									<td>出版社:</td>
									<td><input name="teacherWorks.press"
										class="form-control table_infomation" type="text"></td>
									<td>ISBN:</td>
									<td><input name="teacherWorks.isbn"
										class="form-control table_infomation" type="text"></td>
								</tr>
								<tr>
									<td>入选情况:</td>
									<td><select name="teacherWorks.selectedSituation"
										class="form-control table_infomation">
											<option>国家级规划教材</option>
											<option>省部级规划教材</option>
											<option>国家级精品教材</option>
											<option>省部级精品教材</option>
									</select></td>
									<td>入选时间:</td>
									<td><input name="teacherWorks.selectedDate"
										class="form-control  table_infomation mydate" onfocus="time()"
										type="text"></td>
								</tr>
								<tr>
									<td>主编(作者):</td>
									<td><input name="teacherWorks.editorUserNames"
										class="form-control table_infomation" type="text"></td>
									<td>副主编:</td>
									<td><input name="teacherWorks.subEditorUserNames"
										class="form-control table_infomation" type="text"></td>
								</tr>
								<tr>
									<td>主编工号_排名:</td>
									<td><input name="teacherWorks.editorUserIds"
										class="form-control table_infomation" type="text"></td>
									<td>副主编工号_排名:</td>
									<td><input name="teacherWorks.subEditorUserIds"
										class="form-control table_infomation" type="text"></td>
								</tr>
								<tr>
									<td>参编:</td>
									<td><input name="teacherWorks.associateEditorUserNames"
										class="form-control table_infomation" type="text"></td>
									<td>出版时间:</td>
									<td><input name="teacherWorks.publishTime"
										class="form-control  table_infomation mydate" onfocus="time()"
										type="text"></td>
								</tr>
								<tr>
									<td>参编工号_排名:</td>
									<td><input name="teacherWorks.associateEditorUserIds"
										class="form-control table_infomation" type="text"></td>
								</tr>
								<tr class="img-control">
									<td>附件:</td>
									<td colspan="3" class="img-upload">
										<div class="addInfo">
											<div class="img-control-btn">
												<img effect="imgadd" src="img/add.png" />
											</div>
										</div> <input name="" upload-type="works" type="file" multiple
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
						<input name="teacherWorks.worksId" id="tableid" type="hidden" />
						<!-- <button type="button" class="btn btn-danger review-info"
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
