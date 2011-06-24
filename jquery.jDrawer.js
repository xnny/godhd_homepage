jQuery(function($)
{
	$.fn.extend(
	{
		jDrawer: function(settings)
		{
			var self = this;

			if(!self.length)
				return self;

			settings = $.extend({}, $.jDrawer.settings, settings);

			self.addClass("jDrawer")
			.addClass("jDrawer-" + settings.layout)
			.find("ul").addClass("jDrawer-list")
			.find("li").addClass("jDrawer-item").each(function()
			{
				var current = $(this);
				
				current.html("<div class=\"jDrawer-item-border-1\"><div class=\"jDrawer-item-border-2\"><div class=\"jDrawer-item-border-3\"><div class=\"jDrawer-content\">" + current.html() + "</div></div></div></div>");
			})
			
			self.find(".jDrawer-title").each(function()
			{
				var current = $(this);
				
				current.html("<div class=\"jDrawer-title-l\"><div class=\"jDrawer-title-r\"><div class=\"jDrawer-title-bg\">" + current.html() + "</div></div></div>");
			});

			var items = [];

			//horizontal bug fix
			$("ul.jDrawer-list", self).css({height: self.css("height"), width: self.css("width")});

			$("li.jDrawer-item", self).each(function()
			{
				var current = $(this);
				
				items.push(current);
			});
			
			var first = items[0];
			var last = items[self.length - 1];

			var Initialize, Resize, Slide;

			if(settings.layout === "vertical")
			{
				Initialize = function()
				{
					var over, out, jid = items.length, zid = items.length + settings.zindex;
					
					over = function()
					{
						var current = $(this);
						
						if(current.hasClass("jDrawer-active") === false)
						{
							setTimeout(function()
							{
								if(settings.callback !== undefined)
									settings.callback();
							}, settings.speed);
						
							Slide(current);
						}
					};
					
					if(settings.sticky === false)
						out = function()
						{
							Slide();
						};
					else
						out = function()
						{
	
						};
					
					$.each(items, function()
					{
						var current = this;
						
						var tH = 0, cH = 0, wH = 0, dH = 0, aH = 0, nH = 0;
						
						tH = current.height();
						
						var buffer = current.find(".jDrawer-buffer");
						
						if(settings.buffer === "auto" && buffer.length > 0)
						{
							var bO = buffer.offset();
							var cO = current.offset();
							
							wH = tH - (bO.top - cO.top);
						}
						else if(settings.buffer === "auto")
						{
							wH = 120;
						}
						else
						{
							wH = settings.buffer;
						}
						
						var prev = current.prev("li.jDrawer-item");
						
						if(prev.length > 0)
						{
							var pH = prev.height();
							dH = tH - pH;
						}
						
						aH = wH + (dH * -1);
						nH = tH + (dH * -1);
						
						if(current.is(":first-child") === false)
							nH = nH - 10;
						
						current.jtH = tH, current.jaH = aH, current.jnH = nH;
						current.jid = jid--;
						
						current.css("z-index", zid--);
						
						if(settings.event === "hover")
							current.hover(over, out);
						else
							current.bind(settings.event, over);
					});
				};
				
				Resize = function()
				{
					var tH = 0, bH = first;
					
					$.each(items, function()
					{
						var current = this;
						
						if(current.jtH > bH.jtH)
							bH = current;
					});
					
					bH.addClass("jDrawer-biggest");
					
					$.each(items, function()
					{
						var current = this;
						
						if(current.hasClass("jDrawer-biggest"))
						{
							current.removeClass("jDrawer-biggest");
							tH += current.jnH;
						}
						else
						{
							tH += current.jaH;
						}
					});
					
					$("ul.jDrawer-list", self).height(tH);
				};
				
				Slide = function(active)
				{
					$("li.jDrawer-active", self).removeClass("jDrawer-active");
					
					if(active !== undefined)
						active.addClass("jDrawer-active");
					
					var top = first.jtH * -1;
					
					$.each(items, function()
					{
						var current = this;
						
						var exec = function()
						{
							if(current.hasClass("jDrawer-active") === true)
								top += current.jnH;
							else
								top += current.jaH;
							
							current.stop().animate({"top": top + "px"}, settings.speed);
						};
						
						setTimeout(function() { exec(); }, settings.delay); //smoothing technique
					});
				};
			}
			else if(settings.layout === "horizontal")
			{
				Initialize = function()
				{
					var over, out, jid = items.length, zid = items.length + settings.zindex;
					
					over = function()
					{
						var current = $(this);
						
						if(current.hasClass("jDrawer-active") === false)
						{
							setTimeout(function()
							{
								if(settings.callback !== undefined)
									settings.callback();
							}, settings.speed);
							
							Slide(current);
						}
					};
	
					if(settings.sticky === false)
						out = function()
						{
							Slide();
						};
					else
						out = function()
						{
	
						};
					
					$.each(items, function()
					{
						var current = this;
						
						var tW = 0, cW = 0, wW = 0, dW = 0, aW = 0, nW = 0;
						
						tW = current.width();
						
						var buffer = current.find(".jDrawer-buffer");
						
						if(settings.buffer === "auto" && buffer.length > 0)
						{
							var bO = buffer.offset();
							var cO = current.offset();
							
							wW = tW - (bO.left - cO.left);
						}
						else if(settings.buffer === "auto")
						{
							wH = 120;
						}
						else
						{
							wW = settings.buffer;
						}
						
						var prev = current.prev("li.jDrawer-item");
						
						if(prev.length > 0)
						{
							var pW = prev.width();
							dW = tW - pW;
						}
						
						aW = wW + (dW * -1);
						nW = tW + (dW * -1);
						
						if(current.is(":first-child") === false)
							nW = nW - 10;
						
						current.jtW = tW, current.jaW = aW, current.jnW = nW;
						current.jid = jid--;
						
						//horizontal bug fix
						current.find(".jDrawer-content").append("<div style=\"clear: both\"></div>");
						
						current.css("z-index", zid--);
						
						if(settings.event === "hover")
							current.hover(over, out);
						else
							current.bind(settings.event, over);
					});
				};
				
				Resize = function()
				{
					var tW = 0, biggest = first;
					
					$.each(items, function()
					{
						var current = this;
						
						if(current.jtW > biggest.jtW)
							biggest = current;
					});
					
					biggest.addClass("jDrawer-biggest");
					
					$.each(items, function()
					{
						var current = this;
						
						if(current.hasClass("jDrawer-biggest"))
						{
							current.removeClass("jDrawer-biggest");
							tW += current.jnW;
						}
						else
						{
							tW += current.jaW;
						}
					});
					
					$("ul.jDrawer-list", self).width(tW);
				};
				
				Slide = function(active)
				{
					$("li.jDrawer-active", self).removeClass("jDrawer-active");
					
					if(active !== undefined)
						active.addClass("jDrawer-active");
					else
						active = first;
					
					var left = first.jtW * -1;
					
					$.each(items, function()
					{
						var current = this;
						
						var exec = function()
						{
							if(current.hasClass("jDrawer-active") === true)
								left += current.jnW;
							else
								left += current.jaW;
							
							current.stop().animate({"left": left + "px"}, settings.speed);
						};
						
						setTimeout(function() { exec(); }, settings.delay); //smoothing technique
					});
				};
			}

			Colorize = function()
			{
				var color;
				
				if(settings.color === undefined)
				{
					var parent = self.parent();
					
					while(parent.css("background-color") !== undefined && !parent.is("html"))
					{
						color = parent.css("background-color");
						
						parent = parent.parent();
					}
				}
				else
				{
					color = settings.color;
				}
				
				$("#" + self.attr("id") + ", #" + self.attr("id") + " .jDrawer-content", self.parent()).css("background-color", color);
			};
			
			Initialize();
			
			Colorize();
			
			Resize();
			
			var active = $(".jDrawer-active", self);
			
			Slide(active);
			
			return self;
		}
	});
});

jQuery.extend(
{
	jDrawer:
	{
		settings: 
		{
			layout: "vertical",
			speed: 300,
			delay: 0,
			color: "#FFF",
			sticky: true,
			zindex: 0,
			buffer: "auto",
			event: "hover",
			callback: undefined
		},
	
		Initialize: function()
		{
			var self = this;
			
			jQuery("body").append("<div id=\"jDrawer-preload\" style=\"display: none\"></div>");
			
			var images = [];
			images.type = "array";
			
			jQuery(".jDrawer *").each(function()
			{
				var current = $(this);
				
				var bg = current.css("background-image");
				
				if(bg !== "none")
					if(bg.match(/^url[("']+(.*)[)"']+$/i))
						images.push(RegExp.$1);
			});
			
			self.PreloadImages(images);
			self.FixFlicker();
		},
		
		PreloadImages: function()
		{
			for(var i in arguments.length)
				if(arguments[i].type === "array")
					for(var j in arguments[i])
						jQuery("#jDrawer-preload").append("<img src=\"" + arguments[i][j] + "\" width=\"1\" height=\"1\" />");
				else
					jQuery("#jDrawer-preload").append("<img src=\"" + arguments[i] + "\" width=\"1\" height=\"1\" />");
		},
		
		FixFlicker: function()
		{
			if($.browser.msie === true)
				try { document.execCommand("BackgroundImageCache", false, true); } catch(e) {}
		}
	}
});

jQuery(document).ready(function()
{
	jQuery.jDrawer.Initialize();
});