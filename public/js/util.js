define(['jquery'],function($){
	return {
		setMenu : function(pathname){
			$('.aside .navs a').removeClass('active');
			$('.aside .navs a[href="'+pathname+'"]').addClass('active');
		},
		qs : function(attr,param){
			var p = param.substring(1);
			var arr = p.split('&');
			var retValue = '';
			arr.forEach(function(element,index){
				var kv = element.split('=');
				if(attr == kv[0]){
					retValue = kv[1];
					return;
				}
			});
			return retValue;
		}
	}
});