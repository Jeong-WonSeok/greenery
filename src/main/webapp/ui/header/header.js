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
    if (paramValue) {
        // 검색 페이지 이동시 검색어를 파라미터로 전달
        window.location.href = `../search/search.html?${paramName}=${encodeURIComponent(
            paramValue
        )}`;
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
        redirectToPage("category", $(this).data("category"));
    });
});

$(document).on("click", ".notice", function () {
    window.location.href = "../notices/notices.html";
});
