
$(function(){
	app.rules();
})

var app = {

	rules(){
		this.deleteConfirm();
		this.sizeIframe();
		this.toggleAside();
		
	},
	deleteConfirm(){
		$('.delete').click(function(){
			var msg = confirm("Are you sure to delete this datas? ");
			return msg;
		})
	},
	sizeIframe(){
		var height = document.documentElement.clientHeight - 100;
		document.getElementById('rightMain').height = heights;
	},
	// I have no idea why this function is not working   2022-1-14 Amos.leung
	toggleAside(){
		$('.aside h4').click(function(){
			$('h4').siblings('ul').slideToggle();
		})
	}
	
};

//the .resize() method is just a shorthand for .on( "resize", handler )
$(window).resize(function(){
	app.sizeIframe() 
})