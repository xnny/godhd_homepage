var createDelegate=function(c,a){var b;c.setStyle({position:"relative",height:a.getHeight()+"px"});
a.addClassName("video-absolute");return{didShow:function(e,g,f){var d=e.sectionWithId(f.id);
function h(l,j,k,i,n,m,o){if(AC.Detector.isiPhone()||AC.Detector.isiPad()){l._animation(j,k,i,n,m,o)
}else{l._animationPlusHeight(j,k,i,n,m,o)}}if(/msie|MSIE 6/.test(navigator.userAgent)){if(d.movie!==null){e.view.view().show();
a.hide()}else{if(g!==null){e.view.view().show();a.show()}}}else{if(d.movie!==null){Element.setStyle(d.movie,"display: none");
b=setInterval(function(){if(typeof d._movieController!=="undefined"&&d._movieController.playing()){d._movieController.pause();
clearTimeout(b)}},25);h(e,{view:function(){return c}},a,e.view.view(),function(){Element.setStyle(d.movie,"display:block");
Element.setStyle(a,"display:none");clearTimeout(b);if(!d._movieController.playing()){d._movieController.play()
}},"front",0.4)}else{if(d.controllerPanel!==null){h(e,{view:function(){return c
}},a,e.view.view(),function(){},"front",0.4)}else{if(g!==null){Element.setStyle(a,"display:block");
h(e,{view:function(){return c}},e.view.view(),a,function(){},"end",0.4)}else{e.view.view().setOpacity(0.001)
}}}}}}};