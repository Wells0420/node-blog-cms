
jQuery(document).ready(function($) {
	var checked = false,
	Reg_email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
	,useremail= '';

	$('.signup #useremail').on('blur',function(){
		useremail 	= $('#useremail').val();
		checked 	= Reg_email.test(useremail);

		if (checked) {
			$.ajax({
				url:'/sign/ajaxsignupcheckin?useremail=' + useremail ,
				success:function(data){
					checked = data.cansignin;
					if (!checked) {
						$('.errtext').fadeIn();
					}else{
						$('.errtext').fadeOut();
					}
				}
			});
		} else {
			checked = false;
			$('.errtext').fadeIn();
		}
	});

	$('.signup').on('submit',function (event){
		if (checked) {
			$(this).submit();
		} else {
			$('.errtext').fadeIn();
			return false
		}
	});
});