define(['jquery','util','template','ckeditor','datepicker','language','uploadify','region','validate','form'],function($,util,template,CKEDITOR){
	//左边导航栏选中
	util.setMenu('/index/index');
	//查询个人信息
	$.ajax({
		type: 'get',
		url : '/api/teacher/profile',
		dataType : 'json',
		success : function(data){
			var html = template('settingsTpl',data.result);
			$('#settingsInfo').html(html);
			//头像上传
			$('#upfile').uploadify({
				buttonText : '',
				itemTemplate : '<span></span>',
				width : '120',
				height : '120',
				fileObjName : 'tc_acatar',
				swf : '/public/assets/uploadify/uploadify.swf',
				uploader : '/api/uploader/avatar',
				onUploadSuccess : function(file,data){
					data = JSON.parse(data);
					$('.preview img:eq(0)').attr('src',data.result.path);
				}
			});
			//三级联动
			$('#hometown').region({
				url:'/public/assets/jquery-region/region.json'
			});
			//富文本处理
			 CKEDITOR.replace('editor',{
                toolbarGroups : [{
                        name: 'clipboard',
                        groups: ['clipboard', 'undo']
                    }, {
                        name: 'editing',
                        groups: ['find', 'selection', 'spellchecker', 'editing']
                    }
                ]
            });
			//处理表单验证和表单提交
			$('#settingsForm').validate({
				sendForm : false,
				valid : function(){
					//更新富文本内容
					for(var instance in CKEDITOR.instance){
						CKEDITOR.instances[instance].updateELement();
					}
					//处理省市县内容
					var p = $('#p option:selected').text();
					var c = $('#c option:selected').text();
					var d = $('#d option:selected').text();
					var hometown = p +'|'+ c + '|' + d;

					//验证通过执行提交动作
					$(this).ajaxSubmit({
						type: 'post',
						data :　{tc_hometown : hometown},
						url : '/api/teacher/modify',
						success : function(data){
							location.reload();
						}
					});

				}
			});
		}
	});
});