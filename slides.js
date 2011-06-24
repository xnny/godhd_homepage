var userMenuTimeOut=null;
jQuery(function($){
	if($(".slide-pic").length>0)
	{
		var defaultOpts = { interval: 5000, fadeInTime: 300, fadeOutTime: 200 };
		var _titles = $("ul.slide-txt li");
		var _titles_bg = $("ul.op li");
		var _bodies = $("ul.slide-pic li");
		var _count = _titles.length;
		var _current = 0;
		var _intervalID = null;
		var stop = function() { window.clearInterval(_intervalID); };
		var slide = function(opts) {
			if (opts) {
				_current = opts.current || 0;
			} else {
				_current = (_current >= (_count - 1)) ? 0 : (++_current);
			};
			_bodies.filter(":visible").fadeOut(defaultOpts.fadeOutTime, function() {
				_bodies.eq(_current).fadeIn(defaultOpts.fadeInTime);
				_bodies.removeClass("cur").eq(_current).addClass("cur");
			});
			_titles.removeClass("cur").eq(_current).addClass("cur");
			_titles_bg.removeClass("cur").eq(_current).addClass("cur");
		}; 
		var go = function() {
			stop();
			_intervalID = window.setInterval(function() { slide(); }, defaultOpts.interval);
		}; 
		var itemMouseOver = function(target, items) {
			stop();
			var i = $.inArray(target, items);
			slide({ current: i });
		}; 
		_titles.click(function() { if($(this).attr('class')!='cur'){itemMouseOver(this, _titles); }else{stop();}}, go);
		_bodies.hover(stop, go);
		go();
	}
	


	$(".AntCityLay").hover(function(){
		clearTimeout(userMenuTimeOut);
	},function(){
		$(this).fadeOut();
	});
	var now = new Date(),hour = now.getHours() 
	if(hour < 6){$("#AntHours").html("凌晨好！")} 
	else if (hour < 9){$("#AntHours").html("早上好！")} 
	else if (hour < 12){$("#AntHours").html("上午好！")} 
	else if (hour < 14){$("#AntHours").html("中午好！")} 
	else if (hour < 17){$("#AntHours").html("下午好！")} 
	else if (hour < 19){$("#AntHours").html("傍晚好！")} 
	else if (hour < 22){$("#AntHours").html("晚上好！")} 
	else {$("#AntHours").html("夜里好！")};
	
	$("#tuangou1").mouseover(function(){
		$(this).addClass("on");
		$("#tuangou2").removeClass("on");
		$("#tuangoushow1").show();					  
		$("#tuangoushow2").hide();					  
	});
	$("#tuangou2").mouseover(function(){
		$(this).addClass("on");
		$("#tuangou1").removeClass("on");
		$("#tuangoushow2").show();					  
		$("#tuangoushow1").hide();					  
	});
	
	$(".Ant-FloatClass").hover(function(){
		$(".Select").show();
	},function(){
		$(".Select").hide();
	});
	$(".Ant-ul").find(".Ant-li").each(function(){
		$(this).hover(function(){
			$(this).find('.Ant-Lower').show();
			$(this).find('.Ant-A').addClass("current");
		},function(){
			$(this).find('.Ant-Lower').hide();
			$(this).find('.Ant-A').removeClass("current");
		});
	});
	$(".AntCategories").find(".li").each(function(){
		$(this).mouseover(function(){
			$(this).addClass("Ant-li");
		});
		$(this).mouseout(function(){
			$(this).removeClass("Ant-li");
		});
	});
	$("#cataloglast").click(function(){
		var y=$("#cataloglastShow").offset().top ;
		$(document.documentElement).animate({"scrollTop": y}, {duration:"slow"});							 
	});								 
	$("#searchinputfrom").submit(function(){
		var aa=$("#Shophiddenvalue").val();
		var word=$.trim($("#topshopkeyword").val());
		if( word.length==0  || word=="请输入您想要的店铺名或者掌柜"  || word=="请输入您想要的商品"){
			alert("请先选择您要搜索的条件！");	
			$("#topshopkeyword").focus();
			return false;
		}
		var bb=aa.split(",");
		if($("#topshopkeyword").attr("rel")=="1")
		{
			var url=$("#companyurl").val()+"Storelist.aspx?SearchKeyword="+escape(word);
			if(bb[0]=="0")
				var url=$("#companyurl").val()+encodeURIComponent("StoreList-0-0-0-0-0-0-0-S"+word+"S-p0"+bb[1]);
		}
		else{
			var url="ItemSearch.aspx?SearchKeyword="+escape(word);
			if(bb[0]=="0")
				var url=encodeURIComponent("ItemSearch-0-0-0-0-0-0-0-0-0-S"+word+"S-p0"+bb[1]);
		}
		window.open(url,"_self");
		return false;							   
	 });
	
	$("#listformsearch").submit(function(){
		var aa=$("#Shophiddenvalue").val();
		var word=$.trim($("#SearchKeyword").val());
		var R1=$.trim($("#R1").val());
		var R2=$.trim($("#R2").val());
		if(R1=="")
			R1="0";
		if(R2=="")
			R2="0";
		if( word.length==0  && R1=="0"  && R2=="0" )
		{
			alert("请先选择您要搜索的条件！");	
			$("#SearchKeyword").focus();
			return false;
		}
		if(!checknumber(R1) &&  R1!="0")
		{
			alert("输入的价格不对，只支持输入整数！");	
			return false;
		}
		if(!checknumber(R2)  &&  R2!="0")
		{
			alert("输入的价格不对，只支持输入整数！");	
			return false;
		}
		if( (R1!="0" && R2=="0")  || (R1=="0" && R2!="0") )
		{
			alert("请输入价格超始和结束范围！");
			return false;
		}
		var bb=aa.split(",");
		var url="ItemSearch.aspx?SearchKeyword="+escape(word)+"&R1="+R1+"&R2="+R2;
		if(bb[0]=="0")
			var url=encodeURIComponent("ItemSearch-0-0-0-0-0-0-0-"+R1+"-"+R2+"-S"+word+"S-p0"+bb[1]);
		window.open(url,"_self");
		return false;							   
	 });
	
	$(".Ant-EmptyCart").click(function(){
		if(confirm("您确定要清空购物车吗？"))
		{
			$.ajax({
			  url: "/public/ajax.aspx?action=deleteshoptoorder",
			  cache: false,
			  success:function(data)
			  {
				  window.location.href=window.location.href;
			  }
		   });
	    }
	});
	
	$(".Ant-UpdateQuantity").click(function(){
		$(".Ant-ShoppingCart-01").find("#ordertr").each(function(){
			var obj=$(this);		
			//alert("/public/ajax.aspx?action=updateshoporder&aa="+obj.find("#text").val()+"&id="+obj.find("#text").attr("rel"));
			$.ajax({
			  url: "/public/ajax.aspx?action=updateshoporder&aa="+obj.find("#text").val()+"&id="+obj.find("#text").attr("rel"),
			  cache: false,
			  success:function(data)
			  {
				  if(data!=0)
				  {
					alert(data);  
					return false;
				  }
			  }
		   });
		});
		//window.location.href=window.location.href;
	});
	$(".Ant-ShoppingCart-01").find("#ordertr").each(function(){
		var obj=$(this);
		obj.find('#delete').click(function(){
			if(confirm("确定要删除该宝贝吗？"))
			{
				$.ajax({
				  url: "/public/ajax.aspx?action=deleteshoptoorder&id="+obj.find("#text").attr("rel"),
				  cache: false,
				  success:function(data)
				  {
					  window.location.href=window.location.href;
				  }
			   });
		   }
		});
		
		obj.find('#Update').click(function(){
			var aa=obj.find("#text").val();
			if(!checknumber(aa))
			{
				alert("对不起，数量填写不正确！");	
				return false;
			}
			else
			{
				$.ajax({
				  url: "/public/ajax.aspx?action=updateshoporder&aa="+aa+"&id="+obj.find("#text").attr("rel"),
				  cache: false,
				  success:function(data)
				  {
					  if(data==0)
					  {
						window.location.href=window.location.href;
					  }
					  else{
						alert(data);  
					  }
				  }
			   });
			}
		});
	});
	
	if($("#formordersubmit").length>0)
	{
		$.formValidator.initConfig({formid:"formordersubmit",errorfocus:false,onerror:function(msg){},onsuccess:function(){
			$("#querengorder").attr("disabled", true);
			var curl="../public/ajax.aspx?action=addcompanyorder&OrderMan="+escape($("#txtOrderMan").val());
			curl +="&OrderAddress="+escape($("#txtOrderAddress").val())+"&OrderCode="+escape($("#txtOrderCode").val())+"&OrderTel="+escape($("#txtOrderTel").val())+"&OrderMark="+escape($("#txtOrderMark").val())+"&OrderPeisong="+$("input[name='txtOrderPeisong']:checked").val();
			$.ajax({
				  url: curl,
				  cache: false,
				  success:function(data)
				  {
						var re = /^[1-9]+[0-9]*]*$/;   // 整数
						if (re.test(data))
						{
							window.location.href="SuccesOrder.aspx?id="+data;
						}
						else{
							alert(data);
							$("#querengorder").attr("disabled", false);
						}
				  }
			});
			return false;
		}});
		$.formValidator.getInitConfig("1").wideword = true;
		
		$("#txtOrderMan").formValidator({onshow:"请正确填写姓名，最少不能低于2个字，最多不能超过15个字",onfocus:"请正确填写姓名，最少不能低于2个字，最多不能超过15个字"}).functionValidator({
			fun:function(val,elem){
				var tt= 0;
				if($("#txtOrderPeisong").length>0)
					tt = $("input[name='txtOrderPeisong']:checked").val();
				if( ( val.length>1 && val.length<15 ) ){
					return true;
				}else{
					return "请正确填写姓名，最少不能低于2个字，最多不能超过15个字"
				}
			}
		});
		$("#txtOrderTel").formValidator({onshow:"请输入正确的联系电话。",onfocus:"请输入正确的联系电话。"}).functionValidator({
			fun:function(val,elem){
				if( val.match(/^.{6,}$/) ){
					return true;
				}else{
					return "您输入的联系电话格式不正确。"
				}
			}
		});
		$("#txtOrderAddress").formValidator({onshow:"请输入详细的收货地址。",onfocus:"收货地址最少3个汉字，请正确填写。"}).functionValidator({
			fun:function(val,elem){
				var tt= 0;
				if($("#txtOrderPeisong").length>0)
					tt = $("input[name='txtOrderPeisong']:checked").val();
				if( ( val.length>2 && val.length<60 ) || tt==1 ){
					return true;
				}else{
					return "收货地址3到60个字，请正确填写"
				}
			}
		});
		$("#txtOrderCode").formValidator({onshow:"请输入6位邮政编码。",onfocus:"请输入6位邮政编码"}).functionValidator({
			fun:function(val,elem){
				var tt= 0;
				if($("#txtOrderPeisong").length>0)
					tt = $("input[name='txtOrderPeisong']:checked").val();
				if( val.match(/^\d{6}$/) || tt==1 ){
					return true;
				}else{
					return "邮政编码填写有误,请输入6位邮政编码"
				}
			}
		});
		$("#txtOrderMark").formValidator({onshow:"补充说明不能超过500字。",onfocus:"补充说明不能超过500字。",oncorrect:"&nbsp;"}).inputValidator({min:0,max:500,onerror: "补充说明不能超过500字。"})
	}
	
	
	
	

	
});

function setsonghuofashi()
{

	if( $("#totalmoney").html()!="面议")
	{
		var totalmoney = parseFloat( $("#totalmoney").html().replace("￥","") );
		var yunfeimoney=0;
		$(".Ant-ShoppingCart-01").find("#ordertr").each(function(){
			var obj=$(this);
			yunfeimoney += parseFloat( obj.attr("rel") );
			var thisyunfeimoney =  parseFloat( obj.attr("rel") ) ;
			if(thisyunfeimoney==0 || tt==1)
			{
				obj.find("#totalyunfeitr").html("无");	
			}
			if(tt==0)
			{
				if( thisyunfeimoney >0 )
					obj.find("#totalyunfeitr").html("￥"+thisyunfeimoney.toFixed(2));	
				else
					obj.find("#totalyunfeitr").html("无");	
			}
			
			
		});

	}
}