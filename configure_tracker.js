Event.onDOMReady(function(){$$("a").each(function(c){if(c.href.match(/http:\/\/store.apple.com\/us\/go\/.+?\?aid/)){var d=c.getAttribute("href");
var a=AC.Tracking.pageName();a=a.substring(a.lastIndexOf(" - ")+3,a.length);d=d+"-"+a.toUpperCase();
var b=d.split("-K2-");d=d+"&cp="+b[1];c.setAttribute("href",d)}})});
