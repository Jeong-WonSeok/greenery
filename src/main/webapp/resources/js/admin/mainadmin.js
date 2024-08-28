

var toggleElement1 = document.getElementById('product');
var toggleElement2 = document.getElementById('notice')
var collapseElement1 = document.getElementById('home-collapse1');
var collapseElement2 = document.getElementById('home-collapse2');

toggleElement1.addEventListener('click', function () {
	var bsCollapse = new bootstrap.Collapse(collapseElement1, {
		toggle: true
	});
	bsCollapse.toggle();
});

toggleElement2.addEventListener('click', function () {
	var bsCollapse = new bootstrap.Collapse(collapseElement2, {
		toggle: true
	});
	bsCollapse.toggle();
});

// $('#addproduct').on('click', function () {
// 	var target = $(this).data('id') + '.html';
// 	//ajax 요청
// 	$.ajax({
// 		url: '../addproduct/' + target,    // 각 탭에 맞는 html 파일 경로
// 		method: 'GET',
// 		success: function (data) {
// 			$('.section4').html(data);
// 			console.log('ajax 요청 성공');
// 		},
// 		error: function () {
// 			$('.section4').html('<p>내용을 불러오는 데 실패함.</p>');
// 		}
// 	});
// });

function loadContent(targetDir, targetId) {
	var target = targetId + '.html';
	$.ajax({
		url: '../' + targetDir + '/' + target,    // 각 탭에 맞는 html 파일 경로
		method: 'GET',
		success: function (data) {
			$('.section4').html(data);
			console.log('ajax 요청 성공');
		},
		error: function () {
			$('.section4').html('<p>내용을 불러오는 데 실패함.</p>');
		}
	});
}

$('#productadd').on('click', function () {
	loadContent('productadd', $(this).data('id'));
});

$('#productselect').on('click', function () {
	loadContent('productselect', $(this).data('id'));
});

$('#noticeadd').on('click', function () {
	loadContent('noticeadd', $(this).data('id'));
});

$('#noticeselect').on('click', function () {
	loadContent('noticeselect', $(this).data('id'));
});

// 페이지 로드되면 기본적으로 detail탭이 열리게 
$('#productadd').first().trigger('click');

$(document).on('click', '.header-logo', function () {
	window.location.href = '../../main/main.html';
});