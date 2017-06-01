(function($) {

	var sectionFrom,
		$slide = $('.slide'),
		$slideActive = $('.slide.active'),
		$navLink = $('.nav a'),
		$navLi = $('.nav li'),
		$body = $('body');
			// init function
		function init(){
			TweenLite.set($slideActive, {x: '0%'});

			TweenLite.set($body, {className: '-=loading'});

		}
		init();
		// navigation click

		$navLink.on('click',function(e){
			if(e.preventDefault){
				e.preventDefault();
			}else{
				e.returnValue = false;
			}

			if(!$body.hasClass('is-animating')){

				var sectionFrom = $('.slide.active'),
				sectionToID = $(e.target).attr('href'),
				sectionTo = $('div' +sectionToID); 

				if(sectionFrom.attr('id') !== sectionTo.attr('id')){

					scrollToSection(sectionFrom, sectionTo);

				}
			}
				
		});
		function scrollToSection(sectionFrom, sectionTo){

			var heading = sectionTo.find('h1'),
				subheading = sectionTo.find('p'),
				bcg = sectionTo.find('.bcg'),
				bcgFrom = sectionFrom.find('.bcg'),
				tlUp = new TimelineLite({onComplete: setActiveSection(sectionFrom, sectionTo)}),
				tlDown = new TimelineLite();

			if(sectionFrom.index() < sectionTo.index()){

					// console.log('going down');
					tlDown
						.set($body, {className: '+=is-animating'})
						.to(sectionFrom, 1.2, {x: '-=100%', ease:Power4.easeInOut, clearProps: 'all', scaleX:-2, scaleY:-2 }, '0')
						.to(sectionTo, 1.2, {x: '0%', ease:Power4.easeInOut}, '0')
						.to(bcgFrom, 1.2, {x: '30%', ease:Power4.easeInOut, clearProps: 'all'}, '0')
						.from(bcg, 1.2, {x: '-30%', ease:Power4.easeInOut, clearProps: 'all'}, '0')
						.from(heading, 0.7, {autoAlpha:0, x: 40, ease: Power4.easeInOut},'-=1')
						.from(subheading, 0.7, {autoAlpha: 0, x: 40, ease: Power4.easeInOut},'-=0.6')
						.set($body, {className: '-=is-animating'});

			}else{

					// console.log('going up');
					tlUp
						.set($body, {className: '+=is-animating'})
						.set(sectionTo, {x:'-100%'})
						.to(sectionFrom, 1.2, { x: '100%', ease:Power4.easeInOut, clearProps: 'all', scaleX:-2, scaleY:-2}, '0')
						.to(sectionTo, 1.2, { x: '0%', ease:Power4.easeInOut}, '0')
						.to(bcgFrom, 1.2, {x: '-30%', ease:Power4.easeInOut, clearProps: 'all'}, '0')
						.from(bcg, 1.2, {x: '30%', ease:Power4.easeInOut, clearProps: 'all'}, '0')
						.from(heading, 0.7, {autoAlpha:0, x: 40, ease: Power4.easeInOut},'-=1')
						.from(subheading, 0.7, {autoAlpha: 0, x: 40, ease: Power4.easeInOut},'-=0.6')
						.set($body, {className: '-=is-animating'});;

			}
			
		}

		function setActiveSection(sectionFrom, sectionTo){
			 
			sectionFrom.removeClass('active');
			sectionTo.addClass('active');

			$body.removeAttr('class').addClass($(sectionTo).attr('id')+'-active');
			

			var currentSlideIndex = parseInt($(sectionTo).attr('id').slice(-2)) -1;
			$navLi.removeAttr('class');
			$navLi.eq(currentSlideIndex).addClass('active');
		}

})(jQuery);