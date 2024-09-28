
$(document).ready(function(){
	$(".title").click(function() {
		const noticeId = parseInt($(this).siblings(".noticeId").text());
		location.href="noticeContent?noticeId="+noticeId;
	})
})
