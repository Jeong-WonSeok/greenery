
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
});

// 문자 길이 250자 제한
$('#notice-title').on('input', function(){
	var currentLength = $(this).val().length;
	var maxLength = 250;
	
	if (currentLength > maxLength){
		$(this).val($(this).val().substring(0, maxLength));	// 0 ~ 250 까지만 남기고 나머진 버림
		currentLength = maxLength;
	}
	$('#charCount').text(currentLength + "/" + maxLength);
	
});











