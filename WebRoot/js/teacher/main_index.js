var data = {
	tableName : "",
	dataState : "",
	page : 1,
	time_interval : "",
	tableId : "",
	export_name : "",
	export_id : "",
	fuzzy_query : "",
}

//保存分页信息
var pageDataInformation = {
	pageIndex : "",
	totalRecords : '',
	pageSize : '',
	totalPages : '',
	HavePrePage : '',
	HaveNextPage : '',
}
//记录分页信息方法
function setPageInfo(xhr_data) {
	pageDataInformation.HaveNextPage = xhr_data.HaveNextPage;
	pageDataInformation.HavePrePage = xhr_data.HavePrePage;
	pageDataInformation.pageIndex = xhr_data.pageIndex;
	pageDataInformation.pageSize = xhr_data.pageSize;
	pageDataInformation.totalPages = xhr_data.totalPages;
	pageDataInformation.totalRecords = xhr_data.totalRecords;
}

var info_data = {
	TeacherAward : { //奖励
		"teacherAward.awardType" : "",
		"teacherAward.awardName" : "",
		"teacherAward.awardUserNames" : "",
		"teacherAward.awardGrade" : "",
		"teacherAward.awardLevel" : "",
	},
	TeacherInfo : { //用户
		"teacherInfo.userId" : "",
		"teacherInfo.jobStatue" : "",
		"teacherInfo.highestDegree" : "",
		"teacherInfo.highestEducation" : "",
		"teacherInfo.learnEdgeStructure" : "",
		"teacherInfo.professionalTitle" : "",
		"teacherInfo.subjectCategory" : "",
		"teacherInfo.teachingProfessionName" : "",
		"teacherInfo.professionTeachingDate" : "",
		"teacherInfo.workDate" : "",
		"user.userName" : "",
	},
	TeacherPaper : { //论文
		"teacherPaper.userId" : "",
		"teacherPaper.paperName" : "",
		"teacherPaper.authorUserNames" : "",
		"teacherPaper.paperType" : "",
		"teacherPaper.periodical" : "",
		"teacherPaper.periodicalNo" : "",
	},
	TeacherPatent : { //专利
		"teacherPatent.patentName" : "",
		"teacherPatent.patentType" : "",
		"teacherPatent.authorizationNo" : "",
	},
	TeacherProject : { //项目
		"teacherProject.projectName" : "",
		"teacherProject.projectSource" : "",
		"teacherProject.projectUserNames" : "",
		"teacherProject.projectType" : "",
	},
	TeacherWorks : { //著作
		"teacherWorks.worksName" : "",
		"teacherWorks.worksType" : "",
		"teacherWorks.press" : "",
		"teacherWorks.isbn" : "",
		"teacherWorks.editorUserNames" : "",
		"teacherWorks.selectedSituation" : "",
		"teacherWorks.selectedDate" : "",
	},
	StudentInfo : { //学生模块模态框string赋空值
		"studentInfo.studentId" : "",
		"studentInfo.studentName" : "",
		"studentInfo.certificateNo" : "",
		"studentInfo.classNumber" : "",
		"studentInfo.className" : "",
		"studentInfo.departmentId" : "",
		"studentInfo.teacherTraining" : "",
		"studentInfo.deformed" : "",
	},
	StudentAward : { //学生模块模态框string赋空值
		"studentAward.awardId" : "",
		"studentAward.studentId" : "",
		"studentAward.awardName" : "",
		"studentAward.awardClass" : "",
		"studentAward.authorizationNo" : "",
		"studentAward.time" : "",
		"studentAward.firstAward" : "",
	},
	StudentClass : { //学生模块模态框string赋空值
		"studentClass.classId" : "",
		"studentClass.className" : "",
		"studentClass.userId" : "",
	},
	StudentPaper : { //学生模块模态框string赋空值
		"studentPaper.paperId" : "",
		"studentPaper.paperName" : "",
		"studentPaper.studentId" : "",
		"studentPaper.periodical" : "",
		"studentPaper.publishTime" : "",
		"studentPaper.includedSituation" : "",
	},
	StudentProject : { //学生模块模态框string赋空值
		"studentProject.projectId" : "",
		"studentProject.projectName" : "",
		"studentProject.studentId" : "",
		"studentProject.projectLeading" : "",
		"studentProject.userId" : "",
	},
	StudentPatent : { //学生模块模态框string赋空值
		"studentPatent.patentId" : "",
		"studentPatent.studentId" : "",
		"studentPatent.patentName" : "",
		"studentPatent.patentClass" : "",
		"studentPatent.authorizationNo" : "",
		"studentPatent.time" : "",
		"studentPatent.firstPatent" : "",
	},
	getQueryInfo : function() {
		return $.extend({}, data, this[data.tableName]);
	}
}

$(function() {
	$('.sidebar-menu .nav li a').click(function() {
		//重置页码
		data.page = 1;
		$(this).addClass("Atfer_li");
		$(this).parent().siblings().children().removeClass("Atfer_li");
		switch ($(this).text()) {
		case "人员调动": //只开放系统管理员操作
			$('.right-side').load('page/administrator/PersonnelRedeploy.jsp #content', function() {
				$.getScript("js/administrator/PersonnelRedeploy.js");
			});			break;
		case "管理员帐号": //只开放系统管理员操作
			$('.right-side').load('page/administrator/adminAccountManagement.jsp #content', function() {
				$.getScript("js/administrator/adminAccountManagement.js");
			});			break;
		case "教师信息审核": //管理员
			$('.right-side').load('page/teacher/teacher_information_audit.jsp #content', selectSeacher(), function() {
				data.dataState = "20";
				$.getScript("js/teacher/teacher_information_audit.js");
			});			break;
		case "教师信息管理": //管理员
			$('.right-side').load('page/teacher/teacher_Information_management.jsp #content', selectSeacher(), function() {
				data.dataState = "40";
				$.getScript("js/teacher/teacher_Information_management.js");
			});			break;
		case "学生信息审核": //管理员-学生信息审核
			$('.right-side').load('page/student/student_information_audit.jsp #content', function() {
				data.dataState = "20";
				$.getScript("js/student/student_information_audit.js");
			});			break;
		case "学生信息管理": //管理员-学生管理
			$('.right-side').load('page/student/student_information_management.jsp #content', function() {
				data.dataState = "40";
				$.getScript("js/student/student_information_management.js");
			});			break;
		case "学生信息查看": //教师用户登录时使用
			$('.right-side').load('page/student/user_information_management.jsp #content', function() {
				data.dataState = "%";
				$.getScript("js/student/user_Information_management.js");
			})			break;
		case "教师信息查看": //教师用户登录时使用
			$('.right-side').load('page/teacher/user_Information_management.jsp #content', selectSeacher(), function() {
				$.getScript("js/teacher/user_Information_management.js");
			})			break;
		default:
			break;
		}
	});
	//用户信息模态框
	$('#info_modal').on('hidden.bs.modal', function() {
		$(this).find('.basic').hide();
		$(this).find('.other').show();
	})
	//清除内容
	$("div[id$='_modal']").on('hidden.bs.modal', function() {
		$(this).find('.sure_add').hide();
		$(this).find('.sure_mod').hide();
		$(this).find('input').each(function() {
			$(this).val('');
		});
		$(this).find('select').each(function() {
			$(this).find('option:first-child').attr("selected", "selected");
		});
		$(this).find('.img-upload').children('div[class!="addInfo"]').remove();
	})
});


var m_check = {
	div : null,
	button : null,
	init : function(config) {
		this.div = $(config.id);
		this.input = $(config.id).find('button');
		this.before();
		//这边范围对应的对象，可以实现链式调用
		return this;
	},
	//渲染元素
	render : function() {
		var self = this;
		var div = this.div;
		this.div.children().on("click", function(e) {
			if (e.target.tagName == "SPAN") {
				e.target = e.target.parentElement;
			}
			if (e.target.tagName == "BUTTON") {
				var but = e.target;
				if (e.currentTarget.className == "checkbox") {
					//全选
					if (but.id == 'all') {
						//全部选择时
						if ($(but).children('i').hasClass('fa-check')) {
							div.find('.checkbox .pro').each(function() {
								self.checkout(this);
							});
						}
						//未全部选择时
						else {
							div.find('.checkbox .pro').each(function() {
								//部分已经选择，则不做再次的选择处理
								if ($(this).attr('disabled') == false || $(this).attr('disabled') == undefined) {
									self.checkin(this); //选中
								}
							});
						}
					//反选
					} else if (but.id == 'inverse') {
						div.find('.checkbox .pro').each(function() {
							//按钮可以点击，执行点击
							if ($(this).attr('disabled') == false || $(this).attr('disabled') == undefined) {
								self.checkin(this); //选中
							}
							//按钮不可以点击，则除去该条件，变为可点击
							else if ($(this).attr('disabled') == 'disabled') {
								self.checkout(this); //取消选中
							}
						});
					//选择点击
					} else {
						self.checkin(but);
						return; //不执行最后改变样式的方法
					}
					//最后执行
					//改变全选按钮的样式
					$(but).children('i').attr('class', self.getInverse($(but)));
				} else if (e.currentTarget.className == "tab-inneed") {
					self.checkout(but);
				}
			} else {
				return;
			}
		});
		self.after();
	},
	checkin : function(button) {
		this.div.children('.tab-inneed').append($(button).clone());
		$(button).attr('disabled', true).children('i').attr('class', this.getInverse(button));
	},
	checkout : function(button) {
		this.div.find('.checkbox button[value="' + $(button).val() + '"]').attr('disabled', false).children('i').attr('class', 'fa fa-times');
		this.div.find('.tab-inneed button[value="' + $(button).val() + '"]').remove();
	},
	getInverse : function(button) {
		return $(button).children('i').hasClass('fa-check') ? 'fa fa-times' : 'fa fa-check';
	},
	before : function() {
		if (this.div.hasClass('m_check')) {
			return;
		} else
			this.render();
	},
	after : function() {
		this.div.addClass('m_check');
	},
}

//用户重置自己密码
function user_setting() {
	var str = '<form id="user_setting" action="">' +
		'<table style="width:100%;">' +
		'<tbody>' +
		'<tr>' +
		'<td>工号</td>' +
		'<td><input type="text"class="form-control" name="user.userId"/></td>' +
		'</tr>' +
		'<tr>' +
		'<td>名字</td>' +
		'<td><input type="text"class="form-control"name="user.userName"/></td>' +
		'</tr>' +
		'<tr>' +
		'<td>密码</td>' +
		'<td><input type="text"class="form-control"name="user.password"/></td>' +
		'</tr>' +
		'</tbody>' +
		'</table>' +
		'</form>'
	$.confirm({
		title : '帐号信息设置',
		smoothContent : false,
		content : str,
		onContentReady : function() {
			$.post('/jxkyglxt/System/system_getAccountInformation', {}, function(xhr_data) {
				$('#user_setting table input').each(function() {
					//字符串截取
					var name = $(this).attr('name').substr(5);
					if (name != "password") {
						$('input[name="user.' + name + '"]').val(xhr_data[name]);
					}
				});
			}, 'json');
		},
		buttons : {
			deleteUser : {
				btnClass : 'btn-blue',
				text : '修改',
				action : function() {
					$.post('/jxkyglxt/System/system_modifyUserInfo', $('#user_setting').serialize(), function(xhr_data) {
						if (xhr_data.result.length > 1) {
							$('.userName_info').text(xhr_data.result);
							toastr.success("修改成功");
						} else {
							toastr.error("修改失败");
						}
					}, 'json');
				}
			},
			cancelAction : {
				btnClass : 'btn-default',
				text : '取消',
			}
		}
	});
}

/* 表单判空验证*/
function formValidate() {
	$('.tab input').blur(function() {
		if ($(this).val() == "") {
			/* $(this).addClass('has-error');
			 $(this).parent().prev('td').css({
	        			  "color":"red"
			 })*/
			$(this).after('<span>' + '<img src="img/cuo.png"/>' + 不能为空 + '</span>');
		} else {
			$(this).removeClass('has-error ');
			$(this).parent().prev('td').css({
				"color" : "#444444"
			})
		}
	})
}


//附件上传
function AttachmentUpload(url, formData) {
	var result = false;
	$.ajax({
		url : url,
		type : "POST",
		async : false,
		dataType : "json",
		data : formData,
		processData : false,
		contentType : false,
		success : function(sxh_data) {
			result = sxh_data.result == "success" ? true : false;
		},
		error : function(data) {
			console.log("error");
		}
	});
	return result;
}

/*导入信息*/
function import_to_database() {
	$.confirm({
		title : '确定导入?',
		smoothContent : false,
		content : '选择导入的数据文件（仅限execl）：<button onclick="javascript:$(\'#importdata\').click()" class="btn btn-sm btn-primary">选择</button><input style="display:none;" type="file" id="importdata">',
		buttons : {
			deleteUser : {
				btnClass : 'btn-danger',
				text : '确定',
				action : function() {
					var formData = new FormData();
					formData.append("file", $("#importdata").get(0).files[0]);
					if (formData != null) {
						$.ajax({
							url : "Admin/admin_importDatabase",
							type : "post",
							timeout : 3000,
							data : formData,
							contentType : false,
							processData : false,
							success : function(data) {
								$.alert('导入成功!')
							},
							error : function() {}
						});
					} else {
						$.alert('选择文件!')
					}
				}
			},
			cancelAction : {
				btnClass : 'btn-blue',
				text : '取消',
			}
		}
	});
}

/*  输入身份证号自动填入性别，出生日期     */
function getinfoByCardId() {
	$(document).on("blur", ".card_num", function() {
		var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
		var card_num = $(".card_num").val();
		if (reg.test(card_num) == false) {
			toastr.error("身份证号错误！");
			return;
		} else {
			if (parseInt(card_num.substr(16, 1)) % 2 == 1) {
				$(".sele").find("option[value='男']").attr("selected", "selected");
			//是男则执行代码 ...
			} else {
				$(".sele").find("option[value='女']").attr("selected", "selected");
			//是女则执行代码 ...
			}
			$(".bir").val(card_num.substring(6, 10) + "-" + card_num.substring(10, 12) + "-" + card_num.substring(12, 14));
		}
	});
}

document.addEventListener('visibilitychange', function() {
	if (document.visibilityState == 'hidden') {
		normal_title = document.title;
		document.title = '[在线] - 师生信息管理系统';
	} else {
		document.title = normal_title;
	}
});

//日期
$('.mydate').datetimepicker({
	yearStart : 1990, // 设置最小年份
	yearEnd : 2050, // 设置最大年份
	yearOffset : 0, // 年偏差
	timepicker : false, // 关闭时间选项
	format : 'Y-m-d', // 格式化日期年-月-日
	minDate : '1990/01/01', // 设置最小日期
	maxDate : '2030/01/01', // 设置最大日期
});

//包含图片的全部操作
var ImgManiFunc = {
	previewFile : function(input_obj) {
		var files = $(input_obj).prop('files');
		var modal_id = $('#' + $(input_obj).attr('upload-type') + "_modal");
		var add_div = modal_id.find('.addInfo');
		for (var i in files) {
			var reader = new FileReader();
			reader.onloadend = function() {
				add_div.before('<div class="img-default">' + '<div class="img">'
					+ '<img effect="imgshow" src="' + this.result + '" alt="" class="img-show">'
					+ '</div>'
					+ '<div class="img-info">'
					+ '<div class="img-control-btn img-modify-btn" title="编辑">'
					+ '<img effect="imgmodi" src="img/modi(5).png" />'
					+ '</div>'
					+ '<div class="img-control-btn img-delete-btn" title="删除">'
					+ '<img effect="imgdel" src="img/delete(2).png" />'
					+ '</div>'
					+ '</div>'
					+ '<input type="file" name="" onchange="ImgManiFunc.modiFiles(this)" accept="image/gif, image/pdf, image/png, image/jpeg" style="display:none" >'
					+ '</div>')
				modal_id.find('.img-delete-btn').unbind().click(function() {
					$(this).parent().parent().remove();
				});
				modal_id.find('.img-modify-btn').unbind().click(function() {
					$(this).parent().siblings('input').click();
				});
				modal_id.find('.img-show').zoomify();
			}
			reader.readAsDataURL(files[i]);
		}
	},
	modiFiles : function(this_obj) {
		var files = $(this_obj).prop('files')[0];
		var reader = new FileReader();
		reader.onloadend = function() {
			$(this_obj).siblings().children('img').attr("src", this.result);
		}
		reader.readAsDataURL(files);
	},
	setImgDiv : function(pahtValue, userid) {
		return `<div class="img-default"><div class="img">
	   <img effect="imgshow" src="/jxkyglxt/System/system_Attachment?attachmentUserid=${userid}&attachmentName=${pahtValue}!${data.tableName}" alt="" class="img-show"></div>
	   <div class="info">
		   <div class="img-control-btn img-modify-btn" title="编辑">
		   <img effect="imgmodi" src="img/modi(5).png" /></div>
		   <div class="img-control-btn img-delete-btn" title="删除">
		   <img effect="imgdel" src="img/delete(2).png" /></div>
	   </div>
	   <input type="file" name="" onchange="ImgManiFunc.modiFiles(this)" accept="image/gif, image/pdf, image/png, image/jpeg" style="display:none" >
	 </div>`

	},
}

$('.img-upload').on("click", function(e) {
	var Ele = e.target;
	if (Ele.tagName == "IMG") {
		var effect_ = Ele.attributes.effect.value;
		if (effect_ == "imgadd") {
			$(Ele).parent().parent().next().click();
		} else if (effect_ == "imgmodi") {
			var fil_input = $(Ele).parent().parent().next();
			ImgManiFunc.modiFiles(fil_input);
		} else if (effect_ == "imgdel") {
			$(Ele).parent().parent().parent().remove();
		}
	} else {
	}
});
$("body").on("click", ".img-show", function() {
	$(this).zoomify("zoom");
})

/*图片预览
function previewFile(input_obj) {
	var files = $(input_obj).prop('files');
	var modal_id = $('#' + $(input_obj).attr('upload-type') + "_modal");
	var add_div = modal_id.find('.addInfo');
	for (var i in files) {
		var reader = new FileReader();
		reader.onloadend = function() {
			add_div.before('<div class="img-default">' + '<div class="img">'
				+ '<img src="' + this.result + '" alt="" class="img-show">'
				+ '</div>'
				+ '<div class="img-info">'
				+ '<div class="img-control-btn img-modify-btn" title="编辑">'
				+ '<img src="img/modi(5).png" />'
				+ '</div>'
				+ '<div class="img-control-btn img-delete-btn" title="删除">'
				+ '<img src="img/delete(2).png" />'
				+ '</div>'
				+ '</div>'
				+ '<input type="file" name="" onchange="modiFiles(this)" accept="image/gif, image/pdf, image/png, image/jpeg" style="display:none" >'
				+ '</div>')
			modal_id.find('.img-delete-btn').unbind().click(function() {
				$(this).parent().parent().remove();
			});
			modal_id.find('.img-modify-btn').unbind().click(function() {
				$(this).parent().siblings('input').click();
			});
			modal_id.find('.img-show').zoomify();
		}
		reader.readAsDataURL(files[i]);
	}
}

修改上传的图片
function modiFiles(this_obj) {
	var files = $(this_obj).prop('files')[0];
	var reader = new FileReader();
	reader.onloadend = function() {
		$(this_obj).siblings().children('img').attr("src", this.result);
	}
	reader.readAsDataURL(files);
}

//设置通过附件地址获得的图片，并放入盒子内
function setImgDiv(pahtValue) {
	return `<div class="img-default">
   <div class="img">
     <img src="/jxkyglxt/System/system_Attachment?attachmentName=${pahtValue}!${data.tableName}" alt="" class="img-show">
   </div>
   <div class="info" onclick="javascript:$(this).prev().find('img').click()">
     <div class="img-control-btn img-modify-btn" title="编辑">
       <img effect="imgmodi" src="img/modi(5).png" />
     </div>
   <div class="img-control-btn img-delete-btn" title="删除">
     <img effect="imgdel" src="img/delete(2).png" />
   </div>
   </div>
   <input type="file" name="" onchange="modiFiles(this)" accept="image/gif, image/pdf, image/png, image/jpeg" style="display:none" >
 </div>`
}*/

function selectSeacher() {
	$(document).on("change", "#all_options", function() {
		var option = $(this).find('option:selected');
		var pla = '';
		switch ($(this).val()) {
		case 'userName':
			pla = '请输入姓名';
			break;
		case 'userId':
			pla = '请输入工号';
			break;
		case 'jobStatue':
			pla = '请输入任职状态';
			break;
		case 'highestDegree':
			pla = '请输入最高学位';
			break;
		case 'highestEducation':
			pla = '请输入最高学历';
			break;
		case 'learnEdgeStructure':
			pla = '请输入学缘';
			break;
		case 'professionalTitle':
			pla = '请输入专业技术职称';
			break;
		case 'subjectCategory':
			pla = '请输入学科类别';
			break;
		case 'teachingProfessionName':
			pla = '请输入任教专业名称';
			break;
		case 'professionTeachingDate':
			pla = '任教';
			break;
		case 'workDate':
			pla = '参加';
			break;
		case 'awardType':
			pla = '请输入获奖类型';
			break;
		case 'awardName':
			pla = '请输入获奖名称';
			break;
		case 'awardUserNames':
			pla = '请输入获奖人姓名';
			break;
		case 'awardGrade':
			pla = '请输入获奖等级';
			break;
		case 'awardLevel':
			pla = '请输入获奖级别';
			break;
		case 'awardTime':
			pla = '请输入获奖时间';
			break;
		case 'worksName':
			pla = '请输入著作（专著）名称';
			break;
		case 'worksType':
			pla = '请输入著作类别';
			break;
		case 'press':
			pla = '请输入出版社';
			break;
		case 'isbn':
			pla = '请输入ISBN';
			break;
		case 'publishTime':
			pla = '请输入出版时间';
			break;
		case 'selectedSituation':
			pla = '请输入入选情况';
			break;
		case 'selectedDate':
			pla = '请输入入选时间';
			break;
		case 'editorUserNames':
			pla = '请输入主编（作者）';
			break;
		case 'paperName':
			pla = '请输入论文名称';
			break;
		case 'paperType':
			pla = '请输入论文类别';
			break;
		case 'periodical':
			pla = '请输入发表期刊';
			break;
		case 'periodicalNo':
			pla = '请输入期号';
			break;
		case 'includedSituation':
			pla = '请输入收录情况';
			break;
		case 'totalCitations':
			pla = '请输入他引次数';
			break;
		case 'wordsNum':
			pla = '请输入成果字数';
			break;
		case 'publishTime':
			pla = '请输入发表日期';
			break;
		case 'patentName':
			pla = '请输入专利名称';
			break;
		case 'patentType':
			pla = '请输入专利类型';
			break;
		case 'authorizationNo':
			pla = '请输入授权号';
			break;
		case 'approvedDate':
			pla = '请输入获批时间';
			break;
		case 'projectName':
			pla = '请输入项目名称';
			break;
		case 'projectType':
			pla = '请输入项目类型';
			break;
		case 'projectSource':
			pla = '请输入项目来源';
			break;
		case 'projectUserNames':
			pla = '请输入成员姓名';
			break;
		case 'approvalDate':
			pla = '请输入立项时间';
			break;
		case 'endUpDate':
			pla = '请输入结题验收时间';
			break;
		default:
			break;
		}
		if (option.hasClass('true') || pla == "") {
			return;
		} else {
			var con = $(this).val();
			if ((con.indexOf("Date")) >= 0 || (con.indexOf("Time")) >= 0) {
				$(".all_options").siblings('#search_input').append('<div id="main_body">' + '<div id="' + $(this).val() + '" class="dateinput_div form-group">' +
					'<input type="text"  placeholder="' + pla + '搜索起始时间" class="form-control  riliDate"  />' + '--' +
					'<input type="text"  placeholder="' + pla + '搜索结束时间" class="form-control  riliDate" />' +
					'<button class="btn btn-primary"><i class="fa fa-times" aria-hidden="true"></i></button></div></div>')
				option.addClass('true');
				$('.dateinput_div button').click(function() {
					option.removeClass('true');
					//移除时候清空js中已存的数据
					info_data[data.tableName][data.tableName.replace("T", "t") + "." + $(this).parent().val()] = "";
					$(this).parent().remove();
				});
			} else {
				$(".all_options").siblings('#search_input').append('<div id="' + $(this).val() + '" class="input_div form-group">' +
					'<input type="text"  placeholder="' + pla + '" class="form-control"/>' +
					'<button class="btn btn-primary"><i class="fa fa-times" aria-hidden="true"></i></button></div>')
				option.addClass('true');
				$('.input_div button').click(function() {
					option.removeClass('true');
					//移除时候清空js中已存的数据
					if (con == "userName") {
						info_data["TeacherInfo"]["user.userName"] = "";
					} else {
						info_data[data.tableName][data.tableName.replace("T", "t") + "." + $(this).parent().val()] = "";
					}
					$(this).parent().remove();
					$(this).parent().empty();
				});

			}
		}
	})
}