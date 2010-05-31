(function($) {
	$.fn.epicFade = function(settings) {
		var config = {'landingPage': '', 'notPage': '.clear'};
		
		if(settings) { $.extend(config, settings); }
		
		var containers = [];
		this.each(function() {
			var containerId = $(this).attr('id'); if(!containerId) { containerId = (Math.random()); }
			containers.push({'cId': containerId, 'moving': false});
			
			var container = $('#page-' + $(this).children(0).attr('id')).parent();
			var pages = container.children(':not(' + config.notPage + ')');
			var links = $(this); var linkz = links.children();
			if(!config.landingPage) { config.landingPage = '#page-' + links.children(0).attr('id'); container.attr('class', 'page-' + links.children(0).attr('id')); }
						
			pages.wrap('<div class="hiddenWrapper" style="display: block; height: 0px; overflow: hidden;" />').show();
			container.find(config.landingPage).parent().css('height', 'auto');
			container.height( $('#page-' + container.attr('class')).outerHeight(true) );
			
			linkz.each(function(){
				var thisLink = this;
				thisLink.containerId = containerId;
				$(this).click(function(event){
					for(cAM = 0; cAM < containers.length; cAM++) {
						if(containers[cAM].cId == thisLink.containerId) {
							if(containers[cAM].moving == true) return false;
							else containers[cAM].moving = true;
							break;
						}
					}
					var contentHeight = container.height();
					var current = container.attr('class');
					var currentHeight = $('#' + current).outerHeight(true);
					var next = 'page-' + $(this).attr('id');
					var nextHeight = $('#' + next).outerHeight(true);
					if(next == current) { return false; }

					try { console.log('Current: ' + current + ', ' + currentHeight + ' - Next: ' + next + ', ' + nextHeight); } catch(e) { };
					if(nextHeight > currentHeight) {
						container.animate({
							height: nextHeight + 'px'
						}, 200);
						$('#' + current).parent().fadeOut(400, function(){
							$(this).height('0px').show();
							$('#' + next).parent().hide().height('auto').fadeIn(350, function(){
								container.attr('class', next);
								containers[cAM].moving = false;
							});
						});
					} else {
						$('#' + current).parent().fadeOut(400, function(){
							$(this).height('0px').show();
							$('#' + next).parent().hide().height('auto').fadeIn(350, function(){
								container.attr('class', next).animate({
									height: nextHeight + 'px'
								}, 200, function(){
									containers[cAM].moving = false;
								});
							});
						})
					}
					return false;
				});
			});
			
		});
		
		return this;
	};
	
})(jQuery);
