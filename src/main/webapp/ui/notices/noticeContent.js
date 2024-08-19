function aryTostr(ary) {
       	console.log(ary);
       	let cont = ""
       	ary.forEach(a => {
       		cont += a+`<br>`;
       	})
       	return cont
       }
       
      /*  function appendContent(noticeId) { */
        $.ajax({         
        	type: "get",
        	url: "../../content/notices.json",
        	dataType: "json",
        	success: function(data) {
        		console.log("통신성공");
        		
        		let notices = data.notices;
        		let content = $('.content ');
        		let cont = "";
        		let notice;
        		
        		notice = notices.filter(notice => notice.noticeId === 1);
        		
       			
				let noticeTitle = `<div class="notices-title">
       			<div class="title">${notice[0].title}</div>
				</div>`;
				
				content.append(noticeTitle);
				
				let noticeDate = `<div class="notices-date">
				<div class="date">작성일</div>
				<div class="divider"></div>
       			<div class="registrationDate">${notice[0].registrationDate}</div>
				<div class="count">조회</div>
				<div class="divider"></div>
				<div class="count-num">1</div>
				</div>`;

				content.append(noticeDate);
				
				let noticedivider = `<div class="notices-divider">
				<div class="divider-bottom"></div>
				</div>`;
				
				content.append(noticedivider);
				
				
				let noticeItem = `<div class="notices-item">
       			<div class="content">${aryTostr(notice[0].content)}</div>
       			</div>`;
 
       			content.append(noticeItem);
        		
        	},
        	error: function() {
        		console.log("통신에러");
        	}       	  	
        })
		
		/* 조회수 */
		function increase(button) {
		    const productDiv = button.closest('.product-info'); // 부모 요소 찾기
		    if (!productDiv) return; // productDiv가 null인 경우 함수 종료

		    const quantitySpan = productDiv.querySelector('.quantity-number');
		    const priceSpan = productDiv.querySelector('.product-price');

		    if (!quantitySpan || !priceSpan) return; // 요소가 없으면 함수 종료

		    let quantity = parseInt(quantitySpan.innerText);
		    quantity += 1;
		    quantitySpan.innerText = quantity;


		    // 해당 정보 로컬 스토리지에 저장
		    saveToLocalStorage(productDiv);
		    console.log("조회수 증가");
		}


		$(document).ready(function () {
			$("#header").load("../header/header.html");
			$("#footer").load("../footer/footer.html");

		    $.getJSON("../../content/products.json", function (data) {
		        dataToHtml(data.products);
		    }).fail(function () {
		        console.error("JSON 파일을 불러오는 데 실패함");
		    });
		});