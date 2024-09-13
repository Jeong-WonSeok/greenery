let textIndex = 0;

function categoryOpen(x) {
    x.classList.toggle("open");
}


function searchTypeText() {
    const placeholderText = "✨딥클렌징으로 모공 속 피지, 싹- 제거!✨";
    if (textIndex < placeholderText.length) {
        $(".header-search-input").attr(
            "placeholder",
            placeholderText.substring(0, textIndex + 1)
        );
        textIndex++;
        setTimeout(searchTypeText, 100);
    } else {
        // 타이핑이 끝난 후 다시 시작
        setTimeout(function () {
            textIndex = 0;
            $(".header-search-input").attr("placeholder", "");
            searchTypeText();
        }, 3000);
    }
}

function redirectToPage(paramName, paramValue) {
	const path = getContextPath();
	if (paramName=='query') {
        // 검색 페이지 이동시 검색어를 파라미터로 전달
    	window.location.href = path+`/product/search?${paramName}=${encodeURIComponent(paramValue)}`;
    }
    if(paramName=='category'){
    	window.location.href = path+`/product/category?${paramName}=${encodeURIComponent(paramValue)}`;
    }
}

function toSearchPage() {
    const searchQuery = $(".header-search-input").val().trim();
    redirectToPage("query", searchQuery);
}

/*function toCategoryPage() {
    const category = $(".category-span").data("category");
    redirectToPage("category", category);
}*/

$(document).ready(() => {
    searchTypeText();
    $(".header-search-icon").on("click", toSearchPage);
    $(".header-search-input").on("keyup", function (e) {
        if (e.key === "Enter") {
            toSearchPage();
        }
    });
    $(".category-span").on("click", function () {
        redirectToPage("category", $(this).data("string"));
    });
    
    $(document).on("click", ".cart-img", function (e) {
    	$.ajax({
    		url: getContextPath()+"/order/cartAdd?productId="+$(this).data("productid"),
    		method: 'GET',
    		success: function (response){
    			alert(response);
    		},
    		error: function(jqXHR, textStatus, errorThrown){
    			alert(jqXHR.responseText);
    		}
    	
    	});
    });
});

function getContextPath(){
	const hostIndex = location.href.indexOf(location.host) + location.host.length;
	const contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));
	return contextPath;
}

$(document).on("click", ".notice", function () {
    window.location.href = getContextPath() + "/notice/notices";
});
