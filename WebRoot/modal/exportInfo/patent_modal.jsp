<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<body>
	<div class="modal fade" id="export_patent" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class=" modal-dialog modal-lg">

			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">信息管理-导出</h4>
				</div>
				<div class="modal-body  " id="modal-content">
					<div class="tab_content">
						<div id="check" class="checkbox">
							<ul class="group-list">
								<li><button id="all" class="btn btn-info btn-sm">
										<i class="fa fa-times" aria-hidden="true"></i> <span>全选</span>
									</button></li>
								<li><button id="inverse" class="btn btn-info btn-sm">
										<i class="fa fa-times" aria-hidden="true"></i> <span>反选</span>
									</button></li>
							</ul>
							<ul class="group-list">

								<li><button value="2" class="btn btn-info btn-sm pro">
										<i class="fa fa-times" aria-hidden="true"></i> <span>专利名称</span>
									</button></li>
								<li><button value="3" class="btn btn-info btn-sm pro">
										<i class="fa fa-times" aria-hidden="true"></i> <span>作者</span>
									</button></li>
								<li><button value="4" class="btn btn-info btn-sm pro">
										<i class="fa fa-times" aria-hidden="true"></i> <span>作者工号_排名</span>
									</button></li>
								<li><button value="5" class="btn btn-info btn-sm pro">
										<i class="fa fa-times" aria-hidden="true"></i> <span>专利类型</span>
									</button></li>
								<li><button value="6" class="btn btn-info btn-sm pro">
										<i class="fa fa-times" aria-hidden="true"></i> <span>授权号</span>
									</button></li>
							</ul>
							<ul class="group-list">
								<li><button value="7" class="btn btn-info btn-sm pro">
										<i class="fa fa-times" aria-hidden="true"></i> <span>获批日期</span>
									</button></li>
								<li><button value="8" class="btn btn-info btn-sm pro">
										<i class="fa fa-times" aria-hidden="true"></i> <span>是否应用</span>
									</button></li>
								<li><button value="9" class="btn btn-info btn-sm pro">
										<i class="fa fa-times" aria-hidden="true"></i> <span>是否行业联合专利（著作权）</span>
									</button></li>
							</ul>
						</div>
						<div class="tab-inneed"></div>
					</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-primary export_button"
						data-dismiss="modal">导出</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭
					</button>
					<input name="teacherPatent.patentId" id="tableid" type="hidden" />
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
</body>
</html>
