$.ajax({         
        	type: "get",
        	url: "../../content/notices.json",
        	dataType: "json",
        	success: function(data) {
        		console.log("통신성공");
        		
        		let notices = data.notices;
        		let content = $('.content ');
        		
        		
        		notices.forEach(notices => {
        			let noticeItem = `<div class="notices-item">
        			<div class="noticeId">${notices.noticeId}</div>
        			<div class="title">${notices.title}</div>
        			<div class="registrationDate">${notices.registrationDate}</div>
        			</div>`;
  
        			content.append(noticeItem);
        			content.append(`<div class="divider"></div>`);
        			
        		});
        		
        	},
        	error: function() {
        		console.log("통신에러");
        	}       	  	
        })
        
          
          $(document).ready(function(){
        	   $(".title").click(function() {
        		  location.href="../notices/noticeContent.html";
        	  })
          })


		  $(document).ready(function () {
		  	$("#header").load("../header/header.html");
		  	$("#footer").load("../footer/footer.html");

		      $.getJSON("../../content/products.json", function (data) {
		          dataToHtml(data.products);
		      }).fail(function () {
		          console.error("JSON 파일을 불러오는 데 실패함");
		      });
		  });
