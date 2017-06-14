define(['jquery','template','util','bootstrap'],function($,template,util){
	// 设置导航栏菜单选中
	util.setMenu(location.pathname);
	//加载数据列表
	$.ajax({
		type:'get',
		dataType : 'json',
		url: '/api/teacher',
		success : function(data){
			//解析数据且渲染页面
			var html = template('teacherInfoTpl',{list:data.result});
			$('#teacherInfo').html(html);
			//查看讲师功能
			previewTeacher();
			//注销和启动讲师
			enableOrDisableTeacher();
			}
	});

	// 查看讲师功能
	function previewTeacher(){
		$('#teacherInfo').find('.preview').click(function(){
			var tcId = $(this).closest('td').attr('data-id');
			//绑定查看讲师信息的单击事件
			$.ajax({
				type : 'get',
				url : '/api/teacher/view',
				data:{tc_id:tcId},
				datatype : 'json',
				success : function(data){
					data.result.tc_hometown = data.result.tc_hometown.split('|').join(' ');
					var html = template('teacherModalInfoTpl',data.result);
					$('#teacherModalInfo').html(html);
					//显示弹窗
					$('#teacherModal').modal();
				}
			});
			 return false;
		});
	}
	function enableOrDisableTeacher(){
		$('#teacherInfo').find('.edteacher').click(function(){
			var that = this;
			var td = $(this).closest('td');
			var tcId = td.attr('data-id');
			var tcStatus = td.attr('data-status');

			$.ajax({
				type : 'post',
				url : '/api/teacher/handle',
				data : {tc_id : tcId,tc_status : tcStatus},
				dataType : 'json',
				success : function(data){
					if(data.code == 200){
						td.attr('data-status',data.result.tc_status);
						if(data.result.tc_status == 0){
							$(that).text('注销');
						}else {
							$(that).text('启用');
						}

					}
				}
			});
		});
	}
});	