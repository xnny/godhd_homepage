/**
 * @author xnny
 */

var setTimeAction = false;
 $('#added-games').mouseover(function () { showGameList(); });
 $('#added-games').mouseout(function () { if (setTimeAction) {clearTimeout(setTimeAction);}; });
 $('#game-list').mouseout(function () { hideGameList() });
 $('#game-list').mouseover(function (){ $('#game-list').removeClass('hide');if (setTimeAction) {clearTimeout(setTimeAction); };});

//$(".game-category").click(function () { $('.show').removeClass('show');$(this).parent().find('ul').addClass('show'); });

function showCategory(obj)
{
	$('.show').removeClass('show');
	$(obj).parent().find('ul').addClass('show');
	//alert(obj);//obj.parent().find('ul').addClass('show');
}

function showGameList()
{
	$('#game-list').removeClass('hide');$('#added-games').addClass('added-games-hover');
	var url = 'php.php';var today=new Date();var time = today.getSeconds();$.get(url, { date: time },
  	function(data){
  		//$('#loading_box').hide();
  		$('#games').replaceWith(data);
    //alert("Data Loaded: " + data);
  	});
}

function f()
{
	alert('xxxxxx');
}

function hideGameList()
{
	setTimeAction = setTimeout(function (){hideGameListxx()}, 500);
}
			
function hideGameListxx()
{
	$('#game-list').addClass('hide');
	$('#added-games').removeClass('added-games-hover');
	$('#games').replaceWith('<div id="games"><div class="loading"><img src="images/loading.gif"></div><div class="clear-both"></div></div>');
}

$("#top-game .slideshower").fadeTransition({pauseTime: 4000,
                                                 transitionTime: 1000,
                                                 ignore: null,
                                                 delayStart: 4000,
                                                 pauseOnMouseOver: true,
                                                 createNavButtons: true});