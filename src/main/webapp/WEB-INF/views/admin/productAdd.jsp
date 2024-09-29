<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link href="${pageContext.request.contextPath}/resources/bootstrap.min.css" rel="stylesheet">
	<script src="${pageContext.request.contextPath}/resources/bootstrap/bootstrap.bundle.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/bootstrap/jquery.min.js"></script>
    <link href="${pageContext.request.contextPath}/resources/css/admin/productadd.css" rel="stylesheet" type="text/css"/>
    <!-- summernote html editor -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> 
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.js"></script>
</head>

<body>
	<%@ include file="/WEB-INF/views/common/adminCommon.jsp"%>
	<div class="section4">
	    <div>
			<div class="top-text-margin">상품관리 > <span class="text-success"><b>상품등록 / 수정</b></span></div>
			<h2 class="top-text-margin"><b>상품등록 / 수정</b></h2>
			<h5 class="top-text-margin"><b>기본 정보</b></h5>
			<form id="product-form" method="post" action="productInsert" enctype="multipart/form-data">
			    <div class="form-group">
			        <label>상품명<span class="text-essential">(필수)</span></label>
			        <input id="product-name" type="text" name="productName" placeholder="예시) 프레시 블랙 떡솝" maxlength="250" required>
			        <div id="charCount">0 / 250</div>
			    </div>
			    <div class="form-group">
			        <label>판매가<span class="text-essential">(필수)</span></label>
			        <input type="text" id="productPrice" name="productPrice" placeholder="가격을 입력해주세요" maxlength="10" required>
			        <div class="form-blank">원<span class="text-danger product-price product-alert" ></span></div>
			    </div>
			    <div class="form-group">
			        <label>상품 수량<span class="text-essential">(필수)</span></label>
			        <input type="text" id="productStock" name="productStock" placeholder="수량을 입력해주세요" required>
			        <div class="form-blank">개<span class="text-danger product-stock product-alert"></span></div>
			        
			    </div>
			    <div class="form-group">
                    <label>카테고리<span class="text-essential">(필수)</span></label>
                    
                    <select id="product-category" name="productCategory" required>
                        <option value="" disabled selected>카테고리를 선택하세요</option>
                        <option value="MensCare">MensCare</option>
                        <option value="Makeup">Makeup</option>
                        <option value="BodyCare">BodyCare</option>
                        <option value="HairCare">HairCare</option>
                        <option value="Skincare">Skincare</option>
                        <option value="BeautyTools">BeautyTools</option>
                    </select>
                </div>
			    <div class="image-thumnail">
			        <label>상품 대표 이미지 (썸네일)</label>
		        	<div>
			        	<div class="image-upload-container">
				            <div class="image-preview" id="image-preview1" onclick="document.getElementById('image-input1').click();">
				                <span>+</span>
				            </div>
				            <input type="file" id="image-input1" name="productImage1" accept="image/*" style="display: none;"
				                onchange="previewImage(event, 'image-preview1')" />
				
				            <div class="image-preview" id="image-preview2" onclick="document.getElementById('image-input2').click();">
				                <span>+</span>
				            </div>
				            <input type="file" id="image-input2" name="productImage2" accept="image/*"  style="display: none;"
				                onchange="previewImage(event, 'image-preview2')" />
				                
				            <div class="image-preview" id="image-preview3" onclick="document.getElementById('image-input3').click();">
				                <span>+</span>
				            </div>
				            <input type="file" id="image-input3" name="productImage3" accept="image/*" style="display: none;"
				                onchange="previewImage(event, 'image-preview3')" />
				
				            <div class="image-preview" id="image-preview4" onclick="document.getElementById('image-input4').click();">
				                <span>+</span>
				            </div>
				            <input type="file" id="image-input4" name="productImage4"  accept="image/*" style="display: none;"
				                onchange="previewImage(event, 'image-preview4')" />
				        </div>  
	                	<div class="text-danger product-image product-alert">이미지를 등록해 주세요</div>
			        </div>
			    </div>
			
			    <div class="form-group">
			        <label>상품 대표 설명 (썸네일)</label>
			        <input type="text" class="product-description" name="mainDescription" placeholder="상품의 대표 설명을 입력하세요" required>
			    </div>
			    <div class="form-group">
			        <label>상품 간략한 설명</label>
			        <input type="text" class="product-description" name="summaryDescription" placeholder="상품의 특징을 간단히 설명하세요" required>
			    </div>
			    <div class="form-group">
			        <label>상품 상세페이지 대표 설명</label>
			        <input type="text" class="product-description" name="detailDescription" placeholder="상품의 핵심 특징을 간단히 설명하세요" required>
			    </div>
			    <div class="image-thumnail">
			        <label>상품 상세페이지 상세정보 설명</label>
			        <div class="image-upload-container" onclick="document.getElementById('image-input5').click();">
			            <div class="image-preview" id="image-preview5">
			                <span>+</span>
			            </div>
			        </div>
			        <div class="d-flex text-danger align-items-center product-detail-image product-alert">이미지를 등록해 주세요</div>
			        <input type="file" id="image-input5" name="detailImage" accept="image/*" style="display: none;"
			            onchange="previewImage(event, 'image-preview5')"/>    
			        <!-- <div id="summernote"></div> -->
			        <!-- <textarea rows="5" placeholder="상품에 대한 상세한 설명을 입력하세요"></textarea> -->
			    </div>
			    <div class="btn-register-div">
			        <button type="submit" class="btn-register">등록</button>
			    </div>
			</form>
	
	    </div>
	</div>
	<div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="exampleModalLabel">
						상품 등록
					</h1>
				</div>
				<div class="modal-body">
				  	형식에 맞춰서 등록해 주세요
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> 닫기 </button>
	<!-- 				<button type="button" class="btn btn-primary delete-modal-btn">삭제 </button> -->
				</div>
			</div>
		</div>
	</div>
    <script src="${pageContext.request.contextPath}/resources/js/admin/productadd.js"></script>
</body>
</html>