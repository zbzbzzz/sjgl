$(function() {
	var parent_div = null;
	var a_href = null;
	var infoType = null;
	var modal_id = null;

	//信息添加
	var add_info = function() {
		$("#" + modal_id).find('.sure_add').show();
		$("#" + modal_id).modal({
			keyboard : true
		})
	}
	/*============================================================================模态框按钮事件绑定系列*/
	$.each([ '#student_award_modal', '#student_info_modal', '#student_paper_modal', '#student_patent_modal', '#student_project_modal' ], function(index, value) {
		$(value).on('hidden.bs.modal', function() {
			$(value).find('.sure_add').show();
			$(value).find('.sure_mod').hide();
		})
	});

	var getinfoByCardIdk = function(event) {
		if (event.keyCode == 13) {
			var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
			var card_num = $(this).val();
			if (reg.test(card_num) === false) {
				$(this).val("");
			} else {
				if (parseInt(card_num.substr(16, 1)) % 2 == 1) {
					$('select[name="StudentInfo.sex"]').find("option[value='男']").attr("selected", "selected");
				//是男则执行代码 ...
				} else {
					$('select[name="StudentInfo.sex"]').find("option[value='女']").attr("selected", "selected");
				//是女则执行代码 ...
				}
				$('input[name="StudentInfo.birthday"]').val(card_num.substring(6, 10) + "-" + card_num.substring(10, 12) + "-" + card_num.substring(12, 14));
			}
		}
	}

	//提交审核
	var commit_info = function() {
		var id = $(this).siblings('input').val();
		$.confirm({
			title : '确认提交？',
			smoothContent : false,
			content : false,
			autoClose : 'cancelAction|10000',
			buttons : {
				deleteUser : {
					btnClass : 'btn-danger',
					text : '确认',
					action : function() {
						$.post('/jxkyglxt/Student/student_LiftCuring', {
							tableId : id,
							tableName : data.tableName,
							dataState : "20",
						}, function(xhr_data) {
							xhr_data = JSON.parse(xhr_data);
							console.log(xhr_data);
							if (xhr_data.result == "success") {
								toastr.success("提交成功");
								doQuery();
							} else {
								toastr.error("提交失败");
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
	var export_info = function() {
		//显示确认导出按钮
		parent_div.find('.sure_export').show();
		//如果为用户导出则不执行给tr点击事件
		if (a_href == "info") return;
		//给每行的tr给与点击事件，通过点击tr来让checkbox选中
		var tr = parent_div.find('#info_table tbody tr');
		tr.each(function() {
			$(this).find("td:first").empty().append('<input name="check" type="checkbox">');
		});
		tr.on("click", function() {
			var check_attr = $(this).find('td input[name="check"]').is(":checked");
			if (check_attr == false) {
				$(this).find('td input[name="check"]').attr("checked", "true");
			} else {
				$(this).find('td input[name="check"]').removeAttr("checked");
			}
		});
	}

	//确定导出
	var sure_export = function() {
		/**
		 * 用户界面的用户信息导出为单条信息导出（只需一条记录的id），和管理员的批量导出有所不同
		 */
		if (a_href == "info") {
			data.export_id = $('input[name="studentInfo.studentId"]').val() + ",";
		} else {
			parent_div.find('#info_table tbody tr').each(function() {
				if (($(this).find(' input[name="check"]').is(':checked')) == true) {
					data.export_id += $(this).find('input[type="hidden"]').val() + ',';
				}
			})
		}
		//通过a标签的链接属性，判断是哪一个导出模态框内的值
		$('#student_export_' + a_href + ' .group-list button').each(function() {
			if (($(this).children('i').hasClass('fa-check')) && $(this).attr('value') != undefined) {
				data.export_name += $(this).val() + ',';
			}
		})

		if (data.export_id != "" && data.export_name != "") {
			console.log("export_id=" + (data.export_id).substring(0, data.export_id.length - 1) + "&export_name=" + (data.export_name).substring(0, data.export_name.length - 1));
			location.href = "/jxkyglxt/Student/student_ExportExcelCollection?tableName=" + data.tableName + "&export_id=" + (data.export_id).substring(0, data.export_id.length - 1) + "&export_name=" + (data.export_name).substring(0, data.export_name.length - 1);
		} else {
			toastr.error("未选择数据");
		}
		data.export_id = "";
		data.export_name = "";
		//移除点击事件
		parent_div.find('#info_table tbody tr').unbind();
		//确认导出按钮隐藏,this为当前被点击的元素
		parent_div.find('.sure_export').hide();
		parent_div.find('.all_sure_export').hide();
		//将tr的第一个td返回显为数字
		parent_div.find('#info_table tbody tr').each(function(i, v) {
			$(this).children('td:first-child').empty().html(i + 1);
		})
	}

	//用户信息修改
	var modiInfo = function() {
		//获取id
		var id = $(this).siblings('input').val();
		//查询单条信息
		$.post("/jxkyglxt/Student/student_getStudentOneInfo",
			{
				tableId : id,
				tableName : data.tableName
			}, function(xhr) {
				//data.tableName中获取当前的表名称，进行判断对具体哪一个模态框进行操作
				//console.log($("#" + modal_id + " form"));
				$("#" + modal_id + " form").find("input,select").each(function() {
					var na = $(this).attr("name").split(".")[1];
					$(this).val(xhr.object[na]);
				})
				$("#" + modal_id).find('.sure_add').hide();
				//确定修改按钮显示并添加绑定事件
				$("#" + modal_id).find('.sure_mod').unbind().click(function() {
					var review_data = $("#" + modal_id + " form").serialize() + "&tableName=" + data.tableName;
					$.post("/jxkyglxt/Student/student_updateStudentAllInfo", review_data, function(sxh_data) {
						if (sxh_data.result == "success") {
							toastr.success("修改成功!");
							$("#" + modal_id).modal('hide');
							doQuery();
						}
					}, "json")
				}).show();
				$("#" + modal_id).modal({
					keyboard : true
				})
			}, "json");

	}

	//查看信息(不包含用户信息)
	var viewInfo = function() {
		//获取id
		var id = $(this).siblings('input').val();
		//查询单条信息
		$("#" + modal_id).find('.sure_add').hide();
		$("#" + modal_id).find('.sure_modi').hide();
		$.post("/jxkyglxt/Student/student_getStudentOneInfo",
			{
				tableId : id,
				tableName : data.tableName
			}, function(xhr) {
				//data.tableName中获取当前的表名称，进行判断对具体哪一个模态框进行操作
				$("#" + modal_id + " .modal-body").find("input,select").each(function() {
					var na = $(this).attr("name").split(".")[1];
					$(this).val(xhr.object[na]);
				})
				//显示出模态框
				$("#" + modal_id).modal({
					keyboard : true
				})
			}, "json");
	}



	$('.nav-tabs li a').click(function() {
		//如果已经是点击状态，则点击不作为
		if ($(this).parent('li').attr('class') == 'active') return;
		//重置页码
		data.page = 1;
		//将所有的确认导出按钮隐藏
		$('.sure_export').hide();
		//清空模糊查询内容
		data.fuzzy_query = '';
		//除去链接属性中的#号
		a_href = $(this).attr("href").substr(1);
		//获取panel-body内和所点击的类别相对应的div父元素
		parent_div = $('#' + a_href);
		//条件筛选清空
		parent_div.find("#search_input").empty();
		//通过点击的a标签的链接属性，来给全局对象data.tableName赋值
		data.tableName = "Student" + a_href.substring(0, 1).toUpperCase() + a_href.substring(1);
		//infoType，除去Student前部分
		infoType = data.tableName.replace("Student", "");
		//modal_id，最终获取到的模态框id
		modal_id = "student_" + infoType.substring(0, 1).toLowerCase() + infoType.substring(1) + "_modal";
		//执行查询操作
		doQuery();
		//导出模态框初始化
		m_check.init({
			id : '#student_export_' + a_href + ' .tab_content'
		});
	});
	//添加按钮点击事件
	$('.add-btn').click(add_info);
	//确认添加按钮点击事件
	$('.sure_add').click(function() {
		var review_data = $("#" + modal_id + " form").serialize() + "&tableName=" + data.tableName;
		$.post("/jxkyglxt/Student/student_setStudentAllInfo", review_data, function(sxh_data) {
			if (sxh_data.result == "success") {
				toastr.success("添加成功！");
			}
		}, "json")
	});
	$('.card_num').keyup(getinfoByCardIdk);
	//导出按钮点击事件
	$('.export_button').click(export_info);
	//确认导出按钮点击事件
	$('.sure_export').click(sure_export);
	//所有通过名字来获取ID的input绑定事件
	$('input[name$="UserNames"]').keyup(function() {
		if ($(this).val() == "") {
			return;
		}
		var Waiting = $(this).attr('name').replace("UserNames", "UserIds");
		$.post('/jxkyglxt/Student/student_getUserIdOrderingByUserName', {
			"user.userName" : $(this).val()
		}, function(xhr) {
			$('input[name="' + Waiting + '"]').val(xhr.result);
		}, 'json')

	})
	//日期输入框点击事件
	//指定查询
	$('.search_info').click(function() {
		var this_object = $(this);
		if (this_object.text().trim() == "确认搜索") {
			var name = '';
			var value = '';
			this_object.siblings('#search_input').find('div').each(function() {
				name = data.tableName.replace("Student", "student") + '.' + $(this).attr('id').replace("Inputu", "");
				var val_arr = [];
				$(this).find('input').each(function() {
					val_arr.push($(this).val());
				});
				//value = $(this).find('input').val();
				//将搜索的内容放入js的数据中
				data[name] = val_arr.join(",");
			});
			doQuery();
		} else if (this_object.text().trim() == "清空搜索") {
			$.confirm({
				title : '确定清空?',
				smoothContent : false,
				content : false,
				autoClose : 'cancelAction|10000',
				buttons : {
					deleteUser : {
						btnClass : 'btn-danger',
						text : '确定',
						action : function() {
							this_object.siblings('#search_input').empty();
							$.each(data, function(k, v) {
								if (k.indexOf('student') > -1) {
									data[k] = "";
								}
							})
							doQuery();
						}
					},
					cancelAction : {
						btnClass : 'btn-blue',
						text : '取消',
					}
				}
			});
		}
	});
	//模糊查询
	$('.fuzzy_query').click(function() {
		data.fuzzy_query = $(this).parent().prev().val();
		doQuery();
	});

	//查询方法
	function doQuery() {
		$.ajax({
			url : "/jxkyglxt/Student/student_getSpecifiedInformationByPaging",
			type : "post",
			async : false,
			timeout : 3000,
			data : data,
			dataType : "json",
			success : function(xhr_data) {
				console.log('#' + a_href);
				$('#' + a_href).find('table tbody').html(getStr(xhr_data));

				$('.viewButton').click(viewInfo);
				$('.modiButton').click(modiInfo);
				//提交审核点击事件
				$('.commmit-btn').click(commit_info);
			},
			error : function() {
				toastr.error('服务器错误!');
			}
		});
	}

	//通过a标签的href属性，获取查询到的组合成的字符串结果
	function getStr(xhr) {
		var str = "";
		var dataStatus = '';
		switch (a_href) {
		case 'info':
			for (i = 0; i < xhr.ObjDatas.length; i++) {
				dataStatus = xhr.ObjDatas[i].object.dataStatus;
				str += `<tr>
			<td>${(i + 1)}</td>
			<td>${xhr.ObjDatas[i].object.studentId}</td>
			<td>${xhr.ObjDatas[i].object.studentName}</td>
			<td>${xhr.ObjDatas[i].object.sex}</td>
			<td>${xhr.ObjDatas[i].object.enrolmentYear}</td>
			<td>${xhr.ObjDatas[i].object.departmentId}</td>
			<td>${xhr.ObjDatas[i].object.createTime}</td>`;
				//<td><input type="hidden" value="${xhr.ObjDatas[i].object.studentId}">`;
				if (dataStatus == "10") {
					str += `<td><input type="hidden" value="${xhr.ObjDatas[i].object.studentId}"><button class="btn btn-default btn-xs modiButton" title="修改"><i class="fa fa-pencil-square-o fa-lg"></i></button><button class="btn btn-default btn-xs commmit-btn" title="提交审核"><i class="fa fa-sign-out fa-lg"  aria-hidden="true"></i></button></td>`;
				}
				if (dataStatus == "20" || dataStatus == "30" || dataStatus == "40") {
					str += `<td><input type="hidden" value="${xhr.ObjDatas[i].object.studentId}"><button class="btn btn-default btn-xs viewButton" title="查看"><i class="fa fa-eye fa-lg"  aria-hidden="true"></i></button></td>`;
				}
				str += `</tr>`;
			}
			break;
		case 'award':
			for (i = 0; i < xhr.ObjDatas.length; i++) {
				dataStatus = xhr.ObjDatas[i].object.dataStatus;
				str += `<tr>
					<td>${(i + 1)}</td>
					<td>${xhr.ObjDatas[i].object.awardName}</td>
					<td>${xhr.ObjDatas[i].object.studentId}</td>
					<td>${xhr.ObjDatas[i].object.awardClass}</td>
					<td>${xhr.ObjDatas[i].object.authorizationNo} </td>
					<td>${xhr.ObjDatas[i].object.time}</td>
					<td>${xhr.ObjDatas[i].object.firstAward}</td>`;
				//<td><input type="hidden" value="${xhr.ObjDatas[i].object.awardId}">`;
				if (dataStatus == "10") {
					str += `<td><input type="hidden" value="${xhr.ObjDatas[i].object.awardId}" ><button class="btn btn-default btn-xs modiButton" title="修改"><i class="fa fa-pencil-square-o fa-lg"></i></button><button class="btn btn-default btn-xs commmit-btn" title="提交审核"><i class="fa fa-sign-out fa-lg"  aria-hidden="true"></i></button></td>`;
				}
				if (dataStatus == "20" || dataStatus == "30" || dataStatus == "40") {
					str += `<td><input type="hidden" value="${xhr.ObjDatas[i].object.awardId}" ><button class="btn btn-default btn-xs viewButton" title="查看"><i class="fa fa-eye fa-lg"  aria-hidden="true"></i></button></td>`;
				}
				str += "</tr>";
			}
			break;
		/*case 'works':
			for (i = 0; i < xhr.length; i++) {
				var dataStatus = xhr[i].dataStatus;
				str += "<tr>";
				str += "<td>" + (i + 1) + "</td>";
				str += "<td>" + xhr[i].worksName + "</td>";
				str += "<td>" + xhr[i].editorUserNames + "</td>";
				str += "<td>" + xhr[i].isbn + "</td>";
				str += "<td>" + xhr[i].publishTime + "</td>";
				str += "<td>" + xhr[i].press + "</td>";
				if (dataStatus == "10") {
					str += '<td><input type="hidden" value="' + xhr[i].worksId + '" ><button class="btn btn-default btn-xs modiButton" title="修改"><i class="fa fa-pencil-square-o fa-lg"></i></button><button class="btn btn-default btn-xs commmit-btn" title="提交审核"><i class="fa fa-sign-out fa-lg"  aria-hidden="true"></i></button></td>';
				}
				if (dataStatus == "20" || dataStatus == "30" || dataStatus == "40") {
					str += '<td><input type="hidden" value="' + xhr[i].worksId + '" ><button class="btn btn-default btn-xs viewButton" title="查看"><i class="fa fa-eye fa-lg"  aria-hidden="true"></i></button></td>';
				}
				str += "</tr>";
			}
			break;*/
		case 'paper':
			for (i = 0; i < xhr.ObjDatas.length; i++) {
				dataStatus = xhr.ObjDatas[i].object.dataStatus;
				str += `<tr>
					<td>${(i + 1)}</td>
					<td>${xhr.ObjDatas[i].object.paperName}</td>
					<td>${xhr.ObjDatas[i].object.studentId}</td>
					<td>${xhr.ObjDatas[i].object.periodical}</td>
					<td>${xhr.ObjDatas[i].object.publishTime}</td>
					<td>${xhr.ObjDatas[i].object.includedSituation}</td>`;
				//<td>${xhr.ObjDatas[i].object.createTime}</td>`;
				//<td><input type="hidden" value="${xhr.ObjDatas[i].object.paperId}">`;
				if (dataStatus == "10") {
					str += `<td><input type="hidden" value="${xhr.ObjDatas[i].object.paperId}" ><button class="btn btn-default btn-xs modiButton" title="修改"><i class="fa fa-pencil-square-o fa-lg"></i></button><button class="btn btn-default btn-xs commmit-btn" title="提交审核"><i class="fa fa-sign-out fa-lg"  aria-hidden="true"></i></button></td>`;
				}
				if (dataStatus == "20" || dataStatus == "30" || dataStatus == "40") {
					str += `<td><input type="hidden" value="${xhr.ObjDatas[i].object.paperId}" ><button class="btn btn-default btn-xs viewButton" title="查看"><i class="fa fa-eye fa-lg"  aria-hidden="true"></i></button></td>`;
				}
				str += "</tr>";
			}
			break;
		case 'patent':
			for (i = 0; i < xhr.ObjDatas.length; i++) {
				dataStatus = xhr.ObjDatas[i].object.dataStatus;
				str += `<tr>
					<td>${(i + 1)}</td>
					<td>${xhr.ObjDatas[i].object.patentName}</td>
					<td>${xhr.ObjDatas[i].object.studentId}</td>
					<td>${xhr.ObjDatas[i].object.patentClass}</td>
					<td>${xhr.ObjDatas[i].object.authorizationNo}</td>
					<td>${xhr.ObjDatas[i].object.time}</td>
					<td>${xhr.ObjDatas[i].object.firstPatent}</td>`;
				//<td><input type="hidden" value="${xhr.ObjDatas[i].object.patentId}">`;
				if (dataStatus == "10") {
					str += `<td><input type="hidden" value="${xhr.ObjDatas[i].object.patentId}" ><button class="btn btn-default btn-xs modiButton" title="修改"><i class="fa fa-pencil-square-o fa-lg"></i></button><button class="btn btn-default btn-xs commmit-btn" title="提交审核"><i class="fa fa-sign-out fa-lg"  aria-hidden="true"></i></button></td>`;
				}
				if (dataStatus == "20" || dataStatus == "30" || dataStatus == "40") {
					str += `<td><input type="hidden" value="${xhr.ObjDatas[i].object.patentId}" ><button class="btn btn-default btn-xs viewButton" title="查看"><i class="fa fa-eye fa-lg"  aria-hidden="true"></i></button></td>`;
				}

				str += "</tr>";
			}
			break;
		case 'project':
			for (i = 0; i < xhr.ObjDatas.length; i++) {
				dataStatus = xhr.ObjDatas[i].object.dataStatus;
				str += `<tr>
					<td>${(i + 1)}</td>
					<td>${xhr.ObjDatas[i].object.projectName}</td>
					<td>${xhr.ObjDatas[i].object.studentId}</td>
					<td>${xhr.ObjDatas[i].object.projectLeading}</td>
					<td>${xhr.ObjDatas[i].object.userId}</td>
					<td>${xhr.ObjDatas[i].object.userName}</td>`;
				//<td><input type="hidden" value="${xhr.ObjDatas[i].object.projectId}">`;
				if (dataStatus == "10") {
					str += `<td><input type="hidden" value="${xhr.ObjDatas[i].object.projectId}" ><button class="btn btn-default btn-xs modiButton" title="修改"><i class="fa fa-pencil-square-o fa-lg"></i></button><button class="btn btn-default btn-xs commmit-btn" title="提交审核"><i class="fa fa-sign-out fa-lg"  aria-hidden="true"></i></button></td>`;
				}
				if (dataStatus == "20" || dataStatus == "30" || dataStatus == "40") {
					str += `<td><input type="hidden" value="${xhr.ObjDatas[i].object.projectId}" ><button class="btn btn-default btn-xs viewButton" title="查看"><i class="fa fa-eye fa-lg"  aria-hidden="true"></i></button></td>`;
				}
				str += "</tr>";
			}
			break;
		default:
			toastr.warning('服务器错误!');
			break;
		}
		return str;
	}

	//加载后默认点击用户
	$('a[href="#info"]').click();

	$('select[id="all_options"]').on("change", function() {
		var option = $(this).find('option:selected');
		var pla = '';
		switch ($(this).val()) {
		case 'studentId':
			pla = '学号';
			break;
		case 'studentName':
			pla = '名字';
			break;
		case 'calendarYear':
			pla = '年制';
			break;
		case 'enrolmentYear':
			pla = '入学时间';
			break;
		case 'studentSource':
			pla = '生源地';
			break;
		case 'entranceRecord':
			pla = '入学学历';
			break;
		case 'registeredType':
			pla = '户口类型';
			break;
		case 'awardName':
			pla = '奖励名称';
			break;
		case 'studentName':
			pla = '学生名称';
			break;
		case 'studentId':
			pla = '学生学号';
			break;
		case 'awardClass':
			pla = '获奖类别';
			break;
		case 'paperName':
			pla = '论文名称';
			break;
		case 'patentClass':
			pla = '论文类型';
			break;
		case 'patentName':
			pla = '专利名称';
			break;
		case 'projectName':
			pla = '项目名称';
			break;
		case 'userId':
			pla = '负责人工号';
			break;
		case 'userName':
			pla = '负责人名称';
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
					info_data[data.tableName][data.tableName.replace("S", "s") + "." + $(this).parent().val()] = "";
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
						info_data[data.tableName][data.tableName.replace("S", "s") + "." + $(this).parent().val()] = "";
					}
					$(this).parent().remove();
					$(this).parent().empty();
				});

			}
		}
	})

	//分页信息
	$('.panel-footer a').click(function() {
		var style = $(this).text();
		switch (style) {
		case '首页':
			if (pageDataInformation.pageIndex == 1) {
				toastr.error("已经是第一页了!");
				return;
			}
			data.page = 1;
			doQuery();
			break;
		case '上一页':
			if (!pageDataInformation.HavePrePage) {
				toastr.error("已经在首页了!");
				return;
			}
			data.page = pageDataInformation.pageIndex - 1;
			doQuery();
			break;
		case '下一页':
			if (!pageDataInformation.HaveNextPage) {
				toastr.error("已经是最后一页了!");
				return;
			}
			data.page = pageDataInformation.pageIndex + 1;
			doQuery();
			break;
		case '尾页':
			if (pageDataInformation.pageIndex == pageDataInformation.totalPages) {
				toastr.error("已经在尾页!");
				return;
			}
			data.page = pageDataInformation.totalPages;
			doQuery();
			break;
		default:
			toastr.error('服务器错误');
			break;
		}
	});
})