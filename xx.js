/**
 * @author xnny
 */

function ajaxget(url, showid, waitid, loading, display, recall)
{
	waitid = typeof waitid == 'undefined' || waitid === null ? showid : waitid;
	var x = new Ajax();
	x.setLoading(loading);
	x.setWaitId(waitid);
	x.display = typeof display == 'undefined' || display == null ? '' : display;
	x.showId = $(showid);
	if(x.showId) 
	x.showId.orgdisplay = typeof x.showId.orgdisplay === 'undefined' ? x.showId.style.display : x.showId.orgdisplay;
	if(url.substr(strlen(url) - 1) == '#') 
	{
		url = url.substr(0, strlen(url) - 1);
		x.autogoto = 1;
	}
	var url = url + '&inajax=1&ajaxtarget=' + showid;
	x.get(url, function(s, x)
	{
		var evaled = false;
		if(s.indexOf('ajaxerror') != -1)
		{
			evalscript(s);
			evaled = true;
		}
		if(!evaled && (typeof ajaxerror == 'undefined' || !ajaxerror))
		{
			if(x.showId)
			{
				x.showId.style.display = x.showId.orgdisplay;
				x.showId.style.display = x.display;x.showId.orgdisplay = x.showId.style.display;
				ajaxinnerhtml(x.showId, s);
				ajaxupdateevents(x.showId);if(x.autogoto) scroll(0, x.showId.offsetTop);
			}
		}
		ajaxerror = null;
		if(typeof recall == 'function')
		{
			recall();
		}
		else
		{
			eval(recall);
		}
		if(!evaled)
		evalscript(s);
	});
}