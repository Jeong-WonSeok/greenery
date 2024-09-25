
var toggleElement1 = document.getElementById('product');
var toggleElement2 = document.getElementById('notice')
var collapseElement1 = document.getElementById('home-collapse1');
var collapseElement2 = document.getElementById('home-collapse2');


document.addEventListener('DOMContentLoaded', function() {

	toggleElement1.addEventListener('click', function() {
		var bsCollapse = new bootstrap.Collapse(collapseElement1, {
			toggle: true
		});
		bsCollapse.toggle();
	});

	toggleElement2.addEventListener('click', function() {
		var bsCollapse = new bootstrap.Collapse(collapseElement2, {
			toggle: true
		});
		bsCollapse.toggle();
	});
	
	$(document).on("click", ".btn2", function() {
		const noticeId= $(this).data("noticeid");
		$(".modal-title").html("공지사항 삭제");
		$(".modal-body").html("정말로 삭제하시겠습니까?");
		$(".notice-modal").trigger("click");
		
		$(".delete-modal-btn").one("click", function() {
			$.ajax({
				url : "deleteNotice",
				method:"POST",
				data : {"noticeId" : noticeId},
				success: function(){
					location.href = "noticeselect";
				}
			});
		});
			
	});
	
});
