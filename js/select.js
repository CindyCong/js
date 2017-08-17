(function($) { //匿名函数
	var ModSelect = function(id, obj, callback) { //参数id,obj,callback
		var _this = this;  //this指ModSelect
		_this.elm = $(id);  //this.elm指id
		_this.config = {    //指obj,传递的默认信息
			optiontext: ['123', '657'],
			selctList: [{name: '默认',value: ''}],
			name: "selectName"
		}
		_this.fun = callback;  //返回函数
//合并默认和传递的配置信息
		if (_this.getConfig(obj)) {
			$.extend(_this.config, obj); //$.extend()用于将一个或多个对象的内容合并到一个目标对象；
		}
//			 console.log(_this.config);
		_this.createHtml();
		_this.effect();
		_this.selectList();
	}
	ModSelect.prototype = {
//获取配置信息
		getConfig: function(obj) {
			if (obj && obj != '') {
				return obj;
			} else {
				return false;
			}
		},
//创建select
		createHtml: function() {
			var _this = this;
			console.log(_this.config.selctList[0].value);
			var _html ='';
			    _html += '<div class="select-mod">';
			    _html += '	<div class="select-text">';
			    _html += '  	<input name="' + _this.config.name + '" type="hidden" type="text" value="' + (_this.config.selctList[0].value || '') + '" />';//隐藏域
			    _html += '		<label title="' + _this.config.selctList[0].name + '">' + _this.config.selctList[0].name + '</label>';
			    _html += '		<i></i>';
			    _html += '	</div>';
			    _html += '	<ul class="select-lsit" style="display:none">';
			    			for (var i = 0; i < _this.config.selctList.length; i++) {
								_html += '<li title="' + _this.config.selctList[i].name + '" value="' + (_this.config.selctList[i].value || '') + '">' + _this.config.selctList[i].name + '</li>';
							}
			    _html += '  </ul>';
			    _html += '</div>';
			_this.elm.html(_html);
			//样式
			$('.select-mod').css({
				'position':'relative',
				'font-size': '14px'
			});
			$('.select-text').css({
				'padding':'0 35px 0 5px',
				'border':'1px solid #ddd'
			});
			$('.select-text input').css({
				'border':'0 none',
				'background':'none',
				'width':'100%',
				'height':'30px',
				'line-height':'30px',
				'vertical-align':'middle',
				'font-size':'14px'
			});
			$('.select-text label').css({
				'height':'28px',
				'line-height':'28px',
				'display':'inline-block',
				'width':'100%',
				'overflow':'hidden',
				'text-overflow':'ellipsis',
				'white-space':'nowrap',
				'cursor':'pointer',
				'vertical-align':'middle'
			});
			$('.select-text>i').css({
				'display':'inline-block',
				'height':'0px',
				'width':'0px',
				'position':'absolute',
				'right':'8px',
				'top':'50%',
				'margin-top':'-4px',
				'border-width':'8px',
				'border-color':'rgba(0,0,0,0)',
				'border-style':'solid',
				'border-top-color':'#c61620',
				'cursor':'pointer'
			});
			$('.select-mod ul,.select-mod li').css({
				'list-style':'none',
				'margin':'0',
				'padding':'0'
			});
			$('.select-lsit').css({
				'position':'absolute',
				'left':'0',
				'right':'0',
				'top':'29px',
				'border':'1px solid #ddd',
				'background':'#fff',
				'z-index':'1000'
			});
			$('.select-lsit>li').css({
				'padding':'5px 10px',
				'background':'#fff',
				'overflow':'hidden',
				'text-overflow':'ellipsis',
				'white-space':'nowrap'
			});
			$('.select-lsit>li').hover(function(){
				$(this).css({
					'background':'#f3f3f3',
					'cursor':'pointer'
				});
				$(this).siblings().css({
					'background':'#fff',
					'cursor':''
				})
			})
		},
		
		//下拉事件
		effect: function() {
				var _this = this;
			_this.elm.find(".select-text").click(function(event) { //点击select框
				event.stopPropagation();  //阻止默认事件
				$(this).next("ul").slideToggle(); //点击select框ul展开收起
			});
			$(document).click(function() {
				_this.elm.find("ul").slideUp("slow"); //点击页面ul上滑收起
			});
		},
		//添加点击事件
		selectList: function() {
			var _this = this;
			_this.elm.find(".select-lsit li").click(function(event) { //点击单个的li
				event.stopPropagation(); //阻止默认事件
			//alert($(this).index());
				$(this).parent("ul").slideToggle(); //ul展开或收起
				_this.elm.find(".select-text input").val($(this).attr("value")); //赋值
				_this.elm.find(".select-text label").html($(this).html());
				if (_this.fun) {
					_this.fun($(this));
				}
			});
		}
	}
	window.$$ = function(id, obj, callback) {
		new ModSelect(id, obj, callback);
	}

	
	
//			调用的方式：$$("#selectbox",{"selctList":['ddd11','ddd2'],"name"："addd"},function(elm){});
//          $$ 是脚本运行的当前进程ID号
})(jQuery);