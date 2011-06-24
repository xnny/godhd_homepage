if(typeof AC=="undefined"){AC={}}if(typeof iScroll!=="undefined"){AC.iScroll=window.iScroll;
AC.iScroll.prototype=Object.extend(Object.clone(window.iScroll.prototype),{isTouch:function(){return(AC.Detector.isMobile()||AC.Detector.isiPad())
},touchStart:function(c){var b=this,a;if(b.options.allowPinchToZoom==true&&"touches" in c&&c.touches.length>1){return
}else{if(!b.enabled){return}}if(b.options.allowNativeScroll!==true){c.preventDefault()
}if(b.options.desktopCompatibility&&!b.isTouch()){c.preventDefault()}if("onTouchStart" in b.options&&typeof b.options.onTouchStart==="function"){b.options.onTouchStart(c)
}b.element.addClassName("ac-iscroll-scrolling");b.scrolling=true;b.moved=false;
b.distX=0;b.distY=0;b.absDistX=0;b.absDistY=0;b.setTransitionTime("0");if(b.options.momentum||b.options.snap){a=new WebKitCSSMatrix(window.getComputedStyle(b.element).webkitTransform);
if(a.e!=b.x||a.f!=b.y){document.removeEventListener("webkitTransitionEnd",b,false);
b.setPosition(a.e,a.f);b.moved=true}}b.touchStartX=b.isTouch()?c.changedTouches[0].pageX:c.pageX;
b.scrollStartX=b.x;b.touchStartY=b.isTouch()?c.changedTouches[0].pageY:c.pageY;
b.scrollStartY=b.y;b.scrollStartTime=c.timeStamp;b.directionX=0;b.directionY=0},touchMove:function(h){if(!this.scrolling){return
}var f=this,d=f.isTouch()?h.changedTouches[0].pageX:h.pageX,c=f.isTouch()?h.changedTouches[0].pageY:h.pageY,b=f.scrollX?d-f.touchStartX:0,a=f.scrollY?c-f.touchStartY:0,i=f.x+b,g=f.y+a;
f.absDistX+=Math.abs(d-f.touchStartX);f.absDistY+=Math.abs(c-f.touchStartY);f.touchStartX=d;
f.touchStartY=c;if(i>=0||i<f.maxScrollX){i=f.options.bounce?Math.round(f.x+b/3):(i>=0||f.maxScrollX>=0)?0:f.maxScrollX
}if(g>=0||g<f.maxScrollY){g=f.options.bounce?Math.round(f.y+a/3):(g>=0||f.maxScrollY>=0)?0:f.maxScrollY
}if(f.distX+f.distY>(f.options.threshold||20)&&f.scrolling){if("onTouchMove" in f.options&&typeof f.options.onTouchMove==="function"){f.options.onTouchMove(h)
}if(f.distX-3>f.distY){g=f.y;a=0}else{if(f.distY-3>f.distX){i=f.x;b=0}}f.setPosition(i,g);
f.moved=true;f.directionX=b>0?-1:1;f.directionY=a>0?-1:1}else{f.distX+=Math.abs(b);
f.distY+=Math.abs(a)}if((f.scrollX&&!f.scrollY&&f.absDistX>f.absDistY)||(f.scrollY&&!f.scrollX&&f.absDistY>f.absDistX)){h.preventDefault();
h.stopPropagation()}},touchEnd:function(j){if(!this.scrolling){return}var i=this,d=j.timeStamp-i.scrollStartTime,m=i.isTouch()?j.changedTouches[0]:j,k,l,c,a,b=0,h=i.x,g=i.y,f;
if("onTouchEnd" in i.options&&typeof i.options.onTouchEnd==="function"){i.options.onTouchEnd(j)
}i.scrolling=false;if(!i.moved){i.element.removeClassName("ac-iscroll-scrolling");
i.resetPosition();if(i.isTouch()){k=m.target;while(k.nodeType!=1){k=k.parentNode
}l=document.createEvent("MouseEvents");l.initMouseEvent("click",true,true,j.view,1,m.screenX,m.screenY,m.clientX,m.clientY,j.ctrlKey,j.altKey,j.shiftKey,j.metaKey,0,null);
l._fake=true;k.dispatchEvent(l)}return}if(!i.options.snap&&d>250){i.resetPosition();
return}if(i.options.momentum){c=i.scrollX===true?i.momentum(i.x-i.scrollStartX,d,i.options.bounce?-i.x+i.scrollWidth/5:-i.x,i.options.bounce?i.x+i.scrollerWidth-i.scrollWidth+i.scrollWidth/5:i.x+i.scrollerWidth-i.scrollWidth):{dist:0,time:0};
a=i.scrollY===true?i.momentum(i.y-i.scrollStartY,d,i.options.bounce?-i.y+i.scrollHeight/5:-i.y,i.options.bounce?(i.maxScrollY<0?i.y+i.scrollerHeight-i.scrollHeight:0)+i.scrollHeight/5:i.y+i.scrollerHeight-i.scrollHeight):{dist:0,time:0};
b=Math.max(Math.max(c.time,a.time),1);h=i.x+c.dist;g=i.y+a.dist}if(i.options.snap){f=i.snap(h,g);
h=f.x;g=f.y;b=Math.max(f.time,b)}i.scrollTo(h,g,b+"ms")},transitionEnd:function(b){var a=this;
if("onTransitionEnd" in a.options&&typeof a.options.onTransitionEnd==="function"){a.options.onTransitionEnd(b)
}document.removeEventListener("webkitTransitionEnd",a,false);a.resetPosition();
a.element.removeClassName("ac-iscroll-scrolling")}})};