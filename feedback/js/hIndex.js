// Dont affraid its just for start demonstrate the animation

$( ".mybtn" ).click(function() {
	
	if ($('.mybtn').hasClass('mybtn-animation')) {
    $('.sign').delay(300).removeClass('sgn-anim');
		$('.smile').removeClass('smile-animation');
		$('.mybtn').removeClass('mybtn-animation');
		$('.eyes').removeClass('eyes-animation');
		$('.right-eye').removeClass('l-eye-animation');
		$('.left-eye').removeClass('l-eye-animation');
		$('.bubble').removeClass('bbl');
		
	} else {
		
		$('.sign').delay(300).addClass('sgn-anim');
		$('.smile').addClass('smile-animation');
		$('.mybtn').addClass('mybtn-animation');
		$('.eyes').addClass('eyes-animation');
		$('.right-eye').addClass('l-eye-animation');
		$('.left-eye').addClass('l-eye-animation');
		setTimeout(function(){
			$('.bubble').addClass('bbl');
		}, 800);
	}
	
});
