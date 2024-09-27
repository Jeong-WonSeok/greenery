// 헤더, 푸터 파일 로드
$(document).ready(function () {

	// like 아이콘 이벤트 처리
    $(document).on('click', '.icon.like-icon', function () {
        let heartIcon = $(this).find("img");
        let productId = heartIcon.data("productid");
        let likeButton = $(this); // this를 likeButton 변수에 저장(이래야 Ajax 요청 내부에서 사용할 수 있음)
        
        if (likeButton.hasClass("active")) {
            // 찜 해제 
            $.ajax({
                url: getContextPath() + "/mypage/likeRemove?productId=" + productId,
                method: 'GET',
                success: function (response) {
                	$(".modal-title").html("찜 해제");
        			$(".modal-body").html("찜 해제 성공");
        			$("#headerModal").modal("show");
                    heartIcon.attr("src",  getContextPath() + "/resources/images/noFill_heart.png");
                    likeButton.removeClass("active"); // likeButton을 사용하여 active 클래스 제거
                },
                error: function (jqXHR, textStatus, errorThrown) {
                	$(".modal-title").html("찜 해제");
        			$(".modal-body").html("찜 해제 실패");
        			$("#headerModal").modal("show");
                }
            });
        } else {
            // 찜 추가 
            $.ajax({
                url: getContextPath() + "/mypage/likeAdd?productId=" + productId,
                method: 'GET',
                success: function (response) {
                	$(".modal-title").html("찜 등록");
        			$(".modal-body").html("찜 등록에 성공하였습니다.");
        			$("#headerModal").modal("show");
                    heartIcon.attr("src",  getContextPath() + "/resources/images/fill_heart.png");
                    likeButton.addClass("active"); // likeButton을 사용하여 active 클래스 추가
                },
                error: function (jqXHR, textStatus, errorThrown) {
                	$(".modal-title").html("찜 등록");
        			if (jqXHR.status === 401) {
        				$(".modal-body").html("로그인을 해주세요.");
        				$("#headerModal").modal("show");
                    }else{
                    	$(".modal-body").html("찜 등록에 실패했습니다.");
                    	$("#headerModal").modal("show");
                    }
                }
            });
        }
    });

    handleQueryParams();
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

function handleQueryParams() {
	const categoryMap ={
			"Skincare" : "스킨케어",
			"Makeup" : "메이크업",
			"BodyCare" : "바디케어",
			"HairCare" : "헤어케어",
			"BeautyTools" : "미용소품",
			"MensCare" : "맨즈케어"
	}
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    const category = categoryMap[params.get("category")];
    if (query) {
        $(".search-term").html(query);
    }

    if (category) {
        $(".search-result-text").css("display", "none");
        $("#header").after(`<div class="category-result">${category}</div>`);
    }
}
